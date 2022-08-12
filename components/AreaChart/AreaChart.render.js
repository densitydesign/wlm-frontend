import * as d3 from "d3";
import { colors } from "../../utils/ventagli.utils";
let svg,
	width,
	height,
	margin = {
		left: 20,
		right: 1,
		top: 30,
		bottom: 20,
	},
	areaChart,
	timeScale = d3.scaleTime(),
	timeAxisGroup,
	quantityScale = d3.scaleLinear(),
	quantityAxisGroup;

const initialize = (element) => {
	console.log("initialize areachart");
	svg = d3.select(element);

	quantityAxisGroup = svg.select(".quantityAxisGroup");
	if (quantityAxisGroup.empty()) {
		quantityAxisGroup = svg.append("g").classed("quantityAxisGroup", true);
	}

	areaChart = svg.selectAll(".areaChart");
	if (areaChart.empty()) {
		areaChart = svg.append("g").classed("areaChart", true);
	}

	timeAxisGroup = svg.select(".timeAxisGroup");
	if (timeAxisGroup.empty()) {
		timeAxisGroup = svg.append("g").classed("timeAxisGroup", true);
	}
};

const update = (data, filterData) => {
	// console.log("update areachart");

	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

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
	timeScale.domain(timeExtent).range([margin.left, width - margin.right]);

	const timeAxis = d3.axisBottom(timeScale);
	timeAxisGroup
		.attr("transform", `translate(0, ${height - margin.bottom})`)
		.call(timeAxis)
		.call((g) => {
			const d_attr = g.select(".domain").remove()
		});

	const quantityExtent = d3.extent(amounts);
	quantityScale.domain([0, quantityExtent[1]]).range([height - margin.bottom, margin.top]);
	const qTicks = quantityScale.ticks(5);
	const qTicksFormat = quantityScale.tickFormat(5, "~s");
	const quantityAxis = d3.axisRight(quantityScale.copy()).tickFormat(qTicksFormat);
	const arr = [];
	quantityAxisGroup
		.attr("transform", `translate(${0},0)`)
		.call(quantityAxis)
		.call((g) => {
			g.select(".domain").attr("display", "none");

			g.selectAll(".tick > text")
				.attr("x", 0)
				.each(function (d) {
					arr.push(this.getComputedTextLength());
				});

			g.selectAll(".tick > line")
				.attr("stroke-dasharray", "1, 4")
				.attr("x1", Math.ceil(d3.max(arr)) + 4)
				.attr("x2", width)

			g.selectAll(".tick")
				.filter((d) => d === 0)
				.attr("display", "none");
		});

	const area = d3
		.area()
		.x((d) => timeScale(d.data.date))
		.y0((d) => quantityScale(d[0]))
		.y1((d) => quantityScale(d[1]))
		.curve(d3.curveStepAfter);

	areaChart
		.selectAll(".area")
		.data(series)
		.join("path")
		.attr("class", "area")
		.attr("fill", (d) => colors[d.key])
		.attr("d", area);
};

export { initialize, update };
