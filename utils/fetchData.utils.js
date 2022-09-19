const { DateTime, Interval } = require("luxon");
import { json } from "d3";

const apiBaseUrl = "https://wlm.inmagik.com";
const dataCacheMode = "force-cache";
const geoCacheMode = "force-cache";

const timeFrameData = {
	items: [
		{
			label: "Latest 7 days",
			getDateRange: (dateTo) => {
				const _dt = DateTime.fromISO(dateTo);
				const _dtISO = _dt.toISO().split("T")[0];
				const _df = _dt.minus({ days: 6 });
				const _dfISO = _df.toISO().split("T")[0];
				return [_dfISO, _dtISO];
			},
		},
		{
			label: "Latest 30 days",
			getDateRange: (dateTo) => {
				const _dt = DateTime.fromISO(dateTo);
				const _dtISO = _dt.toISO().split("T")[0];
				const _df = _dt.minus({ days: 29 });
				const _dfISO = _df.toISO().split("T")[0];
				return [_dfISO, _dtISO];
			},
		},
		{
			label: "Latest 12 months",
			getDateRange: (dateTo) => {
				const _dt = DateTime.fromISO(dateTo).endOf("month");
				const _dtISO = _dt.toISO().split("T")[0];
				const _df = _dt.minus({ months: 11 }).startOf("month");
				const _dfISO = _df.toISO().split("T")[0];
				return [_dfISO, _dtISO];
			},
		},
		{
			label: "Latest 5 years",
			getDateRange: (dateTo) => {
				const _dt = DateTime.fromISO(dateTo).endOf("year");
				const _dtISO = _dt.toISO().split("T")[0];
				const _df = _dt.minus({ years: 4 }).startOf("year");
				const _dfISO = _df.toISO().split("T")[0];
				return [_dfISO, _dtISO];
			},
		},
		{
			label: "Custom interval",
			getDateRange: (dateFrom, dateTo) => {
				console.log(dateFrom, dateTo);
			},
		},
	],
	disabled: false,
};

const dateRanges = {
	months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
	monthsTxt: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
};

const fetchData = (
	{ selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo },
	setDataValue,
	setParentDataValue,
	setIsFetching,
	setTimeStep
) => {
	setIsFetching(true);
	// console.log("fetching data...");
	let dataUrl = apiBaseUrl;
	let parentDataUrl = apiBaseUrl;

	if (selectedMunicipality) {
		// in municipality
		dataUrl += `/api/municipality/${selectedMunicipality.code}/wlm/`;
		parentDataUrl += `/api/municipality/${selectedMunicipality.code}/wlm/`;
	} else if (selectedProvince) {
		// municipalities in province
		dataUrl += `/api/province/${selectedProvince.code}/wlm-areas/`;
		parentDataUrl += `/api/province/${selectedProvince.code}/wlm/`;
	} else if (selectedRegion) {
		// provinces in region
		dataUrl += `/api/region/${selectedRegion.code}/wlm-areas/`;
		parentDataUrl += `/api/region/${selectedRegion.code}/wlm/`;
	} else {
		// no area selected, do all italian regions
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
		}
		// else if (Math.ceil(i.length("days") / 5) <= max_steps) {
		// 	step_unit = "days";
		// 	step_size = 5;
		// }
		// else if (Math.ceil(i.length("days") / 10) <= max_steps) {
		// 	step_unit = "days";
		// 	step_size = 10;
		// }
		else if (Math.ceil(i.length("months") / 1) <= max_steps) {
			step_unit = "months";
			step_size = 1;
		}
		// else if (Math.ceil(i.length("months") / 3) <= max_steps) {
		// 	step_unit = "months";
		// 	step_size = 3;
		// }
		// else if (Math.ceil(i.length("months") / 4) <= max_steps) {
		// 	step_unit = "months";
		// 	step_size = 4;
		// }
		// else if (Math.ceil(i.length("months") / 6) <= max_steps) {
		// 	step_unit = "months";
		// 	step_size = 6;
		// }
		else {
			step_unit = "years";
			step_size = 1;
		}
		// const timeStepMessage = ["Showing ", Math.ceil(i.length(step_unit) / step_size), " history points (every ", step_size, " ", step_unit, ")"].join("");
		// const timeStep = ["One slice is ", step_size, " ", step_size===1?step_unit.replace("s",""): step_unit, "."].join("");
		const timeStep = [step_size, " ", step_size===1?step_unit.replace("s",""): step_unit].join("");
		setTimeStep(timeStep);

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
				cache: dataCacheMode,
			}),
			json(parentDataUrl, {
				cache: dataCacheMode,
			}),
		]).then(([data, parentData]) => {
			// console.log(data, parentData)
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

export { apiBaseUrl, fetchData, dataCacheMode, timeFrameData, dateRanges, geoCacheMode };
