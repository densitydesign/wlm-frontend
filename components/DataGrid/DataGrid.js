import DataTable, { defaultThemes } from "react-data-table-component";
import { apiBaseUrl } from "../../utils/fetchData.utils";
import StatusSymbol from "./StatusSymbol";
import { DateTime } from "luxon";
import styles from "./DataGrid.module.scss";
import classNames from "classnames";

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
  const totalRows = data?.count || 0;
  const perPage = pageSize;
  const columns = [
    {
      id: "current_commons_state",
      name: "Commons",
      sortable: false,
      cell: (row) => <StatusSymbol status={row["current_commons_state"]} />,
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    {
      id: "current_wlm_state",
      name: "WLM",
      sortable: false,
      cell: (row) => <StatusSymbol status={row["current_wlm_state"]} />,
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    {
      id: "label",
      name: "Name",
      sortable: true,
      cell: (row) => (
        <a
          className="text-truncate"
          href={"https://www.wikidata.org/wiki/" + row["q_number"]}
          target="_blank"
          rel="noreferrer"
        >
          {row["label"]}
        </a>
      ),
    },
    {
      id: "q_number",
      name: "Q Number",
      sortable: true,
      cell: (row) => (
        <a
          className="text-truncate"
          href={"https://www.wikidata.org/wiki/" + row["q_number"]}
          target="_blank"
          rel="noreferrer"
        >
          {row["q_number"]}
        </a>
      ),
    },
    {
      id: "wlm_id",
      name: "WLM ID",
      sortable: true,
      selector: (row) => row["wlm_id"],
    },
    {
      id: "pictures",
      name: "Pictures",
      sortable: false,
      selector: (row) => row["pictures"],
      cell: (row) => {
        return row["pictures"].length;
      },
    },
    {
      id: "municipality_label",
      name: "Municipality",
      sortable: false,
      maxWidth: "150px",
      selector: (row) => row["municipality_label"],
      // cell: (row) => row,
    },
    {
      id: "province_label",
      name: "Province",
      sortable: false,
      maxWidth: "150px",
      selector: (row) => row["province_label"],
      // cell: (row) => row,
    },
    {
      id: "region_label",
      name: "Region",
      sortable: false,
      maxWidth: "150px",
      selector: (row) => row["region_label"],
      // cell: (row) => row,
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
  ];
  const handleSort = async (column, sortDirection) => {
    if (column?.id) {
      /// reach out to some API and get new data using or sortField and sortDirection
      // e.g. https://api.github.com/search/repositories?q=blog&sort=${column.sortField}&order=${sortDirection}
      const parameter = sortDirection === "asc" ? column.id : "-" + column.id;
      setOrdering(parameter);
    }
  };
  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customStyles = {
    table: {
      style: {
        // color: theme.text.primary,
        backgroundColor: "transparent",
      },
    },
    rows: {
      style: {
        minHeight: "2.5rem", // override the row height
        "&:nth-child(even)": {
          backgroundColor: "#f9f9f9",
        },
      },
    },
    headRow: {
      style: {
        backgroundColor: "var(--bs-lightBlue)",
        borderRadius: "3px 3px 0 0",
        minHeight: "30.91px",
        color: "var(--bs-blue-jeans)",
        fontWeight: 700,
      },
    },
    headCells: {
      style: {
        paddingLeft: "0.4rem", // override the cell padding for head cells
        paddingRight: "0.4rem",
        '&[data-column-id="current_commons_state"], &[data-column-id="current_wlm_state"]':
          {
            maxWidth: "80px",
          },
      },
    },
    cells: {
      style: {
        paddingLeft: "0.4rem", // override the cell padding for data cells
        paddingRight: "0.4rem",
        '&[data-column-id="current_commons_state"], &[data-column-id="current_wlm_state"]':
          {
            maxWidth: "80px",
          },
      },
    },
  };
  return (
    <div className={classNames(styles.dataGridContainer)}>
      <DataTable
        // title="Monuments"
        className={styles.dataGrid}
        columns={columns}
        data={data?.results || []}
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
        customStyles={customStyles}
        fixedHeader={true}
        fixedHeaderScrollHeight={"calc(100% - 56px)"}
      />
    </div>
  );
}
