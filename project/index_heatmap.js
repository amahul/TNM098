var ccData = []
var loyaltyData = []
var gpsData=[];
var filteredData=[]
var showCC=true;
var showLC=true;
choosenlastDate=MIN_DATE;
choosenfirstDate=MAX_DATE;

getDataAndProceed();


async function getDataAndProceed() {
  try {
    gpsData = await readJson('/gps.json');
    createSlider();
    drawImage();

  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
}


function filterData(startTime, endTime ) {
  
    filteredData= gpsData.filter(item => {
      const timestamp = parseInt(new Date(item.Timestamp).getTime());
      //console.log(timestamp)
      return (timestamp >= startTime  && timestamp <= endTime && item.id == 21)     
    });

console.log(MIN_LAT)
console.log(MAX_LAT)

console.log(MIN_LONG)
console.log(MAX_LONG)

    console.log(MAPX);
    console.log(MAPY);
    
}


