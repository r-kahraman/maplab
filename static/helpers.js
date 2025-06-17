var appSettings = {
    buttons: {
        onColor: '#953813',
        offColor: '#238a37'
    },

    sideBar: {
        test: '#953813'
    }
}

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
        opacity: 0,
        pane: 'overlayPane',
        subdomains: 'abcd'
    });
    
    var overlayLayer2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 0,
        pane: 'overlayPane',
        subdomains: 'abcd'
    });
    
    var matrixTheme1 = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 1,  // Start visible
        minZoom: 0,
        maxZoom: 22,
        accessToken: 'xJYhWynlw5VQKxK0KqzKoBnuAnsNBB9PxrC33Fl0kBOPYwqg5kcNlP50fkY0kU9A'
    });
    var matrixTheme2 = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 1,  // Start visible
        minZoom: 0,
        maxZoom: 22,
        accessToken: 'xJYhWynlw5VQKxK0KqzKoBnuAnsNBB9PxrC33Fl0kBOPYwqg5kcNlP50fkY0kU9A'
    });

    var Stadia_StamenToner = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    });

    var Stadia_StamenWatercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
        minZoom: 1,
        maxZoom: 16,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg'
    });

    var OSM_Mapnik1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var OSM_Mapnik2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var Hillshade1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri — Source: USGS, Esri, TANA, DeLorme',
        maxZoom: 16
      })

    var Hillshade2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: USGS, Esri, TANA, DeLorme',
    maxZoom: 16
    })

    var bnw_cartoDB1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    var bnw_cartoDB2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    })

    return {
        satellite1,
        satellite2,
        matrixTheme1,
        matrixTheme2,
        overlayLayer1,
        overlayLayer2,
        Stadia_StamenToner,
        Stadia_StamenWatercolor,
        OSM_Mapnik1,
        OSM_Mapnik2,
        Hillshade1,
        Hillshade2,
        bnw_cartoDB1,
        bnw_cartoDB2
    };
}

function copyLayerShapes(layers) {
    let layerCopies = [];
    let layerCopy;
    layers.forEach(layer => {
        // Create a copy of the layer based on its type
        if (layer instanceof L.Polygon) {
            layerCopy = L.polygon(layer.getLatLngs(), {
                ...layer.options,
                scaleWithZoom: true
            });
        } else if (layer instanceof L.Polyline) {
            layerCopy = L.polyline(layer.getLatLngs(), {
                ...layer.options,
                scaleWithZoom: true
            });
        }
        layerCopies.push(layerCopy); // Changed .add() to .push()
    });
    return layerCopies;
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

function enableCursorCircle(map, cursorCircle) {
    if (!cursorCircle) {
        console.log("Start value of cursorCircle: ", cursorCircle)
        cursorCircle = document.createElement("div");
        cursorCircle.id = "cursor-circle";
        //maps.forEach(map => {
        //    map.getContainer().appendChild(cursorCircle);
        //}); 
        map.getContainer().appendChild(cursorCircle);
    }

    cursorCircle.style.display = "block";

    map.getContainer().addEventListener("mousemove", (e) => {
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;
    });
    
    return cursorCircle;
}

function disableCursorCircle(cursorCircle) {
    console.log('test before removing cursor circle')
    if (cursorCircle && cursorCircle.parentNode) {
        console.log('disabling cursor circle')
        cursorCircle.parentNode.removeChild(cursorCircle);
        cursorCircle.style.display = "none";
    }
}

function resetPOIMarkers(poiMarkers) {
    poiMarkers.forEach(marker => {
        marker.remove();
    });
    poiMarkers = [];
}