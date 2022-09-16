import { ButtonUI, ButtonGroupUI, DatePickerUI, DropdownUI, DropdownGroupUI } from "./";
import { BsDownload, BsFillPlayFill, BsArrowRepeat } from "react-icons/bs";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";
import WhatsNew from "../WhatsNew";
import AreaChart from "../AreaChart";
import { useMemo, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import ExportTools from "../ExportTools/ExportTools";
const { DateTime } = require("luxon");

export default function ToolbarUI({
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
}) {
	const [show, setShow] = useState(false);
	const startDateItems = useMemo(() => {
		return [
			{
				transferSelection: setStartMonth,
				defaultLabel: "Month",
				selected: startMonth,
				items: dateRanges.months.map((d) => ({ label: d, disabled: false })),
			},
			{
				transferSelection: setStartYear,
				defaultLabel: "Year",
				selected: startYear,
				items: dateRanges.years.map((d) => ({ label: d, disabled: false })),
			},
		];
	}, [startMonth, startYear]);

	const endDateItems = useMemo(() => {
		return [
			{
				transferSelection: setEndMonth,
				defaultLabel: "Month",
				selected: endMonth,
				items: dateRanges.months.map((d) => ({ label: d, disabled: false })),
			},
			{
				transferSelection: setEndYear,
				defaultLabel: "Year",
				selected: endYear,
				items: dateRanges.years.map((d) => ({ label: d, disabled: false })),
			},
		];
	}, [endMonth, endYear]);

	return (
		<div className={classNames(styles.toolBar, "d-flex", "flex-column")}>
			<NavMenu />
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
			<DropdownUI label="Type" items={typologiesList} value={typology} setValue={setTypology} disabled={!typologiesList} />
			{/* <DatePickerUI label="From" min={minDate} max={dateTo} value={dateFrom} transferSelection={setDateFrom} />
			<DatePickerUI label="To" min={dateFrom} max={maxDate} value={dateTo} transferSelection={setDateTo} />
			<p className={classNames("text-small")}>
				{timeStep}
				<br />
				Last database snapshot: {maxDate}
			</p> */}
			{parentData && filterData && <WhatsNew data={parentData} filterData={filterData} setFilterData={setFilterData} />}
			<h6>Timeframe</h6>
			<DropdownUI
				label="View"
				items={timeFrameData.items}
				value={selectedTimeFrame}
				setValue={setSelectedTimeFrame}
				defaultLabel="Select a timeframe"
				disabled={timeFrameData.disabled}
				hideReset={true}
			/>
			{selectedTimeFrame.label !== "Custom interval" && (
				<>
					<p className={classNames("mb-1")}>
						From{" "}
						<Badge bg="lightBlue" text="blue-jeans">
							{dateFrom}
						</Badge>{" "}
						to{" "}
						<Badge bg="lightBlue" text="blue-jeans">
							{dateTo}
						</Badge>
					</p>
				</>
			)}
			{selectedTimeFrame.label === "Custom interval" && (
				<>
					<DropdownGroupUI label="From" items={startDateItems} disabled={selectedTimeFrame.label !== "Custom interval"} />
					<DropdownGroupUI label="To" items={endDateItems} disabled={selectedTimeFrame.label !== "Custom interval"} />
				</>
			)}
			<p className={classNames("text-small")}>{timeStep}</p>

			<h6>Timeline</h6>
			<div className={classNames("d-flex", "justify-content-between")}>
				{/* <ButtonGroupUI
					label="Play"
					items={[
						{ content: <BsFillPlayFill />, onClickAction: (e) => console.log(e) },
						{ content: "0.5X", onClickAction: (e) => console.log(e) },
						{ content: "1X", onClickAction: (e) => console.log(e) },
						{ content: "2X", onClickAction: (e) => console.log(e) },
						{ content: <BsArrowRepeat />, onClickAction: (e) => console.log(e) },
					]}
					disabled={true}
				/> */}
				<ButtonUI label="Save" content={<BsDownload />} onClickAction={() => setShow(true)} disabled={false} />
				<Modal size="xl" centered show={show} onHide={() => setShow(false)}>
					<ExportTools closeFunct={() => setShow(false)} mapData={mapData} />
				</Modal>
			</div>
			{parentData && filterData && <AreaChart data={parentData} filterData={filterData} />}
		</div>
	);
}
