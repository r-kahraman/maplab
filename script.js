console.log("Script is running!"); // This should appear in the console

// Check if Leaflet is loaded
if (typeof L !== "undefined") {
    console.log("Leaflet is loaded!");
} else {
    console.log("Leaflet is NOT loaded!");
}

document.addEventListener("DOMContentLoaded", function () {
    // Create the two map instances
    var map1 = L.map('map1').setView([51.505, -0.09], 13);
    var map2 = L.map('map2').setView([51.505, -0.09], 13);

    // Tile layers
    var satellite1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
    });
    
    var satellite2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
    });

    var regularTheme1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
    });
    var regularTheme2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
    });

    // Initially add the default light theme to both maps
    let currentLayerMap1 = regularTheme1;
    let currentLayerMap2 = regularTheme2;
    currentLayerMap1.addTo(map1);
    currentLayerMap2.addTo(map2);

    // // Sync panning
    let isSyncing = false; // Flag to prevent infinite loop
    map1.on('moveend', function() {
        if (!isSyncing) { 
            isSyncing = true; // Set flag to prevent feedback loop
            map2.setZoom(map1.getZoom());
            isSyncing = false; // Reset flag
        }
    });
    
    map2.on('moveend', function() {
        if (!isSyncing) { 
            isSyncing = true; // Set flag to prevent feedback loop
            map1.setZoom(map2.getZoom());
            isSyncing = false; // Reset flag
        }
    });    

    // Button to toggle satellite mode for both maps
    document.getElementById("satelliteBtn").addEventListener("click", function () {
        // Remove current layers and add satellite view
        map1.removeLayer(currentLayerMap1);
        map2.removeLayer(currentLayerMap2);
        currentLayerMap1 = satellite1;
        currentLayerMap2 = satellite2;
        currentLayerMap1.addTo(map1);
        currentLayerMap2.addTo(map2);

        //needs to change way more stuff
    });
});