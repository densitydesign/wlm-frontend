import { ButtonUI, ButtonGroupUI, DatePickerUI, DropdownUI } from "./";
import { BsDownload, BsFillPlayFill, BsArrowRepeat } from "react-icons/bs";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";
import { useEffect, useMemo, useState } from "react";

const maxDate = "2022-07-31";

export default function ToolbarUI({
	regions,
	provinces,
	municipalities,
	setSelectedArea,
	typology,
	setTypology,
	typologiesList,
	setDateFrom,
	setDateTo,
}) {
	const [region, setRegion] = useState();
	const [province, setProvince] = useState();
	const [municipality, setMunicipality] = useState();

	const _selected = useMemo(() => {
		if (municipality) {
			// console.log(municipality, province, region);
			return municipality;
		} else if (province) {
			// console.log(province, region);
			return province;
		} else if (region) {
			// console.log(region);
			return region;
		} else {
			// console.log("No area is selected");
			return undefined;
		}
	}, [region, province, municipality]);

	useEffect(() => {
		// console.log("_selected", _selected);
		setSelectedArea(_selected);
	}, [region, province, municipality]);

	return (
		<div className={styles.toolBar}>
			<NavMenu />
			<h6>Monuments</h6>
			<DropdownUI
				label="Region"
				items={regions.items}
				value={region}
				setValue={setRegion}
				// transferSelection={regions.setSelection}
				defaultLabel="Select a region"
				disabled={regions.disabled || province}
			/>
			<DropdownUI
				label="Province"
				items={provinces.items}
				value={province}
				setValue={setProvince}
				defaultLabel="Select a province"
				disabled={provinces.disabled || municipality}
			/>
			<DropdownUI
				label="Municipality"
				items={municipalities.items}
				value={municipality}
				setValue={setMunicipality}
				defaultLabel="Select a municipality"
				disabled={municipalities.disabled || true}
			/>
			<DropdownUI label="Type" items={typologiesList} value={typology} setValue={setTypology} disabled={false} />
			<DatePickerUI label="From" transferSelection={setDateFrom} />
			<DatePickerUI label="To" transferSelection={setDateTo} initialDate={maxDate} />
			<h6>What's new</h6>
			<p>[Recap here]</p>
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
			<p>[Timeline here]</p>
		</div>
	);
}
