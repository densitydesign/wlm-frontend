import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

export default function DataGrid({
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
}) {
  const totalRows = data.count;
  const perPage = pageSize;
  const columns = [
    "current_commons_state",
    "current_wlm_state",
    "q_number",
    "label",
    "municipality_label",
    "province_label",
    "region_label",
    "wlm_id",
  ].map((d) => ({
    name: d,
    selector: (row) => row[d],
  }));
  return (
    <DataTable
      title="Monuments"
      columns={columns}
      data={data.results}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={setPageSize}
      onChangePage={setPageNumber}
    />
  );
}
