import datetime
import json
import math
"""import constants

def sort_and_save_data(input_file_path, output_file_path):
    with open(input_file_path, 'r') as file:
        data = json.load(file)

    # Sort the data by location and timestamp
    sorted_data = sorted(data, key=lambda x: (x['location'], x['timestamp']))

    with open(output_file_path, 'w') as file:
        json.dump(sorted_data, file, indent=4)

# Usage example
input_file = './cc_data.json'
output_file = 'cc_sorted.json'

sort_and_save_data(input_file, output_file)
print("Data sorted and saved to", output_file)
"""

import json

IMAGE_WIDTH = 980
IMAGE_HEIGHT = 550
locations = [
        {
            'x': 0.917 * IMAGE_WIDTH,
            'y': 0.76 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Brew've Been Served"
        },
        {
            'x': 0.712 * IMAGE_WIDTH,
            'y': 0.62 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Hallowed Grounds"
        },
        {
            'x': 0.775 * IMAGE_WIDTH,
            'y': 0.79 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Coffee Cameleon"
        },
        {
            'x': 0.06 * IMAGE_WIDTH,
            'y': 0.87 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Abila Airport"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Kronos Pipe and Irrigation"
        },
        {
            'x': 0.725 * IMAGE_WIDTH,
            'y': 0.77 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Nationwide Refinery"
        },
        {
            'x': 0.169 * IMAGE_WIDTH,
            'y': 0.62 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Maximum Iron and Steel"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Stewart and Sons Fabrication"
        },
        {
            'x': 0.683 * IMAGE_WIDTH,
            'y': 0.705 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Carlyle Chemical Inc."
        },
        {
            'x': 0.416 * IMAGE_WIDTH,
            'y': 0.416 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Coffee Shack"
        },
        {
            'x': 0.315 * IMAGE_WIDTH,
            'y': 0.24 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Bean There Done That"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Brewed Awakenings"
        },
        {
            'x': 0.58 * IMAGE_WIDTH,
            'y': 0.535 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Jack's Magical Beans"
        },
        {
            'x': 0.872 * IMAGE_WIDTH,
            'y': 0.79 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Katerina's Café"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Hippokampos"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Abila Zacharo"
        },
        {
            'x': 0.45 * IMAGE_WIDTH,
            'y': 0.705 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Gelatogalore"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Kalami Kafenion"
        },
        {
            'x': 0.567 * IMAGE_WIDTH,
            'y': 0.84 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Ouzeri Elian"
        },
        {
            'x': 0.865 * IMAGE_WIDTH,
            'y': 0.72 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Guy's Gyros"
        },
        {
            'x': 0.515 * IMAGE_WIDTH,
            'y': 0.535 * IMAGE_HEIGHT,
            'r': 5,
            'location': "U-Pump"
        },
        {
            'x': 0.95 * IMAGE_WIDTH,
            'y': 0.7 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Frydos Autosupply n' More"
        },
        {
            'x': 0.39 * IMAGE_WIDTH,
            'y': 0.37 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Albert's Fine Clothing"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Shoppers' Delight"
        },
        {
            'x': 0.26 * IMAGE_WIDTH,
            'y': 0.4 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Abila Scrapyard"
        },
        {
            'x': 0.18 * IMAGE_WIDTH,
            'y': 0.42 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Frank's Fuel"
        },
        {
            'x': 0.817 * IMAGE_WIDTH,
            'y': 0.48 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Chostus Hotel"
        },
        {
            'x': 0.397 * IMAGE_WIDTH,
            'y': 0.685 * IMAGE_HEIGHT,
            'r': 5,
            'location': "General Grocer"
        },
        {
            'x': 0.29 * IMAGE_WIDTH,
            'y': 0.56 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Kronos Mart"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Octavio's Office Supplies"
        },
        {
            'x': 0.325 * IMAGE_WIDTH,
            'y': 0.62 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Roberts and Sons"
        },
        {
            'x': 0.635 * IMAGE_WIDTH,
            'y': 0.37 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Ahaggo Museum"
        },
        {
            'x': 0.5 * IMAGE_WIDTH,
            'y': 0.1 * IMAGE_HEIGHT,
            'r': 5,
            'location': "Desafio Golf Course"
        },
        {
            'x': 0.0 * IMAGE_WIDTH,
            'y': 0.0 * IMAGE_HEIGHT,
            'r': 0,
            'location': "Daily Dealz"
        },
    ]


MAX_LONG = 24.90848537
MIN_LONG = 24.82508806
MAX_LAT = 36.08995956
MIN_LAT = 36.04802098
DIFFLONG = (MAX_LONG - MIN_LONG) * 1000
DIFFLAT = (MAX_LAT - MIN_LAT) * 1000
IMAGE_WIDTH = 980
IMAGE_HEIGHT = 550

MAPX= IMAGE_WIDTH/DIFFLAT
MAPY= IMAGE_HEIGHT/DIFFLONG


def parse_timestamp(timestamp):
    return datetime.datetime.strptime(timestamp, "%m/%d/%Y %H:%M")


def parse_timestampcar(timestamp):
    return datetime.datetime.strptime(timestamp, "%m/%d/%Y %H:%M:%S")


def getX(location):
    for locat in locations:
        if locat['location']==location:
            return locat['x']
    return 0
        
def gety(location):
    for locat in locations:
        if locat['location']==location:
            return locat['y']
    return 0

def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth's radius in kilometers

    # Convert latitude and longitude to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(float(lat2))
    lon2_rad = math.radians(float(lon2))

    # Calculate the difference between the latitudes and longitudes
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Haversine formula
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Calculate the distance
    distance = R * c
    return distance

#dLong = (x - 10) / (1000 * MAPY * 1.72) + MIN_LONG
#dLat = (y - (IMAGE_WIDTH + 50) / 2) / (-1000 * MAPX * 0.47) + MIN_LAT

with open('./gpsoutput.json', 'r') as file:
    gpsData = json.load(file)

with open('./filtered_cc_data.json', 'r') as file:
    ccData = json.load(file)


for purchase in ccData:
    cc_timestamp = parse_timestamp(purchase["timestamp"])
    location= purchase["location"]
    lLat= (getX(location)-(IMAGE_WIDTH + 50) / 2) / (-1000 * MAPX * 0.47) + MIN_LAT
    lLong= (gety(location)- 10) / (1000 * MAPY * 1.72) + MIN_LONG
    cc_location = (lLat, lLong)

    for car in gpsData:
        car_timestamp = parse_timestampcar(car["Timestamp"])
        car_location = (car["lat"], car["long"])

        x=(cc_location[0]-float(car_location[0]))**2
        y=  (cc_location[1] -float(car_location[1]))**2
        distance= abs(math.sqrt(x+y))*100
        distanceTime= abs((car_timestamp- cc_timestamp).total_seconds()/60)

        
        if distanceTime<30 and distance < 0.5:
            print(car['id'], ": ", purchase["last4ccnum"] )
           
