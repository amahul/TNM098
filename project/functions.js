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
    updateValues();
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
    .attr("class", "circle")
    .attr("cy", (d) => d.y)
    .attr("r", (d) => linearScale(d.amount))
    .attr("fill", "blue")
    .attr("opacity", 0.5)
    .attr("id", function (d, i) {
      return "circle_" + i;
    })
    .on("click", function (d, i) {
      locationClick(d, i)
    })
    .on("mouseover", function(d) {
      // Increase the node size on hover using a transition
      d3.select(this)
        .transition()
        .attr("r", linearScale(d.amount) * 1.5);
    })       
    .on("mouseout", function(d) {
      // Reset the node size on mouseout using a transition
      d3.select(this)
        .transition()
        .attr("r", linearScale(d.amount));
    });;
}

function locationClick(d, i) {
  d3.selectAll(".circle").attr("fill", "blue");

  d3.select(`#circle_${i}`).attr("fill", "red");
  
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
