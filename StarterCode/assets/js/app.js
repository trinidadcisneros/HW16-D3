// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from csv
d3.csv("assets/data/data.csv").then(function(data) {


    // step 1: parse data cast as numbers
    data.forEach(function(d) {
      d.poverty = +d.poverty;
      d.povertyMoe = +d.povertyMoe;
      d.age = +d.age;
      d.ageMoe = +d.ageMoe;
      d.income = +d.income;
      d.incomeMoe = +d.incomeMoe;
      d.healthcare = +d.healthcare;
      d.healthcareHigh = +d.healthcareHigh;
      d.obesity = +d.obesity;
      d.obesityLow = +d.obesityLow;
      d.obesityHigh = +d.obesityHigh;
      d.smokes = +d.smokes;
      d.smokesLow = +d.smokesLow;
      d.smokesHigh = +d.smokesHigh;
      });

      // var xExtent = d3.extent(data, d => d.poverty)
      // var yExtent = d3.extent(data, d => d.obesity)

      var xScale = d3.scaleLinear()
        // .domain(xExtent)
        .domain([0, d3.max(data, d => d.poverty)])
        .range([0, chartWidth]);
      
      var yScale = d3.scaleLinear()
      // .domain(yExtent)
        .domain([0, d3.max(data, d => d.obesity)])
        .range([chartHeight, 0]);

      // Step 3: create axis functions
      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);


      // Step 4: Append Axes to the chart 
      chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);
  
      chartGroup.append("g")
      .call(yAxis);

      var circleGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .classed("stateCircle", true)
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.obesity))
      .attr("r", "15")
      .attr("fill", "blue")
      .attr("opacity", ".5");
      
      // Create axes labels
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Obesity");

      chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty");
      
      
      var circRadius = 15;
      
      // Add state abbr to each plot
      var stateLabels = chartGroup.selectAll("text.stateText")
      .data(data)
      .enter()
      .append("text")
      .classed("stateText", true)
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => yScale(d.obesity))
      .attr("font-size", circRadius)
      .text(d => d.abbr);
      
      
      // var circleGroup = chartGroup.append("g")
      //   .attr("transform", `translate(${width / 2}, ${height + 20})`);

      // // theCircles.append("text")
      // circleGroup
      // .append("text")
      // // We return the abbreviation to .text, which makes the text the abbreviation.
      // .text(function(data) {
      //   return data.abbr;
      // })
      // // Now place the text using our scale.
      // .attr("dx", function(data) {
      //   return xScale(data.poverty);
      // })
      // .attr("dy", function(data) {
      //   // When the size of the text is the radius,
      //   // adding a third of the radius to the height
      //   // pushes it into the middle of the circle.
      //   return yScale(data.obesity) + circRadius / 2.5;
      // })
      // .attr("font-size", circRadius)
      // .attr("class", "stateText");
});
