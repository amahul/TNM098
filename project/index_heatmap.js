var ccData = []
var loyaltyData = []
var gpsData=[];
var filteredData=[]

var showCC=true;
var showLC=true;
choosenlastDate=MIN_DATE;
choosenfirstDate=MAX_DATE;

drawImage();
getDataAndProceed();

async function getDataAndProceed() {
  try {
    gpsData = await readJson('/gps.json');
    createSlidertime();
    createSliderDay();

  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
}


function filterData(startTime, endTime) {
  
  
  console.log(startTime)
  console.log(endTime)
  //console.timeLog(new Date(gpsData[0].Timestamp).getTime())
    filteredData= gpsData.filter(item => {
      const timestamp = parseInt(new Date(item.Timestamp).getTime());
      //console.log(timestamp)
      return (timestamp >= startTime.getTime()  && timestamp <= endTime.getTime() && item.id == 20)     
    });

    drawHeatMap()
    
}


