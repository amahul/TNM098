var ccData = []
var loyaltyData = []
var gpsData=[];
var filteredData=[];
var filteredDataGPS=[];

var showCC=true;
var showLC=true;
// choosenlastDate=MIN_DATE;
// choosenfirstDate=MAX_DATE;

drawImage();
getDataAndProceed().then((result) => { 
  // Run filterdata after getDataAndProceed done
  filterData(choosenfirstdate, choosenlastdate);
});

async function getDataAndProceed() {
  try {
    gpsData = await readJson('./gps.json');
    ccData = await readJson("./cc_data.json");
    gpsData = await readJson("./gps.json");
    loyaltyData = await readJson("./loyalty_data.json");

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
    filteredDataGPS= gpsData.filter(item => {
      const timestamp = parseInt(new Date(item.Timestamp).getTime());
      //console.log(timestamp) && item.id == id
      return (timestamp >= startTime.getTime()  && timestamp <= endTime.getTime() && item.id==id)     
    });

      if (showCC && showLC) {
      dummy = ccData.filter((item) => {
        const timestamp = parseInt(new Date(item.timestamp).getTime());
        return timestamp >= startTime && timestamp <= endTime;
      });
      dummy2 = loyaltyData.filter((item) => {
        const timestamp = parseInt(new Date(item.timestamp).getTime());
        return timestamp >= startTime && timestamp <= endTime;
      });
  
      filteredData = dummy.concat(dummy2);
    } else if (showCC) {
      filteredData = ccData.filter((item) => {
        const timestamp = parseInt(new Date(item.timestamp).getTime());
        return timestamp >= startTime && timestamp <= endTime;
      });
    } else if (showLC) {
      filteredData = loyaltyData.filter((item) => {
        const timestamp = parseInt(new Date(item.timestamp).getTime());
        return timestamp >= startTime && timestamp <= endTime;
      });
    } else {
      filteredData = [];
    }
   
    
    console.log(filteredData);
    console.log(filteredDataGPS);
    drawDataPoints();
  
    drawHeatMap();
  
}



