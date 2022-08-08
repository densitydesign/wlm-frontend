import * as d3 from "d3";
import { group } from "d3";
import { Duration } from "luxon";
import { collisionRadius, colors, drawVentaglio } from "../../utils/ventagli.utils";

const t_duration = 350;

let svg,
	width,
	height,
	bgRect,
	projection,
	render,
	zoom,
	g,
	g_geographies,
	g_regions,
	region,
	g_provinces,
	province,
	g_municipalities,
	municipality,
	g_ventagli,
	ventaglio,
	simulation;

let _x,
	_y,
	_k = 1;

const scaleRadius = d3.scaleSqrt().range([0, 70]);

const initialize = (element, viz_data) => {
	// console.log("initialize", viz_data);

	const { data, extent, lvl4, lvl6, lvl8, selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo } = viz_data;

	svg = d3.select(element);
	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	bgRect = svg.select(".bgRect");
	if (bgRect.empty()) {
		bgRect = svg.append("rect").classed("bgRect", true);
	}
	bgRect.attr("fill", colors.lightBlue).attr("width", width).attr("height", height).attr("pointer-events", "none");

	g = svg.select(".main-g");
	if (g.empty()) {
		g = svg.append("g").classed("main-g", true);
	}

	g_geographies = g.select(".g_geographies");
	if (g_geographies.empty()) {
		g_geographies = g.append("g").classed("g_geographies", true);
	}

	g_regions = g_geographies.select(".regions");
	if (g_regions.empty()) {
		g_regions = g_geographies.append("g").classed("regions", true);
	}

	g_provinces = g_geographies.select(".provinces");
	if (g_provinces.empty()) {
		g_provinces = g_geographies.append("g").classed("provinces", true);
	}

	g_municipalities = g_geographies.select(".municipalities");
	if (g_municipalities.empty()) {
		g_municipalities = g_geographies.append("g").classed("municipalities", true);
	}

	g_ventagli = g.select(".g_ventagli");
	if (g_ventagli.empty()) {
		g_ventagli = g.append("g").classed("g_ventagli", true);
	}
	ventaglio = g_ventagli.selectAll(".ventaglio");

	projection = d3
		.geoMercator()
		// .scale(1 / (2 * Math.PI))
		// .translate([0, 0])
		.fitSize([width, height], {
			type: "FeatureCollection",
			features: lvl4,
		});

	render = d3.geoPath(projection);

	zoom = d3
		.zoom()
		.scaleExtent([1, 1 << 10])
		.extent([
			[0, 0],
			[width, height],
		])
		.on("zoom", ({ transform }) => zoomed(transform));

	// const initialCenter = [12 + 30 / 60, 42 + 30 / 60];
	// const initialScale = 1;
	svg.call(zoom).call(
		zoom.transform,
		d3.zoomIdentity
		// .translate(width / 2, height / 2)
		// .scale(-initialScale)
		// .translate(...projection(initialCenter))
		// .scale(-1)
	);

	update(viz_data);
};

const update = (viz_data) => {
	// console.log("update", viz_data);

	scaleRadius.domain([0, viz_data.extent[0].value[1]]);

	region = g_regions
		.selectAll(".region")
		.data(viz_data.lvl4, (d) => d.properties.code)
		.join("path")
		.attr("class", "region")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d));

	province = g_provinces
		.selectAll(".province")
		.data(viz_data.lvl6, (d) => d.properties.code)
		.join("path")
		.attr("class", "province")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d));

	municipality = g_municipalities
		.selectAll(".municipality")
		.data(viz_data.lvl8, (d) => d.properties.code)
		.join("path")
		.attr("class", "municipality")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d));

	let geoFeaturesArr;

	if (viz_data.selectedMunicipality) geoFeaturesArr = viz_data.lvl8;
	else if (viz_data.selectedProvince) geoFeaturesArr = viz_data.lvl8;
	else if (viz_data.selectedRegion) geoFeaturesArr = viz_data.lvl6;
	else geoFeaturesArr = viz_data.lvl4;
	viz_data.data = compileVentagliData(viz_data.data, geoFeaturesArr);

	ventaglio = g_ventagli
		.selectAll(".ventaglio")
		.data(viz_data.data, (d) => d.code)
		.join(
			(enter) =>
				enter
					.append("g")
					.attr("class", "ventaglio")
					.each(function (d) {
						drawVentaglio(d, d3.select(this));
					}),
			(update) =>
				update.each(function (d) {
					drawVentaglio(d, d3.select(this));
				}),
			(exit) => exit.transition().duration(t_duration).style("opacity", 0).remove()
		);

	// if (data.selectedRegion) {
	// 	region
	// 		.attr("opacity", 0.65)
	// 		.filter((d) => d.properties.DEN_REG === data.selectedRegion.label)
	// 		.attr("stroke", (d) => colors.interactive)
	// 		.attr("fill", "transparent")
	// 		.raise();
	// }

	// if (data.selectedProvince) {
	// 	province
	// 		.attr("opacity", 0.65)
	// 		.filter((d) => d.properties.DEN_UTS === data.selectedProvince.label)
	// 		.attr("stroke", (d) => colors.interactive)
	// 		.attr("fill", "transparent")
	// 		.raise();

	// 	if (data.selectedMunicipality) {
	// 		municipality
	// 			.filter((d) => d.properties.COMUNE === data.selectedMunicipality.label)
	// 			.attr("stroke", (d) => colors.interactive)
	// 			// .attr("fill", "transparent")
	// 			.raise();
	// 	}
	// }

	simulation.nodes(viz_data.data);
	// simulation.tick(120);
	// ticked();
	simulation.alpha(1);
	simulation.restart();
};

export { initialize, update };

function zoomed(transform) {
	g.attr("transform", transform);
	const { x, y, k } = transform;
	_x = x;
	_y = y;
	_k = k;
	ventaglio.attr("transform", (d) => `translate(${d.x}, ${d.y}) scale(${1 / k})`);
	document.documentElement.style.setProperty("--stroke-width", 1 / k);

	// simulation.force("collide").radius((d) => getRadius(d, 0.75) / _k);
	simulation.alpha(1);
	simulation.restart();
}

// simulation
const ticked = () => {
	ventaglio.attr("transform", (d) => `translate(${d.x}, ${d.y}) scale(${1 / _k})`);
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
	// .force(
	// 	"collide",
	// 	d3.forceCollide().radius((d) => getRadius(d, 0.75) / _k)
	// )
	.on("tick", ticked)
	.stop();

function compileVentagliData(data, arr) {
	data.forEach((area) => {
		const temp = arr.find((d) => d.properties.code === area.code);
		if (temp) {
			const centroid = projection(temp.properties.centroid.coordinates);
			area.x = centroid[0];
			area.y = centroid[1];
		}

		area.history.forEach((date) => {
			date.groups = date.groups.sort((a, b) => {
				return a.value - b.value;
			});
			date.groups.forEach((group, i) => {
				// console.log(group);
				group.innerRadius = i === 0 ? 0 : date.groups[i - 1].outerRadius;
				group.outerRadius = scaleRadius(group.value);
			});
		});
		// console.log(area.history);
	});
	return data;
}

function getRadius(d, k) {
	const radius = d.history.slice(-1)[0].groups.slice(-1)[0].outerRadius * k;
	return radius;
}
