import * as d3 from "d3";

const colors = {
	blueJeans: "#0978AB",
	lightBlue: "#DDF7FF",
	terrain: "#ECE5E0",
	white: "#ffffff",
	onWIki: "#C3C5C3",
	inContest: "#F8FF0E",
	photographed: "#22B8B4",
	interactive: "#FF004D",
};

const collisionRadius = 70;
const fanOpening = 150;
let rotation;

const drawVentaglio = (datum, ventaglio) => {
	// console.log("drawing ventagli", [datum], ventaglio);
	const data = [datum];

	rotation = fanOpening / data[0].history.length;

	// ventaglio
	// 	.selectAll(".collisionArea")
	// 	.data(
	// 		(d) => [d],
	// 		(d) => d.code
	// 	)
	// 	.join("circle")
	// 	.attr("class", "collisionArea")
	// 	.attr("r", (d) => d.maxRaius || d.history.slice(-1)[0].groups.slice(-1)[0].outerRadius);

	ventaglio
		.selectAll(".bubble")
		.data(
			(d) => [d],
			(d) => d.code
		)
		.join("circle")
		.attr("class", "bubble")
		.attr("fill", (d) => {
			const groups = d.history.slice(-1)[0].groups;
			groups.forEach((g, i) => (g.valueDelta = i == 0 ? g.value : g.value - groups[i - 1].value));
			const predominant = groups.reduce((prev, current) => (prev.valueDelta > current.valueDelta ? prev : current));
			return colors[predominant.label];
		})
		.attr("stroke", "#fff")
		.attr("r", 4)
		.attr("display", "none");

	ventaglio
		.selectAll(".tickBg")
		.data(
			(d) => dataTick(d).slice(0,1),
			(d) => d.code
		)
		.join("path")
		.attr("d", (d) => {
			const r = d.outerRadius;
			const start = -fanOpening / 2;
			const end = fanOpening / 2;
			return describeArc(0, 0, r, start, end);
		})
		.attr("fill", "url(#tick-background)")
		.classed("tickBg", true);

	const snapshot = ventaglio
		.selectAll(".snapshot")
		.data(
			(d) => d.history,
			(d) => d.date
		)
		.join("g")
		.attr("class", "snapshot")
		.attr("transform", (d, i) => `rotate(${-fanOpening / 2 + rotation * i})`);

	snapshot
		.selectAll(".status")
		.data(
			(d) => d.groups,
			(d) => d.label
		)
		.join(
			(enter) =>
				enter
					.append("path")
					.attr("class", "status")
					.attr("fill", (d) => colors[d.label])
					.attr("d", (d) => drawSlice(d)),
			(update) => update.attr("fill", (d) => colors[d.label]).attr("d", (d) => drawSlice(d)),
			(exit) => exit.remove()
		);

	ventaglio
		.selectAll(".label")
		.data(
			(d) => [d],
			(d) => d.code
		)
		.join("text")
		.attr("text-anchor", "middle")
		.attr("font-size", 10)
		.attr("class", "label")
		.attr("y", 1 * 12)
		.text((d) => d.label)
		.each(wrap)
		.raise();

	function wrap(d) {
		const width = d.maxRadius * 2.5;
		const padding = 0;
		var self = d3.select(this),
			textLength = self.node().getComputedTextLength(),
			text = self.text();
		while (textLength > width && text.length > 0) {
			text = text.slice(0, -1);
			text = text.trim();
			self.text(text + ".");
			textLength = self.node().getComputedTextLength();
		}
	}

	let g_ticks = ventaglio.select(".ticks");
	if (g_ticks.empty()) {
		g_ticks = ventaglio.append("g").classed("ticks", true);
	}
	g_ticks.raise();

	const tick = g_ticks
		.selectAll(".tick")
		.data(
			(d) => dataTick(d),
			(d) => d.label + d.value
		)
		.join("g")
		.attr("data-tick", (d, i) => d.label + d.value)
		.classed("tick", true)
		.raise();

	// tick
	// 	.selectAll(".axis")
	// 	.data(
	// 		(d) => [d],
	// 		(d) => d
	// 	)
	// 	.join("path")
	// 	.classed("axis", true)
	// 	.attr("d", (d) => {
	// 		const r = d.outerRadius;
	// 		const start = -fanOpening / 2;
	// 		const end = fanOpening / 2;
	// 		return describeArc(0, 0, r, start, end);
	// 	})
	// 	.attr("fill", "none")
	// 	.attr("stroke", "#aaa")
	// 	.attr("stroke-dasharray", "1, 2")
	// 	.style("mix-blend-mode", "multiply");

	tick
		.selectAll(".axisLabel")
		.data(
			(d) => [d],
			(d) => d
		)
		.join("text")
		.classed("axisLabel", true)
		.attr("fill", "#aaa")
		.attr("font-size", 7)
		.attr("font-weight", "bold")
		.attr("x", (d) => {
			const r = d.outerRadius;
			let a = fanOpening / 2;
			a = d.index % 2 === 0 ? a : -a;
			return polarToCartesian(0, 0, r, a).x;
		})
		.attr("y", (d) => {
			const r = d.outerRadius;
			const a = fanOpening / 2;
			return polarToCartesian(0, 0, r, a).y + 7;
		})
		.attr("text-anchor", (d) => (d.index % 2 === 0 ? "start" : "end"))
		.text((d) => (d.value !== 1 ? d.value : ""));
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

function dataTick(d) {
	const data = [];
	const temp = [];
	const groups = d.history.slice(-1)[0].groups;
	for (let i = groups.length - 1; i >= 0; i--) {
		const g = groups[i];
		const outerRadius = g.outerRadius;
		const group = { ...g, index: i };
		const delta = 7;
		const similarElment = temp.find((d) => {
			return d >= outerRadius - delta && d <= outerRadius + delta;
		});

		if (!similarElment) {
			temp.push(outerRadius);
			data.push(group);
		}
	}
	// groups.forEach((g, i) => {
	// 	const outerRadius = g.outerRadius;
	// 	const group = { ...g, index: i };
	// 	const delta = 7;
	// 	const similarElment = temp.find((d) => {
	// 		return d >= outerRadius - delta && d <= outerRadius + delta;
	// 	});

	// 	if (!similarElment) {
	// 		temp.push(outerRadius);
	// 		data.push(group);
	// 	}
	// });
	return data;
}

export { colors, collisionRadius, drawVentaglio };
