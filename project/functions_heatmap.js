var choosenfirstdate = new Date('2014-01-06T00:00:00')
var choosenlastdate =  new Date('2014-01-06T23:59:59')
var choosenID=0
showCC=true;
showLC=false;

function readJson(filename) {
  return new Promise((resolve, reject) => {
    d3.json(
      filename,
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
}

function createSliderDay() {
  const derrive = 300 / (MAX_RANGE-MIN_RANGE);
  const choosenMinRange = (MIN_RANGE-MIN_RANGE)*derrive;
  const choosenMaxRange = (MAX_RANGE-MIN_RANGE)*derrive;
  var choosenDay=6
  
  const element_day = document.getElementById("choosen_day");
  element_day.innerHTML =MIN_RANGE;

  // Create an SVG container
  const svg = d3.select("#slider_day")
    .append("svg")
    .attr("width", 320)
    .attr("height", 20);

  const line1= svg.append("line")
  .attr("x1", 1)
  .attr("x2", 320)
  .attr("y1", 10)
  .attr("y2", 10)
  .style("stroke", "black")
  .style("stroke-width", "4px")

  // Define the slider handles
  const handle1 = svg.append("circle")
    .attr("r", 10)
    .attr("cx", 0)
    .attr("cy", 10)
    .call(d3.drag().on("drag", handle1Dragged).on("end", updateValues));

  // Define the initial positions of the handles
  let handle1Value = choosenDay;
  updateHandles();

  // Define the behavior of handle1 when dragged
  function handle1Dragged() {
    handle1Value = Math.max(choosenMinRange, Math.min(choosenMaxRange, d3.event.x));
    updateHandles();        
  }  

  // Update the positions of the handles and the slider range
  function updateHandles() {
    handle1.attr("cx", handle1Value+5);
    choosenDay=Math.round((handle1Value/derrive)+MIN_RANGE);
    element_day.innerHTML =choosenDay;
    element_day.style.left=handle1Value+"px";
    choosenfirstdate.setDate(choosenDay)
    choosenlastdate.setDate(choosenDay)
   
  }

    function updateValues(){
    filterData(choosenfirstdate, choosenlastdate,choosenID);
    }
}


function createSlidertime() {
  const derrive = 300 / (1439);
  const choosenMinRange = 0;
  const choosenMaxRange = 300;

  const element1_time = document.getElementById("choosen_first_time");
  element1_time.innerHTML =MIN_RANGE; 

  const element2_time = document.getElementById("choosen_last_time");
  element2_time.innerHTML =MAX_RANGE;
  // Create an SVG container
  const svg = d3.select("#slider")
    .append("svg")
    .attr("width", 320)
    .attr("height", 20);


  const line1= svg.append("line")
  .attr("x1", 1)
  .attr("x2", 320)
  .attr("y1", 10)
  .attr("y2", 10)
  .style("stroke", "black")
  .style("stroke-width", "4px")

  const line2= svg.append("line")
  .attr("x1", 1)
  .attr("x2", 320)
  .attr("y1", 10)
  .attr("y2", 10)
  .style("stroke", "rgb(135, 78, 78)")
  .style("stroke-width", "6px")
//stroke-widthstroke-width: 10px;
//    stroke: aliceblue;

  // Define the slider handles
  const handle1 = svg.append("circle")
    .attr("r", 10)
    .attr("cx", 50)
    .attr("cy", 10)
    .call(d3.drag().on("drag", handle1Dragged).on("end", updateValues));


  const handle2 = svg.append("circle")
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
    handle1Value = Math.max(choosenMinRange, Math.min(choosenMaxRange, d3.event.x));
    updateHandles();        
  }

  // Define the behavior of handle2 when dragged
  function handle2Dragged() {
    handle2Value = Math.max(choosenMinRange, Math.min(choosenMaxRange, d3.event.x));
    updateHandles();
  }

  // Update the positions of the handles and the slider range
  function updateHandles() {
    handle1.attr("cx", handle1Value+10);
    handle2.attr("cx", handle2Value+10);
    line2.attr("x1", handle1Value).attr("x2", handle2Value)
    choosen1hour= Math.floor((handle1Value/derrive)/60)
    choosen1minute= ((handle1Value/derrive)%60).toString().slice(0, 2)
    choosen2hour= Math.floor((handle2Value/derrive)/60)
    choosen2minute= ((handle2Value/derrive)%60).toString().slice(0,2);

    let phour1 = (choosen1hour < 10) ? "0" + choosen1hour : choosen1hour;
    let pminute1 = (choosen1minute < 10) ? "0" + choosen1minute : choosen1minute;
    let p1 = phour1 + ":" + pminute1;

    let phour2 = (choosen2hour < 10) ? "0" + choosen2hour : choosen2hour;
    let pminute2 = (choosen2minute < 10) ? "0" + choosen2minute : choosen2minute;
    let p2 = phour2 + ":" + pminute2;

    element1_time.innerHTML = p1;
    element1_time.style.left=handle1Value+"px";
    element2_time.innerHTML =p2;
    element2_time.style.left=handle2Value-40+"px";

    choosenfirstdate.setHours(choosen1hour)
    choosenfirstdate.setMinutes(choosen1minute)

    
    choosenlastdate.setHours(choosen2hour)
    choosenlastdate.setMinutes(choosen2minute)

  }

    function updateValues(){      
    filterData(choosenfirstdate, choosenlastdate,choosenID);
    }
}

function drawImage(){
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


function drawHeatMap(){
  
  console.log(filteredDataGPS);
  let svg = d3.select("#img_svg");
  d3.selectAll(".heatPoints").remove();
  // Bind the data to circle elements
  svg.selectAll("rect")
    .data(filteredDataGPS)
    .enter()
    .append("rect")
    .attr("x", d =>(d.long-MIN_LONG)*1000*MAPY*1.72+10)
    .attr("y", d => (IMAGE_WIDTH+50)/2-(d.lat-MIN_LAT)*1000*MAPX*0.47)
    .attr("width", 4)
    .attr("fill", d=> colors[d.id-1])
    .attr("height", 4)
    .attr("opacity", 0.4)
    .attr("class", "heatPoints")
    .on("mouseover", function (d) {
      const elements = svg.selectAll(`[fill="${colors[d.id - 1]}"]`);
      elements.attr('width', 10);
      elements.attr('height', 10);
      showPopupheat(
        d,
        (IMAGE_WIDTH+50)/2-(d.lat-MIN_LAT)*1000*MAPX*0.47,
        d => (IMAGE_WIDTH+50)/2-(d.lat-MIN_LAT)*1000*MAPX*0.47
      );
      
    })
    .on("mouseout", function (d) {
      const elements = svg.selectAll(`[fill="${colors[d.id - 1]}"]`);
      elements.attr('width', 4);
      elements.attr('height', 4);
      hidePopupheat();
    });
    ;
}

/**
 * Function for clicking on a point in the scatter plot
 * @param {*} d
 */
function showPopupheat(d, x, y) {
  var popup = d3.select("#tooltipheat");
  console.log(d)

  popup
    .style("display", "block")
    .style("left", x + 20 + "px")
    .style("top", y - 50 + "px");

  popup.append("text").text("id: " + d.id + " Time: " + d.Timestamp.split(" ")[1] );
}

/**
 * Hide popup on mouseout
 */
function hidePopupheat() {
  var popup = d3.select("#tooltipheat");
  popup.selectAll("*").remove();

  popup.style("display", "none");
}


function createDropdownMenu() {
  // Create a select element
  let selectElement = document.createElement("select");
  const element1_time = document.getElementById("drop_down");

  let optionElement = document.createElement("option");
  optionElement.value = 0;
  optionElement.text = "all";
  selectElement.appendChild(optionElement);

  // Create options from 1 to 20
  for (let i = 1; i <= 35; i++) {
    // Create an option element
    optionElement = document.createElement("option");
    optionElement.value = i;
    optionElement.text = i;
    // Append the option element to the select element
    selectElement.appendChild(optionElement);
  }

  selectElement.addEventListener("change", function(event) {
    choosenID = event.target.value;
    document.getElementById("car_id").innerHTML= " "+carData[choosenID-1].CarID;
    document.getElementById("car_name").innerHTML=carData[choosenID-1].FirstName +" " + carData[choosenID-1].LastName ;
    
    document.getElementById("car_type").innerHTML= " "+carData[choosenID-1].CurrentEmploymentType;
    document.getElementById("car_title").innerHTML= " "+carData[choosenID-1].CurrentEmploymentTitle;
    filterData(choosenfirstdate, choosenlastdate,choosenID);
  });


  // Add the select element to the document body or any desired container
  element1_time.appendChild(selectElement);
}
          
//from new



function changeCCcheckbox() {
  var checkBox = document.getElementById("CC_checkbox");

  if (checkBox.checked == true) {
    showCC = true;
  } else {
    showCC = false;
  }
  console.log(showCC)
  filterData(choosenfirstdate, choosenlastdate,choosenID);
}

function changeLCcheckbox() {
  var checkBoxLC = document.getElementById("LC_checkbox");
  if (checkBoxLC.checked == true) {
    showLC = true;
  } else {
    showLC = false;
  }
  filterData(choosenfirstdate, choosenlastdate,choosenID);
}

