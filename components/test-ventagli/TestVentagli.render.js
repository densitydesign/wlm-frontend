import * as d3 from "d3";
// Values
let width,
	height,
	margin = {},
	layout = {},
	_cell = 200;
const circularTicks = [100, 500, 1000, 5000, 10000, 15000];
// D3 selections
let svg, g, fan, snapshot, monumentGroup, tick;
// D3 scales
const scaleRadius = d3.scaleSqrt().range([0, _cell * 0.5]);
const scaleColor = d3.scaleOrdinal(
	["mapped", "authorized", "photographed"],
	["#C3C5C3", "#F8FF0E", "#22B8B4"]
); // "#F8FF0E"
const background_color = "#f1f5f1";
// const scaleColor = d3.scaleOrdinal(["mapped", "authorized", "photographed"], ["#F1F1F1", "#FDD666", "#009EB6"]); // "#F8FF0E"
// const background_color = "#E3D1C4"
let fanOpening = 150;
let rotation;

const initialize = (element, data, extent) => {
	// console.log("initialize", element);
	svg = d3.select(element).style("background-color", background_color);
	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	margin.left = (width % _cell) / 2;
	margin.top = (height % _cell) / 2;
	layout.columns = Math.floor(width / _cell);
	layout.rows = Math.floor(height / _cell);

	// destroy(element);
	g = svg.select("g");
	if (g.empty()) {
		g = svg.append("g").classed("main-group", true);
	}

	update(data, extent);
};

const update = (data, extent) => {
	console.log("update", data);

	scaleRadius.domain([0, extent[1]]);
	data = addRadiiData(data);

	let this_fanOpening = fanOpening;
	// this_fanOpening -= data[0][1].length

	rotation = this_fanOpening / data[0][1].length;
	const total_opening = fanOpening + data[0][1].length - 1;

	fan = g
		.selectAll(".fan")
		.data(data, (d) => d[0])
		.join(
			(enter) =>
				enter
					.append("g")
					.attr("transform", (d, i) => gridPosition(d, i))
					.attr("data-area", (d) => d[0])
					.classed("fan", true),
			(update) =>
				update.call((update) =>
					update
						.transition()
						.duration(500)
						.attr("transform", (d, i) => gridPosition(d, i))
				),
			(exit) => exit.remove()
		);

	snapshot = fan
		.selectAll(".snapshot")
		.data(
			(d) => d[1],
			(d) => d[0]
		)
		.join(
			(enter) =>
				enter
					.append("g")
					.classed("snapshot", true)
					.attr(
						"transform",
						(d, i) => `rotate(${-total_opening / 2 + i * rotation + i})`
					)
					.attr("data-snapshot", (d) => d[0]),
			(update) =>
				update.call((update) =>
					update
						.transition()
						.duration(500)
						.attr(
							"transform",
							(d, i) => `rotate(${-total_opening / 2 + i * rotation + i})`
						)
				),
			(exit) =>
				exit.call((exit) =>
					exit
						.transition()
						.duration(500)
						.attr(
							"transform",
							(d, i) => `rotate(${-total_opening / 2 + (i-1) * rotation + (i-1)})`
						)
						.style("opacity", 0)
						.remove()
				)
		);

	monumentGroup = snapshot
		.selectAll(".monumentGroup")
		.data(
			(d) => d[1],
			(d) => d.group
		)
		.join(
			(enter) =>
				enter
					.append("path")
					.classed("monumentGroup", true)
					.attr("data-group", (d) => d[0])
					.attr("d", (d) => drawSlice(d))
					.attr("fill", (d) => scaleColor(d.group)),
			(update) =>
				update.call((update) =>
					update
						.transition(500)
						.attr("d", (d) => drawSlice(d))
						.attr("fill", (d) => scaleColor(d.group))
				),
			(exit) => exit.remove()
		);

	tick = fan
		.selectAll(".tick")
		.data(
			(d) => dataTick(d),
			(d) => d
		)
		.join(
			(enter) =>
				enter
					.append("g")
					.attr("data-tick", (d) => d)
					.classed("tick", true),
			(update) => update,
			(exit) => exit.remove()
		);

	tick
		.selectAll(".axis")
		.data(
			(d) => [d],
			(d) => d
		)
		.join(
			(enter) =>
				enter
					.append("path")
					.attr("d", (d) => {
						const r = scaleRadius(d);
						const start = -total_opening / 2;
						const end = total_opening / 2;
						return describeArc(0, 0, r, start, end);
					})
					.attr("fill", "none")
					.attr("stroke", "grey")
					.attr("stroke-dasharray", "1, 2")
					.style("mix-blend-mode", "multiply")
					.classed("axis", true),
			(update) =>
				update.attr("d", (d) => {
					const r = scaleRadius(d);
					const start = -total_opening / 2;
					const end = total_opening / 2;
					return describeArc(0, 0, r, start, end);
				}),
			(exit) => exit.remove()
		);

	tick
		.selectAll(".axisLabel")
		.data(
			(d, i) => [{ index: i, value: d }],
			(d) => d.value
		)
		.join(
			(enter) =>
				enter
					.append("text")
					.attr("font-size", 10)
					.attr("text-anchor", "middle")
					.attr("fill", "grey")
					.attr("stroke", "none")
					.style("mix-blend-mode", "multiply")
					.attr("x", (d) => {
						const r = scaleRadius(d.value);
						let a = total_opening / 2;
						a = d.index % 2 === 0 ? a : -a;
						return polarToCartesian(0, 0, r, a).x;
					})
					.attr("y", (d) => {
						const r = scaleRadius(d.value);
						const a = total_opening / 2;
						return polarToCartesian(0, 0, r, a).y + 10;
					})
					.text((d) => calcTickLabel(d.value))
					.classed("axisLabel", true),
			(update) => update.text((d) => calcTickLabel(d.value)),
			(exit) => exit.remove()
		);

	fan
		.selectAll(".label")
		.data(
			(d) => [d],
			(d) => d[0]
		)
		.join(
			(enter) =>
				enter
					.append("text")
					.classed("label", true)
					.attr("text-anchor", "middle")
					.attr("font-size", 12)
					.attr("y", 50)
					.text((d) => d[0]),
			(update) => update,
			(exit) => exit.remove()
		);
};

const destroy = (element) => {
	console.log("destroy", element);
	// d3.select(element).selectAll("*").remove();
};

function addRadiiData(data) {
	data.forEach((area) => {
		area[1].forEach((snapshot) => {
			const photographed = snapshot[1].find((d) => d.group === "photographed");
			photographed.innerRadius = 0;
			photographed.outerRadius = scaleRadius(photographed.valueIncremental);
			const authorized = snapshot[1].find((d) => d.group === "authorized");
			authorized.innerRadius = photographed.outerRadius;
			authorized.outerRadius = scaleRadius(authorized.valueIncremental);
			const mapped = snapshot[1].find((d) => d.group === "mapped");
			mapped.innerRadius = authorized.outerRadius;
			mapped.outerRadius = scaleRadius(mapped.valueIncremental);
		});
	});
	return data;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
}

function describeArc(x, y, radius, startAngle, endAngle) {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	var d = [
		"M",
		// x, y, "L",
		start.x,
		start.y,
		"A",
		radius,
		radius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y,
		// "Z"
	].join(" ");
	return d;
}

function drawSlice(d) {
	// console.log("drawSlice")
	const x = 0;
	const y = 0;
	let path;
	if (d.innerRadius === 0) {
		const radius = d.outerRadius;
		const startAngle = 0;
		const endAngle = rotation;
		const start = polarToCartesian(x, y, d.outerRadius, endAngle);
		const end = polarToCartesian(x, y, d.outerRadius, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		path = [
			"M",
			x,
			y,
			"L",
			start.x,
			start.y,
			"A",
			radius,
			radius,
			0,
			largeArcFlag,
			0,
			end.x,
			end.y,
			"Z",
		].join(" ");
	} else {
		const outerRadius = d.outerRadius;
		const outerStartAngle = 0;
		const outerEndAngle = rotation;
		const outerStart = polarToCartesian(x, y, outerRadius, outerEndAngle);
		const outerEnd = polarToCartesian(x, y, outerRadius, outerStartAngle);
		const outerLargeArcFlag =
			outerEndAngle - outerStartAngle <= 180 ? "0" : "1";

		const innerRadius = d.innerRadius;
		const innerStartAngle = 0;
		const innerEndAngle = rotation;
		const innerStart = polarToCartesian(x, y, innerRadius, innerEndAngle);
		const innerEnd = polarToCartesian(x, y, innerRadius, innerStartAngle);
		const innerLargeArcFlag =
			innerEndAngle - innerStartAngle <= 180 ? "0" : "1";

		path = [
			"M",
			innerStart.x,
			innerStart.y,
			"L",
			outerStart.x,
			outerStart.y,
			"A",
			outerRadius,
			outerRadius,
			0,
			outerLargeArcFlag,
			0,
			outerEnd.x,
			outerEnd.y,
			"L",
			innerEnd.x,
			innerEnd.y,
			"A",
			innerRadius,
			innerRadius,
			0,
			innerLargeArcFlag,
			1,
			innerStart.x,
			innerStart.y,
			"Z",
		].join(" ");
	}
	return path;
}

function gridPosition(d, i) {
	const x = (i % layout.columns) * _cell + _cell / 2 + margin.left;
	const y = Math.floor(i / layout.columns) * _cell + _cell / 2 + margin.top;
	return `translate(${x},${y}) rotate(${0})`;
}

function dataTick(d) {
	const last = d[1][d[1].length - 1];
	const max = last[1].find((d) => d.group === "mapped").valueIncremental;
	const _right = circularTicks.filter((d) => d <= max).length + 1;
	const _left = Math.max(0, _right - 4);
	const dataTicks = circularTicks.slice(_left, _right);
	return dataTicks;
}

function calcTickLabel(d) {
	return d.toString().includes("000")
		? d.toString().replace("000", "K").replace("K0", "0K")
		: d;
}

export {
	initialize,
	update,
	destroy,
	addRadiiData,
	polarToCartesian,
	describeArc,
	drawSlice,
};
