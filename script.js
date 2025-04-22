console.log("Script is running!"); // This should appear in the console

// Check if Leaflet is loaded
if (typeof L !== "undefined") {
    console.log("Leaflet is loaded!");
} else {
    console.log("Leaflet is NOT loaded!");
}

document.addEventListener("DOMContentLoaded", function () {
    // Create the two map instances
    var map1 = L.map('map1',{ zoomControl: false }).setView([51.505, -0.09], 13);
    var map2 = L.map('map2',{ zoomControl: false }).setView([51.505, -0.09], 13);

    // Control 2: This add a scale to the map
    L.control.scale().addTo(map1);
    L.control.scale().addTo(map2);

    // Create all tile layers using the helper function
    const {
        satellite1,
        satellite2,
        regularTheme1,
        regularTheme2,
        overlayLayer1,
        overlayLayer2
    } = createTileLayers();

    // Add all layers to both maps initially
    satellite1.addTo(map1);
    satellite2.addTo(map2);
    regularTheme1.addTo(map1);
    regularTheme2.addTo(map2);
    overlayLayer1.addTo(map1);
    overlayLayer2.addTo(map2);

    // Initialize geocoders for both maps
    const geocoder1 = L.Control.Geocoder.nominatim();
    const geocoder2 = L.Control.Geocoder.nominatim();

    // Add search functionality for map1
    document.getElementById('search1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value;
            geocoder1.geocode(query, function(results) {
                if (results && results.length > 0) {
                    const result = results[0];
                    map1.setView(result.center, 13);
                    L.marker(result.center).addTo(map1)
                        .bindPopup(result.name || query)
                        .openPopup();
                }
            });
        }
    });

    // Add search functionality for map2
    document.getElementById('search2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value;
            geocoder2.geocode(query, function(results) {
                if (results && results.length > 0) {
                    const result = results[0];
                    map2.setView(result.center, 13);
                    L.marker(result.center).addTo(map2)
                        .bindPopup(result.name || query)
                        .openPopup();
                }
            });
        }
    });

    // Track current view state
    let isSatellite = false;

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
    const debug = setupDebugging(map1, map2, regularTheme1, regularTheme2, satellite1, satellite2);

    // Button to toggle satellite mode for both maps
    document.getElementById("toggleBtn").addEventListener("click", function () {
        isSatellite = !isSatellite;
        console.log('Switching to:', isSatellite ? 'Satellite' : 'Regular');

        // Toggle opacities
        if (isSatellite) {
            satellite1.setOpacity(1);
            satellite2.setOpacity(1);
            regularTheme1.setOpacity(0);
            regularTheme2.setOpacity(0);
        } else {
            satellite1.setOpacity(0);
            satellite2.setOpacity(0);
            regularTheme1.setOpacity(1);
            regularTheme2.setOpacity(1);
        }

        // Log the state change
        debug.logViewState();
    });
});