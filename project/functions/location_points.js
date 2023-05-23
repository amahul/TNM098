/**
 * Main function to draw circles on the map
 */
function drawDataPoints() {
  console.log("draw data points");
  // Remove all old data points
  d3.selectAll(".datapoint").remove();
  d3.selectAll("circle_").remove();

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
    .selectAll("datapoint")
    .data(locationSize)
    .enter()
    .append("circle")
    .attr("cx", function (ddata) {
      return ddata.x;
    })
    .attr("cy", function (ddata) {
      return ddata.y;
    })
    .attr("r", function (ddata) {
      return linearScale(ddata.amount);
    })
    .attr("fill", "blue")
    .attr("opacity", 0.5)
    .attr("class", "datapoint")
    .attr("id", function (i) {
      return "circle_" + i;
    })
    .on("mouseover", function (ddata) {
      // Increase the node size on hover using a transition
      d3.select(this)
        .transition()
        .attr("r", linearScale(ddata.amount) * 1.5)
        .style("cursor", "pointer");
      showAmount(ddata);
    })
    .on("click", function (ddata, i) {
      locationClick(ddata, i);
    })
    .on("mouseout", function (d) {
      // Reset the node size on mouseout using a transition
      d3.select(this)
        .transition()
        .attr("r", linearScale(d.amount))
        .style("cursor", "default");
      hideAmount();
    });
}

/**
 * Function to show scatter plot after clicking on a location on the map
 * @param {*} d - the cirle
 * @param {*} i - index of circle
 */
function locationClick(d, i) {
  d3.selectAll(".datapoint").attr("fill", "blue");

  d3.select(`#circle_${i}`).attr("fill", "red");

  drawCreditCardPlot(d.location);
}

/**
 * Function to show amount next to circle
 * @param {*} d - the cirle
 * @param {*} i - index of circle
 */
function showAmount(d) {
  var popup = d3.select("#tooltipheat");

  popup
    .style("display", "block")
    .style("left", d.x + 20 + "px")
    .style("top", d.y - 50 + "px");

  popup.append("text").text("Transactions: " + d.amount);
}

/**
 * Hide popup on mouseout
 */

function hideAmount() {
  var popup = d3.select("#tooltipheat");
  popup.selectAll("*").remove();

  popup.style("display", "none");
}

/**
 * Function to get size of data point
 * @returns
 */
function getLocationSize() {
  let res = [];

  ccData.map((item) => {
    let index = res.findIndex((obj) => obj.location === item.location);

    if (index !== -1) {
      res[index].amount += 1;
    } else {
      res.push({
        location: item.location,
        amount: 1,
      });
    }
  });
  return res;
}
