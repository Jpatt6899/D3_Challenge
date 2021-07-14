



d3.csv("assets/data/data.csv").then(function (data) {
  console.log(data);
  

  var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
  
  var width = 1000 - margin.left - margin.right;
  var height = 1000 - margin.top - margin.bottom;
  
  
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000 + 50);
  
  
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty) * 0.9,d3.max(data, d => d.poverty) * 2.5])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.obesity) - 2, d3.max(data, d => d.obesity) + 2])
    .range([height, 0]);


  console.log(data);
  data.forEach(d => {

    d.poverty = +d.poverty;
    d.obesity = +d.obesity;

  });





  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .classed("axis", true)
    .call(bottomAxis);

  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);


  chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", 15)
    .classed("stateCircle", true);




  chartGroup.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity)+6)
    .classed('stateText', true);




  chartGroup.append("text")
    .attr("x", 60)
    .attr("y", 30)
    .attr("class", "x label")
    .attr("transform", `translate(0, ${height})`)
    .text("Poverty (%)");

  chartGroup.append("text")
    .attr("x", 10)
    .attr("y", 70)
    .attr("class", "y label")
    .attr("transform","rotate(90)")
    .attr("dy", "1em")
    .text("Obesity (%)");



});

