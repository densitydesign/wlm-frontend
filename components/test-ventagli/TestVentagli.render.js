import * as d3 from "d3";
// Values
let width, height, margin = {}, layout = {}, _cell = 200;
const circularTicks = [1, 10, 50, 100, 250, 500, 750,2000,5000,10000,15000];
// D3 selections
let svg, svgDefs, g, fan, snapshot, monumentGroup, tick;
// D3 scales
const scaleRadius = d3.scaleSqrt().range([0, _cell/2]);
const scaleColor = d3.scaleOrdinal(["mapped", "authorized", "photographed"], ["#C3C5C3", "#F8FF0E", "#22B8B4"]); // "#F8FF0E"
const background_color = "#f1f5f1"
// const scaleColor = d3.scaleOrdinal(["mapped", "authorized", "photographed"], ["#F1F1F1", "#FDD666", "#009EB6"]); // "#F8FF0E"
// const background_color = "#E3D1C4"
const fanOpening = 150;
let rotation;

const initialize = (element, data, dataExtent) => {
	// console.log("initialize", element);
	svg = d3.select(element).style("background-color", background_color);
  const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;
  
  margin.left = width % _cell / 2
  margin.top = height % _cell / 2

  layout.columns = Math.floor(width/_cell)
  layout.rows = Math.floor(height/_cell)

  console.log(margin, layout)

	// destroy(element);
	g = svg.select("g");
	if (g.empty()) {
		g = svg.append("g").classed("main-group", true);
	}

	scaleRadius.domain([0, dataExtent[1]]);
	update(data);
};

const update = (data) => {
	console.log("update", data);
  
  data = formatData(data);
  // const fanOpening = parseInt(scaleOpening(data[0][1].length))
  rotation = fanOpening / data[0][1].length
  const total_opening = fanOpening + data[0][1].length -1

  fan = g.selectAll(".fan").data(data, d=>d[0])
    .join(
      enter => enter.append("g")
          .attr("transform", (d,i)=>{
            const x = i%layout.columns * _cell + _cell/2 + margin.left
            const y = Math.floor(i/layout.columns)*_cell + _cell/2 + margin.top
            return `translate(${x},${y}) rotate(${0})`
          })
          .classed("fan", true),
      update => update,
      exit => exit.remove()
    );
  
  snapshot = fan.selectAll(".snapshot").data(d=>d[1], d=>d[0])
    .join(
      enter => enter.append("g")
          .classed("snapshot", true)
          .attr("transform", (d,i)=>`rotate(${-total_opening/2 + i*rotation + i})`)
          .attr("data-snapshot", d=>d[0])
      ,
      update => update
        // .call(update=>update.transition(500)
        //   .attr("transform", (d,i)=>`rotate(${-fanOpening/2 + i*rotation})`))
      ,
      exit => exit.remove()
    )
  
  monumentGroup = snapshot.selectAll(".monumentGroup").data(d=>d[1], d=>d.group)
    .join(
      enter => enter.append("path")
          .classed("monumentGroup", true)
          .attr("data-group", d=>d[0])
          .attr("d", d=>drawSlice(d))
          .attr("fill", d=>scaleColor(d.group)),
      update => update
        .call(update=>update.transition(2500)
          .attr("d", d=>drawSlice(d))
          .attr("fill", d=>scaleColor(d.group))),
      exit => exit.remove()
    )
  
  tick = fan.selectAll(".ticks")
    .data(d=>{
      const last = d[1][d[1].length-1]
      const max = last[1].find(d=>d.group==="mapped").value
      const _right = circularTicks.filter(d=>d<=max).length +1
      const _left = Math.max(0, _right-5)
      return circularTicks.slice(_left,_right)
    }, d=>d)
    .join(
      enter => enter.append("g"),
      update => update,
      exit => exit.remove()
    )
  
  tick.append("path")
    .classed("ticks", true)
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-dasharray", "1, 2")
    .style("mix-blend-mode","multiply")
    .attr("d", d=>describeArc(0, 0, scaleRadius(d), -total_opening/2, total_opening/2))
  
  tick.append("text")
    .attr("x", (d,i)=>polarToCartesian(0, 0, scaleRadius(d), i%2===0?total_opening/2:-total_opening/2).x)
    .attr("y", (d,i)=>polarToCartesian(0, 0, scaleRadius(d), total_opening/2).y + 10)
    .attr("font-size", 10)
    .attr("text-anchor","middle")
    .attr("fill", "grey")
    .attr("stroke", "none")
    .style("mix-blend-mode","multiply")
    .text(d=>d.toString().includes("000") ? d.toString().replace("000","K").replace("K0","0K") : d)
      

  fan.selectAll(".label").data(d=>[d], d=>d[0])
    .join(
      enter => enter.append("text")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("y", 20)
        .text(d=>d[0]),
      update => update,
      exit => exit.remove()
    )
};

const destroy = (element) => {
	console.log("destroy", element);
	// d3.select(element).selectAll("*").remove();
};

export { initialize, update, destroy };

function formatData(data) {
  data.forEach(area=>{
    area[1].forEach(snapshot=>{
      const photographed = snapshot[1].find(d=>d.group==="photographed")
      photographed.innerRadius = 0;
      photographed.outerRadius = scaleRadius(photographed.value)
      const authorized = snapshot[1].find(d=>d.group==="authorized")
      authorized.innerRadius = photographed.outerRadius;
      authorized.outerRadius = scaleRadius(authorized.value)
      const mapped = snapshot[1].find(d=>d.group==="mapped")
      mapped.innerRadius = authorized.outerRadius;
      mapped.outerRadius = scaleRadius(mapped.value)
    })
  })
  return data
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: (centerX + (radius * Math.cos(angleInRadians))),
    y: (centerY + (radius * Math.sin(angleInRadians)))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M",
        // x, y, "L",
        start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        // "Z"
    ].join(" ");
    return d;
}

function drawSlice(d) {
  const x = 0
  const y = 0
  let path;
  if (d.innerRadius===0)
  {
    const radius = d.outerRadius;
    const startAngle = 0;
    const endAngle = rotation;
    const start = polarToCartesian(x, y, d.outerRadius, endAngle);
    const end = polarToCartesian(x, y, d.outerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    path = [
      "M",
      x, y,
      "L",
      start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ")
  }
  else {
    const outerRadius = d.outerRadius
    const outerStartAngle = 0
    const outerEndAngle = rotation
    const outerStart = polarToCartesian(x, y, outerRadius, outerEndAngle)
    const outerEnd = polarToCartesian(x, y, outerRadius, outerStartAngle)
    const outerLargeArcFlag = outerEndAngle - outerStartAngle <= 180 ? "0" : "1";

    const innerRadius = d.innerRadius
    const innerStartAngle = 0
    const innerEndAngle = rotation
    const innerStart = polarToCartesian(x, y, innerRadius, innerEndAngle)
    const innerEnd = polarToCartesian(x, y, innerRadius, innerStartAngle)
    const innerLargeArcFlag = innerEndAngle - innerStartAngle <= 180 ? "0" : "1"; 

    path = [
      "M",
      innerStart.x, innerStart.y,
      "L",
      outerStart.x, outerStart.y,
      "A", outerRadius, outerRadius, 0, outerLargeArcFlag, 0, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, innerLargeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ")
  }
  return path
}