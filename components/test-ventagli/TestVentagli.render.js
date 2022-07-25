import * as d3 from "d3";
// Values
let width, height, margin = {}, layout = {}, _cell = 200;
// D3 selections
let svg, svgDefs, g, fan, snapshot, monumentGroup;
// D3 scales
const scaleRadius = d3.scaleSqrt().range([0, _cell-20]);
// const scaleColor = d3.scaleOrdinal(["mapped", "authorized", "photographed"], ["#C3C5C3", "#F8FF0E", "#22B8B4"]); // "#F8FF0E"
// const background_color = "#f1f5f1"
const scaleColor = d3.scaleOrdinal(["mapped", "authorized", "photographed"], ["#F1F1F1", "#FDD666", "#009EB6"]); // "#F8FF0E"
const background_color = "#E3D1C4"
const fanOpening = 225;
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

  // Create the svg:defs element and the main gradient definition.
  svg.selectAll('defs').remove()
  svgDefs = svg.append('defs');

  var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient')
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%")

  // Create the stops of the main gradient. Each stop will be assigned
  // a class to style the stop using CSS.
  mainGradient.append('stop')
      .attr("stop-color", scaleColor("photographed"))
      .attr("stop-opacity", 1)
      .attr('offset', '0');

  mainGradient.append('stop')
      .attr("stop-color", background_color)
      .attr("stop-opacity", 1)
      .attr('offset', '0.5');

	scaleRadius.domain([0, dataExtent[1]]);
	update(data);
};

const update = (data) => {
	console.log("update", data);
  
  data = formatData(data);
  // const fanOpening = parseInt(scaleOpening(data[0][1].length))
  rotation = fanOpening / data[0][1].length

  fan = g.selectAll(".fan").data(data, d=>d[0])
    .join(
      enter => enter.append("g")
          .attr("transform", (d,i)=>{
            const x = i%layout.columns * _cell + _cell/2 + margin.left
            const y = Math.floor(i/layout.columns)*_cell + _cell/2 + margin.top
            console.log(x, y)
            return `translate(${x},${y})`
          })
          .classed("fan", true),
      update => update,
      exit => exit.remove()
    );
  
  snapshot = fan.selectAll(".snapshot").data(d=>d[1], d=>d[0])
    .join(
      enter => enter.append("g")
          .classed("snapshot", true)
          .attr("transform", (d,i)=>`rotate(${-fanOpening/2 + i*rotation})`)
          .attr("data-snapshot", d=>d[0]),
      update => update
        .call(update=>update.transition(500)
          .attr("transform", (d,i)=>`rotate(${-fanOpening/2 + i*rotation})`)),
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
    
  snapshot.selectAll("rect").data(d=>[d], d=>d[0])
    .enter().append("rect")
      .classed("fan-separator", true)
      .attr("x", 0)
      .attr("y", d=> -d[1].find(d=>d.group==="mapped").outerRadius)
      .attr("width", 0.25)
      .attr("height", d=>d[1].find(d=>d.group==="mapped").outerRadius)
      .attr("fill", "url(#mainGradient)")

  fan.selectAll(".label").data(d=>[d], d=>d[0])
    .join(
      enter => enter.append("text")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("y", 30)
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
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
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