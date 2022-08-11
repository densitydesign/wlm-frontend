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

const scaleRadius = d3
	.scalePow()
	.exponent(1 / 4)
	.range([0, 50]);

const initialize = (element, viz_data) => {
	const { lvl4 } = viz_data;

	svg = d3.select(element);
	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	bgRect = svg.select(".bgRect");
	if (bgRect.empty()) {
		bgRect = svg.append("rect").classed("bgRect", true);
	}
	bgRect.attr("fill", colors.lightBlue).attr("width", "100%").attr("height", "100%").attr("pointer-events", "none");

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
		.on("zoom", ({ transform }) => zoomed(transform))
		.on("end", () => {
			console.log("fcadciuchuacidpb");
		})
		.on("end", () => {
			ventaglio.call(handleOverlappings);
		});

	svg.call(zoom);

	update(viz_data);
};

const update = (viz_data) => {
	// console.log("update", viz_data);
	const {
		data,
		extent,
		lvl4,
		lvl6,
		lvl8,
		selectedRegion,
		selectedProvince,
		selectedMunicipality,
		setSelectedRegion,
		setSelectedProvince,
		setSelectedMunicipality,
	} = viz_data;

	scaleRadius.domain([0, d3.max(extent.map((d) => d.value[1]))]);

	region = g_regions
		.selectAll(".region")
		.data(lvl4, (d) => d.properties.code)
		.join("path")
		.attr("class", "region")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d))
		.on("click", (event, d) => {
			event.stopPropagation();
			const { code, label } = d.properties;
			const selected = { code, label };
			setSelectedMunicipality(undefined);
			setSelectedProvince(undefined);
			setSelectedRegion(selected);
		});

	province = g_provinces
		.selectAll(".province")
		.data(lvl6, (d) => d.properties.code)
		.join("path")
		.attr("class", "province")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d))
		.on("click", (event, d) => {
			event.stopPropagation();
			const { code, label } = d.properties;
			const selected = { code, label };
			setSelectedMunicipality(undefined);
			setSelectedProvince(selected);
		});

	municipality = g_municipalities
		.selectAll(".municipality")
		.data(lvl8, (d) => d.properties.code)
		.join("path")
		.attr("class", "municipality")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d))
		.on("click", (event, d) => {
			event.stopPropagation();
			const { code, label } = d.properties;
			const selected = { code, label };
			setSelectedMunicipality(selected);
		});

	let geoFeaturesArr;

	if (selectedMunicipality) geoFeaturesArr = lvl8;
	else if (selectedProvince) geoFeaturesArr = lvl8;
	else if (selectedRegion) geoFeaturesArr = lvl6;
	else geoFeaturesArr = lvl4;

	data = compileVentagliData(data, geoFeaturesArr);

	ventaglio = g_ventagli
		.selectAll(".ventaglio")
		.data(data, (d) => d.code)
		.join("g")
		.attr("class", "ventaglio")
		.classed("overlapping", false)
		.each(function (d) {
			drawVentaglio(d, d3.select(this));
		});

	if (selectedMunicipality) {
		region.attr("opacity", 0.5);
		province.attr("opacity", 0.5);
		municipality
			.attr("opacity", 0.5)
			.filter((d) => d.properties.code === selectedMunicipality.code)
			.attr("opacity", 1)
			.each(zoomToArea);
	} else if (selectedProvince) {
		region.attr("opacity", 0.5);
		province
			.attr("opacity", 0.5)
			.filter((d) => d.properties.code === selectedProvince.code)
			.attr("opacity", 1)
			.each(zoomToArea);
	} else if (selectedRegion) {
		region
			.attr("opacity", 0.5)
			.filter((d) => d.properties.code === selectedRegion.code)
			.attr("opacity", 1)
			.each(zoomToArea);
	}

	simulation.nodes(data);
	// simulation.tick(120);
	// ticked();
	simulation.alpha(1);
	simulation.restart();

	function zoomToArea(d) {
		const [[x0, y0], [x1, y1]] = render.bounds(d);
		// const newScale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
		const newScale = 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height);
		svg
			.transition()
			.duration(t_duration * 3)
			.call(
				zoom.transform,
				d3.zoomIdentity
					.translate(width / 2, height / 2)
					.scale(newScale)
					.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
			);
	}
};

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
		area.maxRadius = scaleRadius(area.maxValue);
		area.history.forEach((date) => {
			date.groups.forEach((group, i) => {
				group.innerRadius = i === 0 ? 0 : date.groups[i - 1].outerRadius;
				group.outerRadius = scaleRadius(group.value);
			});
		});
	});
	return data;
}

function getRadius(d, k) {
	const radius = d.history.slice(-1)[0].groups.slice(-1)[0].outerRadius * k;
	return radius;
}

function handleOverlappings(selection) {
	console.log("handleOverlappings", selection);
	selection.classed("overlapping", false);
	selection.selectAll(".bubble").attr("display", "none");
	selection.selectAll(".snapshot").attr("display", "block");
	selection.selectAll(".tickBg").attr("display", "block");
	selection.selectAll(".tick").attr("display", "block");
	selection.selectAll(".label").attr("display", "block");
	selection.each(function (d) {
		const elm_d = this;
		selection.each(function (e) {
			const elm_e = this;
			if (e === d) return;
			const _dist = dist([d.x, d.y], [e.x, e.y]);
			const _threshold = ((d.maxRadius + e.maxRadius) / _k) * 0.75;
			if (_dist < _threshold) {
				// console.log(d.label, e.label);
				const selected_d = d3.select(elm_d);
				const selected_e = d3.select(elm_e);
				if (selected_d.classed("overlapping") || selected_e.classed("overlapping")) {
					return;
				} else {
					let hidden_elm, visible_elm;
					if (d.maxValue < e.maxValue) {
						hidden_elm = d3.select(elm_d);
						visible_elm = d3.select(elm_e);
					} else {
						hidden_elm = d3.select(elm_e);
						visible_elm = d3.select(elm_d);
					}
					// console.log(hidden_elm);
					hidden_elm.classed("overlapping", true);
					hidden_elm.selectAll(".bubble").attr("display", "block");
					hidden_elm.selectAll(".snapshot").attr("display", "none");
					hidden_elm.selectAll(".tickBg").attr("display", "none");
					hidden_elm.selectAll(".tick").attr("display", "none");
					hidden_elm.selectAll(".label").attr("display", "none");
				}
			}
		});
	});
}

function dist([x1, y1], [x2, y2]) {
	let dx = x2 - x1;
	let dy = y2 - y1;
	return Math.sqrt(dx * dx + dy * dy);
}

export { initialize, update };
