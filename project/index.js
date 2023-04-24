

var ccData =[]
ccData= readCSV("./data/cc_data.csv", mydatafunction());
console.log(ccData)
const loyaltyData = readCSV("./data/loyalty_data.csv");


const gps = readCSV("./data/gps.csv");
const cassignments = readCSV("./data/car-assignments.csv");


function mydatafunction(data){
    ccData=data
    return data;
}

filterData(ccData, loyaltyData, "01/06/2014", "05/06/2014")

function filterData(datacc, datalc, cc = true, lc = true, timestart, timeend) {

  let Alldata = datacc.concat(datalc);

  //01/06/2014 07:28

  const filteredData = Alldata.filter(item => {
    const timestamp = new Date(item.timestamp).getTime();

    return timestamp >= startTime && timestamp <= endTime;
  });

  return filteredData;
}

function countPlaces(data) {

  const counts = data.reduce(function (acc, curr) {
    const key = JSON.stringify(curr); // Convert the object to a JSON string to use as the key
    acc[key] = (acc[key] || 0) + 1; // Increment the count for the current key
    return acc;
  }, {});

  console.log(counts);
}
