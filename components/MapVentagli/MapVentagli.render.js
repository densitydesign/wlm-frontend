import * as d3 from "d3";
import { collisionRadius, colors, drawVentaglio } from "../../utils/ventagli.utils";

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
	simulation,
	centroids;

const scaleRadius = d3.scaleSqrt().range([1, collisionRadius * 2]);

const initialize = (element, data) => {
	console.log("initialize", data);

	const {
		ventagli,
		extent,
		geographies,
		selectedRegion,
		selectedProvince,
		selectedMunicipality,
		typology,
		dateFrom,
		dateTo,
	} = data;

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

	g_municipalities = g_geographies.select(".municipalities");
	if (g_municipalities.empty()) {
		g_municipalities = g_geographies.append("g").classed("municipalities", true);
	}

	g_provinces = g_geographies.select(".provinces");
	if (g_provinces.empty()) {
		g_provinces = g_geographies.append("g").classed("provinces", true);
	}

	g_regions = g_geographies.select(".regions");
	if (g_regions.empty()) {
		g_regions = g_geographies.append("g").classed("regions", true);
	}

	g_ventagli = g.select(".g_ventagli");
	if (g_ventagli.empty()) {
		g_ventagli = g.append("g").classed("g_ventagli", true);
	}

	projection = d3
		.geoMercator()
		// .scale(1 / (2 * Math.PI))
		// .translate([0, 0])
		.fitSize([width, height], geographies.regions);

	render = d3.geoPath(projection);

	centroids = {};
	// for (const adminLevel in geographies) {
	// 	centroids[adminLevel] = geographies[adminLevel].features.map((d) => {
	// 		const key = d.properties[data.labelKey];
	// 		const centroid = render.centroid(d);
	// 		return { area: key, centroid: centroid };
	// 	});
	// }

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
	scaleRadius.domain(data.extent);

	region = g_regions
		.selectAll(".region")
		.data(data.geographies.regions.features, (d) => d.properties.DEN_REG)
		.join("path")
		.attr("class", "region")
		.attr("fill", colors.terrain)
		.attr("stroke", colors.white)
		.attr("stroke-width", "var(--stroke-width)")
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("d", (d) => render(d));

	if (data.selectedRegion) {
		region
			.attr("opacity", 0.65)
			.filter((d) => d.properties.DEN_REG === data.selectedRegion.label)
			.attr("stroke", (d) => colors.interactive)
			.attr("fill", "transparent")
			.raise();

		province = g_provinces
			.selectAll(".province")
			.data(
				data.geographies.provinces.features.filter((d) => d.properties.COD_REG === data.selectedRegion.code),
				(d) => d.properties.COD_UTS
			)
			.join("path")
			.attr("class", "province")
			.attr("fill", colors.terrain)
			.attr("stroke", colors.white)
			.attr("stroke-width", "var(--stroke-width)")
			.attr("stroke-linecap", "round")
			.attr("stroke-linejoin", "round")
			.attr("d", (d) => render(d));
	}

	if (data.selectedProvince) {
		province
			.attr("opacity", 0.65)
			.filter((d) => d.properties.DEN_UTS === data.selectedProvince.label)
			.attr("stroke", (d) => colors.interactive)
			.attr("fill", "transparent")
			.raise();

		municipality = g_municipalities
			.selectAll(".municipality")
			.data(
				data.geographies.municipalities.features.filter((d) => d.properties.COD_UTS === data.selectedProvince.code),
				(d) => d.properties.COMUNE
			)
			.join("path")
			.attr("class", "municipality")
			.attr("fill", colors.terrain)
			.attr("stroke", colors.white)
			.attr("stroke-width", "var(--stroke-width)")
			.attr("stroke-linecap", "round")
			.attr("stroke-linejoin", "round")
			.attr("d", (d) => render(d));

		if (data.selectedMunicipality) {
			municipality
				.filter((d) => d.properties.COMUNE === data.selectedMunicipality.label)
				.attr("stroke", (d) => colors.interactive)
				// .attr("fill", "transparent")
				.raise();
		}
	}

	return;

	data.ventagli = compileVentagliData(data.ventagli);
	ventaglio = g_ventagli
		.selectAll(".ventaglio")
		.data(data.ventagli, (d) => d[0])
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
			(exit) => exit
		);

	simulation.nodes(data.ventagli);
	simulation.alpha(1);
	simulation.tick(120);
	ticked();
	// simulation.restart();
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

function compileVentagliData(data) {
	ventagli.forEach((v) => {});

	data.forEach((area) => {
		const temp = centroids.find((d) => d.area === area[0]);
		if (temp) {
			area.x = temp.centroid[0];
			area.y = temp.centroid[1];
		}

		area[1].forEach((snapshot) => {
			const photographed = snapshot[1].find((d) => d.group === "photographed");
			photographed.innerRadius = 0;
			photographed.outerRadius = scaleRadius(photographed.valueIncremental);
			const authorized = snapshot[1].find((d) => d.group === "authorized");
			authorized.innerRadius = photographed.outerRadius;
			authorized.outerRadius = scaleRadius(authorized.valueIncremental);
			const mapped = snapshot[1].find((d) => d.group === "mapped");
			if (mapped) {
				mapped.innerRadius = authorized.outerRadius;
				mapped.outerRadius = scaleRadius(mapped.valueIncremental);
			}
		});
	});
	return data;
}
