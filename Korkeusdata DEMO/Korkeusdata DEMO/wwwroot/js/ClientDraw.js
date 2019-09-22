// JavaScript source code
//Various variables
//var rawData; //not used atm
var strData = "";
var mapArray;

// JavaScript source code
function ReadIt() {

    //Read data from form
    var file = document.getElementById('mapFile').files[0];
    var reader = new FileReader();
    reader.onload = () => {
        strData = event.target.result;
        DoIt();
    }
    reader.readAsText(file);
}

function DoIt() {
    //Read numbers from data to string
    var numOnly = strData.slice(157);


    //Turn into an array
    console.log("Converting to array...");
    mapArray = numOnly.split(" ");
    mapArray.pop();
    console.log("Done.");

    /*Turn into 2d string array
    console.log("Converting to 2d array...");
    mapArray = numOnly.split("\n")
    for (let i = 0; i < mapArray.length; i++) {
        mapArray[i] = mapArray[i].split(" ");
    }
    mapArray.pop();
    console.log("Done.");
    */


    //Convert to float
    console.log("Converting to float...");
    function IntoFloat(item, index, arr) {
        arr[index] = parseFloat(item);
    }
    mapArray.forEach(IntoFloat);
    console.log("Done.");

    /*Convert 2d into float
    console.log("Converting to float...");
    function IntoFloat(item, index, arr) {
        arr[index] = parseFloat(item);
    }

    function DIntoFloat(item, index, arr) {
        arr[index].forEach(IntoFloat);
    }

    mapArray.forEach(DIntoFloat);
    console.log("Done.");
    */


    /*Write boolMap
    console.log("Creating boolMap...")
    var boolMap = new Array(mapArray.length);
    for (let row = 0; row < mapArray.length; row++) {
        boolMap[row] = [];
        for (let column = 0; column < mapArray[row].length; column++) {
            if (mapArray[row][column] > 0) {
                boolMap[row][column] = 1;
            }
            else {
                boolMap[row][column] = 0;
            }
        }
        //mapArray[row].push("\n");
    }
    console.log("Done.");
    */

    /*
    //Make canvas
    console.log("Creating canvas...");
    var mapCanvas = document.getElementById("mapPicture");
    var mapContext = mapCanvas.getContext("2d");

    for (let i = 0; i < boolMap.length; i++)

    console.log("Done.");
    */


    //Calculate RGB values
    console.log("Preparing to calculate RGB values...")
    var minValue = getMin(mapArray);
    var maxValue = getMax(mapArray);
    var mapRange = -minValue + maxValue;

    console.log("Calculating RGB values...");
    function ForEachToRGB(item, index, arr) {
        arr[index] = ((-minValue + item) / mapRange)  * 255;
    }
    mapArray.forEach(ForEachToRGB);
   
    console.log("Converting to int for RGB...")
    function ToIntForRGB(item, index, arr) {
        arr[index] = Math.round(item);
    }
    mapArray.forEach(ToIntForRGB);

    console.log("Done.");
    

    //Create canvas imagedata
    var mapCanvas = document.getElementById("mapPicture");
    var mapContext = mapCanvas.getContext("2d");

    var mapData = mapContext.createImageData(2400, 1200);

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


    //Draw to canvas
    mapContext.putImageData(mapData, 0, 0);
    

    //PrintIt();
}

/*
function PrintIt() {
    //Print an array to console
    var targetVar = mapArray;
    console.log(...targetVar);

    /*Print 2d
    for (let row = 0; row < targetVar.length; row++) {
        //printOut = boolMap[row].join("");

        console.log(...targetVar[row]); //Direct print (slow?)
    }

}
*/

//Min/Max functions for large data
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