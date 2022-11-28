import * as d3 from "d3";
import { colors } from "../../utils/ventagli.utils";
let svg,
  width,
  height,
  margin = {
    left: 35,
    right: 1,
    top: 4,
    bottom: 17,
  },
  areaChart,
  clipMask,
  timeScale = d3.scaleTime(),
  timeAxisGroup,
  quantityScale = d3.scaleLinear(),
  quantityAxisGroup;

const initialize = (element) => {
  svg = d3.select(element);

  quantityAxisGroup = svg.select(".quantityAxisGroup");
  if (quantityAxisGroup.empty()) {
    quantityAxisGroup = svg.append("g").classed("quantityAxisGroup", true);
  }

  areaChart = svg.selectAll(".areaChart");
  if (areaChart.empty()) {
    areaChart = svg.append("g").classed("areaChart", true);
  }

  timeAxisGroup = svg.select(".timeAxisGroup");
  if (timeAxisGroup.empty()) {
    timeAxisGroup = svg.append("g").classed("timeAxisGroup", true);
  }

  if (svg.select(".void-bg").empty()) {
    svg.append("rect").classed("void-bg", true);
  }

  if (svg.select(".void-message").empty()) {
    svg.append("text").classed("void-message", true);
  }
};

const update = (data, filterData, showDelta, timeStep) => {
  const bbox = svg.node().getBoundingClientRect();
  width = bbox.width;
  height = bbox.height;

  const temp = [];
  const keys = new Set();
  const dates = [];
  const amounts = [];
  const preservedGroups = filterData
    .filter((d) => d.active)
    .map((d) => d.label);
  data.data.forEach((area) => {
    area.history.forEach((date) => {
      const [year, month, day] = date.date.split("-");
      const _date = new Date(year, month - 1, day);
      dates.push(_date);
      const o = {
        date: _date,
      };
      const groups = date.groups.filter(
        (group) => preservedGroups.indexOf(group.label) !== -1
      );
      groups.forEach((group, i) => {
        let _value = group.value;
        if (i > 0) {
          _value -= groups[i - 1].value;
        }
        amounts.push(group.value);
        keys.add(group.label);
        o[group.label] = _value;
      });
      temp.push(o);
    });
  });
  svg.select(".void-bg").attr("width", 0).attr("height", 0);
  svg.select(".void-message").text(null);
  if (showDelta) {
    const finalValue = data.data[0].history
      .slice(-1)[0]
      .groups.slice(-1)[0].absoluteValue;
    const finalLabel = data.data[0].history
      .slice(-1)[0]
      .groups.slice(-1)[0].label;
    let initialValue = data.data[0].previous.groups.find(
      (d) => d.label === finalLabel
    ).value;
    if (initialValue === finalValue) {
      svg
        .select(".void-bg")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#eee")
        .attr("rx", 4)
        .attr("opacity", 0.85);

      svg
        .select(".void-message")
        .attr("x", width / 2)
        .attr("y", height / 2 + 4)
        .attr("text-anchor", "middle")
        .text("No increment to show");
    }
  }
  const stack = d3
    .stack()
    .keys(Array.from(keys))
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);
  const series = stack(temp);

  clipMask = svg
    .select("#cut-off")
    .select("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom);

  const timeExtent = d3.extent(dates);
  timeScale.domain(timeExtent).range([margin.left, width - margin.right]);

  const timeAxis = d3
    .axisBottom(timeScale)
    .tickValues(timeScale.ticks(5))
    .tickFormat(
      timeScale.tickFormat(5, timeStep.includes("day") ? "%d/%m" : "%m/%y")
    );
  timeAxisGroup
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(timeAxis);
  let _domain = d3.extent(amounts);

  if (showDelta) {
    _domain[0] = 0;
  }

  quantityScale.domain(_domain).range([height - margin.bottom, margin.top]);

  const quantityAxis = d3
    .axisRight(quantityScale)
    .tickValues(quantityScale.ticks(5))
    .tickFormat(quantityScale.tickFormat(5, "~s"));
  const arr = [];
  quantityAxisGroup
    .attr("transform", `translate(${0},0)`)
    .call(quantityAxis)
    .call((g) => {
      g.select(".domain").attr("display", "none");

      g.selectAll(".tick > text")
        .attr("x", 0)
        .each(function (d) {
          arr.push(this.getComputedTextLength());
        });

      g.selectAll(".tick > line")
        .attr("stroke-dasharray", "1, 4")
        .attr("x1", Math.ceil(d3.max(arr)) + 4)
        .attr("x2", width - margin.right);

      g.selectAll(".tick")
        .filter((d) => d === 0)
        .attr("display", "none");
    });

  const area = d3
    .area()
    .x((d) => timeScale(d.data.date))
    .y0((d) => quantityScale(d[0]))
    .y1((d) => quantityScale(d[1]))
    .curve(d3.curveStepBefore);

  areaChart
    .selectAll(".area")
    .data(series)
    .join("path")
    .attr("class", "area")
    .attr("clip-path", "url(#cut-off)")
    .attr("fill", (d) => colors[d.key])
    .attr("d", area);
};

export { initialize, update };
