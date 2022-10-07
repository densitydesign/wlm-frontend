import { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import StatusSymbol from "./StatusSymbol";

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
  paginationRowsPerPageOptions,
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
    {
      name: "Commons status",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row["current_commons_state"],
      cell: (row) => <StatusSymbol status={row["current_commons_state"]} />,
    },
    {
      name: "WLM status",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row["current_wlm_state"],
      cell: (row) => <StatusSymbol status={row["current_wlm_state"]} />,
    },
    {
      name: "Monument",
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row["q_number"],
      cell: (row) => (
        <a
          href={"https://www.wikidata.org/wiki/" + row["q_number"]}
          target="_blank"
        >
          {row["q_number"]} {row["label"]}
        </a>
      ),
    },
    {
      name: "pictures",
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row["pictures"],
      cell: (row) => {
        return row["pictures"].length;
      },
    },
    {
      name: "municipality_label",
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row["municipality_label"],
      // cell: (row) => row,
    },
    {
      name: "province_label",
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row["province_label"],
      // cell: (row) => row,
    },
    {
      name: "region_label",
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row["region_label"],
      // cell: (row) => row,
    },
    {
      name: "wlm_id",
      sortable: true,
      maxWidth: "300px",
      selector: (row) => row["wlm_id"],
      // cell: (row) => row,
    },
  ];
  const customStyles = {
    header: {
      style: {
        maxHeight: "1rem",
      },
    },
    headRow: {
      style: {
        maxHeight: "1rem",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        maxHeight: "1rem",
        padding: 0,
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        padding: 0,
        // "&:not(:last-of-type)": {
        //   borderRightStyle: "solid",
        //   borderRightWidth: "1px",
        //   borderRightColor: defaultThemes.default.divider.default,
        // },
      },
    },
  };
  return (
    <DataTable
      title="Monuments"
      columns={columns}
      data={data.results}
      // customStyles={customStyles}
      progressPending={loading}
      pagination
      paginationServer
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      paginationTotalRows={totalRows}
      paginationPerPage={perPage}
      onChangeRowsPerPage={setPageSize}
      onChangePage={setPageNumber}
    />
  );
}
