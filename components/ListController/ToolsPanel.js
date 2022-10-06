import styles from "./ListController.module.scss";
import classNames from "classnames";
import NavMenu from "../NavMenu";
import { DropdownUI } from "../UI-Components";
import { useEffect, useState } from "react";
import { json as d3Json } from "d3";
import { apiBaseUrl } from "../../utils/fetchData.utils";

export default function ToolsPanel() {
  const [regionsList, setRegionsList] = useState([]);
  const [region, setRegion] = useState();
  const [provincesList, setProvincesList] = useState([]);
  const [province, setProvince] = useState();
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [themesList, setThemesList] = useState([]);
  const [theme, setTheme] = useState();
  //
  const [data, setData] = useState([]);

  useEffect(() => {
    const requests = [
      d3Json(apiBaseUrl + "/api/region/"),
      d3Json(apiBaseUrl + "/api/domain/"),
    ];
    Promise.all(requests).then(([regions, domain]) => {
      const unknownRegion = {
        code: 0,
        label: "Unknown region",
        name: "Unknown region",
        centroid: null,
      };
      setRegionsList([unknownRegion, ...regions]);
      setThemesList(domain.themes);
    });
  }, []);

  useEffect(() => {
    if (region && region.code !== 0) {
      d3Json(
        apiBaseUrl + "/api/region/" + region.code + "/areas/?format=json"
      ).then((geojson) => {
        const _provincesList = geojson.features.map(
          (province) => province.properties
        );
        setProvincesList(_provincesList);
      });
    } else {
      setProvincesList([]);
    }
  }, [region]);

  useEffect(() => {
    if (province) {
      d3Json(
        apiBaseUrl + "/api/province/" + province.code + "/areas/?format=json"
      ).then((geojson) => {
        const _municipalitiesList = geojson.features.map(
          (municipality) => municipality.properties
        );
        setMunicipalitiesList(_municipalitiesList);
      });
    } else {
      setProvincesList([]);
    }
  }, [province]);

  useEffect(() => {
    const queryParams = { format: "json" };
    if (region) queryParams.region = encodeURIComponent(region.code);
    if (province) queryParams.province = encodeURIComponent(province.code);
    if (municipality)
      queryParams.municipality = encodeURIComponent(municipality.code);
    if (theme) queryParams.theme = encodeURIComponent(theme.id);
    //
    const temp = [];
    for (const key in queryParams) {
      temp.push(key + "=" + queryParams[key]);
    }
    const searchString = "?" + temp.join("&");
		d3Json(apiBaseUrl + "/api/monument/" + searchString).then(data=>setData(data))
  }, [region, province, municipality, theme]);

  return (
    <div className={classNames("d-flex", "flex-column")}>
      <NavMenu />
      <h6>Areas</h6>
      <DropdownUI
        defaultLabel={"Select a region"}
        items={regionsList}
        value={region}
        setValue={setRegion}
        disabled={!regionsList.length}
      />
      <DropdownUI
        defaultLabel={"Select a province"}
        items={provincesList}
        value={province}
        setValue={setProvince}
        disabled={!provincesList.length}
      />
      <DropdownUI
        defaultLabel={"Select a municipality"}
        items={municipalitiesList}
        value={municipality}
        setValue={setMunicipality}
        disabled={!municipalitiesList.length}
      />
      <h6>Themes</h6>
      <DropdownUI
        defaultLabel={"Select a monument type"}
        items={themesList}
        value={theme}
        setValue={setTheme}
        disabled={!themesList.length}
      />
      <h6>Status Filter</h6>
      <h6>Export</h6>
      <h6>Legend</h6>
    </div>
  );
}
