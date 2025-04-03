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
    var regularTheme2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
    });

    // Create overlay layer for geographic information
    var overlayLayer1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 0.9,  // High opacity for better visibility
        pane: 'overlayPane'  // Ensure it's on top of the satellite layer
    });
    
    var overlayLayer2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 0.9,  // High opacity for better visibility
        pane: 'overlayPane'  // Ensure it's on top of the satellite layer
    });

    // Initially add the default light theme to both maps
    let currentLayerMap1 = regularTheme1;
    let currentLayerMap2 = regularTheme2;
    currentLayerMap1.addTo(map1);
    currentLayerMap2.addTo(map2);

    // --- Sync panning and zooming with debounce
    let isSyncing = false;
    let zoomTimeout;

    function syncZoom(sourceMap, targetMap) {
        if (!isSyncing) {
            isSyncing = true;
            
            // Clear any pending zoom sync
            if (zoomTimeout) {
                clearTimeout(zoomTimeout);
            }
            
            // Wait for the zoom animation to complete before syncing
            zoomTimeout = setTimeout(() => {
                targetMap.setZoom(sourceMap.getZoom());
                isSyncing = false;
            }, 100); // Small delay to ensure zoom animation is complete
        }
    }

    map1.on('zoomend', function() {
        syncZoom(map1, map2);
    });
    
    map2.on('zoomend', function() {
        syncZoom(map2, map1);
    });

    // Initialize debugging
    const debug = setupDebugging(map1, map2, regularTheme1, regularTheme2, currentLayerMap1, currentLayerMap2);

    // Button to toggle satellite mode for both maps
    document.getElementById("toggleBtn").addEventListener("click", function () {
        const isSatellite = (currentLayerMap1 === satellite1);
        console.log('Current mode:', isSatellite ? 'Satellite' : 'Regular');
        
        if (!isSatellite) {
            // Switch TO satellite mode
            console.log('Switching to satellite mode');
            const newLayers = switchView(
                [map1, map2],
                [currentLayerMap1, currentLayerMap2],
                [satellite1, satellite2],
                [overlayLayer1, overlayLayer2]
            );
            currentLayerMap1 = newLayers.map1Layer;
            currentLayerMap2 = newLayers.map2Layer;
        } else {
            // Switch TO regular mode
            console.log('Switching to regular mode');
            const newLayers = switchView(
                [map1, map2],
                [currentLayerMap1, currentLayerMap2],
                [regularTheme1, regularTheme2],
                [overlayLayer1, overlayLayer2]
            );
            currentLayerMap1 = newLayers.map1Layer;
            currentLayerMap2 = newLayers.map2Layer;
        }

        // Log the state change
        debug.logViewState();
    });
});