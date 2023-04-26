getDataAndProceed();

drawImage();



var ccData = []
var loyaltyData = []

async function getDataAndProceed() {
  try {
    ccData = await readJson('/cc_data.json');
    var gpsData = await readJson('/gps.json');
    var loyaltyData = await readJson('/loyalty_data.json');
    var carData = await readJson('/car_ass.json');
    
    const timestart = parseInt(new Date('2014-01-06T00:00:00').getTime());
    const timeend = parseInt(new Date('2014-01-19T23:59:59').getTime());   
    
    console.log(parseInt(new Date('01/06/2014 07:28').getTime()))
    createSlider(timestart, timeend);
   
    filteredData = filterData(ccData, loyaltyData,true, true, startTime=timestart, endTime=timeend);
    console.log(filteredData);
    countPlaces(filteredData);
    // Perform further actions with the loaded data here
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
}


function filterData(datacc, datalc, cc, lc, startTime, endTime ) {
  let Alldata = ccData.concat(datalc);
  const retData = Alldata.filter(item => {
    const timestamp = parseInt(new Date(item.timestamp).getTime());
    return (timestamp >= startTime  && timestamp <= endTime)     
  });
  return retData;
}


function countPlaces(data) {
  data.reduce((counts, item) => {
    const location = item.location;
    counts[location] = counts[location] ? counts[location] + 1 : 1;
    return counts;
  }, {});

}
