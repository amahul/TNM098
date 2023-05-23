const IMAGE_WIDTH = 980;
const IMAGE_HEIGHT = 550;

const MIN_RANGE = 6
//parseInt(new Date('2014-01-06T00:00:00').getTime());
const MAX_RANGE = 19
//parseInt(new Date('2014-01-19T23:59:59').getTime());    

const MAX_DATE = new Date(MAX_RANGE);
const MIN_DATE = new Date(MIN_RANGE);

// Define some data points
const locations = [
  {
    x: 0.917 * IMAGE_WIDTH,
    y: 0.76 * IMAGE_HEIGHT,
    r: 5,
    location: "Brew've Been Served",
  },
  {
    x: 0.712 * IMAGE_WIDTH,
    y: 0.62 * IMAGE_HEIGHT,
    r: 5,
    location: "Hallowed Grounds",
  },
  {
    x: 0.775 * IMAGE_WIDTH,
    y: 0.79 * IMAGE_HEIGHT,
    r: 5,
    location: "Coffee Cameleon",
  },
  {
    x: 0.06 * IMAGE_WIDTH,
    y: 0.87 * IMAGE_HEIGHT,
    r: 5,
    location: "Abila Airport",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Kronos Pipe and Irrigation",
  },
  {
    x: 0.725 * IMAGE_WIDTH,
    y: 0.77 * IMAGE_HEIGHT,
    r: 5,
    location: "Nationwide Refinery",
  },
  {
    x: 0.169 * IMAGE_WIDTH,
    y: 0.62 * IMAGE_HEIGHT,
    r: 5,
    location: "Maximum Iron and Steel",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Stewart and Sons Fabrication",
  },
  {
    x: 0.683 * IMAGE_WIDTH,
    y: 0.705 * IMAGE_HEIGHT,
    r: 5,
    location: "Carlyle Chemical Inc.",
  },
  {
    x: 0.416 * IMAGE_WIDTH,
    y: 0.416 * IMAGE_HEIGHT,
    r: 5,
    location: "Coffee Shack",
  },
  {
    x: 0.315 * IMAGE_WIDTH,
    y: 0.24 * IMAGE_HEIGHT,
    r: 5,
    location: "Bean There Done That",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Brewed Awakenings",
  },
  {
    x: 0.58 * IMAGE_WIDTH,
    y: 0.535 * IMAGE_HEIGHT,
    r: 5,
    location: "Jack's Magical Beans",
  },
  {
    x: 0.872 * IMAGE_WIDTH,
    y: 0.79 * IMAGE_HEIGHT,
    r: 5,
    location: "Katerina\u2019s Caf\u00e9",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Hippokampos",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Abila Zacharo",
  },
  {
    x: 0.45 * IMAGE_WIDTH,
    y: 0.705 * IMAGE_HEIGHT,
    r: 5,
    location: "Gelatogalore",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Kalami Kafenion",
  },
  {
    x: 0.567 * IMAGE_WIDTH,
    y: 0.84 * IMAGE_HEIGHT,
    r: 5,
    location: "Ouzeri Elian",
  },
  {
    x: 0.865 * IMAGE_WIDTH,
    y: 0.72 * IMAGE_HEIGHT,
    r: 5,
    location: "Guy's Gyros",
  },
  { x: 0.515 * IMAGE_WIDTH, y: 0.535 * IMAGE_HEIGHT, r: 5, location: "U-Pump" },
  {
    x: 0.95 * IMAGE_WIDTH,
    y: 0.7 * IMAGE_HEIGHT,
    r: 5,
    location: "Frydos Autosupply n' More",
  },
  {
    x: 0.39 * IMAGE_WIDTH,
    y: 0.37 * IMAGE_HEIGHT,
    r: 5,
    location: "Albert's Fine Clothing",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Shoppers' Delight",
  },
  {
    x: 0.26 * IMAGE_WIDTH,
    y: 0.4 * IMAGE_HEIGHT,
    r: 5,
    location: "Abila Scrapyard",
  },
  {
    x: 0.18 * IMAGE_WIDTH,
    y: 0.42 * IMAGE_HEIGHT,
    r: 5,
    location: "Frank's Fuel",
  },
  {
    x: 0.817 * IMAGE_WIDTH,
    y: 0.48 * IMAGE_HEIGHT,
    r: 5,
    location: "Chostus Hotel",
  },
  {
    x: 0.397 * IMAGE_WIDTH,
    y: 0.685 * IMAGE_HEIGHT,
    r: 5,
    location: "General Grocer",
  },
  {
    x: 0.29 * IMAGE_WIDTH,
    y: 0.56 * IMAGE_HEIGHT,
    r: 5,
    location: "Kronos Mart",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Octavio's Office Supplies",
  },
  {
    x: 0.325 * IMAGE_WIDTH,
    y: 0.62 * IMAGE_HEIGHT,
    r: 5,
    location: "Roberts and Sons",
  },
  {
    x: 0.635 * IMAGE_WIDTH,
    y: 0.37 * IMAGE_HEIGHT,
    r: 5,
    location: "Ahaggo Museum",
  },
  {
    x: 0.5 * IMAGE_WIDTH,
    y: 0.1 * IMAGE_HEIGHT,
    r: 5,
    location: "Desafio Golf Course",
  },
  {
    x: -10.0 * IMAGE_WIDTH,
    y: -10.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Daily Dealz",
  },
];

const MAX_LONG = 24.90848537;
const MIN_LONG = 24.82508806;
const MAX_LAT = 36.08995956;
const MIN_LAT = 36.04802098;
const DIFFLONG = (MAX_LONG - MIN_LONG) * 1000;
const DIFFLAT = (MAX_LAT - MIN_LAT) * 1000;


const MAPX= IMAGE_WIDTH/DIFFLAT;
const MAPY= IMAGE_HEIGHT/DIFFLONG;


const colors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#800080", // Purple
  "#008000", // Dark Green
  "#000080", // Navy
  "#FFC0CB", // Pink
  "#FF4500", // Orange Red
  "#008080", // Teal
  "#800000", // Maroon
  "#FFFFE0", // Light Yellow
  "#C0C0C0", // Silver
  "#808080", // Gray
  "#FFFFFF", // White
  "#000000", // Black
  "#F0FFF0", // Honeydew
  "#FF1493", // Deep Pink
  "#FFD700", // Gold
  "#ADFF2F", // Green Yellow
  "#D2691E", // Chocolate
  "#DAA520", // Golden Rod
  "#2F4F4F", // Dark Slate Gray
  "#00CED1", // Dark Turquoise
  "#8A2BE2", // Blue Violet
  "#A52A2A", // Brown
  "#7FFF00", // Chartreuse
  "#BA55D3", // Medium Orchid
  "#1E90FF", // Dodger Blue
  "#B22222", // Fire Brick
  "#F5DEB3", // Wheat
  "#228B22", // Forest Green
  "#FF6347"  // Tomato
];


const creditCardAndCar =[
  
  {"source": "1", "target": "9551"},
  {"source": "3", "target": "9635"},
  {"source": "4", "target": "7688"},
  {"source": "5", "target": "6899"},
  {"source": "6", "target": "7253"},
  {"source": "7", "target": "2540"},
  {"source": "8", "target": "7889"},
  {"source": "12", "target": "7108"},
  {"source": "15", "target": "3853"},
  {"source": "16", "target": "7354"},
  {"source": "18", "target": "9617"},
  {"source": "19", "target": "6895"},
  {"source": "21", "target": "9405"},
  {"source": "24", "target": "4434"},
  {"source": "26", "target": "1310"},
  {"source": "29", "target": "3547"},
  {"source": "30", "target": "6901"},
  {"source": "33", "target": "9683"},
  {"source": "34", "target": "4795"}
]