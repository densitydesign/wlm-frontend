import * as d3 from "d3";
import { colors } from "../../utils/ventagli.utils";
let svg,
	width,
	height,
	margin = {
		left: 0,
		right: 40,
		top: 10,
		bottom: 20,
	},
	timeScale = d3.scaleTime(),
	timeAxisGroup,
	quantityScale = d3.scaleLinear(),
	quantityAxisGroup;

const initialize = (element) => {
	console.log("initialize areachart");
	svg = d3.select(element);
	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	timeScale.range([margin.left, width - margin.right]);
	timeAxisGroup = svg.select(".timeAxisGroup");
	if (timeAxisGroup.empty()) {
		timeAxisGroup = svg.append("g").classed("timeAxisGroup", true);
	}
	timeAxisGroup.attr("transform", `translate(0, ${height - margin.bottom})`);

	quantityScale.range([height - margin.bottom, margin.top]);
	quantityAxisGroup = svg.select(".quantityAxisGroup");
	if (quantityAxisGroup.empty()) {
		quantityAxisGroup = svg.append("g").classed("quantityAxisGroup", true);
	}
	quantityAxisGroup.attr("transform", `translate(${width},0)`);
};

const update = (data, filterData) => {
	console.log("update areachart");
	const temp = [];
	const keys = new Set();
	const dates = [];
	const amounts = [];
	const preservedGroups = filterData.filter((d) => d.active).map((d) => d.label);
	data.data.forEach((area) => {
		area.history.forEach((date) => {
			const [year, month, day] = date.date.split("-");
			const _date = new Date(year, month - 1, day);
			dates.push(_date);
			const o = {
				date: _date,
			};

			const groups = date.groups.filter((group) => preservedGroups.indexOf(group.label) !== -1);
			groups.forEach((group, i) => {
				let _value = group.value;
				if (i > 0) {
					_value -= groups[i - 1].value;
				}
				amounts.push(group.value);
				keys.add(group.label);
				o[group.label] = _value;
			});
			temp.push(o);
		});
	});
	const stack = d3.stack().keys(Array.from(keys)).order(d3.stackOrderNone).offset(d3.stackOffsetNone);

	const series = stack(temp);
	const timeExtent = d3.extent(dates);
	const quantityExtent = d3.extent(amounts);

	timeScale.domain(timeExtent);
	const timeAxis = d3.axisBottom(timeScale);
	timeAxisGroup.call(timeAxis);

	quantityScale.domain(quantityExtent);
	const quantityAxis = d3.axisLeft(quantityScale);
	quantityAxisGroup.call(quantityAxis);

	const area = d3
		.area()
		.x((d) => timeScale(d.data.date))
		.y0((d) => quantityScale(d[0]))
		.y1((d) => quantityScale(d[1]))
		.curve(d3.curveStepAfter);

	svg
		.selectAll(".area")
		.data(series)
		.join("path")
		.attr("class", "area")
		.attr("fill", (d) => colors[d.key])
		.attr("d", area);
};

export { initialize, update };
