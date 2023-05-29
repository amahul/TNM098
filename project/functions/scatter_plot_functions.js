/**
 * Function to draw a scatter plot under the map with data from selected locations
 *
 * @param {*} location
 */
function drawCreditCardPlot(location) {
  // Remove old scatter plot
  let sp = d3.select("#scatter_plot");
  sp.select("#credit_card").remove();
  sp.select("h1").remove();

  sp.append("h1").text("Credit card transactions: " + location);

  // Define an array of data points
  const data = cardData.filter(
    (item) => item.location == location && item.last4ccnum != null
  );

  const width = 1200;
  const height = 500;
  const margin = { top: 100, right: 20, bottom: 50, left: 100 };

  var timeParser = d3.timeParse("%I:%M");

  const xValues = data.map((d) => new Date(d.timestamp).getDate());
  const yValues = data.map((d) =>
    timeParser(getTimeOfDay(new Date(d.timestamp)))
  );
  const prices = data.map((d) => d.price);

  // Set up scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(xValues))
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(yValues))
    .range([height - margin.bottom, margin.top]);

  // Set up yAxis
  var yAxis = d3.axisLeft(yScale);
  yAxis.tickFormat(function (d) {
    // Use a custom label for each tick based on the original data value
    return getTimeOfDay(new Date(d));
  });

  // Create the SVG element
  const svg = sp
    .append("svg")
    .attr("width", width)
    .attr("id", "credit_card")
    .attr("height", height);

  // Extract the minimum and maximum values from the dataset
  var minValue = d3.min(prices);
  var maxValue = d3.max(prices);

  // Define the color scale using the minimum and maximum values
  var colorScale = d3
    .scaleLinear()
    .domain([minValue, maxValue])
    .range(["red", "blue"]); // Specify the desired color range

  // Calculate the value for the rectangle
  var value = 30;

  // Determine the fill color based on the color scale
  var fillColor = colorScale(value);

  // Draw the rectangle
  sp.append("rect")
    .attr("id", "test")
    .attr("x", 30)
    .attr("y", 40)
    .attr("width", width)
    .attr("height", height)
    .style("fill", fillColor);

  // Add circles
  var circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(new Date(d.timestamp).getDate()))
    .attr("cy", (d) => yScale(timeParser(getTimeOfDay(new Date(d.timestamp)))))
    .attr("r", 5)
    .attr("fill", (d) => colorScale(d.price))
    .attr("opacity", 0.7)
    .on("mouseover", function (d) {
      d3.select(this).transition().attr("r", 8).style("cursor", "pointer");

      showPopup(
        d,
        xScale(new Date(d.timestamp).getDate()),
        yScale(timeParser(getTimeOfDay(new Date(d.timestamp))))
      );
    })
    .on("mouseout", function (d) {
      d3.select(this).transition().attr("r", 5).style("cursor", "default");
      hidePopup();
    });

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("text")
    .attr("class", "x-axis-label")
    .attr("x", width / 2) // Position in the middle of the x-axis
    .attr("y", height - 10) // Position below the x-axis
    .attr("text-anchor", "middle") // Align in the middle horizontally
    .text("Day in January 2014");

  // Define the y-axis label
  svg
    .append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)") // Rotate the label vertically
    .attr("x", -height / 2) // Position in the middle of the y-axis
    .attr("y", 20) // Position above the y-axis
    .attr("text-anchor", "middle") // Align in the middle horizontally
    .text("Time of day");

  // Add y-axis
  svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis);

  // Zoom functionality

  // // Create the zoom behavior
  // var zoom = d3
  //   .zoom()
  //   .scaleExtent([1, 10]) // Set the minimum and maximum scale factor
  //   .on("zoom", zoomed);

  // // Attach the zoom behavior to the SVG element
  // svg.call(zoom);

  // // Define the zoom event handler function
  // function zoomed() {
  //   var newYScale = d3.event.transform.rescaleY(yScale);

  //   // Update the circles' positions based on the new scales
  //   circles.attr("cy", function (d) {
  //     return newYScale(timeParser(getTimeOfDay(new Date(d.timestamp))));
  //   });
  // }
}

/**
 * Function for clicking on a point in the scatter plot
 * @param {*} d
 */
function showPopup(d, x, y) {
  var popup = d3.select("#tooltip");

  popup
    .style("display", "block")
    .style("left", x + 20 + "px")
    .style("top", y - 50 + "px");

  popup.append("text").text("Card: " + d.last4ccnum + "\n Price: " + d.price + "\n Time: " + d.timestamp.split(" ")[1]);
}

/**
 * Hide popup on mouseout
 */
function hidePopup() {
  var popup = d3.select("#tooltip");
  popup.selectAll("*").remove();

  popup.style("display", "none");
}

/**
 * Function to return HH:MM from a date
 * @param {*} date
 * @returns
 */
function getTimeOfDay(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}
