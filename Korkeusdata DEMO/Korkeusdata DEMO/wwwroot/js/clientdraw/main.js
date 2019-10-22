// Draws a picture from numerical elevation data, client side only
// Main logic

/** Initial entry point, read user settings and file */
function OnSubmit() {
    document.getElementById("submitButton").disabled = true;
    try {
        ReadSettings();         // In forms.js
        ReadTheFile();          // In openfile.js
    }
    catch (err) {
        document.getElementById("submitButton").disabled = false;
        console.error(err);
    }
}

/** After data has been read into memory */
function AfterFileIsRead() {
    try {
        ParseTheData();         // In openfile.js
        CalculateRGBValues();   // In coloring.js
        ParseColorSettings();   // In coloring.js
        DrawMap();              // In coloring.js
    }
    catch (err) {
        document.getElementById("submitButton").disabled = false;
        console.error(err)
    }
    document.getElementById("submitButton").disabled = false;
}