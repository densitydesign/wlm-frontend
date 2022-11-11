import classNames from "classnames";
import { DropdownUI, DropdownGroupUI } from "../UI-Components";
import { Badge } from "react-bootstrap";
import styles from "./MapSidebar.module.scss";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { BsExclamationTriangleFill } from "react-icons/bs";
import AreaChart from "../AreaChart";
import StatusesFilterComponent from "../StatusesFilterComponent";
export default function MapSidebar({
  explorationMode,
  explorationModes,
  setExplorationMode,
  filterData,
  setFilterData,
  showDelta,
  setShowDelta,
  typology,
  setTypology,
  selectedTimeFrame,
  setSelectedTimeFrame,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  selectedRegion,
  setSelectedRegion,
  selectedProvince,
  setSelectedProvince,
  selectedMunicipality,
  setSelectedMunicipality,
  // data for UI
  isFetching,
  setIsFetching,
  regionsList,
  setRegionsList,
  regions,
  provincesList,
  setProvincesList,
  provinces,
  municipalitiesList,
  setMunicipalitiesList,
  municipalities,
  typologiesList,
  setTypologiesList,
  timeFrameData,
  dateRanges,
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  timeStep,
  setTimeStep,
  startMonth,
  setStartMonth,
  startYear,
  setStartYear,
  endMonth,
  setEndMonth,
  endYear,
  setEndYear,
  // data for visualization
  data,
  setData,
  lvl4,
  setLvl4,
  lvl6,
  setLvl6,
  lvl8,
  setLvl8,
}) {
  const startDateItems = useMemo(() => {
    if (!startMonth || !startYear || !endMonth || !endYear) {
      return;
    }

    const endDate = DateTime.fromObject({
      year: +endYear?.label,
      month: +endMonth?.label,
    }).endOf("month");
    const _maxDate = DateTime.fromISO(maxDate);

    return [
      {
        transferSelection: setStartMonth,
        defaultLabel: "Month",
        selected: startMonth,
        items: dateRanges.months.map((d) => {
          const startDate = DateTime.fromObject({
            year: +startYear?.label,
            month: +d,
          }).startOf("month");
          const isBefore = startDate <= endDate;
          return { label: d, disabled: !isBefore };
        }),
      },
      {
        transferSelection: setStartYear,
        defaultLabel: "Year",
        selected: startYear,
        items: dateRanges.years.map((d) => {
          const startDate = DateTime.fromObject({
            year: +d,
            month: +startMonth?.label,
          }).startOf("month");
          const isBefore = startDate <= endDate && startDate <= _maxDate;
          return { label: d, disabled: !isBefore };
        }),
      },
    ];
  }, [startMonth, startYear, endMonth, endYear]);

  const endDateItems = useMemo(() => {
    if (!startMonth || !startYear || !endMonth || !endYear) {
      return;
    }

    const startDate = DateTime.fromObject({
      year: +startYear?.label,
      month: +startMonth?.label,
    }).startOf("month");
    const _maxDate = DateTime.fromISO(maxDate);

    return [
      {
        transferSelection: setEndMonth,
        defaultLabel: "Month",
        selected: endMonth,
        items: dateRanges.months.map((d) => {
          const endDate = DateTime.fromObject({
            year: +endYear?.label,
            month: +d,
          }).startOf("month");
          const isAfter = endDate >= startDate && endDate <= _maxDate;
          return { label: d, disabled: !isAfter };
        }),
      },
      {
        transferSelection: setEndYear,
        defaultLabel: "Year",
        selected: endYear,
        items: dateRanges.years.map((d) => {
          const endDate = DateTime.fromObject({
            year: +d,
            month: +endMonth?.label,
          }).startOf("month");
          const isAfter = endDate >= startDate;
          return { label: d, disabled: !isAfter };
        }),
      },
    ];
  }, [startMonth, startYear, endMonth, endYear]);

  return (
    <div className={classNames("d-flex", "flex-column")}>
      <DropdownUI
        label="Explore"
        items={explorationModes}
        value={explorationMode}
        setValue={setExplorationMode}
        hideReset={true}
        boldLabel
        classNameProp="mb-3"
      />
      <span className="text-uppercase" style={{ fontWeight: 600 }}>
        Monuments locations
      </span>
      <DropdownUI
        label="Region"
        items={regions.items}
        value={selectedRegion}
        setValue={setSelectedRegion}
        defaultLabel="Select a region"
        disabled={regions.disabled || selectedProvince}
      />
      <DropdownUI
        label="Province"
        items={provinces.items}
        value={selectedProvince}
        setValue={setSelectedProvince}
        defaultLabel="Select a province"
        disabled={provinces.disabled || selectedMunicipality}
      />
      <DropdownUI
        label="Municipality"
        items={municipalities.items}
        value={selectedMunicipality}
        setValue={setSelectedMunicipality}
        defaultLabel="Select a municipality"
        disabled={municipalities.disabled}
        classNameProp="mb-3"
      />
      <DropdownUI
        label="Monuments type"
        items={typologiesList}
        value={typology}
        setValue={setTypology}
        disabled={!typologiesList}
        boldLabel
        classNameProp="mb-3"
      />
      <div className="mb-3 TIME FRAME">
        <DropdownUI
          label="Time frame"
          items={timeFrameData.items}
          value={selectedTimeFrame}
          setValue={setSelectedTimeFrame}
          defaultLabel="Select a time frame"
          disabled={timeFrameData.disabled}
          hideReset={true}
          boldLabel
        />
        {selectedTimeFrame?.label !== "Custom interval" && (
          <>
            <p className={classNames("text-small", "mb-2")}>
              From{" "}
              <Badge bg="light-gray" text="dark">
                {dateFrom || "..."}
              </Badge>{" "}
              to{" "}
              <Badge bg="light-gray" text="dark">
                {dateTo || "..."}
              </Badge>
            </p>
          </>
        )}
        {selectedTimeFrame?.label === "Custom interval" && (
          <>
            <div className={classNames("d-flex", "align-items-center")}>
              <DropdownGroupUI
                className={classNames(styles.small)}
                label="From"
                items={startDateItems}
                disabled={selectedTimeFrame.label !== "Custom interval"}
              />
              <DropdownGroupUI
                className={classNames(styles.small, "ms-1")}
                label="to"
                items={endDateItems}
                disabled={selectedTimeFrame.label !== "Custom interval"}
              />
            </div>
            <span
              className={classNames("d-flex", "align-items-center", "mb-2")}
            >
              <BsExclamationTriangleFill
                className={classNames("me-2", "mb-1")}
                style={{ color: "var(--bs-interactive)" }}
              />
              <p className={classNames("text-small", "mb-0")}>
                By selecting custom dates,
                <br />
                data retrieval may take several minutes
              </p>
            </span>
          </>
        )}

        <div className="mb-2">
          <AreaChart
            data={data?.parentData}
            filterData={filterData}
            showDelta={showDelta}
            timeStep={timeStep}
            isFetching={isFetching}
          />
        </div>

        <span className="text-uppercase mb-3" style={{ fontWeight: 600 }}>
          Monuments Status
        </span>
        {data && filterData && (
          <StatusesFilterComponent
            data={data.parentData}
            filterData={filterData}
            setFilterData={setFilterData}
            showDelta={showDelta}
            setShowDelta={setShowDelta}
          />
        )}
        {!data || (!filterData && <p>Loading...</p>)}
      </div>
    </div>
  );
}
