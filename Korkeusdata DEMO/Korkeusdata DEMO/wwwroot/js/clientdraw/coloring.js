// Turning elevation values into RGB values

/** Calculate RGB values */
function CalculateRGBValues() {
    // Calculate RGB values based on the max range of elevations
    console.log("Calculating RGB values...")
    minValue = getMin(elevationData);
    maxValue = getMax(elevationData);
    mapRange = maxValue - minValue;

    elevationColorData = elevationData.map(item => Math.round(((item - minValue) / mapRange) * 255));
    console.log("Done.");
}

/** Create canvas imagedata and draw the map onto it */
function DrawMap() {

    // Create canvas imagedata
    console.log("Drawing the map...");
    let mapCanvas = document.getElementById("mapPicture");
    let mapContext = mapCanvas.getContext("2d");

    document.getElementById("mapPicture").width = canvasWidth;
    document.getElementById("mapPicture").height = canvasHeight;
    let mapImageData = mapContext.createImageData(canvasWidth, canvasHeight);

    // Single color
    if (isMonoColor || colorSettingsMain == colorSettingsSecond) {
        for (let i = 0; i < mapImageData.data.length; i++) {
            let n = i * 4;
            mapImageData.data[n + noData] = isNaN(elevationColorData[i]) ? 255 : defaultRGBValue;
            mapImageData.data[n + mainColor] = elevationColorData[i];
            mapImageData.data[n + secondColor] = defaultRGBValue;
            mapImageData.data[n + 3] = colorAlpha;
        }
    }

    // Two different colors
    else {
        for (let i = 0; i < mapImageData.data.length; i++) {
            let n = i * 4;
            mapImageData.data[n + noData] = isNaN(elevationColorData[i]) ? 255 : 0;
            mapImageData.data[n + mainColor] = elevationColorData[i] > colorDivider ? elevationColorData[i] : defaultRGBValue;
            mapImageData.data[n + secondColor] = elevationColorData[i] <= colorDivider ? elevationColorData[i] : defaultRGBValue;
            mapImageData.data[n + 3] = colorAlpha;
        }
    }

    // Draw imagedata to canvas
    mapContext.putImageData(mapImageData, 0, 0);
    console.log("Done");
}

/** Set RGB color coding for drawing the map */
function ParseColorSettings() {
    // Set color divider
    colorDivider = Math.round(((waterLevel - minValue) / mapRange) * 255);

    // Set main color
    switch (colorSettingsMain) {
        case "red":
            mainColor = 0;
            secondColor = 1;
            noData = 2;
            break;
        case "green":
            mainColor = 1;
            secondColor = 2;
            noData = 0;
            break;
        case "blue":
            mainColor = 2;
            secondColor = 1;
            noData = 0;
            break;
        default:
            throw "Error with color settings: Main color not set.";
            break;
    }

    // Two colored map
    if (!(isMonoColor || colorSettingsMain == colorSettingsSecond)) {
        switch (colorSettingsSecond) {
            case "red":
                secondColor = 0;
                break;
            case "green":
                secondColor = 1;
                break;
            case "blue":
                secondColor = 2;
                break;
            default:
                throw "Error with color settings: Second color not set.";
                break;
        }

        // Set NODATA value
        if (!(mainColor == 0 || secondColor == 0)) {
            noData = 0;
        }
        else if (!(mainColor == 1 && secondColor == 1)) {
            noData = 1;
        }
        else if (!(mainColor == 2 && secondColor == 2)) {
            noData = 2;
        }
        else {
            throw "Error with color settings: Couldn't set color for NODATA.";
        }
    }
}

/** Min/max functions for more data than Math.max/min can handle */
// Taken from: 
// https://stackoverflow.com/questions/42623071/maximum-call-stack-size-exceeded-with-math-min-and-math-max
function getMax(arr) {
    let len = arr.length;
    let max = -Infinity;

    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}

/** Min/max functions for more data than Math.max/min can handle */
function getMin(arr) {
    let len = arr.length;
    let min = Infinity;

    while (len--) {
        min = arr[len] < min ? arr[len] : min;
    }
    return min;
}