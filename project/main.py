import json
from datetime import datetime, timedelta
import math
'''
def filter_and_save_data():
    # Read the input JSON data
    with open('./filtered_data.json') as file:
        data = json.load(file)

    filtered_data = []
    prev_id = None
    skip_next = False

    for i in range(len(data) - 2):

        curr_id = data[i]['id']
        next_id = data[i+2]['id']
        curr_timestamp = datetime.strptime(data[i]['Timestamp'], '%m/%d/%Y %H:%M:%S')
        third_timestamp = datetime.strptime(data[i+1]['Timestamp'], '%m/%d/%Y %H:%M:%S')
        time_difference = (third_timestamp - curr_timestamp).total_seconds()

        if next_id!=curr_id or time_difference >= 60:
            filtered_data.append(data[i])
        

    # Add the last two items to the filtered data
    filtered_data.extend(data[-2:])

    # Save the filtered data to a new JSON file
    with open('filtered_data4.json', 'w') as file:
        json.dump(filtered_data, file, indent=4)

# Usage example
filter_and_save_data()
'''

'''

IMAGE_WIDTH = 980
IMAGE_HEIGHT = 550



 
locations = [
    {
        "x": 0.917 * IMAGE_WIDTH,
        "y": 0.76 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Brew've Been Served",
    },
    {
        "x": 0.712 * IMAGE_WIDTH,
        "y": 0.62 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Hallowed Grounds",
    },
    {
        "x": 0.775 * IMAGE_WIDTH,
        "y": 0.79 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Coffee Cameleon",
    },
    {
        "x": 0.06 * IMAGE_WIDTH,
        "y": 0.87 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Abila Airport",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Kronos Pipe and Irrigation",
    },
    {
        "x": 0.725 * IMAGE_WIDTH,
        "y": 0.77 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Nationwide Refinery",
    },
    {
        "x": 0.169 * IMAGE_WIDTH,
        "y": 0.62 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Maximum Iron and Steel",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Stewart and Sons Fabrication",
    },
    {
        "x": 0.683 * IMAGE_WIDTH,
        "y": 0.705 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Carlyle Chemical Inc.",
    },
    {
        "x": 0.416 * IMAGE_WIDTH,
        "y": 0.416 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Coffee Shack",
    },
    {
        "x": 0.315 * IMAGE_WIDTH,
        "y": 0.24 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Bean There Done That",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Brewed Awakenings",
    },
    {
        "x": 0.58 * IMAGE_WIDTH,
        "y": 0.535 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Jack's Magical Beans",
    },
    {
        "x": 0.872 * IMAGE_WIDTH,
        "y": 0.79 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Katerina’s Café",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Hippokampos",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Abila Zacharo",
    },
    {
        "x": 0.45 * IMAGE_WIDTH,
        "y": 0.705 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Gelatogalore",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Kalami Kafenion",
    },
    {
        "x": 0.567 * IMAGE_WIDTH,
        "y": 0.84 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Ouzeri Elian",
    },
    {
        "x": 0.865 * IMAGE_WIDTH,
        "y": 0.72 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Guy's Gyros",
    },
    {
        "x": 0.515 * IMAGE_WIDTH,
        "y": 0.535 * IMAGE_HEIGHT,
        "r": 5,
        "location": "U-Pump",
    },
    {
        "x": 0.95 * IMAGE_WIDTH,
        "y": 0.7 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Frydos Autosupply n' More",
    },
    {
        "x": 0.39 * IMAGE_WIDTH,
        "y": 0.37 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Albert's Fine Clothing",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Shoppers' Delight",
    },
    {
        "x": 0.26 * IMAGE_WIDTH,
        "y": 0.4 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Abila Scrapyard",
    },
    {
        "x": 0.18 * IMAGE_WIDTH,
        "y": 0.42 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Frank's Fuel",
    },
    {
        "x": 0.817 * IMAGE_WIDTH,
        "y": 0.48 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Chostus Hotel",
    },
    {
        "x": 0.397 * IMAGE_WIDTH,
        "y": 0.685 * IMAGE_HEIGHT,
        "r": 5,
        "location": "General Grocer",
    },
    {
        "x": 0.29 * IMAGE_WIDTH,
        "y": 0.56 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Kronos Mart",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Octavio's Office Supplies",
    },
    {
        "x": 0.325 * IMAGE_WIDTH,
        "y": 0.62 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Roberts and Sons",
    },
    {
        "x": 0.635 * IMAGE_WIDTH,
        "y": 0.37 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Ahaggo Museum",
    },
    {
        "x": 0.5 * IMAGE_WIDTH,
        "y": 0.1 * IMAGE_HEIGHT,
        "r": 5,
        "location": "Desafio Golf Course",
    },
    {
        "x": 0.0 * IMAGE_WIDTH,
        "y": 0.0 * IMAGE_HEIGHT,
        "r": 0,
        "location": "Daily Dealz",
    },
]
with open('./filtered_data4.json') as file:
        fdata = json.load(file)

with open('./cc_data.json') as file:
        ccdata = json.load(file)

MAX_LONG = 24.90848537
MIN_LONG = 24.82508806
MAX_LAT = 36.08995956
MIN_LAT = 36.04802098
DIFFLONG = (MAX_LONG - MIN_LONG) * 1000;
DIFFLAT = (MAX_LAT - MIN_LAT) * 1000;


MAPX= IMAGE_WIDTH/DIFFLAT
MAPY= IMAGE_HEIGHT/DIFFLONG
    # Update the data with the new coordinates
for item in fdata:
    
    item['x'] = (float(item['long'])-MIN_LONG)*1000*MAPY*1.72+10
    item['y'] = (IMAGE_WIDTH+50)/2-(float(item['lat'])-MIN_LAT)*1000*MAPX*0.47
    
    # Save the updated data as a JSON file
with open('updated_data1.json', 'w') as file:
    json.dump(fdata, file,indent=4)
 
'''
'''
def printresult(arr, lastnum):
    print("result for: ", lastnum)
    
    for i in range (0,40):
        if(arr[i]>2):
            print("carid:", i, "times", arr[i])
    

def find_matching_gps_data( x, y, timestamp, radius, time_diff):
    with open('./updated_data1.json') as file:
        fdata = json.load(file)

    matching_data = []
    car_ids = set()

    # Convert the timestamp to a datetime object for comparison
    purchase_time = datetime.strptime(timestamp, "%m/%d/%Y %H:%M")

    # Iterate over the GPS data
    for gps_entry in fdata:
        gps_timestamp = datetime.strptime(gps_entry["Timestamp"], "%m/%d/%Y %H:%M:%S")
        gps_x = gps_entry["x"]
        gps_y = gps_entry["y"]
        distance = math.sqrt((gps_x - x) ** 2 + (gps_y - y) ** 2)
        time_difference = (purchase_time - gps_timestamp).total_seconds() / 60

        if distance <= radius and 0 <= time_difference <= time_diff:
            matching_data.append(gps_entry)
            car_ids.add(gps_entry["id"])

    return matching_data, list(car_ids)


radius = 20
time_diff = 30

with open('./updated_data.json') as file:
        cdata = json.load(file)
array= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]



for item in cdata:
    if(item["last4ccnum"] == "4795"):
        matching_data, car_ids = find_matching_gps_data( item["x"], item["y"],
                                                item["timestamp"], radius, time_diff)
        for id in car_ids:
            id=int(id)
            if id < 40:
                array[id]= array[id]+1

printresult(array, "4795")

'''

import json
from datetime import datetime, timedelta
def filter_and_sort_entries(json_data):
    filtered_data = []

    # Sort the data based on timestamp
    sorted_data = sorted(json_data, key=lambda x: datetime.strptime(x['timestamp'], "%m/%d/%Y %H:%M"))

    # Iterate over the sorted data and filter entries
    prev_entry = None
    for entry in sorted_data:
        if prev_entry is None or entry['location'] != prev_entry['location'] or \
                datetime.strptime(entry['timestamp'], "%m/%d/%Y %H:%M") - datetime.strptime(prev_entry['timestamp'], "%m/%d/%Y %H:%M") >= timedelta(hours=5):
            filtered_data.append(entry)
            prev_entry = entry

    # Sort the filtered data based on location
    sorted_filtered_data = sorted(filtered_data, key=lambda x: x['location'])

    return sorted_filtered_data

# Parse the JSON string
with open('./cc_sorted.json', 'r') as file:
    data = json.load(file)

# Filter the entries
filtered_data = filter_and_sort_entries(data)

# Save the filtered data to a new JSON file
with open('filtered_cc_data.json', 'w') as file:
    json.dump(filtered_data, file, indent=4)
