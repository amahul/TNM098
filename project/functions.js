function readCSV(filename, myDataIsReady) {
  
    d3.csv(filename, function (error, data) {
        if (error) throw error;
        console.log(typeof data);
        myDataIsReady(data);
    });
}


function createSlider(minRange, maxRange) {
   
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
        .call(d3.drag().on("drag", handle1Dragged));

    var handle2 = svg.append("circle")
        .attr("r", 10)
        .attr("cx", 350)
        .attr("cy", 50)
        .call(d3.drag().on("drag", handle2Dragged));

    // Define the initial positions of the handles
    var handle1Value = minRange;
    var handle2Value = maxRange;
    updateHandles();

    // Define the behavior of handle1 when dragged
    function handle1Dragged() {
        handle1Value = Math.max(minRange, Math.min(maxRange, d3.event.x));
        updateHandles();
    }

    // Define the behavior of handle2 when dragged
    function handle2Dragged() {
        handle2Value = Math.max(minRange, Math.min(maxRange, d3.event.x));
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

}