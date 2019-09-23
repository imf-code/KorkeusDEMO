//Draws a picture from height data, client side only

var dataString = "";
var mapArray = null;
var canvasWidth = 0;
var canvasHeight = 0;
var noDataValue = 0;

function ReadTheForm() {

    //Read form data to string
    console.log("Reading the file...");
    let file = document.getElementById('mapFile').files[0];
    let reader = new FileReader();
    reader.onload = () => {
        dataString = event.target.result;
        console.log("Done.");
        ParseTheData();
    }
    reader.onerror = () => {
        console.log("Error opening the file. Invalid file type?");
        return;
    }
    reader.readAsText(file);
}

function ParseTheData() {

    //Read necessary metadata from the string data
    try {
        console.log("Reading metadata...");
        canvasWidth = dataString.match(/(?<=ncols\s*)\d+/);
        canvasHeight = dataString.match(/(?<=nrows\s*)\d+/);
        noDataValue = dataString.match(/(?<=NODATA_value\s*)-?\d*\.\d+/);
        let findTheMatrixRegex = new RegExp("(?<=" + noDataValue.toString() + "\\s*)-?\\d+");
        let indexOfMatrix = dataString.search(findTheMatrixRegex);
        var numberMatrixOnly = dataString.slice(indexOfMatrix);
        console.log("Done.");
    }
    catch (err) {
        console.log("Error parsing the string! Not a valid file format?");
        return;
    }

    //Turn into an array
    console.log("Converting to array...");
    numberMatrixOnly = numberMatrixOnly.replace(/\0D?\x0A/g, "");
    mapArray = numberMatrixOnly.split(" ");
    mapArray.pop();
    console.log("Done.");

    //Convert to float
    console.log("Converting to float...");
    mapArray.forEach((item, index, arr) => {
        arr[index] = parseFloat(item);
    });
    console.log("Done.");

    CreateMapCanvas();
}

function CreateMapCanvas() {

    //Calculate RGB values
    console.log("Calculating RGB values...")
    var minValue = getMin(mapArray);
    var maxValue = getMax(mapArray);
    var mapRange = maxValue - minValue;

    mapArray.forEach((item, index, arr) => {
        arr[index] = ((item - minValue) / mapRange) * 255;
    });
   
    mapArray.forEach((item, index, arr) => {
        arr[index] = Math.round(item);
    });
    console.log("Done.");
    

    //Create canvas imagedata
    console.log("Drawing the image...");
    var mapCanvas = document.getElementById("mapPicture");
    var mapContext = mapCanvas.getContext("2d");

    document.getElementById("mapPicture").width = canvasWidth;
    document.getElementById("mapPicture").height = canvasHeight;
    var mapData = mapContext.createImageData(canvasWidth, canvasHeight);

    var colorR = 0;
    var colorG = 0;
    var colorB = mapArray;
    var colorA = 255;

    for (let i = 0; i < mapArray.length; i++) {
        let n = i * 4;
        mapData.data[n] = colorR;
        mapData.data[n + 1] = colorG;
        mapData.data[n + 2] = colorB[i];
        mapData.data[n + 3] = colorA;
    }
    console.log("Done.");


    //Draw to canvas
    mapContext.putImageData(mapData, 0, 0);
}


//Print to console for debugging
function PrintIt() {
    for (let i = 0; i < mapArray.length; i++) {
    console.log(mapArray[i]);
    }
    console.log(canvasWidth + canvasHeight);
    console.log(noDataValue.toString());
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