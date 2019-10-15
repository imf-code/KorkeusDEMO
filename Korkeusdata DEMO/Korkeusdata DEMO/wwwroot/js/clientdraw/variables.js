// Global variables

// For holding the elevation data
var dataString = "";
var elevationData = "";
var elevationColorData = 0;

// User settings
var colorSettingsMain = "";
var colorSettingsSecond = "";
var monoColor = true;
var isMonoColor = true;
var waterLevel = 0;
var colorDivider = 0;
var uploadToDb = false;

// Metadata from the file
var canvasWidth = 0;
var canvasHeight = 0;
var noDataValue = null;
var filePath = "";

// Values from the elevation data
var minValue = 0;
var maxValue = 0;
var mapRange = 0;

// RGB settings, to be determined from user settings
var defaultRGBValue = 0;
var mainColor = 0;
var secondColor = 0;
var noData = 0;
var colorAlpha = 255;