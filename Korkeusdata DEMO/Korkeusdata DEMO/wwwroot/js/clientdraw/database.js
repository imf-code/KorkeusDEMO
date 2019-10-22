// Database interaction through API

/** POST map to db API */
function WriteToDb() {
    ParseTheData();

    // Construct JSONs
    console.log("Initializing POST...");
    let id = filePath.slice(12, 17);        // Fix this later
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


    // POST
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

    // Async fetch
    console.log("Fetching data...");
    let dbId = document.getElementById("mapId").value;
    let fetchPromise = await fetch("https://localhost:44315/api/Map/" + dbId, JSONGet);
    console.log("Done.");

    // Parse JSON into js object
    console.log("Parsing JSON...");
    let p1 = performance.now();
    console.log(p1);
    let fetchJSON = await fetchPromise.json();
    let p2 = performance.now();
    console.log(p2);
    console.log(p2-p1);
    console.log("Done.");

    // Set metadata
    console.log("Reading data...");
    elevationData = fetchJSON.mapData;
    canvasHeight = fetchJSON.height;
    canvasWidth = fetchJSON.width;
    noDataValue = fetchJSON.noDataValue;
    console.log("Done.");

    // Draw map
    CalculateRGBValues();
    RefreshMap();
}