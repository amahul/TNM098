/**
 * Main function to draw circles on the map
 */
function drawDataPoints() {
  // Remove all old data points
  d3.selectAll(".data_point").remove();

  let locationSize = getLocationSize();

  // Define the original range of values
  const minVal = d3.min(locationSize, (d) => d.amount);
  const maxVal = d3.max(locationSize, (d) => d.amount);

  // Define the new range of values
  const newMinVal = 5;
  const newMaxVal = 20;

  // Create a linear scaling function
  const linearScale = d3
    .scaleLinear()
    .domain([minVal, maxVal]) // set the domain of the scaling function to the original range
    .range([newMinVal, newMaxVal]); // set the range of the scaling function to the new range

  locationSize.map((item) => {
    let index = locations.find((obj) => obj.location === item.location);

    item.x = index.x;
    item.y = index.y;
  });

  let svg = d3.select("#img_svg");

  // Bind the data to circle elements
  svg
    .selectAll("circle")
    .data(locationSize)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("class", "circle")
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("r", (d) => linearScale(d.amount))
    .attr("fill", "blue")
    .attr("opacity", 0.5)
    .attr("id", function (d, i) {
      return "circle_" + i;
    })
    .on("click", function (d, i) {
      locationClick(d, i);
    })
    .on("mouseover", function (d) {
      // Increase the node size on hover using a transition
      d3.select(this)
        .transition()
        .attr("r", linearScale(d.amount) * 1.5);
      showAmount(d);
    })
    .on("mouseout", function (d) {
      // Reset the node size on mouseout using a transition
      d3.select(this).transition().attr("r", linearScale(d.amount));
      hideAmount();
    });
}

/**
 * Function to show scatter plot after clicking on a location on the map
 * @param {*} d - the cirle
 * @param {*} i - index of circle
 */
function locationClick(d, i) {
  d3.selectAll(".circle").attr("fill", "blue");

  d3.select(`#circle_${i}`).attr("fill", "red");

  drawScatterPlot(d.location);
}

/**
 * Function to show amount next to circle
 * @param {*} d - the cirle
 * @param {*} i - index of circle
 */
function showAmount(d) {
  d3.select("#amount_text")
    .text("Amount: " + d.amount)
    .style("display", "block")
    .style("left", d.x + 20 + "px")
    .style("top", d.y - 50 + "px");
}

function hideAmount() {
  d3.select("#amount_text").style("display", "none");
}