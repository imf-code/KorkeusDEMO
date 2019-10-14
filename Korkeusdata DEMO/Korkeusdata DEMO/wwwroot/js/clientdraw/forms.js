// Read html forms and/or add functionality

/** Read settings from html form, in forms.js */
function ReadSettings() {
    //Save mono/multi color setting for later use
    isMonoColor = monoColor;

    // Color settings
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

    // Water level
    waterLevel = document.getElementById("waterLevel").value;
}

/** Functionality for color mode toggle button, in forms.js */
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

/** Functionality for refresh map button, in forms.js */
function RefreshMap() {
    try {
        ReadSettings();
        ParseColorSettings();
        DrawMap();
    }
    catch (err) {
        console.error(err)
    }
}

/** Button for adding map data to database, in forms.js */
function DbAddButton() {
    uploadToDb = true;
    OnSubmit();
}