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

function createSlider() {
  const derrive = 300 / (MAX_RANGE-MIN_RANGE);
  const choosenMinRange = (MIN_RANGE-MIN_RANGE)*derrive;
  const choosenMaxRange = (MAX_RANGE-MIN_RANGE)*derrive;

  // Create an SVG container
  const svg = d3.select("#slider")
    .append("svg")
    .attr("width", 320)
    .attr("height", 100);

  document.getElementById('start_date').innerHTML = "0"+MIN_DATE.getDate() + "/" + MIN_DATE.getMonth()+1 + " |";
  document.getElementById('end_date').innerHTML = "| " + MAX_DATE.getDate() + "/" + MAX_DATE.getMonth()+1 ; 
  const min_choosenID= document.getElementById('min_choosen');
  const max_choosenID= document.getElementById('max_choosen');
  min_choosenID.innerHTML= "0"+MIN_DATE.getDate() + "/" + MIN_DATE.getMonth()+1;
  max_choosenID.innerHTML=  MAX_DATE.getDate() + "/" + MAX_DATE.getMonth()+1 ; 

  // Define the slider handles
  const handle1 = svg.append("circle")
    .attr("r", 10)
    .attr("cx", 50)
    .attr("cy", 50)
    .call(d3.drag().on("drag", handle1Dragged).on("end", updateValues));


  const handle2 = svg.append("circle")
    .attr("r", 10)
    .attr("cx", 350)
    .attr("cy", 50)
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

    min_choosenID.innerHTML=  new Date((handle1Value/derrive)+MIN_RANGE).getDate() + "/" + new Date((handle1Value/derrive)+MIN_RANGE).getMonth()+1 ; 
    max_choosenID.innerHTML=  new Date((handle2Value/derrive)+MIN_RANGE).getDate() + "/" + new Date((handle2Value/derrive)+MIN_RANGE).getMonth()+1 ; 
    min_choosenID.style.left= handle1Value+ 42+ 'px';
    max_choosenID.style.left= handle2Value+42+ 'px';
  }

    function updateValues(){
    choosenfirstDate = new Date((handle1Value/derrive)+MIN_RANGE);
    choosenlastDate = new Date((handle2Value/derrive)+MIN_RANGE);
    filterData(ccData, loyaltyData, choosenfirstDate, choosenlastDate);
    }
}

function drawImage(){
  console.log("draw")
  // Create an SVG element
  const svg = d3.select(".canvas")
    .append("svg")
    .attr("width", IMAGE_WIDTH)
    .attr("height", IMAGE_HEIGHT);

  // Load the image
  svg.append("image")
    .attr("xlink:href", "./data/MC2-tourist.jpg")
    .attr("width", IMAGE_WIDTH)
    .attr("height", IMAGE_HEIGHT);

  // Define some data points
  const data = [
    { x: 100, y: 100, r: 3 },
    { x: 200, y: 200, r: 5 },
    { x: 300, y: 300, r: 10 }
  ];

  // Bind the data to circle elements
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .attr("fill", "purple");
    
}

function changeCCcheckbox(){
  
  var checkBox = document.getElementById("CC_checkbox");

  if (checkBox.checked == true){
    showCC=true;
  } else {
    showCC=false;
  }
  filterData(ccData, loyaltyData, choosenfirstDate, choosenlastDate);
}

function changeLCcheckbox(){
  var checkBoxLC = document.getElementById("LC_checkbox");
  if (checkBoxLC.checked == true){
    showLC=true;
  } else {
    showLC = false;
  }
  filterData(ccData, loyaltyData, choosenfirstDate, choosenlastDate);
}