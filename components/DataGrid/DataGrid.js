import { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { apiBaseUrl } from "../../utils/fetchData.utils";
import StatusSymbol from "./StatusSymbol";
import { DateTime } from "luxon";

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
  ordering,
  setOrdering,
  data,
  setData,
}) {
  const totalRows = data.count;
  const perPage = pageSize;
  const columns = [
    {
      id: "current_commons_state",
      name: "Commons",
      sortable: false,
      width: "50px",
      selector: (row) => row["current_commons_state"],
      cell: (row) => <StatusSymbol status={row["current_commons_state"]} />,
    },
    {
      id: "current_wlm_state",
      name: "WLM",
      sortable: false,
      width: "50px",
      selector: (row) => row["current_wlm_state"],
      cell: (row) => <StatusSymbol status={row["current_wlm_state"]} />,
    },
    {
      id: "label",
      name: "Label / Q / WLM ID",
      sortable: true,
      width: "30%",
      selector: (row) => row["q_number"],
      cell: (row) => (
        <p className="m-0">
          <a
            href={apiBaseUrl + "/api/monument/by-q/" + row["q_number"]}
            target="_blank"
          >
            {row["label"]}
          </a>{" "}
          /{" "}
          <a
            href={"https://www.wikidata.org/wiki/" + row["q_number"]}
            target="_blank"
          >
            {row["q_number"]}
          </a>
          {row["wlm_id"] && <> / {row["wlm_id"]}</>}
        </p>
      ),
    },
    {
      id: "pictures",
      name: "Pictures",
      sortable: false,
      width: "50px",
      selector: (row) => row["pictures"],
      cell: (row) => {
        return row["pictures"].length;
      },
    },
    // {
    //   id: "municipality_label",
    //   name: "Municipality",
    //   sortable: false,
    //   maxWidth: "150px",
    //   selector: (row) => row["municipality_label"],
    //   // cell: (row) => row,
    // },
    // {
    //   id: "province_label",
    //   name: "Province",
    //   sortable: false,
    //   maxWidth: "150px",
    //   selector: (row) => row["province_label"],
    //   // cell: (row) => row,
    // },
    // {
    //   id: "region_label",
    //   name: "Region",
    //   sortable: false,
    //   maxWidth: "150px",
    //   selector: (row) => row["region_label"],
    //   // cell: (row) => row,
    // },
    {
      id: "location",
      name: "Location",
      sortable: false,
      width: "200px",
      selector: (row) => row["municipality_label"],
      cell: (row) =>
        [
          row["municipality_label"],
          row["province_label"],
          row["region_label"],
        ].join(", "),
    },
    {
      id: "wikidata_creation_date",
      name: "WD Creation",
      sortable: false,
      width: "200px",
      selector: (row) =>
        DateTime.fromISO(row["wikidata_creation_date"]).toLocaleString(),
    },
    {
      id: "wlm_auth_start_date",
      name: "WLM Authorization",
      sortable: true,
      width: "200px",
      selector: (row) =>
        row["wlm_auth_start_date"]
          ? DateTime.fromISO(row["wlm_auth_start_date"]).toLocaleString()
          : null,
    },
    {
      id: "first_wlm_image_date",
      name: "First WLM Pic",
      sortable: true,
      width: "200px",
      selector: (row) =>
        row["first_wlm_image_date"]
          ? DateTime.fromISO(row["first_wlm_image_date"]).toLocaleString()
          : null,
    },
    {
      id: "first_commons_image_date",
      name: "First Commons Pic",
      sortable: true,
      width: "200px",
      selector: (row) =>
        row["first_commons_image_date"]
          ? DateTime.fromISO(row["first_commons_image_date"]).toLocaleString()
          : null,
    },
    // {
    //   id: "wlm_id",
    //   name: "WLM ID",
    //   sortable: true,
    //   maxWidth: "150px",
    //   selector: (row) => row["wlm_id"],
    //   // cell: (row) => row,
    // },
  ];
  const handleSort = async (column, sortDirection) => {
    if (column?.id) {
      /// reach out to some API and get new data using or sortField and sortDirection
      // e.g. https://api.github.com/search/repositories?q=blog&sort=${column.sortField}&order=${sortDirection}

      console.log(column, sortDirection);
      const parameter = sortDirection === "asc" ? column.id : "-" + column.id;
      setOrdering(parameter);
    }
  };
  return (
    <DataTable
      title="Monuments"
      columns={columns}
      data={data.results}
      progressPending={loading}
      pagination
      paginationServer
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      paginationTotalRows={totalRows}
      paginationPerPage={perPage}
      onChangeRowsPerPage={setPageSize}
      onChangePage={setPageNumber}
      sortServer
      onSort={handleSort}
    />
  );
}
