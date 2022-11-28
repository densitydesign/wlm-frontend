import * as d3 from "d3";

const colors = {
  blueJeans: "#0978AB",
  lightBlue: "#9AE5FC",
  terrain: "#ECE5E0",
  terrainDark: "#A4988F",
  terrainLight: "#F8F5F3",
  terrainLightOuter: "#D9D3CF",
  coastlines: "#e7fdfe",
  white: "#ffffff",
  onWIki: "#C3C5C3",
  onWiki: "#C3C5C3",
  inContest: "#F8FF0E",
  photographed: "#22B8B4",
  interactive: "#FF004D",
  withPicture: "#FF4F00",
  onWikidataOnly: "#C3C5C3",
};

const labelsDict = {
  onWIki: {
    explained: "Monuments on Wikidata",
  },
  onWiki: {
    explained: "Monuments on Wikidata",
  },
  inContest: {
    explained: "Monuments in contest",
  },
  photographed: {
    explained: "Photographed during the contest",
  },
  withPicture: {
    explained: "With at least one photo",
  },
  onWikidataOnly: { explained: "Monuments on Wikidata" },
};

const availableStatuses = [
  {
    mode: "wlm",
    label: "Wiki Loves Monuments",
    statuses: [
      { code: "onWiki", explained: "Monuments on Wikidata" },
      { code: "inContest", explained: "Monuments in contest" },
      {
        code: "photographed",
        explained: "Photographed during the contest",
      },
    ],
  },
  {
    mode: "commons",
    label: "Wikidata Relevant Picture",
    statuses: [
      { code: "onWikidataOnly", explained: "Monuments on Wikidata" },
      { code: "withPicture", explained: "Monuments with at least one photo" },
    ],
  },
];

const collisionRadius = 70;
const fanOpening = 150;
let rotation;
const initLabelSize = 11;
const initAxisLabelSize = 7;

const drawVentaglio = (datum, ventaglio, showDelta) => {
  const data = [datum];

  rotation = fanOpening / data[0].history.length;

  ventaglio
    .selectAll(".tickBg")
    .data(
      (d) => dataTick(d).slice(0, 1),
      (d) => d.code
    )
    .join("path")
    .attr("d", (d) => {
      const r = d.outerRadius;
      const start = -fanOpening / 2;
      const end = fanOpening / 2;
      return describeArc(0, 0, r, start, end);
    })
    .attr("stroke", "none")
    .attr("fill", "url(#tick-background)")
    .classed("tickBg", true)
    .lower();

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
      const predominant = groups.reduce((prev, current) =>
        prev.diffValue > current.diffValue ? prev : current
      );
      return colors[predominant.label];
    })
    .attr("stroke", "#fff")
    .attr("r", 4)
    .attr("display", "none");

  const snapshot = ventaglio
    .selectAll(".snapshot")
    .data(
      (d) => d.history,
      (d) => d.date
    )
    .join("g")
    .attr("class", "snapshot")
    .style("display", "block")
    .attr("transform", (d, i) => `rotate(${-fanOpening / 2 + rotation * i})`)
    .attr("title", (d) => d.date);

  snapshot
    .selectAll("title")
    .data(
      (d) => [d.date],
      (d) => d.date
    )
    .join("title")
    .text((d) => d);

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
      (update) =>
        update
          .attr("fill", (d) => colors[d.label])
          .attr("d", (d) => drawSlice(d)),
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
    .attr("font-family", "Noto Sans")
    .attr("font-size", initLabelSize)
    .attr("class", "label")
    .attr("paint-order", "stroke")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")

    .selectAll("tspan")
    .data(
      (d) => [d],
      (d) => d.code
    )
    .join("tspan")
    .attr("x", 0)
    .attr("y", 15)
    .text((d) => d.label || "Unknown Region");

  ventaglio
    .selectAll(".label")
    .clone(true)
    .attr("stroke", "none")
    .attr("paint-order", null)
    .attr("stroke", null)
    .attr("stroke-width", null)
    .attr("stroke-linecap", null)
    .attr("stroke-linejoin", null);

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
    .on("mouseenter", function () {
      d3.select(this).raise();
    });

  tick
    .selectAll(".axis")
    .data(
      (d) => [d],
      (d) => d
    )
    .join("path")
    .classed("axis", true)
    .attr("d", (d) => {
      const r = d.outerRadius;
      const start = -fanOpening / 2;
      const end = fanOpening / 2;
      return describeArc(0, 0, r, start, end);
    })
    .attr("stroke", "rgba(255,255,255,0.75)")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");

  tick
    .selectAll(".axisLabel")
    .data(
      (d) => [d],
      (d) => d
    )
    .join("text")
    .classed("axisLabel", true)
    .attr("paint-order", "stroke")
    .attr("stroke", (d) => d3.color(colors[d.label]).darker(2))
    .attr("stroke-width", 2)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("font-size", initLabelSize * 0.6)
    .attr("font-weight", 500)
    .attr("x", (d) => {
      const r = d.outerRadius;
      let a = fanOpening / 2;
      return polarToCartesian(0, 0, r, a).x;
    })
    .attr("y", (d) => {
      const r = d.outerRadius;
      const a = fanOpening / 2;
      return polarToCartesian(0, 0, r, a).y + 7;
    })
    .attr("text-anchor", "start")
    .selectAll("tspan")
    .data(
      (d) => [d],
      (d) => d
    )
    .join("tspan")
    .text((d) => {
      return showDelta
        ? "+" + d.value?.toLocaleString()
        : d.value?.toLocaleString();
    });
  tick
    .selectAll(".axisLabel")
    .clone(true)
    .attr("stroke", "none")
    .attr("paint-order", null)
    .attr("stroke", null)
    .attr("stroke-width", null)
    .attr("stroke-linecap", null)
    .attr("stroke-linejoin", null)
    .attr("fill", (d) => d3.color(colors[d.label]).brighter(3));

  ventaglio
    .selectAll(".placeHolder")
    .data([1])
    .join("path")
    .attr("class", "placeHolder")
    .attr("d", (d) => {
      const r = 10;
      const start = -fanOpening / 3;
      const end = fanOpening / 3;
      return describeArc(0, 0, r, start, end).replace("M", "M0,0 ") + " Z";
    })
    .attr("stroke", "#adb5bd")
    .attr("fill", "url(#tick-background)")
    .style("display", "none")
    .classed("tickBg", true);
  
  console.log("Reset appearence")
  // reset appearence
  // set appearence according to data
  if (showDelta) {
    const finalValue = datum.history
      .slice(-1)[0]
      .groups.slice(-1)[0].absoluteValue;
    const finalLabel = datum.history.slice(-1)[0].groups.slice(-1)[0].label;
    let initialValue = datum.previous.groups.find(
      (d) => d.label === finalLabel
    ).value;
    if (initialValue === finalValue) {
      ventaglio.selectAll(".placeHolder").style("display", "block");
      ventaglio.selectAll(".snapshot").style("display", "none");
      ventaglio.selectAll(".bubble").style("display", "none");
    }
  }
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
    path = [
      "M",
      x,
      y,
      "L",
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
      "Z",
    ].join(" ");
  } else {
    const outerRadius = d.outerRadius;
    const outerStartAngle = 0;
    const outerEndAngle = rotation - 1;
    const outerStart = polarToCartesian(x, y, outerRadius, outerEndAngle);
    const outerEnd = polarToCartesian(x, y, outerRadius, outerStartAngle);
    const outerLargeArcFlag =
      outerEndAngle - outerStartAngle <= 180 ? "0" : "1";

    const innerRadius = d.innerRadius;
    const innerStartAngle = 0;
    const innerEndAngle = rotation - 1;
    const innerStart = polarToCartesian(x, y, innerRadius, innerEndAngle);
    const innerEnd = polarToCartesian(x, y, innerRadius, innerStartAngle);
    const innerLargeArcFlag =
      innerEndAngle - innerStartAngle <= 180 ? "0" : "1";

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
  // for (let i = groups.length - 1; i >= 0; i--) {
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    if (g.value === 0) continue;
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
  return data.reverse();
}

export {
  colors,
  collisionRadius,
  drawVentaglio,
  labelsDict,
  availableStatuses,
};
