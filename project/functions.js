function readJson(filename) {
  return new Promise((resolve, reject) => {
    d3.json(filename, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function createSlider() {
  const derrive = 300 / (MAX_RANGE - MIN_RANGE);
  const choosenMinRange = (MIN_RANGE - MIN_RANGE) * derrive;
  const choosenMaxRange = (MAX_RANGE - MIN_RANGE) * derrive;

  // Create an SVG container
  const svg = d3
    .select("#slider")
    .append("svg")
    .attr("width", 320)
    .attr("height", 20);

  document.getElementById("start_date").innerHTML =
    "0" + MIN_DATE.getDate() + "/" + MIN_DATE.getMonth() + 1;
  document.getElementById("end_date").innerHTML =
    MAX_DATE.getDate() + "/" + MAX_DATE.getMonth() + 1;
  const min_choosenID = document.getElementById("min_choosen");
  const max_choosenID = document.getElementById("max_choosen");
  min_choosenID.innerHTML =
    "0" + MIN_DATE.getDate() + "/" + MIN_DATE.getMonth() + 1;
  max_choosenID.innerHTML = MAX_DATE.getDate() + "/" + MAX_DATE.getMonth() + 1;

  const line1 = svg
    .append("line")
    .attr("x1", 1)
    .attr("x2", 320)
    .attr("y1", 10)
    .attr("y2", 10)
    .style("stroke", "black")
    .style("stroke-width", "4px");

  const line2 = svg
    .append("line")
    .attr("x1", 1)
    .attr("x2", 320)
    .attr("y1", 10)
    .attr("y2", 10)
    .style("stroke", "rgb(135, 78, 78)")
    .style("stroke-width", "6px");
  //stroke-widthstroke-width: 10px;
  //    stroke: aliceblue;

  // Define the slider handles
  const handle1 = svg
    .append("circle")
    .attr("r", 10)
    .attr("cx", 50)
    .attr("cy", 10)
    .call(d3.drag().on("drag", handle1Dragged).on("end", updateValues));

  const handle2 = svg
    .append("circle")
    .attr("r", 10)
    .attr("cx", 350)
    .attr("cy", 10)
    .call(d3.drag().on("drag", handle2Dragged).on("end", updateValues));

  // Define the initial positions of the handles
  let handle1Value = choosenMinRange;
  let handle2Value = choosenMaxRange;
  updateHandles();

  // Define the behavior of handle1 when dragged
  function handle1Dragged() {
    handle1Value = Math.max(
      choosenMinRange,
      Math.min(choosenMaxRange, d3.event.x)
    );
    updateHandles();
  }

  // Define the behavior of handle2 when dragged
  function handle2Dragged() {
    handle2Value = Math.max(
      choosenMinRange,
      Math.min(choosenMaxRange, d3.event.x)
    );
    updateHandles();
  }

  // Update the positions of the handles and the slider range
  function updateHandles() {
    handle1.attr("cx", handle1Value + 10);
    handle2.attr("cx", handle2Value + 10);
    line2.attr("x1", handle1Value).attr("x2", handle2Value);

    min_choosenID.innerHTML =
      new Date(handle1Value / derrive + MIN_RANGE).getDate() +
      "/" +
      new Date(handle1Value / derrive + MIN_RANGE).getMonth() +
      1;
    max_choosenID.innerHTML =
      new Date(handle2Value / derrive + MIN_RANGE).getDate() +
      "/" +
      new Date(handle2Value / derrive + MIN_RANGE).getMonth() +
      1;
    min_choosenID.style.left = handle1Value + 65 + "px";
    max_choosenID.style.left = handle2Value + 65 + "px";
  }

  function updateValues() {
    choosenfirstDate = new Date(handle1Value / derrive + MIN_RANGE);
    choosenlastDate = new Date(handle2Value / derrive + MIN_RANGE);
    filterData(ccData, loyaltyData, choosenfirstDate, choosenlastDate);
  }
}

function drawImage() {
  // Create an SVG element
  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("id", "img_svg")
    .attr("width", IMAGE_WIDTH)
    .attr("height", IMAGE_HEIGHT);

  // Load the image
  svg
    .append("image")

    .attr("xlink:href", "./data/MC2-tourist.jpg")
    .attr("width", IMAGE_WIDTH)
    .attr("height", IMAGE_HEIGHT);
}

/**
 * Function to find
 * @param {*} data
 * @returns
 */
let uniques = (data) => {
  let unique_values = [...new Set(data.map((element) => element.location))];
  return unique_values;
};

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
    .attr("cx", (d) => d.x)
    .attr("class", "data_point")
    .attr("cy", (d) => d.y)
    .attr("r", (d) => linearScale(d.amount))
    .attr("fill", "blue")    
    .attr("opacity", 0.5)
    .on("click", function (d) {
      locationClick(d)
    });
}

function locationClick(d){

  console.log(d)
  

  d3.selectAll(`circles`).attr("fill", "pink")


  drawScatterPlot(d.location);

}

function changeCCcheckbox() {
  var checkBox = document.getElementById("CC_checkbox");

  if (checkBox.checked == true) {
    showCC = true;
  } else {
    showCC = false;
  }
  filterData(ccData, loyaltyData, choosenfirstDate, choosenlastDate);
}

function changeLCcheckbox() {
  var checkBoxLC = document.getElementById("LC_checkbox");
  if (checkBoxLC.checked == true) {
    showLC = true;
  } else {
    showLC = false;
  }
  filterData(ccData, loyaltyData, choosenfirstDate, choosenlastDate);
}

function getLocationSize() {
  let res = [];

  filteredData.map((item) => {
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
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Convert timestamp strings to Date objects and number values
  // const parseDate = d3.timeParse("%d-%m-%YT%H:%M:%S.%LZ");
  const xValues = data.map((d) => new Date(d.timestamp).getDate());
  const yValues = data.map((d) => getTimeOfDay(new Date(d.timestamp)));
  console.log(xValues);
  console.log(yValues);

  // Set up scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(xValues))
    .range([margin.left, width - margin.right]);

  // const yScale = d3
  //   .scaleLinear()
  //   .domain(d3.extent(yValues))
  //   .range([height - margin.bottom, margin.top]);

  // Define the y scale using a time scale
  const yScale = d3
    .scaleTime()
    .domain([new Date("2000-01-01T00:00:00"), new Date("2000-01-01T23:59:59")])
    .range([height, 0]);

  // Define the y axis
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%I:%M %p"));

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
    // .attr("cy", (d) => yScale(getTimeOfDay(new Date(d.timestamp))))
    .attr("cy", (d) => yScale(new Date(`2000-01-01T${getTimeOfDay(new Date(d.timestamp))}`)))
    .attr("r", 5)
    .attr("fill", "steelblue");

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));
}

function getTimeOfDay(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  return timeString;
}
