import { Col, Container, Row } from "react-bootstrap";
import styles from "./ListController.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { json as d3Json } from "d3";
import { apiBaseUrl } from "../../utils/fetchData.utils";

import ToolsPanel from "./ToolsPanel";
import DataGrid from "../DataGrid";

export default function ListController() {
  const [regionsList, setRegionsList] = useState([]);
  const [region, setRegion] = useState();
  const [provincesList, setProvincesList] = useState([]);
  const [province, setProvince] = useState();
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [themesList, setThemesList] = useState([]);
  const [theme, setTheme] = useState();
  //
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  //
  const [data, setData] = useState();

  const componentsData = {
    regionsList,
    setRegionsList,
    region,
    setRegion,
    provincesList,
    setProvincesList,
    province,
    setProvince,
    municipalitiesList,
    setMunicipalitiesList,
    municipality,
    setMunicipality,
    themesList,
    setThemesList,
    theme,
    setTheme,
    loading,
    setLoading,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    data,
    setData,
  };

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
		setLoading(true);
    const queryParams = { format: "json" };
    if (region) queryParams.region = encodeURIComponent(region.code);
    if (province) queryParams.province = encodeURIComponent(province.code);
    if (municipality)
      queryParams.municipality = encodeURIComponent(municipality.code);
    if (theme) queryParams.theme = encodeURIComponent(theme.id);
    if (pageSize) queryParams.page_size = encodeURIComponent(pageSize);
    if (pageNumber) queryParams.page = encodeURIComponent(pageNumber);
    //
    const temp = [];
    for (const key in queryParams) {
      temp.push(key + "=" + queryParams[key]);
    }
    const searchString = "?" + temp.join("&");
    d3Json(apiBaseUrl + "/api/monument/" + searchString).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [region, province, municipality, theme, pageSize, pageNumber]);

  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <ToolsPanel {...componentsData} />
        </Col>
        <Col lg={9}>{data?.count > 0 && <DataGrid {...componentsData} />}</Col>
      </Row>
    </Container>
  );
}
