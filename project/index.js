getDataAndProceed();

drawImage();



var ccData = []
var loyaltyData = []
var filteredData=[]
var showCC=true;
var showLC=true;
choosenlastDate=MIN_DATE;
choosenfirstDate=MAX_DATE;

async function getDataAndProceed() {
  try {
    ccData = await readJson('/cc_data.json');
    var gpsData = await readJson('/gps.json');
    loyaltyData = await readJson('/loyalty_data.json');
    var carData = await readJson('/car_ass.json');
    
    createSlider();
   

    //filteredData = filterData(ccData, loyaltyData,true, true, startTime=timestart, endTime=timeend);
    //console.log(filteredData);
    //countPlaces(filteredData);

  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
}


function filterData(datacc, datalc, startTime, endTime ) {
  
  
  if(showCC && showLC){
    dummy= ccData.filter(item => {
      const timestamp = parseInt(new Date(item.timestamp).getTime());
      return (timestamp >= startTime  && timestamp <= endTime)     
    });
    dummy2= loyaltyData.filter(item => {
      const timestamp = parseInt(new Date(item.timestamp).getTime());
      return (timestamp >= startTime  && timestamp <= endTime)     
    });

    filteredData = dummy.concat(dummy2);
 
  }
  else if(showCC){
    filteredData =ccData.filter(item => {
      const timestamp = parseInt(new Date(item.timestamp).getTime());
      return (timestamp >= startTime  && timestamp <= endTime)     
    });
  }
  else if(showLC){
    filteredData= loyaltyData.filter(item => {
      const timestamp = parseInt(new Date(item.timestamp).getTime());
      return (timestamp >= startTime  && timestamp <= endTime)     
    });
   
  }
  

console.log(filteredData);
}


function countPlaces(data) {
  data.reduce((counts, item) => {
    const location = item.location;
    counts[location] = counts[location] ? counts[location] + 1 : 1;
    return counts;
  }, {});

}
