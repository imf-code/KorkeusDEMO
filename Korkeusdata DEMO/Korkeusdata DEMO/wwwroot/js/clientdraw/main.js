// Draws a picture from numerical elevation data, client side only
// Main logic

/** Initial entry point */
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

/** After data has been read into memory */
function AfterFileIsRead() {
    try {
        ParseTheData();
        CalculateRGBValues();
        ParseColorSettings();
        DrawMap();
    }
    catch (err) {
        document.getElementById("submitButton").disabled = false;
        console.error(err)
    }
    document.getElementById("submitButton").disabled = false;
}