import { Col, Container, Row } from "react-bootstrap";
import styles from "./ListController.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { json as d3Json } from "d3";
import { apiBaseUrl } from "../../utils/fetchData.utils";
import { availableStatuses } from "../../utils/ventagli.utils";

import ToolsPanel from "./ToolsPanel";
import DataGrid from "../DataGrid";

const paginationRowsPerPageOptions = [50, 100, 250, 500, 1000];

export default function ListController() {
  const [regionsList, setRegionsList] = useState([]);
  const [region, setRegion] = useState();
  const [provincesList, setProvincesList] = useState([]);
  const [province, setProvince] = useState();
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [themesList, setThemesList] = useState([]);
  const [theme, setTheme] = useState();
  const [toReview, setToReview] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [lastSnapshot, setLastSnapshot] = useState();
  //
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(paginationRowsPerPageOptions[0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [ordering, setOrdering] = useState();
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
    toReview,
    setToReview,
    statusFilter,
    setStatusFilter,
    loading,
    setLoading,
    paginationRowsPerPageOptions,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    ordering,
    setOrdering,
    data,
    setData,
    lastSnapshot
  };

  useEffect(() => {
    const requests = [
      d3Json(apiBaseUrl + "/api/region/"),
      d3Json(apiBaseUrl + "/api/domain/"),
    ];
    Promise.all(requests).then(([regions, domain]) => {
      const unknownRegion = {
        code: 0,
        label: "Unknown location",
        name: "Unknown location",
        centroid: null,
      };
      const _statusFilter = availableStatuses.map((mode) => {
        const statuses = mode.statuses.map((status) => ({
          ...status,
          active: true,
        }));
        return { ...mode, statuses };
      });
      setStatusFilter(_statusFilter);
      setRegionsList([unknownRegion, ...regions]);
      setThemesList(domain.themes);
      setLastSnapshot(domain.last_snapshot);
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
      setMunicipalitiesList([]);
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
    if (toReview)
      queryParams.to_review = encodeURIComponent(toReview.toString());
    if (pageSize) queryParams.page_size = encodeURIComponent(pageSize);
    if (pageNumber) queryParams.page = encodeURIComponent(pageNumber);
    if (ordering) queryParams.ordering = encodeURIComponent(ordering);
    if (statusFilter.length > 0) {
      //current_wlm_state
      const activeWlm = statusFilter
        .find((d) => d.mode === "wlm")
        .statuses.filter((d) => d.active)
        .map((d) => d.code)
        .join(",");
      queryParams.current_wlm_state = activeWlm;
      //current_commons_state
      const activeCommons = statusFilter
        .find((d) => d.mode === "commons")
        .statuses.filter((d) => d.active)
        .map((d) => d.code)
        .join(",");
      queryParams.current_commons_state = activeCommons;
    }
    //
    const temp = [];
    for (const key in queryParams) {
      temp.push(key + "=" + queryParams[key]);
    }
    const searchString = "?" + temp.join("&");
    const request = apiBaseUrl + "/api/monument/" + searchString;
    d3Json(request).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [
    region,
    province,
    municipality,
    theme,
    toReview,
    statusFilter,
    pageSize,
    pageNumber,
    ordering,
  ]);

  return (
    <Container fluid className={classNames(styles.listPage)}>
      <Row>
        <Col lg={3}>
          <ToolsPanel {...componentsData} />
        </Col>
        <Col lg={9}>
          <DataGrid {...componentsData} />
        </Col>
      </Row>
    </Container>
  );
}
