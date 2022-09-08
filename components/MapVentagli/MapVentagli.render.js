import * as d3 from "d3";
import { colors, drawVentaglio } from "../../utils/ventagli.utils";

const t_duration = 350;

let svg,
	width,
	height,
	bgRect,
	projection,
	render,
	zoom,
	g,
	g_europe,
	europe,
	g_geographies,
	g_regions,
	region,
	g_provinces,
	province,
	g_municipalities,
	municipality,
	g_ventagli,
	ventaglio,
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

let _x,
	_y,
	_k = 1,
	kLimit = 1,
	mode = undefined,
	labelSize = 10,
	axisLabel = 7;

const scaleRadius = d3.scalePow();

const initialize = (element, viz_data) => {
	const { lvl4 } = viz_data;

	svg = d3.select(element);
	const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	if (viz_data.viewbox) {
		width = viz_data.viewbox.width;
		height = viz_data.viewbox.height;
		svg.attr("viewBox", `0 0 ${viz_data.viewbox.width} ${viz_data.viewbox.height}`);
	}

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
	g_europe = g.select(".g_europe")
	g.append("g").classed("g_europe", true);

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

	projection = d3.geoMercator().fitSize([width, height], {
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

	if (viz_data.viewbox) {
		width = viz_data.viewbox.width;
		height = viz_data.viewbox.height;
		svg.attr("viewBox", `0 0 ${viz_data.viewbox.width} ${viz_data.viewbox.height}`);
	}

	scaleRadius
		.exponent(1 / 2)
		.domain([0, d3.max(extent.map((d) => d.value[1]))])
		.range([0, 70]);

	region = g_regions
		.selectAll(".region")
		.data(lvl4, (d) => d.properties.code)
		.join("path")
		.attr("class", "region")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.terrainDark)
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
		.attr("stroke", colors.terrainDark)
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
		.attr("stroke", colors.terrainDark)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d))
		.on("click", (event, d) => {
			event.stopPropagation();
			if (selectedMunicipality) {
				setSelectedMunicipality(undefined);
			} else {
				const { code, label } = d.properties;
				const selected = { code, label };
				setSelectedMunicipality(selected);
			}
		});

	let geoFeaturesArr;
	if (selectedMunicipality) {
		console.log("a municipality");
		geoFeaturesArr = lvl8;
		mode = "municipality";
		kLimit = 35;
		region.attr("opacity", 0.5);
		province.attr("opacity", 0.5);
		municipality
			.attr("display", "none")
			.filter((d) => d.properties.code === selectedMunicipality.code)
			.attr("display", "block")
			.each(zoomToArea);
	} else if (selectedProvince) {
		console.log("a province");
		geoFeaturesArr = lvl8;
		mode = "province";
		kLimit = 35;
		region.attr("opacity", 0.5);
		province
			.attr("opacity", 0.5)
			.filter((d) => d.properties.code === selectedProvince.code)
			.attr("opacity", 1)
			.each(zoomToArea);
		municipality.attr("display", "block");
	} else if (selectedRegion) {
		console.log("a region");
		geoFeaturesArr = lvl6;
		mode = "region";
		kLimit = 35;
		region
			.attr("opacity", 0.5)
			.filter((d) => d.properties.code === selectedRegion.code)
			.attr("opacity", 1)
			.each(zoomToArea);
		municipality.attr("display", "block");
	} else {
		console.log("all Italy");
		geoFeaturesArr = lvl4;
		mode = undefined; // italy
		kLimit = 1.4;
		region.attr("opacity", 1);
		province.attr("opacity", 1);
		municipality.attr("opacity", 1);
		zoomToArea(undefined);
	}

	data = compileVentagliData(data, geoFeaturesArr);

	ventaglio = g_ventagli
		.selectAll(".ventaglio")
		.data(data, (d) => d.code)
		.join("g")
		.attr("class", "ventaglio")
		.classed("overlapping", false)
		.on("click", (event, d) => {
			if (mode === "municipality") {
				console.log("Clicked.", d);
				setSelectedMunicipality(undefined);
			} else if (mode === "province") {
				const { code, label } = d;
				const selected = { code, label };
				setSelectedMunicipality(selected);
			} else if (mode === "region") {
				const { code, label } = d;
				const selected = { code, label };
				setSelectedProvince(selected);
			} else {
				const { code, label } = d;
				const selected = { code, label };
				setSelectedRegion(selected);
			}
		})
		.each(function (d) {
			drawVentaglio(d, d3.select(this));
		});

	ticked(); // positions ventagli in correct place

	// simulation.nodes(data);
	// simulation.tick(120);
	// ticked();
	// simulation.alpha(1);
	// simulation.restart();

	function zoomToArea(d) {
		if (!d) {
			// console.log("zoom to italy");
			svg.call(zoom.transform, d3.zoomIdentity);
		} else {
			const [[x0, y0], [x1, y1]] = render.bounds(d);
			// const newScale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
			const zK = mode === "municipality" ? 0.25 : 1;
			const newScale = zK / Math.max((x1 - x0) / width, (y1 - y0) / height);
			svg.call(
				zoom.transform,
				d3.zoomIdentity
					.translate(width / 2, height / 2)
					.scale(newScale)
					.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
			);
		}
	}
};

function zoomed(transform) {
	// console.log(transform.k, kLimit);
	g.attr("transform", transform);
	const { x, y, k } = transform;
	_x = x;
	_y = y;
	_k = k;

	document.documentElement.style.setProperty("--stroke-width", 1 / k);
	ventaglio.attr("transform", (d) => `translate(${d.x}, ${d.y}) scale(${1 / (k >= kLimit ? kLimit : k)})`);
	// simulation.force("collide").radius((d) => getRadius(d, 0.75) / _k);
	// simulation.alpha(1);
	// simulation.restart();
}

// simulation
function ticked() {
	ventaglio.attr("transform", (d) => `translate(${d.x}, ${d.y}) scale(${1 / (_k >= kLimit ? kLimit : _k)})`);
}

function compileVentagliData(data, arr) {
	data.forEach((area) => {
		const temp = arr.find((d) => d.properties.code === area.code);
		if (temp) {
			const centroid = projection(temp.properties.centroid.coordinates);
			area.x = centroid[0];
			area.y = centroid[1];
		} else {
			const centroidUnknown = projection([12.4, 39.3]);
			area.x = centroidUnknown[0];
			area.y = centroidUnknown[1];
		}
		area.maxRadius = scaleRadius(area.maxValue);
		area.history.forEach((date) => {
			const groups = date.groups;
			date.groups.forEach((group, i) => {
				group.innerRadius = i === 0 ? 0 : date.groups[i - 1].outerRadius;
				group.outerRadius = scaleRadius(group.value);
				group.valueDelta = i == 0 ? group.value : group.value - groups[i - 1].value;
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
	if (!mode || mode === "region") return;
	selection.classed("overlapping", false);
	selection.selectAll(".bubble").attr("display", "none");
	selection.selectAll("*:not(.bubble)").attr("display", "block");

	selection.each(function (d) {
		const elm_d = this;
		selection.each(function (e) {
			const elm_e = this;
			if (e === d) return;
			const _dist = dist([d.x, d.y], [e.x, e.y]);
			const d_maxRadius = d.history.slice(-1)[0].groups.slice(-1)[0].outerRadius;
			const e_maxRadius = e.history.slice(-1)[0].groups.slice(-1)[0].outerRadius;
			const _threshold = ((d_maxRadius + e_maxRadius) / _k) * 0.7;
			if (_dist < _threshold) {
				const selected_d = d3.select(elm_d);
				const selected_e = d3.select(elm_e);
				if (selected_d.classed("overlapping") || selected_e.classed("overlapping")) {
					return;
				} else {
					let hidden_elm;
					if (d.maxValue < e.maxValue) {
						hidden_elm = d3.select(elm_d);
					} else {
						hidden_elm = d3.select(elm_e);
					}
					hidden_elm.classed("overlapping", true);
					hidden_elm.selectAll(".bubble").attr("display", "block");
					hidden_elm.selectAll("*:not(.bubble)").attr("display", "none");
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
