const IMAGE_WIDTH = 980;
const IMAGE_HEIGHT = 550;

const MIN_RANGE = 6
//parseInt(new Date('2014-01-06T00:00:00').getTime());
const MAX_RANGE =19
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
    r: 0,
    location: "Hippokampos",
  },
  {
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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
    x: 0.0 * IMAGE_WIDTH,
    y: 0.0 * IMAGE_HEIGHT,
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

const MAPX = IMAGE_HEIGHT / DIFFLAT;
const MAPY = IMAGE_WIDTH / DIFFLONG;

const MAPX= IMAGE_WIDTH/DIFFLAT;
const MAPY= IMAGE_HEIGHT/DIFFLONG;