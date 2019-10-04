// Reading and initial handling of elevation data from .asc file

/** Open user file and read it as text, in openfile.js */
function ReadTheForm() {

    // Confirm file extension and read the data as text
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

/** Read metadata and convert to a float array, in openfile.js */
function ParseTheData() {

    // Read necessary metadata from the string, error if not found
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

        // Separate elevation data from metadata, only numbers and spaces should remain afterwards
        let findTheMatrixRegex = new RegExp("(?<=" + noDataValue.toString() + "\\s*)-?\\d+");
        let indexOfMatrix = dataString.search(findTheMatrixRegex);
        elevationData = dataString.slice(indexOfMatrix);
        console.log("Done.");
    }
    catch (err) {
        throw (err);
        return;
    }

    // Turn into an array, check if array size matches metadata
    console.log("Converting to array...");
    elevationData = elevationData.replace(/\r?\n/g, "");
    elevationData = elevationData.split(" ");
    console.log("Done.");

    if (elevationData.length != canvasHeight * canvasWidth) {
        throw ("Error: Unexpected map size.");
        return;
    }

    // Convert to float, change NODATA values to NaN
    console.log("Converting to float...");
    elevationData = elevationData.map(parseFloat);

    noDataValue = parseFloat(noDataValue);
    elevationData.forEach((_item, index, arr) => {
        if (arr[index] == NaN) {
            throw "Error handling the data: File may be corrupt.";
            return;
        }
        if (arr[index] == noDataValue) {
            arr[index] = NaN;
        }
    });
    console.log("Done.");
}