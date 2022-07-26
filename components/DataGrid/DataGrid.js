import DataTable, { defaultThemes } from "react-data-table-component";
import StatusSymbol from "./StatusSymbol";
import { DateTime } from "luxon";
import styles from "./DataGrid.module.scss";
import classNames from "classnames";
import { Fetching } from "../Fetching";

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
      id: "current_wlm_state",
      name: "WLM Status",
      sortable: false,
      cell: (row) => <StatusSymbol status={row["current_wlm_state"]} />,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      id: "current_commons_state",
      name: "Commons Status",
      sortable: false,
      cell: (row) => <StatusSymbol status={row["current_commons_state"]} />,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    {
      id: "label",
      name: "Name\n(OSM link)",
      sortable: true,
      cell: (row) => {
        if (row["position"]?.coordinates) {
          return (
            <a
              className="text-truncate"
              href={`https://www.openstreetmap.org/?mlat=${row["position"].coordinates[1]}&mlon=${row["position"].coordinates[0]}#map=16/${row["position"].coordinates[1]}/${row["position"].coordinates[0]}`}
              target="_blank"
              rel="noreferrer"
            >
              {row["label"]}
            </a>
          );
        } else {
          return <>{row["label"]}</>;
        }
      },
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
      id: "pictures_wlm_count",
      name: "WLM\nImages",
      sortable: true,
      cell: (row) => {
        if (row["pictures_wlm_count"].toString() !== "0") {
          return (
            <a
              className="text-truncate"
              // href={"https://www.wikidata.org/wiki/" + row["q_number"] + "#P18"}
              href={`https://commons.wikimedia.org/w/index.php?search=%22${row["wlm_id"]}%22+"Wiki+Loves+Monuments+Italia"&title=Special:MediaSearch&go=Go&type=image`}
              target="_blank"
              rel="noreferrer"
            >
              {row["pictures_wlm_count"]}
            </a>
          );
        } else {
          return row["pictures_wlm_count"];
        }
      },
    },
    {
      id: "pictures_commons_count",
      name: "Wikidata\nImages",
      sortable: true,
      cell: (row) => {
        if (row["pictures_commons_count"].toString() !== "0") {
          return (
            <a
              className="text-truncate"
              href={"https://www.wikidata.org/wiki/" + row["q_number"] + "#P18"}
              target="_blank"
              rel="noreferrer"
            >
              {row["pictures_commons_count"]}
            </a>
          );
        } else {
          return row["pictures_commons_count"];
        }
      },
    },
    {
      id: "municipality_label",
      name: "Municipality",
      sortable: false,
      maxWidth: "150px",
      selector: (row) => row["municipality_label"],
    },
    {
      id: "province_label",
      name: "Province",
      sortable: false,
      maxWidth: "150px",
      selector: (row) => row["province_label"],
    },
    {
      id: "region_label",
      name: "Region",
      sortable: false,
      maxWidth: "150px",
      selector: (row) => row["region_label"],
    },
    {
      id: "first_revision",
      name: "Creation Date\non Wikidata",
      sortable: true,
      width: "120px",
      selector: (row) =>
        row["wikidata_creation_date"]
          ? DateTime.fromISO(row["wikidata_creation_date"]).toLocaleString()
          : null,
    },
    {
      id: "wlm_auth_start_date",
      name: "In WLM Contest\nSince",
      sortable: true,
      width: "150px",
      selector: (row) =>
        row["wlm_auth_start_date"]
          ? DateTime.fromISO(row["wlm_auth_start_date"]).toLocaleString()
          : null,
    },
    {
      id: "approved_by",
      name: "Approved by",
      sortable: true,
      width: "150px",
      selector: (row) => {
        const approvedByArr = JSON.parse(
          row["approved_by"].replaceAll("'", '"')
        );
        return approvedByArr.map((d) => (
          <a
            key={d}
            className="text-truncate"
            href={"https://www.wikidata.org/wiki/" + d}
            target="_blank"
            rel="noreferrer"
          >
            {d}
          </a>
        ));
      },
    },
    {
      id: "first_wlm_image_date",
      name: "First\nWLM Image",
      sortable: true,
      width: "150px",
      selector: (row) =>
        row["first_wlm_image_date"]
          ? DateTime.fromISO(row["first_wlm_image_date"]).toLocaleString()
          : null,
    },
    {
      id: "most_recent_wlm_image_date",
      name: "Most Recent\nWLM Image",
      sortable: true,
      width: "150px",
      selector: (row) =>
        row["most_recent_wlm_image_date"]
          ? DateTime.fromISO(row["most_recent_wlm_image_date"]).toLocaleString()
          : null,
    },
    {
      id: "first_commons_image_date",
      name: "First\nCommons Image",
      sortable: true,
      width: "150px",
      selector: (row) =>
        row["first_commons_image_date"]
          ? DateTime.fromISO(row["first_commons_image_date"]).toLocaleString()
          : null,
    },
    {
      id: "most_recent_commons_image_date",
      name: "Most Recent\nCommons Image",
      sortable: true,
      width: "150px",
      selector: (row) =>
        row["most_recent_commons_image_date"]
          ? DateTime.fromISO(
              row["most_recent_commons_image_date"]
            ).toLocaleString()
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
    noData: {
      style: {
        height: "100%",
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
        borderRadius: "4px 4px 0 0",
        // minHeight: "30.91px",
        color: "var(--bs-blue-jeans)",
        fontWeight: 700,
        // whiteSpace: "pre-wrap"
      },
    },
    headCells: {
      style: {
        paddingLeft: "0.4rem", // override the cell padding for head cells
        paddingRight: "0.4rem",
        '&[data-column-id="label"]': {
          minWidth: "250px",
        },
        div: {
          whiteSpace: "pre-wrap",
        },
        '&[data-column-id="current_commons_state"], &[data-column-id="current_wlm_state"]':
          {
            minWidth: "78px",
            maxWidth: "78px",
            display: "flex",
            justifyContent: "center",
            div: {
              textAlign: "center",
            },
          },
      },
    },
    cells: {
      style: {
        paddingLeft: "0.4rem", // override the cell padding for data cells
        paddingRight: "0.4rem",
        '&[data-column-id="label"]': {
          minWidth: "250px",
        },
        '&[data-column-id="current_commons_state"], &[data-column-id="current_wlm_state"]':
          {
            minWidth: "78px",
            maxWidth: "78px",
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
