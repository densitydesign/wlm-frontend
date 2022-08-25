const { DateTime, Interval } = require("luxon");
import { json } from "d3";

const apiBaseUrl = "https://wlm.inmagik.com";
const cacheMode = "force-cache";

const fetchData = ({ selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo }, setDataValue, setParentDataValue, setIsFetching, setTimeStep) => {
	setIsFetching(true);
	// console.log("fetching data...");
	let dataUrl = apiBaseUrl;
	let parentDataUrl = apiBaseUrl;

	if (selectedMunicipality) {
		// in municipality
		// console.log("municipality", selectedMunicipality.label, "aggregated values");
		dataUrl += `/api/municipality/${selectedMunicipality.code}/wlm/`;
		parentDataUrl += `/api/municipality/${selectedMunicipality.code}/wlm/`;
	} else if (selectedProvince) {
		// municipalities in province
		// console.log("municipalities in", selectedProvince.label, "province");
		dataUrl += `/api/province/${selectedProvince.code}/wlm-areas/`;
		parentDataUrl += `/api/province/${selectedProvince.code}/wlm/`;
	} else if (selectedRegion) {
		// provinces in region
		// console.log("provinces in", selectedRegion.label, "region");
		dataUrl += `/api/region/${selectedRegion.code}/wlm-areas/`;
		parentDataUrl += `/api/region/${selectedRegion.code}/wlm/`;
	} else {
		// no area selected, do all italian regions
		console.log("All Italian regions");
		// dataUrl = undefined;
		dataUrl += `/api/region/wlm-regions/`;
		parentDataUrl += `/api/region/wlm-aggregate`;
	}

	if (dataUrl) {
		const _df = DateTime.fromISO(dateFrom);
		const _dt = DateTime.fromISO(dateTo);
		const i = Interval.fromDateTimes(_df, _dt);
		let max_steps = 15,
			step_size,
			step_unit;
		if (Math.ceil(i.length("days") / 1) <= 31) {
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
		const timeStepMessage = ["Showing ", Math.ceil(i.length(step_unit) / step_size), " history points (every ", step_size, " ", step_unit, ")", ].join("")
		setTimeStep(timeStepMessage)

		const parameters = { step_size, step_unit };
		parameters.date_from = dateFrom;
		parameters.date_to = dateTo;
		if (typology) parameters.theme = typology.id;
		parameters.format = "json";

		const searchParams = new URLSearchParams(parameters).toString();
		dataUrl += "?" + searchParams;
		parentDataUrl += "?" + searchParams;

		Promise.all([
			json(dataUrl, {
				cache: cacheMode,
			}),
			json(parentDataUrl, {
				cache: cacheMode,
			}),
		]).then(([data, parentData]) => {
			// filter data if later than date_to
			// data.data.forEach((area) => {
			// 	const newHistory = area.history.filter((h) => {
			// 		const date = h.date;
			// 		return DateTime.fromISO(date) <= _dt;
			// 	});
			// 	area.history = newHistory;
			// });
			// parentData.data.forEach((area) => {
			// 	const newHistory = area.history.filter((h) => {
			// 		const date = h.date;
			// 		return DateTime.fromISO(date) <= _dt;
			// 	});
			// 	area.history = newHistory;
			// });
			setDataValue(data);
			setParentDataValue(parentData);
			setIsFetching(false);
		});
	}
};

export { apiBaseUrl, fetchData, cacheMode };
