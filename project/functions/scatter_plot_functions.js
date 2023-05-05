/**
 * Function to draw a scatter plot under the map with data from selected locations
 *
 * @param {*} location
 */
function drawScatterPlot(location) {
  // Remove old scatter plot
  let sp = d3.select("#scatter_plot");
  sp.select("#svg").remove();

  // Define an array of data points
  const data = filteredData.filter((item) => item.location == location);
  console.log(data);

  const width = 1200;
  const height = 500;
  const margin = { top: 100, right: 20, bottom: 50, left: 100 };

  var timeParser = d3.timeParse("%I:%M");

  const xValues = data.map((d) => new Date(d.timestamp).getDate());
  let yValues = data.map((d) =>
    timeParser(getTimeOfDay(new Date(d.timestamp)))
  );

  // Filter all card that were used 00:00 (this is the loyalty cards)
  yValues = yValues.filter(
    (element) => element.getTime() !== timeParser("00:00").getTime()
  );

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
    .attr("id", "svg")
    .attr("height", height);

  // Add circles
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(new Date(d.timestamp).getDate()))
    .attr("cy", (d) => yScale(timeParser(getTimeOfDay(new Date(d.timestamp)))))
    .attr("r", 5)
    .attr("fill", "steelblue")
    .on("mouseover", function (d) {
      // console.log(d)
      showPopup(
        d,
        xScale(new Date(d.timestamp).getDate()),
        yScale(timeParser(getTimeOfDay(new Date(d.timestamp))))
      );
    })
    .on("mouseout", function (d) {
      // console.log(d)
      hidePopup();
    });

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis);
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

  popup.append("text").text("Card: " + d.last4ccnum + "\n Price: " + d.price);
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
