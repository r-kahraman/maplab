// Debug utilities
function setupDebugging(map1, map2, regularTheme1, regularTheme2, currentLayerMap1, currentLayerMap2) {
    // Track layer events
    // map1.on('layeradd layerremove', function(e) {
    //     console.log(`Map1 ${e.type}:`, e.layer);
    // });
    
    // map2.on('layeradd layerremove', function(e) {
    //     console.log(`Map2 ${e.type}:`, e.layer);
    // });

    // Track view state
    function logViewState() {
        console.table({
            'Map 1': {
                'Current Layer': currentLayerMap1 === regularTheme1 ? 'Regular' : 'Satellite',
                'Zoom': map1.getZoom(),
                'Center': map1.getCenter()
            },
            'Map 2': {
                'Current Layer': currentLayerMap2 === regularTheme2 ? 'Regular' : 'Satellite',
                'Zoom': map2.getZoom(),
                'Center': map2.getCenter()
            }
        });
    }

    return {
        logViewState: logViewState
    };
}

// Function to switch views
function switchView(listMaps, listCurrentLayers, 
                   listNewLayers, 
                   listOverlayLayers) {
    // Remove current layers
    for (let [i, map] of listMaps.entries()) {
        map.removeLayer(listCurrentLayers[i]);
        map.addLayer(listNewLayers[i]);
        map.addLayer(listOverlayLayers[i]);
    }
    return {
        map1Layer: listNewLayers[0],
        map2Layer: listNewLayers[1]
    };
} 