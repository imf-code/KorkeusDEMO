//Draws a picture from elevation data, client side only

var dataString = "";
var mapArray = null;
var canvasWidth = null;
var canvasHeight = null;
var noDataValue = null;

function ReadTheForm() {

    //Confirm file extension and read the data as text to string
    console.log("Reading the file...");
    let filePath = document.getElementById('mapFile').value;
    if (!filePath.endsWith(".asc")) {
        console.log("Error opening the file: Invalid file extension, .asc expected.");
        return;
    }
    let file = document.getElementById('mapFile').files[0];
    let reader = new FileReader();
    reader.onload = () => {
        dataString = event.target.result;
        console.log("Done.");
        ParseTheData();
    }
    reader.onerror = () => {
        console.log("Error opening the file: Cannot read file.");
        return;
    }
    reader.readAsText(file);
}

function ParseTheData() {

    //Read necessary metadata from the string, error if not able or metadata not found
    try {
        console.log("Reading metadata...");
        canvasWidth = dataString.match(/(?<=^ncols\s*)\d+/);
        if (canvasWidth == null) {
            console.log("Error reading the data: Unknown format.");
            return;
        }
        canvasHeight = dataString.match(/(?<=nrows\s*)\d+/);
        if (canvasHeight == null) {
            console.log("Error reading the data: Unknown format.");
            return;
        }
        noDataValue = dataString.match(/(?<=NODATA_value\s*)-?\d*\.\d+/);
        if (noDataValue == null) {
            console.log("Error reading the data: Unknown format.");
            return;
        }

        let findTheMatrixRegex = new RegExp("(?<=" + noDataValue.toString() + "\\s*)-?\\d+");
        let indexOfMatrix = dataString.search(findTheMatrixRegex);
        var numberMatrixOnly = dataString.slice(indexOfMatrix);
        console.log("Done.");
    }
    catch (err) {
        console.log("Error parsing the string.");
        return;
    }

    //Turn into an array, check if array size matches metadata
    console.log("Converting to array...");
    numberMatrixOnly = numberMatrixOnly.replace(/\x0D?\x0A/g, "");
    mapArray = numberMatrixOnly.split(" ");
    console.log("Done.");

    if (mapArray.length != canvasHeight * canvasWidth) {
        console.log("Error: Unexpected map size.");
        return;
    }

    //Convert to float
    console.log("Converting to float...");
    mapArray.forEach((item, index, arr) => {
        arr[index] = parseFloat(item);
    });
    console.log("Done.");

    CreateMapCanvas();
}

function CreateMapCanvas() {

    //Calculate RGB values based on the range of elevations
    console.log("Calculating RGB values...")
    let minValue = getMin(mapArray);
    let maxValue = getMax(mapArray);
    let mapRange = maxValue - minValue;

    mapArray.forEach((item, index, arr) => {
        arr[index] = ((item - minValue) / mapRange) * 255;
    });
   
    mapArray.forEach((item, index, arr) => {
        arr[index] = Math.round(item);
    });
    console.log("Done.");
    

    //Create canvas imagedata and draw the map on it
    console.log("Drawing the image...");
    let mapCanvas = document.getElementById("mapPicture");
    let mapContext = mapCanvas.getContext("2d");

    document.getElementById("mapPicture").width = canvasWidth;
    document.getElementById("mapPicture").height = canvasHeight;
    var mapData = mapContext.createImageData(canvasWidth, canvasHeight);

    let colorR = 0;
    let colorG = 0;
    let colorB = mapArray;
    let colorA = 255;

    for (let i = 0; i < mapArray.length; i++) {
        let n = i * 4;
        mapData.data[n] = colorR;
        mapData.data[n + 1] = colorG;
        mapData.data[n + 2] = colorB[i];
        mapData.data[n + 3] = colorA;
    }
    console.log("Done.");


    //Draw imagedata to canvas
    mapContext.putImageData(mapData, 0, 0);
}

//Min/max functions for more data than Math.max/min can handle
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