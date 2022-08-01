import * as d3 from "d3";
import { colors } from "../../utils/ventagli.utils";

let svg,
	width,
	height,
	bgRect,
	projection,
	render,
	zoom,
	g,
	g_geographies,
	area,
	g_ventagli,
	ventaglio,
	simulation,
  collisionRadius = 35,
	centroids;

const initialize = (element, data) => {
	console.log("initialize", data);
	svg = d3.select(element);
	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	bgRect = svg.select(".bgRect");
	if (bgRect.empty()) {
		bgRect = svg.append("rect").classed("bgRect", true);
	}

	bgRect
		.attr("fill", colors.lightBlue)
		.attr("width", width)
		.attr("height", height)
		.attr("pointer-events", "none");

	g = svg.select(".main-g");
	if (g.empty()) {
		g = svg.append("g").classed("main-g", true);
	}

	g_geographies = g.select(".g_geographies");
	if (g_geographies.empty()) {
		g_geographies = g.append("g").classed("g_geographies", true);
	}

	g_ventagli = g.select(".g_ventagli");
	if (g_ventagli.empty()) {
		g_ventagli = g.append("g").classed("g_ventagli", true);
	}

	projection = d3
		.geoMercator()
		// .scale(1 / (2 * Math.PI))
		// .translate([0, 0])
		.fitSize([width, height], data.geographies);

	render = d3.geoPath(projection);

	centroids = data.geographies.features.map((d) => {
		const key = d.properties[data.labelKey];
		const centroid = render.centroid(d);
		return { area: key, centroid: centroid };
	});

	data.ventagli.forEach((v) => {
		const temp = centroids.find((d) => d.area === v[0]);
		if (temp) {
			v.x = temp.centroid[0];
			v.y = temp.centroid[1];
		}
	});

	zoom = d3
		.zoom()
		.scaleExtent([1, 1 << 10])
		.extent([
			[0, 0],
			[width, height],
		])
		.on("zoom", ({ transform }) => zoomed(transform));
	const initialCenter = [12 + 30 / 60, 42 + 30 / 60];
	const initialScale = 1;
	svg.call(zoom).call(
		zoom.transform,
		d3.zoomIdentity
		// .translate(width / 2, height / 2)
		// .scale(-initialScale)
		// .translate(...projection(initialCenter))
		// .scale(-1)
	);

	update(data);
};

const update = (data) => {
	console.log("update");

	area = g_geographies
		.selectAll(".area")
		.data(data.geographies.features)
		.join("path")
		.attr("class", "area")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d));

	ventaglio = g_ventagli
		.selectAll(".ventaglio")
		.data(data.ventagli, (d) => d[0])
		.join("g")
		.attr("class", "ventaglio");

	ventaglio
		.selectAll(".collisionArea")
		.data((d) => [d])
		.join("circle")
		.attr("class", "collisionArea")
		.attr("r", collisionRadius);

	simulation.nodes(data.ventagli);
	simulation.alpha(1).restart();
};

export { initialize, update };

function zoomed(transform) {
	g.attr("transform", transform);
	const { x, y, k } = transform;
	document.documentElement.style.setProperty("--stroke-width", 1 / k);
	document.documentElement.style.setProperty("--label-size", 10 / k);
	// const tiles = tile(transform);

	// if (showTiles) {
	//   image = image.data(tiles, d => d).join("image")
	//     .attr("xlink:href", d => url(...d))
	//     .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
	//     .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
	//     .attr("width", tiles.scale)
	//     .attr("height", tiles.scale);
	// }

	// projection
	// 	.scale(transform.k / (2 * Math.PI))
	// 	.translate([transform.x, transform.y]);

	// path.attr("d", render(geometries));

	// point
	//   .attr("cx", d=>render.centroid(d)[0])
	//   .attr("cy", d=>render.centroid(d)[1])
}

// simulation
const ticked = () => {
	ventaglio.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
};
simulation = d3
	.forceSimulation()
	.force(
		"x",
		d3.forceX((d) => d.x)
	)
	.force(
		"y",
		d3.forceY((d) => d.y)
	)
	// .force("charge", d3.forceManyBody())
	.force("collide", d3.forceCollide().radius(collisionRadius))
	.on("tick", ticked)
	.stop();
