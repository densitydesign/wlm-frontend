import * as d3 from "d3";
// Values
let width, height;
// D3 selections
let svg, g, fan, snapshot, monumentGroup;
// D3 scales
const scaleRadius = d3.scaleSqrt().range([0, 150]);
const scaleColor = d3.scaleOrdinal(["mapped", "authorized", "photographed"], ["#C3C5C3", "orange", "#22B8B4"]); // "#F8FF0E"
const scaleOpening = d3.scaleLinear([1,50], [45,180]);
let rotation;

const initialize = (element, data, dataExtent) => {
	// console.log("initialize", element);
	svg = d3.select(element);
  const bbox = svg.node().getBoundingClientRect();
	width = bbox.width;
	height = bbox.height;

	// destroy(element);
	g = svg.select("g");
	if (g.empty()) {
		g = svg.append("g").classed("main-group", true);
	}
  fan = g.selectAll(".fan")
	// snapshot = fan.selectAll(".snapshot");
	// monumentGroup = snapshot.selectAll(".monumentGroup");
	scaleRadius.domain([0, dataExtent[1]]);
	update(data);
};

const update = (data) => {
	console.log("update", data);
  
  data = formatData(data);

  const fanOpening = parseInt(scaleOpening(data[0][1].length))
  rotation = fanOpening / data[0][1].length

  fan = fan.data(data, d=>d[0])
    .join(
      enter => enter.append("g")
          .attr("transform", d=>`translate(${width/2},${height/2}) rotate(-${fanOpening/2})`)
          .classed("fan", true),
      update => update,
      exit => exit.remove()
    );
  
  fan.append("text").text(d=>d[0])
  
  snapshot = fan.selectAll(".snapshot").data(d=>d[1], d=>d[0])
    .join(
      enter => enter.append("g")
          .classed("snapshot", true)
          .attr("data-snapshot", d=>d[0])
          .attr("transform", (d,i)=>"rotate("+ i*rotation +")"),
      update => update.attr("data-snapshot", d=>d[0])
      .call(update=>update.transition(500)
        .attr("transform", (d,i)=>"rotate("+ i*rotation +")")),
      exit => exit.remove()
    )
  
  monumentGroup = snapshot.selectAll(".monumentGroup").data(d=>d[1], d=>d.group)
    .join(
      enter => enter.append("path")
          .classed("monumentGroup", true)
          .attr("d", d=>drawSlice(d))
          .attr("stroke", "white")
          .attr("stroke-width", 0.5)
          .attr("fill", d=>scaleColor(d.group)),
      update => update
        .call(update=>update.transition(500)
          .attr("r", d=>scaleRadius(d.value))),
      exit => exit.remove()
    )

};

const destroy = (element) => {
	console.log("destroy", element);
	d3.select(element).selectAll("*").remove();
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