//Draws a picture from numerical elevation data, client side only

var dataString = null;
var elevationData = null;
var colorSetting = null;
var canvasWidth = null;
var canvasHeight = null;
var noDataValue = null

//Initial entry point, up to file being read
function OnSubmit() {
    ReadSettings();
    ReadTheForm();
}

//After the file is read
function AfterFileIsRead() {
    try {
        ParseTheData();
        CreateMapCanvas();
    }
    catch (err) {
        console.error(err)
        return;
    }
}

function ReadSettings() {

    //Read settings from HTML input
    let readColoringSettings = document.getElementsByName("coloring");
    for (let i = 0; i < readColoringSettings.length; i++) {
        if (readColoringSettings[i].checked) {
            colorSetting = readColoringSettings[i].value;
        }
    }
}

function ReadTheForm() {

    //Confirm file extension and read the data as text
    console.log("Reading the file...");
    let filePath = document.getElementById('mapFile').value;
    if (!filePath.endsWith(".asc")) {
        console.error("Error opening the file: Invalid file extension, .asc expected.");
        return;
    }

    let file = document.getElementById('mapFile').files[0];
    let reader = new FileReader();
    reader.onload = () => {
        dataString = event.target.result;
        console.log("Done.");
        AfterFileIsRead();
    }
    reader.onerror = () => {
        console.error("Error opening the file: Cannot read file.");
        return;
    }
    reader.readAsText(file);
}

function ParseTheData() {

    let parseError = new Error ("Error reading the data: Metadata not found.");

    //Read necessary metadata from the string, error if not found
    try {
        console.log("Reading metadata...");
        canvasWidth = dataString.match(/(?<=^ncols\s*)\d+/);
        if (canvasWidth == null) {
            //throw ("Error reading the data: Unknown format.");
            throw parseError;
            return;
        }
        canvasHeight = dataString.match(/(?<=nrows\s*)\d+/);
        if (canvasHeight == null) {
            throw parseError;
            return;
        }
        noDataValue = dataString.match(/(?<=NODATA_value\s*)-?\d*\.\d+/);
        if (noDataValue == null) {
            throw parseError;
            return;
        }

        //Separate elevation data from metadata, only numbers should remain
        let findTheMatrixRegex = new RegExp("(?<=" + noDataValue.toString() + "\\s*)-?\\d+");
        let indexOfMatrix = dataString.search(findTheMatrixRegex);
        elevationData = dataString.slice(indexOfMatrix);
        console.log("Done.");
    }
    catch (err) {
        throw (err);
        return;
    }

    //Turn into an array, check if array size matches metadata
    console.log("Converting to array...");
    elevationData = elevationData.replace(/\x0D?\x0A/g, "");
    elevationData = elevationData.split(" ");
    console.log("Done.");

    if (elevationData.length != canvasHeight * canvasWidth) {
        throw ("Error: Unexpected map size.");
        return;
    }

   //Convert to float
    console.log("Converting to float...");
    elevationData.forEach((item, index, arr) => {
        arr[index] = parseFloat(item);
    });
    console.log("Done.");
}

function CreateMapCanvas() {

    //Calculate RGB values based on the max range of elevations
    console.log("Calculating RGB values...")
    let minValue = getMin(elevationData);
    let maxValue = getMax(elevationData);
    let mapRange = maxValue - minValue;

    elevationData.forEach((item, index, arr) => {
        arr[index] = ((item - minValue) / mapRange) * 255;
    });

    elevationData.forEach((item, index, arr) => {
        arr[index] = Math.round(item);
    });
    console.log("Done.");

    //Create canvas imagedata and draw the map on it
    console.log("Drawing the image...");
    let mapCanvas = document.getElementById("mapPicture");
    let mapContext = mapCanvas.getContext("2d");

    document.getElementById("mapPicture").width = canvasWidth;
    document.getElementById("mapPicture").height = canvasHeight;
    var mapImageData = mapContext.createImageData(canvasWidth, canvasHeight);

    var colorR = 0;
    var colorG = 0;
    var colorB = 0;
    var colorA = 255;

    var waterLevel = null;
    if (minValue < 0) {
        waterLevel = ((0 - minValue) / mapRange) * 255;
    }
    else {
        return;
    }

    switch (colorSetting) {
        case "blue":
            colorB = elevationData;
            break;

        case "redAndBlue":
            colorR = elevation;
            colorB = elevationData;
            break;

        default:
            break;
    }

    for (let i = 0; i < elevationData.length; i++) {
        let n = i * 4;
        mapImageData.data[n] = colorR === 0 ? colorR : elevationData[i];
        mapImageData.data[n + 1] = colorG === 0 ? colorG : elevationData[i];
        mapImageData.data[n + 2] = colorB === 0 ? colorG : elevationData[i];
        mapImageData.data[n + 3] = colorA;
    }
    console.log("Done.");

    //Draw imagedata to canvas
    mapContext.putImageData(mapImageData, 0, 0); 
}

//Min/max functions for more data than Math.max/min can handle, used in CreateMapCanvas()
//Taken from: 
//https://stackoverflow.com/questions/42623071/maximum-call-stack-size-exceeded-with-math-min-and-math-max
function getMax(arr) {
    let len = arr.length;
    let max = -Infinity;

    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}

function getMin(arr) {
    let len = arr.length;
    let min = Infinity;

    while (len--) {
        min = arr[len] < min ? arr[len] : min;
    }
    return min;
}