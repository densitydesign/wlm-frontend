const { DateTime, Interval } = require("luxon");
import { json } from "d3";

const apiBaseUrl = "https://wlm.inmagik.com";

const fetchData = ({ selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo }, setState) => {
	// console.log("fetching data...");
	let dataUrl = apiBaseUrl;

	if (selectedMunicipality) {
		// in municipality
		// console.log("municipality", selectedMunicipality.label, "aggregated values");
		dataUrl += `/api/municipality/${selectedMunicipality.code}/wlm/`;
	} else if (selectedProvince) {
		// municipalities in province
		// console.log("municipalities in", selectedProvince.label, "province");
		dataUrl += `/api/province/${selectedProvince.code}/wlm-areas/`;
	} else if (selectedRegion) {
		// provinces in region
		// console.log("provinces in", selectedRegion.label, "region");
		dataUrl += `/api/region/${selectedRegion.code}/wlm-areas/`;
	} else {
		// no area selected, do all italian regions
		console.log("all Italian regions");
		console.info("No endopoint for retrieving all italian regions at once");
		setState({
			data: [],
			extent: [
				{
					label: "onWIki",
					value: [0, 1302],
				},
				{
					label: "inContest",
					value: [0, 365],
				},
				{
					label: "photographed",
					value: [0, 324],
				},
			],
		});
		dataUrl = undefined;
	}

	if (dataUrl) {
		const _df = DateTime.fromISO(dateFrom);
		const _dt = DateTime.fromISO(dateTo);
		const i = Interval.fromDateTimes(_df, _dt);
		let max_steps = 30,
			step_size,
			step_unit;
		if (Math.ceil(i.length("days") / 1) <= max_steps) {
			step_unit = "days";
			step_size = 1;
		} else if (Math.ceil(i.length("days") / 5) <= max_steps) {
			step_unit = "days";
			step_size = 5;
		} else if (Math.ceil(i.length("days") / 10) <= max_steps) {
			step_unit = "days";
			step_size = 10;
		} else if (Math.ceil(i.length("months") / 1) <= max_steps) {
			step_unit = "months";
			step_size = 1;
		} else if (Math.ceil(i.length("months") / 3) <= max_steps) {
			step_unit = "months";
			step_size = 3;
		} else if (Math.ceil(i.length("months") / 4) <= max_steps) {
			step_unit = "months";
			step_size = 4;
		} else if (Math.ceil(i.length("months") / 6) <= max_steps) {
			step_unit = "months";
			step_size = 6;
		} else {
			step_unit = "years";
			step_size = 1;
		}

		// console.log("Requesting an aggregation every", step_size, step_unit, "makes", Math.ceil(i.length(step_unit) / step_size), "history points");

		const parameters = { step_size, step_unit };
		parameters.date_from = dateFrom;
		parameters.date_to = dateTo;
		if (typology) parameters.typology = typology.label;
		parameters.format = "json";

		const searchParams = new URLSearchParams(parameters).toString();
		dataUrl += "?" + searchParams;

		return json(dataUrl).then((data) => {
			setState(data);
		});
	}
};

export { apiBaseUrl, fetchData };
