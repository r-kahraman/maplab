// Function to create tile layers
function createTileLayers() {
    // Tile layers
    var satellite1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
        opacity: 0  // Start invisible
    });
    
    var satellite2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
        opacity: 0  // Start invisible
    });

    var regularTheme1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 1  // Start visible
    });
    var regularTheme2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 1  // Start visible
    });

    // Create overlay layer for geographic information
    var overlayLayer1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 1,
        pane: 'overlayPane',
        subdomains: 'abcd'
    });
    
    var overlayLayer2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 1,
        pane: 'overlayPane',
        subdomains: 'abcd'
    });

    return {
        satellite1,
        satellite2,
        regularTheme1,
        regularTheme2,
        overlayLayer1,
        overlayLayer2
    };
}

// Function to setup debugging
function setupDebugging(map1, map2, regularTheme1, regularTheme2, satellite1, satellite2) {
    // Track layer events
    map1.on('layeradd layerremove', function(e) {
        console.log('Map1 layer event:', e.type, e.layer);
    });
    
    map2.on('layeradd layerremove', function(e) {
        console.log('Map2 layer event:', e.type, e.layer);
    });

    // Function to log current view state
    function logViewState() {
        console.table({
            'Map 1': {
                'Regular Theme Opacity': regularTheme1.getOpacity(),
                'Satellite Theme Opacity': satellite1.getOpacity()
            },
            'Map 2': {
                'Regular Theme Opacity': regularTheme2.getOpacity(),
                'Satellite Theme Opacity': satellite2.getOpacity()
            }
        });
    }

    return {
        logViewState
    };
}

// Function to switch views
function switchView(isSatellite, listMaps, listCurrentLayers, 
                   listNewLayers, 
                   listOverlayLayers) {
    console.log('switchView called with:', {
        isSatellite,
        currentLayers: listCurrentLayers,
        newLayers: listNewLayers,
        overlayLayers: listOverlayLayers
    });

    // Remove current layers
    for (let [i, map] of listMaps.entries()) {
        console.log(`Processing map ${i}:`, {
            currentLayer: listCurrentLayers[i],
            newLayer: listNewLayers[i],
            overlayLayer: listOverlayLayers[i]
        });
        
        try {
            // Clear all layers first
            map.eachLayer(function(layer) {
                map.removeLayer(layer);
            });
            console.log(`Cleared all layers from map ${i}`);
            
            // Add the new base layer
            map.addLayer(listNewLayers[i]);
            console.log(`Added new layer to map ${i}`);
            
            // Add the overlay layer
            map.addLayer(listOverlayLayers[i]);
            console.log(`Added overlay layer to map ${i}`);
        } catch (error) {
            console.error(`Error processing map ${i}:`, error);
        }
    }
    return !isSatellite;  // Return the new state (opposite of current state)
} 