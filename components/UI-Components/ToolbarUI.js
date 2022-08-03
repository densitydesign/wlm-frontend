import { ButtonUI, ButtonGroupUI, DatePickerUI, DropdownUI } from "./";
import { BsDownload } from "react-icons/bs";

export default function ToolbarUI({regionsList, provincesList, municipalitiesList}) {
	return (
		<>
			<DropdownUI label="Theme" defaultLabel="All monuments" />
			<DropdownUI items={regionsList} defaultLabel="Select a region" />
			<DropdownUI items={provincesList} defaultLabel="Select a province" />
			<DropdownUI items={municipalitiesList} defaultLabel="Select a municipality" />
			<DatePickerUI label="From" />
			<DatePickerUI label="To" />
			<strong>ButtonGroup</strong>
      <ButtonGroupUI label="Play" />
			<ButtonUI label="Save" content={<BsDownload />} />
		</>
	);
}
