import * as d3 from "d3";

import { colors, drawVentaglio, labelsDict } from "../../utils/ventagli.utils";
// import coastlinesData from "./coastlines.json";
import ventaglioSvg from "./ventaglio.svg";

const t_duration = 350;

let svg,
  width,
  height,
  legendWidth = 130,
  bgRect,
  projection,
  render,
  zoom,
  g,
  g_legend,
  g_geographies,
  bg_unknown_region,
  bg_unknown_region_margin = 25,
  g_regions,
  region,
  g_provinces,
  province,
  g_municipalities,
  municipality,
  g_ventagli,
  ventaglio,
  // areaLabel,
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
  initStrokeWidth = 1;

const scaleRadius = d3.scalePow();

const initialize = (element, viz_data) => {
  const { lvl4 } = viz_data;

  svg = d3.select(element);
  const bbox = svg.node().getBoundingClientRect();
  width = bbox.width - legendWidth;
  height = bbox.height;

  if (viz_data.viewbox) {
    width = viz_data.viewbox.width;
    height = viz_data.viewbox.height;
    svg.attr(
      "viewBox",
      `0 0 ${viz_data.viewbox.width} ${viz_data.viewbox.height}`
    );
  }

  bgRect = svg.select(".bgRect");
  if (bgRect.empty()) {
    bgRect = svg.append("rect").classed("bgRect", true);
  }
  bgRect
    .attr("fill", colors.lightBlue)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("pointer-events", "none");

  g = svg.select(".main-g");
  if (g.empty()) {
    g = svg.append("g").classed("main-g", true);
  }

  g_legend = svg.select(".g_legend");
  if (g_legend.empty()) {
    g_legend = svg
      .append("g")
      .classed("g_legend", true)
      .attr("id", "map")
      .attr("transform", `translate(${width} 0)`);
  }

  g_geographies = g.select(".g_geographies");
  if (g_geographies.empty()) {
    g_geographies = g
      .append("g")
      .classed("g_geographies", true)
      .attr("id", "map");
  }

  g_regions = g_geographies.select(".regions");
  if (g_regions.empty()) {
    g_regions = g_geographies
      .append("g")
      .classed("regions", true)
      .attr("id", "regions");
  }

  bg_unknown_region = g_geographies.select(".unknown-region-bg");
  if (bg_unknown_region.empty()) {
    bg_unknown_region = g_geographies
      .append("rect")
      .classed("unknown-region-bg", true)
      .attr("id", "unknown-region-bg");
  }

  g_provinces = g_geographies.select(".provinces");
  if (g_provinces.empty()) {
    g_provinces = g_geographies
      .append("g")
      .classed("provinces", true)
      .attr("id", "provinces");
  }

  g_municipalities = g_geographies.select(".municipalities");
  if (g_municipalities.empty()) {
    g_municipalities = g_geographies
      .append("g")
      .classed("municipalities", true)
      .attr("id", "municipalities");
  }

  g_ventagli = g.select(".g_ventagli");
  if (g_ventagli.empty()) {
    g_ventagli = g
      .append("g")
      .classed("g_ventagli", true)
      .attr("id", "ventagli");
  }
  ventaglio = g_ventagli.selectAll(".ventaglio");
  // areaLabel = g_ventagli.selectAll(".areaLabel");

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
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", ({ transform }) => zoomed(transform))
    .on("end", () => {
      ventaglio.call(handleOverlappings);
    });

  svg
    .call(zoom)
    .on("touchstart.zoom", null)
    .on("touchmove.zoom", null)
    .on("touchend.zoom", null)
    .on("touchcancel.zoom", null);
  update(viz_data);
};

const update = (viz_data) => {
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
    showDelta,
    timeStep,
  } = viz_data;

  if (viz_data.viewbox) {
    width = viz_data.viewbox.width;
    height = viz_data.viewbox.height;
    svg.attr(
      "viewBox",
      `0 0 ${viz_data.viewbox.width} ${viz_data.viewbox.height}`
    );
  }

  scaleRadius
    .exponent(1 / 2)
    .domain([0, d3.max(extent.map((d) => d.value[1]))])
    .range([0, 40]);

  renderLegend(g_legend, viz_data);

  bg_unknown_region
    .attr("x", width - (scaleRadius.range()[1] + bg_unknown_region_margin) * 2)
    .attr("width", (scaleRadius.range()[1] + bg_unknown_region_margin) * 2)
    .attr("height", (scaleRadius.range()[1] + bg_unknown_region_margin) * 2)
    .attr("fill", "white")
    .attr("opacity", 0.6);

  region = g_regions
    .selectAll(".region")
    .data(lvl4, (d) => d.properties.code)
    .join("path")
    .attr("id", (d) => "r-" + d.properties.label.toLowerCase())
    .attr("class", "region area")
    .attr("fill", colors.terrain)
    .attr("stroke", colors.terrainDark)
    .attr("stroke-width", initStrokeWidth + "px")
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
    .attr("class", "province area")
    .attr("id", (d) => "p-" + d.properties.label.toLowerCase())
    .attr("fill", colors.terrain)
    .attr("stroke", colors.terrainDark)
    .attr("stroke-width", initStrokeWidth + "px")
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
    .attr("class", "municipality area")
    .attr("id", (d) => "m-" + d.properties.label.toLowerCase())
    .attr("fill", colors.terrain)
    .attr("stroke", colors.terrainDark)
    .attr("stroke-width", initStrokeWidth + "px")
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
    // console.log("a municipality");
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
    // console.log("a province");
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
    // console.log("a region");
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
    // console.log("all Italy");
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
    .attr("id", (d) => "v-" + d.label)
    .attr("cursor", (d) => (d.code === 0 || d.code === "0" ? "" : "pointer"))
    .classed("overlapping", false)
    .on("click", (event, d) => {
      if (d.code === 0 || d.code === "0") {
        // do nothing if unknown region
      } else if (mode === "municipality") {
        // console.log("Clicked.", d);
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
      drawVentaglio(d, d3.select(this), showDelta);
    });

  ventaglio.call(handleOverlappings);

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

  // document.documentElement.style.setProperty("--initial-stroke-width", 1 / k);
  ventaglio.attr(
    "transform",
    (d) => `translate(${d.x}, ${d.y}) scale(${1 / (k >= kLimit ? kLimit : k)})`
  );
  region.attr("stroke-width", initStrokeWidth / k);
  province.attr("stroke-width", initStrokeWidth / k);
  municipality.attr("stroke-width", initStrokeWidth / k);
  // simulation.force("collide").radius((d) => getRadius(d, 0.75) / _k);
  // simulation.alpha(1);
  // simulation.restart();
}

// simulation
function ticked() {
  ventaglio.attr(
    "transform",
    (d) =>
      `translate(${d.x}, ${d.y}) scale(${1 / (_k >= kLimit ? kLimit : _k)})`
  );
}

function compileVentagliData(data, arr) {
  data.forEach((area) => {
    const temp = arr.find((d) => d.properties.code === area.code);
    if (temp) {
      const centroid = projection(temp.properties.centroid.coordinates);
      area.x = centroid[0];
      area.y = centroid[1];
    } else {
      // const centroidUnknown = projection([12.4, 39.3]);
      // area.x = centroidUnknown[0];
      // area.y = centroidUnknown[1];
      area.x = width - scaleRadius.range()[1] - bg_unknown_region_margin;
      area.y = scaleRadius.range()[1] * 1.3 + bg_unknown_region_margin;
    }
    area.maxRadius = scaleRadius(area.maxValue);
    //
    area.history.forEach((date) => {
      const groups = date.groups;
      date.groups.forEach((group, i) => {
        group.innerRadius = i === 0 ? 0 : date.groups[i - 1].outerRadius;
        group.outerRadius = scaleRadius(group.value);
        group.diffValue =
          i == 0 ? group.value : group.value - groups[i - 1].value;
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
      const d_maxRadius = d.history
        .slice(-1)[0]
        .groups.slice(-1)[0].outerRadius;
      const e_maxRadius = e.history
        .slice(-1)[0]
        .groups.slice(-1)[0].outerRadius;
      const _threshold = ((d_maxRadius + e_maxRadius) / _k) * 0.8;
      if (_dist < _threshold) {
        const selected_d = d3.select(elm_d);
        const selected_e = d3.select(elm_e);
        if (
          selected_d.classed("overlapping") ||
          selected_e.classed("overlapping")
        ) {
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

function renderLegend(selection, data) {
  const { timeStep, dateFrom, dateTo } = data;
  const legendBBox = selection.node().getBBox();

  selection.selectAll("*").remove();
  selection
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", height)
    .attr("fill", "white");

  const howToRead = selection
    .append("g")
    .attr("transform", "translate(10, 12)");

  const howToReadText = howToRead.append("text").attr("font-size", 14);
  howToReadText
    .append("tspan")
    .attr("font-size", 12)
    .attr("font-weight", "600")
    .text("How to read");
  howToReadText.append("tspan").text("A slice is ").attr("x", 0).attr("dy", 18);
  const timeStepText = howToReadText.append("tspan").text(timeStep);
  const tstBBox = timeStepText.node().getBBox();
  howToRead
    .append("rect")
    .attr("fill", "#F1F5F1")
    .attr("rx", 4)
    .attr("x", tstBBox.x - 2)
    .attr("y", tstBBox.y)
    .attr("width", tstBBox.width + 4)
    .attr("height", tstBBox.height + 1)
    .lower();

  howToReadText.append("tspan").text("from").attr("x", 0).attr("dy", 36);
  const dateFromText = howToReadText
    .append("tspan")
    .text(dateFrom)
    .attr("x", 0)
    .attr("dy", 18);
  const dftBBox = dateFromText.node().getBBox();
  howToRead
    .append("rect")
    .attr("fill", "#F1F5F1")
    .attr("rx", 4)
    .attr("x", dftBBox.x - 2)
    .attr("y", dftBBox.y)
    .attr("width", dftBBox.width + 4)
    .attr("height", dftBBox.height + 1)
    .lower();
  // Ventaglio
  howToRead
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr(
      "d",
      `M${dftBBox.x + 2},${dftBBox.y + 18 + 6} l0,32 a 9 9 0 0 0 9,9 l4,0`
    );
  const ventaglio = howToRead.append("g").attr("transform", "translate(0,85)").lower();
  d3.svg(ventaglioSvg.src).then((document) => {
    const graphics = d3.select(document).select("svg").html();
    ventaglio.html(graphics);
  });

  howToReadText
    .append("tspan")
    .attr("text-anchor", "end")
    .attr("x", legendWidth - 10)
    .attr("dy", 90)
    .text("to");
  const dateToText = howToReadText
    .append("tspan")
    .attr("text-anchor", "end")
    .text(dateTo)
    .attr("x", legendWidth - 10)
    .attr("dy", 18);
  const dttBBox = dateToText.node().getBBox();
  howToRead
    .append("rect")
    .attr("fill", "#F1F5F1")
    .attr("rx", 4)
    .attr("x", dttBBox.x - 2)
    .attr("y", dttBBox.y)
    .attr("width", dttBBox.width + 4)
    .attr("height", dttBBox.height + 1)
    .lower();
  howToRead
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr(
      "d",
      `M${dttBBox.x + dttBBox.width - 3},${
        dttBBox.y - 16
      } l0,-23 a-5 -5 0 0 0 -5,-5 l-2,0`
    );
  howToReadText
    .append("tspan")
    .attr("font-size", 12)
    .attr("font-weight", "600")
    .attr("x", 0)
    .attr("dy", 27)
    .text("Area");
  howToReadText
    .append("tspan")
    .text("Number")
    .attr("x", 0)
    .attr("dy", 18 * 5.7);
  howToReadText
    .append("tspan")
    .text("of monuments")
    .attr("x", 0)
    .attr("dy", 18);

  // Monuments status
  const monumentsStatus = selection
    .append("g")
    .attr("transform", "translate(10, 440)");
  const monumentsStatusText = monumentsStatus
    .append("text")
    .attr("font-size", 14);
  monumentsStatusText
    .append("tspan")
    .attr("font-size", 12)
    .text("Monument Status")
    .attr("font-weight", "600");
  const history = data.parentData?.data[0].history;
  if (history) {
    // For each available status
    history[0].groups.forEach((group) => {
      const min = history[0].groups.find((g) => g.label === group.label).value;
      const max = history[history.length - 1].groups.find(
        (g) => g.label === group.label
      ).value;
      const textElm = monumentsStatusText
        .append("tspan")
        .attr("x", 4)
        .attr("dy", 27)
        .text("+" + (max - min));
      const statusTextBBox = textElm.node().getBBox();
      monumentsStatus
        .append("rect")
        .attr("fill", colors[group.label])
        .attr("rx", 4)
        .attr("x", 0)
        .attr("y", statusTextBBox.y - 2)
        .attr("width", legendWidth - 15 + 4)
        .attr("height", statusTextBBox.height + 4)
        .lower();
      const tempText = selection
        .append("text")
        .text(labelsDict[group.label].explained)
        .call(wrap, legendWidth - 13);
      tempText.selectAll("tspan").each(function (d, i) {
        const tempTspan = d3.select(this);
        monumentsStatusText
          .append("tspan")
          .attr("x", 0)
          .attr("dy", i === 0 ? 24 : 18)
          .text(tempTspan.text());
      });
      tempText.remove();
    });
  }
}

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 18, // px
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")) || 0,
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy);

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy)
          .text(word);
      }
    }
  });
}

export { initialize, update };
