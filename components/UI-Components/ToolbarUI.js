import { ButtonUI, ButtonGroupUI, DatePickerUI, DropdownUI } from "./";
import { BsDownload, BsFillPlayFill, BsArrowRepeat } from "react-icons/bs";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";

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
	
	dateFrom,
	setDateFrom,

	dateTo,
	setDateTo,
}) {

	return (
		<div className={styles.toolBar}>
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
			{/* <DropdownUI label="Type" items={typologiesList} value={typology} setValue={setTypology} disabled={false} /> */}
			<DatePickerUI label="From" value={dateFrom} transferSelection={setDateFrom} />
			<DatePickerUI label="To" value={dateTo} transferSelection={setDateTo} />
			<h6>What&apos;s new</h6>
			<p>[Recap will go here]</p>
			<h6>Timeline</h6>
			<div className={classNames("d-flex", "justify-content-between")}>
				<ButtonGroupUI
					label="Play"
					items={[
						{ content: <BsFillPlayFill />, onClickAction: (e) => console.log(e) },
						{ content: "0.5X", onClickAction: (e) => console.log(e) },
						{ content: "1X", onClickAction: (e) => console.log(e) },
						{ content: "2X", onClickAction: (e) => console.log(e) },
						{ content: <BsArrowRepeat />, onClickAction: (e) => console.log(e) },
					]}
				/>
				<ButtonUI label="Save" content={<BsDownload />} />
			</div>
			<p>[Timeline will go here]</p>
		</div>
	);
}
