var ccData = [];
var loyaltyData = [];
var carData = [];
var gpsData = [];
var filteredData = [];
var filteredDataGPS = [];
let cardData = [];

// choosenlastDate=MIN_DATE;
// choosenfirstDate=MAX_DATE;
// Usage example

drawImage();

getDataAndProceed().then((result) => {
  // Run filterdata after getDataAndProceed done
  filterData(choosenfirstdate, choosenlastdate);
  //filterAndSaveData();
  findConnection();
});

async function getDataAndProceed() {
  try {
    carData = await readJson("./car_ass.json");
    ccData = await readJson("./cc_data.json");
    gpsData = await readJson("./gps.json");
    loyaltyData = await readJson("./loyalty_data.json");

    cardData = ccData.concat(loyaltyData);

    createSlidertime();
    createSliderDay();
    createDropdownMenu();
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
}

function filterData(startTime, endTime, id) {
  //console.timeLog(new Date(gpsData[0].Timestamp).getTime())
  filteredDataGPS = gpsData.filter((item) => {
    const timestamp = parseInt(new Date(item.Timestamp).getTime());
    //console.log(timestamp) && item.id == id
    if (id == 0) {
      return timestamp >= startTime.getTime() && timestamp <= endTime.getTime();
    } else {
      return (
        timestamp >= startTime.getTime() &&
        timestamp <= endTime.getTime() &&
        item.id == id
      );
    }
  });

  // if (showCC && showLC) {
  //   dummy = ccData.filter((item) => {
  //     const timestamp = parseInt(new Date(item.timestamp).getTime());
  //     return timestamp >= startTime && timestamp <= endTime;
  //   });
  //   dummy2 = loyaltyData.filter((item) => {
  //     const timestamp = parseInt(new Date(item.timestamp).getTime());
  //     return timestamp >= startTime && timestamp <= endTime;
  //   });

  //   filteredData = dummy.concat(dummy2);
  // } else if (showCC) {
  filteredData = ccData.filter((item) => {
    const timestamp = parseInt(new Date(item.timestamp).getTime());
    return timestamp >= startTime && timestamp <= endTime;
  });
  // } else if (showLC) {
  //   filteredData = loyaltyData.filter((item) => {
  //     const timestamp = parseInt(new Date(item.timestamp).getTime());
  //     return timestamp >= startTime && timestamp <= endTime;
  //   });
  // } else {
  //   filteredData = [];
  // }
  drawDataPoints();
  if(showCars){
  drawHeatMap();
}
}
