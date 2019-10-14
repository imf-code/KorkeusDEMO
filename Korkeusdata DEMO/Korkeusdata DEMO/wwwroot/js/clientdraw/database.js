// Database interaction through API

/** Writing map to db */
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

    console.log("POSTing...");
    fetch('https://localhost:44315/api/Map/Meta/', metaPost);
    fetch('https://localhost:44315/api/Map/Data/', dataPost);
    console.log("Done.");
}