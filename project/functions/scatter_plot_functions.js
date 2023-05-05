/**
 * Function to draw a scatter plot under the map with data from selected locations
 *
 * @param {*} location
 */
function drawScatterPlot(location) {
  // Remove old scatter plot
  d3.select("#scatter_plot").remove();

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
  const svg = d3
    .select("body")
    .append("svg")
    .attr("id", "scatter_plot")
    .attr("width", width)
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
    .on("click", function (d, i) {
      // console.log(d)
      showPopup(
        d,        
        xScale(new Date(d.timestamp).getDate()),
        yScale(timeParser(getTimeOfDay(new Date(d.timestamp))))
      );
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
  // Get the bounding rectangle of the clicked node
  // var rect = this.getBoundingClientRect();
  let node = d3.select(d);
//   console.log(d.attr("cx"));

  // Create a new div element for the popup
  var popup = d3.select("#tooltip");

  popup.selectAll("*").remove();

  popup.append("text").text("Card: " + d.last4ccnum);

  popup.className = "popup";
  popup.textContent = "Node " + d.id;

  // Position the popup next to the clicked node
  popup.style.left = x + 10 + "px";
  popup.style.top = y + 10 + "px";

  // Append the popup to the body
  //   document.body.appendChild(popup);
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
