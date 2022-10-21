import {
  ButtonUI,
  ButtonGroupUI,
  // DatePickerUI,
  DropdownUI,
  DropdownGroupUI,
  SwitchUI,
} from "./";
import {
  BsExclamationTriangleFill,
  BsDownload,
  BsFillPlayFill,
  BsArrowRepeat,
} from "react-icons/bs";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";
import WhatsNew from "../WhatsNew";
import AreaChart from "../AreaChart";
import { useMemo, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import ExportTools from "../ExportTools/ExportTools";
import { DateTime } from "luxon";
import { useRouter } from "next/router";

import QuickLinks from "../QuickLinks/QuickLinks";

export default function ToolbarUI({
  explorationModes,
  explorationMode,
  setExplorationMode,

  regions,
  selectedRegion,
  setSelectedRegion,

  provinces,
  selectedProvince,
  setSelectedProvince,

  municipalities,
  selectedMunicipality,
  setSelectedMunicipality,

  typologiesList,
  typology,
  setTypology,

  minDate,
  dateFrom,
  setDateFrom,

  maxDate,
  dateTo,
  setDateTo,

  timeStep,

  timeFrameData,
  selectedTimeFrame,
  setSelectedTimeFrame,

  startMonth,
  setStartMonth,
  startYear,
  setStartYear,
  endMonth,
  setEndMonth,
  endYear,
  setEndYear,
  dateRanges,

  parentData,
  filterData,
  setFilterData,

  mapData,
  //
  showDelta,
  setShowDelta,
}) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const startDateItems = useMemo(() => {
    if (!startMonth || !startYear || !endMonth || !endYear) {
      // console.log("startDateItems, missing something")
      // console.log(startMonth?.label, startYear?.label, endMonth?.label, endYear?.label);
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
      // console.log("endDateItems, missing something")
      // console.log(startMonth?.label, startYear?.label, endMonth?.label, endYear?.label);
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
    <div className={classNames(styles.toolBar, "d-flex", "flex-column")}>
      <NavMenu page="map" />
      <QuickLinks />
      <DropdownUI
        label="Explore"
        items={explorationModes}
        value={explorationMode}
        setValue={setExplorationMode}
        hideReset={true}
      />
      <h6>Monuments</h6>
      <DropdownUI
        label="Region"
        items={regions.items}
        value={selectedRegion}
        setValue={setSelectedRegion}
        // transferSelection={regions.setSelection}
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
      />
      <DropdownUI
        label="Type"
        items={typologiesList}
        value={typology}
        setValue={setTypology}
        disabled={!typologiesList}
      />
      {/* <DatePickerUI label="From" min={minDate} max={dateTo} value={dateFrom} transferSelection={setDateFrom} />
			<DatePickerUI label="To" min={dateFrom} max={maxDate} value={dateTo} transferSelection={setDateTo} />
			<p className={classNames("text-small")}>
				{timeStep}
				<br />
				Last database snapshot: {maxDate}
			</p> */}
      <h6>Time frame</h6>
      <DropdownUI
        label="View"
        items={timeFrameData.items}
        value={selectedTimeFrame}
        setValue={setSelectedTimeFrame}
        defaultLabel="Select a time frame"
        disabled={timeFrameData.disabled}
        hideReset={true}
      />
      {selectedTimeFrame.label !== "Custom interval" && (
        <>
          <p className={classNames("text-small", "mb-2")}>
            A slice is{" "}
            <Badge bg="light-gray" text="dark">
              {timeStep || "..."}
            </Badge>{" "}
            from{" "}
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
      {selectedTimeFrame.label === "Custom interval" && (
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
          <span className={classNames("d-flex", "align-items-center", "mb-2")}>
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
          <p className={classNames("text-small", "mb-2")}>
            A slice is{" "}
            <Badge bg="light-gray" text="dark">
              {timeStep}
            </Badge>
          </p>
        </>
      )}
      {parentData && filterData && (
        <>
          <WhatsNew
            data={parentData}
            filterData={filterData}
            setFilterData={setFilterData}
            showDelta={showDelta}
          />
          <SwitchUI
            className={classNames("text-small", "mb-2")}
            label="Show increment only"
            checked={showDelta}
            setChecked={setShowDelta}
            disabled={filterData.filter((d) => d.active).length !== 1}
          />
        </>
      )}
      {true && (
        <>
          <ButtonUI
            label="Save"
            content={<BsDownload />}
            onClickAction={() => setShow(true)}
            disabled={false}
          />
          <Modal size="xl" centered show={show} onHide={() => setShow(false)}>
            <ExportTools closeFunct={() => setShow(false)} mapData={mapData} />
          </Modal>
        </>
      )}
      {/* <div className={classNames("d-flex", "justify-content-between")}>
        <ButtonGroupUI
					label="Play"
					items={[
						{ content: <BsFillPlayFill />, onClickAction: (e) => console.log(e) },
						{ content: "0.5X", onClickAction: (e) => console.log(e) },
						{ content: "1X", onClickAction: (e) => console.log(e) },
						{ content: "2X", onClickAction: (e) => console.log(e) },
						{ content: <BsArrowRepeat />, onClickAction: (e) => console.log(e) },
					]}
					disabled={true}
				/>
      </div> */}
      {parentData && filterData && (
        <AreaChart
          data={parentData}
          filterData={filterData}
          showDelta={showDelta}
        />
      )}
    </div>
  );
}
