import * as d3 from "d3";

const colors = {
	lightBlue: "#DDF7FF",
	terrain: "#ECE5E0",
	white: "#ffffff",
	onWikidata: "#C3C5C3",
	inContest: "#F8FF0E",
	photographed: "#22B8B4",

	authorized: "#F8FF0E",
	mapped: "#C3C5C3",
};

const collisionRadius = 35;
const fanOpening = 150;
let rotation;

const drawVentaglio = (datum, ventaglio) => {
	// console.log("drawing ventagli", [datum], ventaglio);
	const data = [datum];

	rotation = fanOpening / data[0][1].length;

	ventaglio
		.selectAll(".collisionArea")
		.data((d) => [d])
		.join("circle")
		.attr("class", "collisionArea")
		.attr("stroke-width", "var(--stroke-width)")
		.attr("r", collisionRadius);

	const snapshot = ventaglio
		.selectAll(".snapshot")
		.data(
			(d) => d[1],
			(d) => d[0]
		)
		.join("g")
		.attr("class", "snapshot")
		.attr("transform", (d, i) => ` rotate(${-fanOpening / 2 + rotation * i})`);

	const monStatus = snapshot
		.selectAll(".status")
		.data(
			(d) => d[1],
			(d) => d.group
		)
		.join(
			(enter) =>
				enter
					.append("path")
					.attr("class", "status")
					.attr("fill", (d) => colors[d.group])
					.attr("d", (d) => drawSlice(d)),
			(update) => update.attr("fill", (d) => colors[d.group]).attr("d", (d) => drawSlice(d)),
			(exit) => exit
		);

	ventaglio
		.selectAll(".label")
		.data((d) => [d[0]])
		.join("text")
		.attr("text-anchor", "middle")
		.attr("font-size", "var(--label-size)")
		.attr("class", "label")
		// .attr("y", "var(--label-size)")
		.text((d) => d);
};

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
		const endAngle = rotation - 1;
		const start = polarToCartesian(x, y, d.outerRadius, endAngle);
		const end = polarToCartesian(x, y, d.outerRadius, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		path = ["M", x, y, "L", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y, "Z"].join(" ");
	} else {
		const outerRadius = d.outerRadius;
		const outerStartAngle = 0;
		const outerEndAngle = rotation - 1;
		const outerStart = polarToCartesian(x, y, outerRadius, outerEndAngle);
		const outerEnd = polarToCartesian(x, y, outerRadius, outerStartAngle);
		const outerLargeArcFlag = outerEndAngle - outerStartAngle <= 180 ? "0" : "1";

		const innerRadius = d.innerRadius;
		const innerStartAngle = 0;
		const innerEndAngle = rotation - 1;
		const innerStart = polarToCartesian(x, y, innerRadius, innerEndAngle);
		const innerEnd = polarToCartesian(x, y, innerRadius, innerStartAngle);
		const innerLargeArcFlag = innerEndAngle - innerStartAngle <= 180 ? "0" : "1";

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

export { colors, collisionRadius, drawVentaglio };
