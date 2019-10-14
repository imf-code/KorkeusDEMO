// Database interaction through API

/** POST map to db API */
function WriteToDb() {
    ParseTheData();

    // Construct JSONs
    console.log("Initializing POST...");
    let id = filePath.slice(12, 17);
    let metaJSON = {
        MapId: id,
        Width: parseInt(canvasWidth),
        Height: parseInt(canvasHeight),
        NodataValue: noDataValue
    };
    let dataJSON = {
        MapId: id,
        MapData: elevationData
    };

    metaJSON = JSON.stringify(metaJSON);
    dataJSON = JSON.stringify(dataJSON);
    console.log(metaJSON);
    console.log(dataJSON);

    // Settings for POSTing
    const metaPost = {
        method: 'POST',
        body: metaJSON,
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const dataPost = {
        method: 'POST',
        body: dataJSON,
        headers: {
            'Content-Type': 'application/json'
        },
    };
    console.log("Done.");

    console.log("POSTing...");
    fetch('https://localhost:44315/api/Map/Meta/', metaPost);
    fetch('https://localhost:44315/api/Map/Data/', dataPost);
    console.log("Done.");
}

/** GET data from db API */
async function ReadFromDb() {
    // Setting for GET
    const JSONGet = {
        method: 'GET'
    }

    let dbId = document.getElementById("mapId").value;

    console.log("Fetching data...");
    // Async fetch
    let fetchPromise = await fetch("https://localhost:44315/api/Map/" + dbId, JSONGet);
    let fetchJSON = await fetchPromise.json();

    // Set metadata
    elevationData = fetchJSON.mapData;
    canvasHeight = fetchJSON.height;
    canvasWidth = fetchJSON.width;
    noDataValue = fetchJSON.noDataValue;
    console.log("Done.");

    // Draw map
    CalculateRGBValues();
    RefreshMap();
}