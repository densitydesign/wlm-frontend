import * as d3 from "d3";
import imageCC from "./cc.svg";
import imageBY from "./by.svg";

import {
  colors,
  drawVentaglio,
  labelsDict,
  describeArc,
} from "../../utils/ventagli.utils";
import ventaglioSvg from "./ventaglio.svg";
import ventaglioSmallSvg from "./ventaglioSmall.svg";

export default class MapClass {
  constructor(element, params) {
    this.legendWidth = 0;
    this.legendHeight = 0;
    this.initStrokeWidth = 1;
    this._x = 0;
    this._y = 0;
    this._k = 1;
    this.kLimit = 1;
    this.mode = undefined;
    this.lvl4 = params.lvl4;
    this.scaleRadius = d3.scalePow();
    this.bg_unknown_region_margin = 25;
    this.legendMargin = convertRemToPixels(0.5);

    this.svg = d3.select(element);

    this.bgRect = this.svg.select(".bgRect");
    if (this.bgRect.empty()) {
      this.bgRect = this.svg.append("rect").classed("bgRect", true);
    }
    this.bgRect
      .attr("fill", colors.lightBlue)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("pointer-events", "none");

    this.g = this.svg.select(".main-g");
    if (this.g.empty()) {
      this.g = this.svg.append("g").classed("main-g", true);
    }

    this.g_legend = this.svg.select(".g_legend");
    if (this.g_legend.empty()) {
      this.g_legend = this.svg
        .append("g")
        .classed("g_legend", true)
        .attr("id", "map");
    }

    this.g_geographies = this.g.select(".g_geographies");
    if (this.g_geographies.empty()) {
      this.g_geographies = this.g
        .append("g")
        .classed("g_geographies", true)
        .attr("id", "map");
    }

    this.g_regions = this.g_geographies.select(".regions");
    if (this.g_regions.empty()) {
      this.g_regions = this.g_geographies
        .append("g")
        .classed("regions", true)
        .attr("id", "regions");
    }

    this.bg_unknown_region = this.g_geographies.select(".unknown-region-bg");
    if (this.bg_unknown_region.empty()) {
      this.bg_unknown_region = this.g_geographies
        .append("rect")
        .classed("unknown-region-bg", true)
        .attr("id", "unknown-region-bg");
    }

    this.g_provinces = this.g_geographies.select(".provinces");
    if (this.g_provinces.empty()) {
      this.g_provinces = this.g_geographies
        .append("g")
        .classed("provinces", true)
        .attr("id", "provinces");
    }

    this.g_municipalities = this.g_geographies.select(".municipalities");
    if (this.g_municipalities.empty()) {
      this.g_municipalities = this.g_geographies
        .append("g")
        .classed("municipalities", true)
        .attr("id", "municipalities");
    }

    this.g_ventagli = this.g.select(".g_ventagli");
    if (this.g_ventagli.empty()) {
      this.g_ventagli = this.g
        .append("g")
        .classed("g_ventagli", true)
        .attr("id", "ventagli");
    }

    this.ventaglio = this.g_ventagli.selectAll(".ventaglio");

    this.update(params);
  }

  zoomed(transform) {
    this.g.attr("transform", transform);
    const { x, y, k } = transform;
    this._x = x;
    this._y = y;
    this._k = k;

    this.ventaglio.attr(
      "transform",
      (d) =>
        `translate(${d.x}, ${d.y}) scale(${
          1 / (k >= this.kLimit ? this.kLimit : k)
        })`
    );

    this.region.attr("stroke-width", this.initStrokeWidth / k);
    this.province.attr("stroke-width", this.initStrokeWidth / k);
    this.municipality.attr("stroke-width", this.initStrokeWidth / k);
  }

  update(params) {
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
    } = params;
    let data = params.data.ventagliData.data;
    const extent = params.data.ventagliData.extent;

    this.legendWidth = 0;
    this.legendHeight = 0;

    if (params.viewbox && params.overlay) {
      if (params.overlay.label === "clean") {
        this.legendWidth = 0;
        this.legendHeight = 0;
      } else {
        if (params.viewbox?.value === "desktop") {
          this.legendWidth = 130 + 2 * this.legendMargin;
          this.legendHeight = 0;
        } else if (params.viewbox?.value === "mobile") {
          this.legendWidth = 0;
          if (params.overlay.label === "compact") {
            this.legendHeight = 60;
          } else if (params.overlay.label === "complete") {
            this.legendHeight = 120;
          }
        }
      }
    } else {
      this.legendWidth = 130 + 2 * this.legendMargin;
    }

    if (params.viewbox && params.overlay) {
      this.width = params.viewbox.width - this.legendWidth;
      this.height = params.viewbox.height - this.legendHeight;
      this.svg.attr(
        "viewBox",
        `0 0 ${params.viewbox.width} ${params.viewbox.height}`
      );
    } else {
      const bbox = this.svg.node().getBoundingClientRect();
      this.width = bbox.width - this.legendWidth;
      this.height = bbox.height - this.legendHeight;
      this.svg.attr("width", null).attr("height", null).attr("viewBox", null);
    }

    if (params.viewbox?.value === "mobile") {
      this.g_legend.attr("transform", `translate(${0} ${this.height})`);
    } else {
      this.g_legend.attr("transform", `translate(${this.width} 0)`);
    }

    this.projection = d3.geoMercator().fitSize([this.width, this.height], {
      type: "FeatureCollection",
      features: this.lvl4,
    });

    this.render = d3.geoPath(this.projection);

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 1 << 10])
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .translateExtent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", ({ transform }) => this.zoomed(transform))
      .on("end", () => {
        this.handleOverlappings(this.ventaglio);
      });

    this.svg
      .call(this.zoom)
      .on("touchstart.zoom", null)
      .on("touchmove.zoom", null)
      .on("touchend.zoom", null)
      .on("touchcancel.zoom", null);

    this.scaleRadius
      .exponent(1 / 2)
      .domain([0, d3.max(extent.map((d) => d.value[1]))])
      .range([0, 40]);

    this.renderLegend(this.g_legend, params);
    this.bg_unknown_region
      .attr(
        "x",
        this.width -
          (this.scaleRadius.range()[1] + this.bg_unknown_region_margin) * 2
      )
      .attr(
        "width",
        (this.scaleRadius.range()[1] + this.bg_unknown_region_margin) * 2
      )
      .attr(
        "height",
        (this.scaleRadius.range()[1] + this.bg_unknown_region_margin) * 2
      )
      .attr("fill", "white")
      .attr("opacity", 0.6);

    this.region = this.g_regions
      .selectAll(".region")
      .data(lvl4, (d) => d.properties.code)
      .join("path")
      .attr("id", (d) => "r-" + d.properties.label.toLowerCase())
      .attr("class", "region area")
      .attr("fill", colors.terrain)
      .attr("stroke", colors.terrainDark)
      .attr("stroke-width", this.initStrokeWidth + "px")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", (d) => this.render(d))
      .on("click", (event, d) => {
        event.stopPropagation();
        const { code, label } = d.properties;
        const selected = { code, label };
        setSelectedMunicipality(undefined);
        setSelectedProvince(undefined);
        setSelectedRegion(selected);
      });

    this.province = this.g_provinces
      .selectAll(".province")
      .data(lvl6, (d) => d.properties.code)
      .join("path")
      .attr("class", "province area")
      .attr("id", (d) => "p-" + d.properties.label.toLowerCase())
      .attr("fill", colors.terrain)
      .attr("stroke", colors.terrainDark)
      .attr("stroke-width", this.initStrokeWidth + "px")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", (d) => this.render(d))
      .on("click", (event, d) => {
        event.stopPropagation();
        const { code, label } = d.properties;
        const selected = { code, label };
        setSelectedMunicipality(undefined);
        setSelectedProvince(selected);
      });

    this.municipality = this.g_municipalities
      .selectAll(".municipality")
      .data(lvl8, (d) => d.properties.code)
      .join("path")
      .attr("class", "municipality area")
      .attr("id", (d) => "m-" + d.properties.label.toLowerCase())
      .attr("fill", colors.terrain)
      .attr("stroke", colors.terrainDark)
      .attr("stroke-width", this.initStrokeWidth + "px")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", (d) => this.render(d))
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
      this.mode = "municipality";
      this.kLimit = 35;
      this.region.attr("opacity", 0.5);
      this.province.attr("opacity", 0.5);
      this.municipality
        .attr("display", "none")
        .filter((d) => d.properties.code === selectedMunicipality.code)
        .attr("display", "block")
        .each((d) => this.zoomToArea(d));
    } else if (selectedProvince) {
      // console.log("a province");
      geoFeaturesArr = lvl8;
      this.mode = "province";
      this.kLimit = 60;
      this.region.attr("opacity", 0.5);
      this.province
        .attr("opacity", 0.5)
        .filter((d) => d.properties.code === selectedProvince.code)
        .attr("opacity", 1)
        .each((d) => this.zoomToArea(d));
      this.municipality.attr("display", "block");
    } else if (selectedRegion) {
      // console.log("a region", lvl6);
      geoFeaturesArr = lvl6;
      this.mode = "region";
      this.kLimit = 35;
      this.region
        .attr("opacity", 0.5)
        .filter((d) => d.properties.code === selectedRegion.code)
        .attr("opacity", 1)
        .each((d) => this.zoomToArea(d));
      this.municipality.attr("display", "block");
    } else {
      // console.log("all Italy");
      geoFeaturesArr = lvl4;
      this.mode = undefined; // italy
      this.kLimit = 1.4;
      this.region.attr("opacity", 1);
      this.province.attr("opacity", 1);
      this.municipality.attr("opacity", 1);
      this.zoomToArea(undefined);
    }

    // console.log("kLimit", this.kLimit)

    data = this.compileVentagliData(data, geoFeaturesArr);

    this.ventaglio = this.g_ventagli
      .selectAll(".ventaglio")
      .data(data, (d) => d.code)
      .join("g")
      .attr("class", "ventaglio")
      .attr("id", (d) => "v-" + d.label)
      .attr("cursor", (d) => (d.code === 0 || d.code === "0" ? "" : "pointer"))
      .attr(
        "transform",
        (d) =>
          `translate(${d.x}, ${d.y}) scale(${
            1 / (this._k >= this.kLimit ? this.kLimit : this._k)
          })`
      )
      .classed("overlapping", false)
      .on("click", (event, d) => {
        if (d.code === 0 || d.code === "0") {
          // do nothing if unknown region
        } else if (this.mode === "municipality") {
          // console.log("Clicked.", d);
          setSelectedMunicipality(undefined);
        } else if (this.mode === "province") {
          const { code, label } = d;
          const selected = { code, label };
          setSelectedMunicipality(selected);
        } else if (this.mode === "region") {
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

    this.handleOverlappings(this.ventaglio);
  }

  renderLegend(selection, params) {
    const { timeStep, dateFrom, dateTo, viewbox, overlay } = params;
    const legendBBox = selection.node().getBBox();

    selection.selectAll("*").remove();
    let howToRead, howToRead2, ventaglio, areaType, areaName;

    if (params.selectedMunicipality) {
      areaType = "municipality";
      areaName = params.selectedMunicipality.label;
    } else if (params.selectedProvince) {
      areaType = "province";
      areaName = params.selectedProvince.label;
    } else if (params.selectedRegion) {
      areaType = "region";
      areaName = params.selectedRegion.label;
    } else {
      areaName = "Italy";
    }

    if (
      (!viewbox && !overlay) ||
      (viewbox?.value === "desktop" && overlay.label !== "clean")
    ) {
      selection
        .append("rect")
        .attr("width", this.legendWidth)
        .attr("height", this.height)
        .attr("fill", "#fff");

      howToRead = selection
        .append("text")
        .attr("font-size", 11)
        .attr("font-family", "Noto Sans")
        .attr(
          "transform",
          `translate(${this.legendMargin}, ${this.legendMargin + 10})`
        );

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
        .attr("x", this.legendWidth - 2 * this.legendMargin)
        .attr("dy", -14)
        .attr("text-anchor", "end")
        .text("to");
      howToRead
        .append("tspan")
        .attr("font-size", 10)
        .attr("x", this.legendWidth - 2 * this.legendMargin)
        .attr("dy", 14)
        .attr("text-anchor", "end")
        .attr("fill", "#0978AB")
        .attr("font-weight", "600")
        .text(dateTo);

      if ((!viewbox && !overlay) || overlay?.label === "complete") {
        ventaglio = selection
          .append("g")
          .attr(
            "transform",
            `translate(${(this.legendWidth - 110) / 2 + this.legendMargin},80)`
          );
        d3.svg(ventaglioSvg.src).then((document) => {
          const graphics = d3.select(document).select("svg").html();
          ventaglio.html(graphics);
        });

        howToRead
          .append("tspan")
          .attr("x", (this.legendWidth - this.legendMargin) / 2)
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
        howToRead
          .append("tspan")
          .attr("x", 0)
          .attr("dy", 14)
          .text("of monuments");
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

      if ((!viewbox && !overlay) || overlay?.label === "complete") {
        const history = params.data.parentData?.data[0].history;
        if (history) {
          history[0].groups.forEach((group) => {
            const min = history[0].groups.find(
              (g) => g.label === group.label
            ).value;
            const max = history[history.length - 1].groups.find(
              (g) => g.label === group.label
            ).value;

            const superSpan = howToRead
              .append("tspan")
              .attr("x", 21)
              .attr("dy", 14);

            if (!params.showDelta)
              superSpan
                .append("tspan")
                .attr("x", 21)
                .attr("dy", 14)
                .text(d3.format("~s")(max));
            superSpan
              .append("tspan")
              .attr("font-weight", "600")
              .text(labelsDict[group.label].explained)
              .call(wrap, this.legendWidth - this.legendMargin - 21, 21, 14, 0);
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
              .attr("x", this.legendMargin)
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
            .call(
              wrap,
              this.legendWidth - 2 * this.legendMargin - 21,
              21,
              14,
              14
            );
          const minimizedbbox = minimized.node().getBBox();
          history[0].groups.forEach((group, i) => {
            selection
              .append("circle")
              .attr("r", 4)
              .attr("cx", this.legendMargin + 7)
              .attr("cy", minimizedbbox.y + 28 + i * 14)
              .attr("fill", colors[group.label])
              .attr("stroke", d3.color(colors[group.label]).darker(1));
          });
        }
      }

      if (params.showDelta) {
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
          .attr(
            "d",
            describeArc(0, 0, 10, -50, 50).replace("M", "M0,0 ") + " Z"
          )
          .attr(
            "transform",
            `translate(${this.legendMargin + 6}, ${noDataBBox.y + 31})`
          )
          .attr("stroke", "#adb5bd")
          .attr("fill", "url(#tick-background)");
      }

      const credits = selection.append("g");

      d3.svg(imageCC.src).then((importedDocument) => {
        const g = credits.append("g");
        g.node().appendChild(importedDocument.querySelector("svg"));
        const bbox = g.node().getBBox();
        if (bbox.width !== 0) {
          g.attr("transform", `scale(${15 / bbox.width})`);
        } else {
          g.attr("transform", `scale(0)`);
        }
      });

      d3.svg(imageBY.src).then((importedDocument) => {
        const g = credits.append("g");
        g.node().appendChild(importedDocument.querySelector("svg"));
        const bbox = g.node().getBBox();
        if (bbox.width !== 0) {
          g.attr("transform", `translate(20,0) scale(${15 / bbox.width})`);
        } else {
          g.attr("transform", `scale(0)`);
        }
      });

      credits
        .append("text")
        .attr("transform", "translate(0, 0)")
        .attr("x", 50)
        .attr("font-size", 10)
        .text(
          "Work by DensityDesign (Politecnico di Milano) & Wikimedia Italia. License: Creative Commons Attribution 4.0 International."
        )
        .call(wrap, this.legendWidth - this.legendMargin);

      const creditsbbox = credits.node().getBBox();
      credits.attr(
        "transform",
        `translate(${this.legendMargin}, ${
          this.height - creditsbbox.height - this.legendMargin * 2.5
        })`
      );
    } else if (viewbox?.value === "mobile" && overlay.label !== "clean") {
      selection
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.legendHeight)
        .attr("fill", "#fff");

      howToRead = selection
        .append("text")
        .attr("font-size", 11)
        .attr(
          "transform",
          `translate(${this.legendMargin}, ${this.legendMargin + 10})`
        );
      howToRead2 = selection
        .append("text")
        .attr("font-size", 9)
        .attr(
          "transform",
          `translate(${this.width / 2}, ${this.legendMargin + 26})`
        );
      howToRead
        .append("tspan")
        .attr("font-weight", "600")
        .text("Status and count of monuments ");

      if (areaType) {
        howToRead
          .append("tspan")
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text("in the " + areaType);
      }
      howToRead
        .append("tspan")
        .attr("fill", "#0978AB")
        .attr("font-weight", "600")
        .text(" of " + areaName);
      howToRead
        .append("tspan")
        .attr("x", 0)
        .attr("dy", 4)
        .attr("font-size", 1)
        .text(" ");

      if (overlay.label === "complete") {
        const history = params.data.parentData?.data[0].history;
        if (history) {
          history[0].groups.forEach((group) => {
            const min = history[0].groups.find(
              (g) => g.label === group.label
            ).value;
            const max = history[history.length - 1].groups.find(
              (g) => g.label === group.label
            ).value;

            const superSpan = howToRead
              .append("tspan")
              .attr("font-size", "9")
              .attr("x", 21)
              .attr("dy", 12);

            superSpan
              .append("tspan")
              .attr("font-weight", "600")
              .text(labelsDict[group.label].explained);
            if (!params.showDelta) {
              superSpan
                .append("tspan")
                .attr("x", 21)
                .attr("dy", 10)
                .text(d3.format("~s")(max) + " ");
            }
            superSpan
              .append("tspan")
              .attr("x", params.showDelta ? 21 : null)
              .attr("dy", params.showDelta ? 10 : null)
              .text(`(+${d3.format("~s")(max - min)} new)`);
            superSpan
              .append("tspan")
              .attr("x", 0)
              .attr("dy", 4)
              .attr("font-size", 1)
              .text(" ");

            const bbox = superSpan.node().getBBox();

            selection
              .append("rect")
              .attr("fill", colors[group.label])
              .attr("x", this.legendMargin)
              .attr("y", bbox.y + 21)
              .attr("width", 16)
              .attr("height", 16)
              .attr("rx", 3);
          });
        }

        const noDataMobile = howToRead
          .append("tspan")
          .attr("x", 21)
          .attr("dy", 14)
          .text("No data to display");

        const noDataBBoxMobile = noDataMobile.node().getBBox();

        selection
          .append("path")
          .attr(
            "d",
            describeArc(0, 0, 10, -50, 50).replace("M", "M0,0 ") + " Z"
          )
          .attr(
            "transform",
            `translate(${this.legendMargin + 7}, ${noDataBBoxMobile.y + 31})`
          )
          .attr("stroke", "#adb5bd")
          .attr("fill", "url(#tick-background)");

        const textTimeline = howToRead2.append("tspan");
        textTimeline
          .append("tspan")
          .text("Each fan is a timeline, each slice is ");
        textTimeline
          .append("tspan")
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text(timeStep?.toUpperCase());
        textTimeline.append("tspan").text(".");

        ventaglio = selection
          .append("g")
          .attr("transform", `translate(${this.width / 2 + 58},45) scale(0.8)`);
        d3.svg(ventaglioSmallSvg.src).then((document) => {
          const graphics = d3.select(document).select("svg").html();
          ventaglio.html(graphics);
        });

        howToRead2.append("tspan").attr("x", 0).attr("dy", 28).text("from");
        howToRead2
          .append("tspan")
          .attr("font-size", 10)
          .attr("x", 0)
          .attr("dy", 14)
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text(dateFrom);

        howToRead2
          .append("tspan")
          .attr("x", this.width / 2 - this.legendMargin)
          .attr("dy", -14)
          .attr("text-anchor", "end")
          .text("to");
        howToRead2
          .append("tspan")
          .attr("font-size", 10)
          .attr("x", this.width / 2 - this.legendMargin)
          .attr("dy", 14)
          .attr("text-anchor", "end")
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text(dateTo);
      } else if (overlay.label === "compact") {
        howToRead
          .append("tspan")
          .attr("x", 0)
          .attr("dy", 12)
          .text("Each fan is a timeline, each slice is ");
        howToRead
          .append("tspan")
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text(timeStep?.toUpperCase());
        howToRead.append("tspan").text(" from");
        howToRead
          .append("tspan")
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text(" " + dateFrom);
        howToRead.append("tspan").text(" to");
        howToRead
          .append("tspan")
          .attr("fill", "#0978AB")
          .attr("font-weight", "600")
          .text(" " + dateTo);
      }

      selection
        .append("text")
        .attr("font-size", 9)
        .attr(
          "transform",
          `translate(${this.width / 2}, ${this.legendHeight - 5})`
        )
        .attr("text-anchor", "middle")
        .attr("fill", "#808080")
        .text(
          "DensityDesign (Politecnico di Milano) & Wikimedia Italia. License: CC-BY 4.0"
        );
    }

    if (overlay?.label === "clean") {
      const simple_credits = selection
        .append("g")
        .attr("class", "simple-credits")
        .attr("transform", () => {
          return viewbox?.value === "desktop"
            ? `translate(${-this.width + this.legendMargin}, ${
                this.height - 3 * this.legendMargin
              })`
            : `translate(${this.legendMargin} -23)`;
        });

      d3.svg(imageCC.src).then((document) => {
        const graphics = d3.select(document).select("svg").html();
        // ventaglio.html(graphics);
        const g = simple_credits.append("g").html(graphics);
        const ccBBox = g.node().getBBox();
        g.attr("transform", `scale(${15 / ccBBox.width})`);
      });

      d3.svg(imageBY.src).then((document) => {
        const graphics = d3.select(document).select("svg").html();
        // ventaglio.html(graphics);
        const g = simple_credits.append("g").html(graphics);
        const ccBBox = g.node().getBBox();
        g.attr("transform", `translate(20,0) scale(${15 / ccBBox.width})`);
      });

      const sc_text = simple_credits
        .append("text")
        .attr("transform", () => {
          if (viewbox?.value === "desktop") {
            return "translate(44, 4)";
          } else {
            return "translate(42, 4)";
          }
        })
        .attr("font-size", 10);

      sc_text
        .append("tspan")
        .text(
          "Work by DensityDesign (Politecnico di Milano) & Wikimedia Italia."
        );

      sc_text
        .append("tspan")
        .attr("x", 0)
        .attr("dy", 12)
        .text("License: Creative Commons Attribution 4.0 International.");
    }
  }

  zoomToArea(d) {
    if (!d) {
      // console.log("zoom to italy");
      this.svg.call(this.zoom.transform, d3.zoomIdentity);
    } else {
      const [[x0, y0], [x1, y1]] = this.render.bounds(d);
      const zK = this.mode === "municipality" ? 0.25 : 1;
      const newScale =
        zK / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height);
      this.svg.call(
        this.zoom.transform,
        d3.zoomIdentity
          .translate(this.width / 2, this.height / 2)
          .scale(newScale)
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
      );
    }
  }

  handleOverlappings(selection) {
    const instance = this;
    if (!instance.mode || instance.mode === "region") return;
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

        const _threshold = ((d_maxRadius + e_maxRadius) / instance._k) * 0.8;
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

  compileVentagliData(data, arr) {
    data.forEach((area) => {
      const temp = arr.find((d) => d.properties.code === area.code);
      if (temp) {
        const centroid = this.projection(temp.properties.centroid.coordinates);
        area.x = centroid[0];
        area.y = centroid[1];
      } else {
        // const centroidUnknown = projection([12.4, 39.3]);
        // area.x = centroidUnknown[0];
        // area.y = centroidUnknown[1];
        area.x =
          this.width -
          this.scaleRadius.range()[1] -
          this.bg_unknown_region_margin;
        area.y =
          this.scaleRadius.range()[1] * 1.3 + this.bg_unknown_region_margin;
      }
      area.maxRadius = this.scaleRadius(area.maxValue);
      //
      area.history.forEach((date) => {
        const groups = date.groups;
        date.groups.forEach((group, i) => {
          group.innerRadius = i === 0 ? 0 : date.groups[i - 1].outerRadius;
          group.outerRadius = this.scaleRadius(group.value);
        });
      });
    });
    return data;
  }
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function dist([x1, y1], [x2, y2]) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
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
