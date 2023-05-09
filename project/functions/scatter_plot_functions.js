/**
 * Function to draw a scatter plot under the map with data from selected locations
 *
 * @param {*} location
 */
function drawCreditCardPlot(location) {
  // Remove old scatter plot
  let sp = d3.select("#scatter_plot");
  sp.select("#credit_card").remove();

  // Define an array of data points
  const data = filteredData.filter(
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
      showPopup(
        d,
        xScale(new Date(d.timestamp).getDate()),
        yScale(timeParser(getTimeOfDay(new Date(d.timestamp))))
      );
    })
    .on("mouseout", function (d) {
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

function drawLoyaltyCardPlot(location) {
  // Remove old scatter plot
  let sp = d3.select("#scatter_plot");
  sp.select("#loyalty_card").remove();

  // Set up SVG canvas and axes
  var margin = { top: 20, right: 20, bottom: 30, left: 40 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var svg = sp
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "loyalty_card")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  /** Data functions */
  const filtered = filteredData.filter(
    (item) => item.location == location && item.loyaltynum != null
  );

  // Use map() to create an array of values for the specified property
  var values = filtered.map(function (d) {
    return d.timestamp;
  });

  // Use reduce() to count the number of occurrences of each value
  var mergedData = values.reduce(function (acc, value) {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  let data = [];
  for (const key in mergedData) {
    data.push({ x: key, y: Number(mergedData[key]) });
  }

  /** End data functions */
  var x = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.x;
      })
    )
    .range([0, width])
    .padding(0.1);
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(
        data.map(function (d) {
          return d.y;
        })
      ),
    ])
    .range([height, 0]);

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis);

  // Draw rectangles for data points
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return x(d.x);
    })
    .attr("y", function (d) {
      return y(d.y);
    })
    .attr("fill", "steelblue")
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.y);
    })
    .on("mouseover", function (d) {
      d3.select(this).attr("fill", "lightblue");
    })
    .on("mouseout", function (d) {
      d3.select(this).attr("fill", "steelblue");
    });

  // Label axes
  svg
    .append("text")
    .attr("class", "label")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.bottom) + ")"
    )
    .style("text-anchor", "middle")
    .text("X Label");

  svg
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Y Label");
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
