//Draws a picture from numerical elevation data, client side only

//The data itself
var dataString = null;
var elevationData = null;

//Settings
var colorSettingsMain = null;
var colorSettingsSecond = null;
var monoColor = true;
var isMonoColor = true;

//Metadata
var canvasWidth = null;
var canvasHeight = null;
var noDataValue = null;


//Initial entry point
function OnSubmit() {
    document.getElementById("submitButton").disabled = true;
    try {
        ReadSettings();
        ReadTheForm();
    }
    catch (err) {
        document.getElementById("submitButton").disabled = false;
        console.error(err);
    }
}

//After data has been read to memory
function AfterFileIsRead() {
    try {
        ParseTheData();
        CreateMapCanvas();
    }
    catch (err) {
        document.getElementById("submitButton").disabled = false;
        console.error(err)
    }
    document.getElementById("submitButton").disabled = false;
}

//Functionality for color mode toggle button
function setMonocolor() {
    let button = document.getElementById("colorToggle");
    let colorElement = document.getElementById("lowerColorSettings");

    monoColor = monoColor ? false : true;

    if (monoColor) {
        colorElement.style.display = "none";
        button.value = "Kaksiv\u00E4rinen";
    }
    else {
        colorElement.style.display = "block";
        button.value = "Yksiv\u00E4rinen";
    }
}

function ReadSettings() {

    //Read settings from HTML input form

    //Color settings
    isMonoColor = monoColor;

    let readColoringSettings = document.getElementsByName("coloringUpper");
    for (let i = 0; i < readColoringSettings.length; i++) {
        if (readColoringSettings[i].checked) {
            colorSettingsMain = readColoringSettings[i].value;
        }
    }

    let readColoringSettings2 = document.getElementsByName("coloringLower");
    for (let i = 0; i < readColoringSettings.length; i++) {
        if (readColoringSettings2[i].checked) {
            colorSettingsSecond = readColoringSettings[i].value;
        }
    }
}

function ReadTheForm() {

    //Confirm file extension and read the data as text
    console.log("Reading the file...");
    let filePath = document.getElementById('mapFile').value;
    if (!filePath.endsWith(".asc")) {
        throw "Error opening the file: Invalid file extension, .asc expected.";
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
        throw "Error opening the file: Cannot read file.";
        return;
    }
    reader.readAsText(file);
}

function ParseTheData() {

    //Read necessary metadata from the string, error if not found
    let parseError = "Error reading the data: Metadata not found.";
    try {
        console.log("Reading metadata...");
        canvasWidth = dataString.match(/(?<=^ncols\s*)\d+/);
        if (canvasWidth == null) {
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

        //Separate elevation data from metadata, only numbers and spaces should remain afterwards
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
    elevationData = elevationData.replace(/\r?\n/g, "");
    elevationData = elevationData.split(" ");
    console.log("Done.");

    if (elevationData.length != canvasHeight * canvasWidth) {
        throw ("Error: Unexpected map size.");
        return;
    }

    //Convert to float, change NODATA values to NaN
    console.log("Converting to float...");
    elevationData = elevationData.map(parseFloat);

    noDataValue = parseFloat(noDataValue);
    elevationData.forEach((_item, index, arr) => {
        if (arr[index] == noDataValue) {
            arr[index] = NaN;
        }
    });
    console.log("Done.");
}

function CreateMapCanvas() {

    //Calculate RGB values based on the max range of elevations
    console.log("Calculating RGB values...")
    let minValue = getMin(elevationData);
    let maxValue = getMax(elevationData);
    let mapRange = maxValue - minValue;

    elevationData = elevationData.map(item => Math.round(((item - minValue) / mapRange) * 255));
    console.log("Done.");

    //Create canvas imagedata
    console.log("Drawing the image...");
    let mapCanvas = document.getElementById("mapPicture");
    let mapContext = mapCanvas.getContext("2d");

    document.getElementById("mapPicture").width = canvasWidth;
    document.getElementById("mapPicture").height = canvasHeight;
    var mapImageData = mapContext.createImageData(canvasWidth, canvasHeight);

    //Parse through color settings
    //Set default values for colors
    let colorAlpha = 255;
    let defaultColorValue = 0;
    let colorDivider = Math.round(((10 - minValue) / mapRange) * 255);

    //Set main color
    switch (colorSettingsMain) {
        case "red":
            var mainColor = 0;
            var unusedColor = 1;
            var noData = 2;
            break;
        case "green":
            var mainColor = 1;
            var unusedColor = 2;
            var noData = 0;
            break;
        case "blue":
            var mainColor = 2;
            var unusedColor = 1;
            var noData = 0;
            break;
        default:
            throw "Error with color settings: Main color not set.";
            break;
    }

    //Two colored map
    if (!(isMonoColor || colorSettingsMain == colorSettingsSecond)) {
        switch (colorSettingsSecond) {
            case "red":
                var secondColor = 0;
                break;
            case "green":
                var secondColor = 1;
                break;
            case "blue":
                var secondColor = 2;
                break;
            default:
                throw "Error with color settings: Second color not set.";
                break;
        }

        //Set NODATA value
        if (!(mainColor == 0 || secondColor == 0)) {
            var noData = 0;
        }
        else if (!(mainColor == 1 && secondColor == 1)) {
            var noData = 1;
        }
        else if (!(mainColor == 2 && secondColor == 2)) {
            var noData = 2;
        }
        else {
            throw "Error with color settings: Couldn't set color for NODATA.";
        }

        //Put values into imagedata, two different colors
        for (let i = 0; i < mapImageData.data.length; i++) {
            let n = i * 4;
            mapImageData.data[n + noData] = isNaN(elevationData[i]) ? 255 : 0; //Is it faster to check for bool AND condition or just the condition??
            mapImageData.data[n + mainColor] = elevationData[i] > colorDivider ? elevationData[i] : defaultColorValue;
            mapImageData.data[n + secondColor] = elevationData[i] <= colorDivider ? elevationData[i] : defaultColorValue;
            mapImageData.data[n + 3] = colorAlpha;
        }
    }
    else {
        //Put values into imagedata, single color
        for (let i = 0; i < mapImageData.data.length; i++) {
            let n = i * 4;
            mapImageData.data[n + noData] = isNaN(elevationData[i]) ? 255 : defaultColorValue; //Is it faster to check for bool AND condition or just the condition??
            mapImageData.data[n + mainColor] = elevationData[i];
            mapImageData.data[n + unusedColor] = defaultColorValue;
            mapImageData.data[n + 3] = colorAlpha;
        }
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