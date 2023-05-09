var ccData = [];
var loyaltyData = [];
var gpsData = [];
var filteredData = [];
var filteredDataGPS = [];
let cardData = []

var showCC = true;
var showLC = true;
// choosenlastDate=MIN_DATE;
// choosenfirstDate=MAX_DATE;

drawImage();
getDataAndProceed().then((result) => {
  // Run filterdata after getDataAndProceed done
  filterData(choosenfirstdate, choosenlastdate);
  
});

async function getDataAndProceed() {
  try {
    gpsData = await readJson("./gps.json");
    ccData = await readJson("./cc_data.json");
    gpsData = await readJson("./gps.json");
    loyaltyData = await readJson("./loyalty_data.json");

    cardData = ccData.concat(loyaltyData)

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
    return (
      timestamp >= startTime.getTime() &&
      timestamp <= endTime.getTime() &&
      item.id == id
    );
  });

  dummyCC = ccData.filter((item) => {
    const timestamp = parseInt(new Date(item.timestamp).getTime());
    return timestamp >= startTime && timestamp <= endTime;
  });

  dummyLD = loyaltyData.filter((item) => {
    const timestamp = parseInt(new Date(item.timestamp).getTime());
    return timestamp >= startTime && timestamp <= endTime;
  });

  if (showCC && showLC) {
    filteredData = dummyCC.concat(dummyLD);
  } else if (showCC) {
    filteredData = dummyCC;
  } else if (showLC) {
    filteredData = dummyLD;
  } else {
    filteredData = [];
  }

  console.log(filteredData);
  console.log(filteredDataGPS);
  drawDataPoints();

  drawHeatMap();
}
