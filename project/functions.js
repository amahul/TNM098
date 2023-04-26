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


function createSlider(minRange, maxRange) {
  
  
  const derrive = 300 / (maxRange-minRange);
  console.log(new Date(minRange));
  console.log(new Date(maxRange));
  
  choosenMinRange = (minRange-minRange)*derrive;
  choosenMaxRange = (maxRange-minRange)*derrive 

  console.log(choosenMin);
  console.log(choosenMaxRange);


  date1 = new Date((5/derrive)+minRange);
  console.log(date1);

  date2 = new Date((200/derrive)+minRange);
  console.log(date2);
  
    
    // Create an SVG container
    var svg = d3.select("#slider")
        .append("svg")
        .attr("width", 400)
        .attr("height", 100);

    
    // Define the slider handles
    var handle1 = svg.append("circle")
        .attr("r", 10)
        .attr("cx", 50)
        .attr("cy", 50)
        .call(d3.drag().on("drag", handle1Dragged).on("end", updateValues));

    
    var handle2 = svg.append("circle")
        .attr("r", 10)
        .attr("cx", 350)
        .attr("cy", 50)
        .call(d3.drag().on("drag", handle2Dragged).on("end", updateValues));

    // Define the initial positions of the handles
    var handle1Value = choosenMinRange;
    var handle2Value = choosenMaxRange;
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
        handle1.attr("cx", handle1Value);
        handle2.attr("cx", handle2Value);

        // Display the current range values to the user
        d3.select("#sliderValue1").text(handle1Value);
        d3.select("#sliderValue2").text(handle2Value);        
    }
    
    function updateValues(){
      console.log(handle1Value)
      console.log(handle2Value)
      const date1 = (handle1Value+choosenMin)/derrive;
      console.log(date1);

      const date2= (handle2Value+choosenMaxRange)*derrive;
      
      console.log(date2);
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