import * as d3 from "d3";

import {
  colors,
  drawVentaglio,
  labelsDict,
  describeArc,
} from "../../utils/ventagli.utils";
import ventaglioSvg from "./ventaglio.svg";

const t_duration = 350;

let svg,
  width,
  height,
  legendWidth = 130,
  legendMargin,
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
  legendMargin = convertRemToPixels(0.5);

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
  // console.log("update", viz_data)
  const {
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
  const data = viz_data.data.ventagliData.data;
  const extent = viz_data.data.ventagliData.extent;

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
    // console.log("a region", lvl6);
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
    .attr("fill", "#fff");

  const howToRead = selection
    .append("text")
    .attr("font-size", 11)
    .attr("transform", `translate(${legendMargin}, ${legendMargin + 10})`);

  howToRead.append("tspan").attr("font-weight", "600").text("How to read:");
  howToRead
    .append("tspan")
    .attr("x", 0)
    .attr("dy", 14)
    .text("Each fan is a timeline");

  howToRead.append("tspan").attr("x", 0).attr("dy", 28).text("from");
  howToRead
    .append("tspan")
    .attr("font-size", 10)
    .attr("x", 0)
    .attr("dy", 14)
    .attr("fill", "#0978AB")
    .attr("font-weight", "600")
    .text(dateFrom);

  howToRead
    .append("tspan")
    .attr("x", legendWidth - legendMargin)
    .attr("dy", -14)
    .attr("text-anchor", "end")
    .text("to");
  howToRead
    .append("tspan")
    .attr("font-size", 10)
    .attr("x", legendWidth - legendMargin)
    .attr("dy", 14)
    .attr("text-anchor", "end")
    .attr("fill", "#0978AB")
    .attr("font-weight", "600")
    .text(dateTo);

  const ventaglio = selection
    .append("g")
    .attr(
      "transform",
      `translate(${(legendWidth - 110) / 2 + legendMargin},80)`
    );
  d3.svg(ventaglioSvg.src).then((document) => {
    const graphics = d3.select(document).select("svg").html();
    ventaglio.html(graphics);
  });

  howToRead
    .append("tspan")
    .attr("x", (legendWidth - legendMargin) / 2)
    .attr("dy", 82)
    .attr("text-anchor", "middle")
    .text("Each slice is ");

  howToRead
    .append("tspan")
    .attr("fill", "#0978AB")
    .attr("font-weight", "600")
    .text(timeStep?.toUpperCase());

  howToRead
    .append("tspan")
    .attr("x", 0)
    .attr("dy", 48)
    .text("Size is the number");
  howToRead.append("tspan").attr("x", 0).attr("dy", 14).text("of monuments");

  let areaType, areaName;
  if (data.selectedMunicipality) {
    areaType = "municipality";
    areaName = data.selectedMunicipality.label;
  } else if (data.selectedProvince) {
    areaType = "province";
    areaName = data.selectedProvince.label;
  } else if (data.selectedRegion) {
    areaType = "region";
    areaName = data.selectedRegion.label;
  } else {
    areaName = "Italy";
  }

  howToRead
    .append("tspan")
    .attr("x", 0)
    .attr("dy", 28)
    .attr("font-weight", "600")
    .text("Status and count");
  howToRead
    .append("tspan")
    .attr("x", 0)
    .attr("dy", 14)
    .attr("font-weight", "600")
    .text("of monuments");
  if (areaType) {
    howToRead
      .append("tspan")
      .attr("x", 0)
      .attr("dy", 14)
      .attr("fill", "#0978AB")
      .attr("font-weight", "600")
      .text("in the " + areaType);
  }
  howToRead
    .append("tspan")
    .attr("x", 0)
    .attr("dy", 14)
    .attr("fill", "#0978AB")
    .attr("font-weight", "600")
    .text("of " + areaName);
  howToRead
    .append("tspan")
    .attr("x", 0)
    .attr("dy", 7)
    .attr("font-size", 1)
    .text(" ");

  const history = data.data.parentData?.data[0].history;
  if (history) {
    history[0].groups.forEach((group) => {
      const min = history[0].groups.find((g) => g.label === group.label).value;
      const max = history[history.length - 1].groups.find(
        (g) => g.label === group.label
      ).value;

      const superSpan = howToRead.append("tspan").attr("x", 21).attr("dy", 14);

      if (!data.showDelta)
        superSpan
          .append("tspan")
          .attr("x", 21)
          .attr("dy", 14)
          .text(d3.format("~s")(max));
      superSpan
        .append("tspan")
        .attr("font-weight", "600")
        .text(labelsDict[group.label].explained)
        .call(wrap, legendWidth - legendMargin - 21, 21, 14, 0);
      superSpan
        .append("tspan")
        .attr("x", 21)
        .attr("dy", 14)
        .text(`(+${d3.format("~s")(max - min)} new)`);
      superSpan
        .append("tspan")
        .attr("x", 0)
        .attr("dy", 7)
        .attr("font-size", 1)
        .text(" ");

      const bbox = superSpan.node().getBBox();

      selection
        .append("rect")
        .attr("fill", colors[group.label])
        .attr("x", legendMargin)
        .attr("y", bbox.y + 21)
        .attr("width", 16)
        .attr("height", 16)
        .attr("rx", 3);
    });

    const minimized = howToRead
      .append("tspan")
      .text(
        "Minimized fans to reduce clutter. Color is the most recurrent status."
      )
      .call(wrap, legendWidth - legendMargin - 21, 21, 14, 14);
    const minimizedbbox = minimized.node().getBBox();
    history[0].groups.forEach((group, i) => {
      selection
        .append("circle")
        .attr("r", 4)
        .attr("cx", legendMargin + 7)
        .attr("cy", minimizedbbox.y + 28 + i * 14)
        .attr("fill", colors[group.label])
        .attr("stroke", d3.color(colors[group.label]).darker(1));
    });
  }

  if (data.showDelta) {
    howToRead
      .append("tspan")
      .attr("x", 0)
      .attr("dy", 7)
      .attr("font-size", 1)
      .text(" ");
    const noData = howToRead
      .append("tspan")
      .attr("x", 21)
      .attr("dy", 14)
      .text("No data to display");

    const noDataBBox = noData.node().getBBox();

    selection
      .append("path")
      .attr("d", describeArc(0, 0, 10, -50, 50).replace("M", "M0,0 ") + " Z")
      .attr("transform", `translate(${legendMargin + 6}, ${noDataBBox.y + 31})`)
      .attr("stroke", "#adb5bd")
      .attr("fill", "url(#tick-background)");
  }

  const credits = selection.append("g");
  credits
    .append("image")
    .attr("width", 15)
    .attr("height", 15)
    .attr("href", "https://mirrors.creativecommons.org/presskit/icons/cc.svg");
  credits
    .append("image")
    .attr("x", 20)
    .attr("width", 15)
    .attr("height", 15)
    .attr("href", "https://mirrors.creativecommons.org/presskit/icons/by.svg");

  credits
    .append("text")
    .attr("transform", "translate(0, 0)")
    .attr("x", 50)
    .attr("font-size", 10)
    .text(
      "Work by DensityDesign (Politecnico di Milano) & Wikimedia Italia. License: Creative Commons Attribution 4.0 International."
    )
    .call(wrap, legendWidth - legendMargin);

  const creditsbbox = credits.node().getBBox();
  credits.attr(
    "transform",
    `translate(${legendMargin}, ${height - creditsbbox.height - legendMargin})`
  );
}

function wrap(text, width, x = 0, dy = 14, firstdy = 14, firstdx = 0) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      y = text.attr("y"),
      // dy = 0 || parseFloat(text.attr("dy")) || 0,
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dx", firstdx)
        .attr("dy", dy + firstdy);

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        lineNumber++;
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy)
          .text(word);
      }
    }
  });
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export { initialize, update };
