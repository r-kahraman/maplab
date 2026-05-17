export const appSettings = {
    buttons: {
        onColor: '#953813',
        offColor: '#238a37'
    },

    sideBar: {
        test: '#953813'
    }
}

// Function to create tile layers
export function createTileLayers() {
    // Tile layers
    const satellite1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
        opacity: 0  // Start invisible
    });
    
    const satellite2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
        opacity: 0  // Start invisible
    });
    //
    // TESTING DIFFERENT REGULAR THEMES - WIP
    //
    // const regularTheme1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // });

    // const regularTheme2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // });

    const regularTheme1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    const regularTheme2 = L.tileLayer('https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        accessToken: 'xJYhWynlw5VQKxK0KqzKoBnuAnsNBB9PxrC33Fl0kBOPYwqg5kcNlP50fkY0kU9A'
    });
    
    // Create overlay layer for geographic information
    const overlayLayer1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 0,
        pane: 'overlayPane',
        subdomains: 'abcd'
    });
    
    const overlayLayer2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
        opacity: 0,
        pane: 'overlayPane',
        subdomains: 'abcd'
    });
    
    const matrixTheme1 = L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 1,  // Start visible
        minZoom: 0,
        maxZoom: 22,
        accessToken: 'xJYhWynlw5VQKxK0KqzKoBnuAnsNBB9PxrC33Fl0kBOPYwqg5kcNlP50fkY0kU9A'
    });
    const matrixTheme2 = L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 1,  // Start visible
        minZoom: 0,
        maxZoom: 22,
        accessToken: 'xJYhWynlw5VQKxK0KqzKoBnuAnsNBB9PxrC33Fl0kBOPYwqg5kcNlP50fkY0kU9A'
    });

    const Stadia_StamenToner = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    });

    const Stadia_StamenWatercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
        minZoom: 1,
        maxZoom: 16,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg'
    });


    const Hillshade1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri — Source: USGS, Esri, TANA, DeLorme',
        maxZoom: 16
      })

    const Hillshade2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: USGS, Esri, TANA, DeLorme',
    maxZoom: 16
    })

    const bnw_cartoDB1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    const bnw_cartoDB2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    })

    const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data © OpenTopoMap (CC-BY-SA)'
      })

    const Stadia_StamenTonerBackground = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    });
    
    const Thunderforest_Pioneer = L.tileLayer('https://api.thunderforest.com/pioneer/{z}/{x}/{y}{r}.png?apikey=b1f7fe747a6e4278b67f16f1defccb5f', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 22,
        crossOrigin: true
    });

    const BaseMapDE_Grey = L.tileLayer('https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_grau/default/GLOBAL_WEBMERCATOR/{z}/{y}/{x}.png', {
        attribution: 'Map data: &copy; <a href="http://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>',
        crossOrigin: true
    });

    const Stadia_StamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png',
        crossOrigin: true
    });

    return {
        satellite1,
        satellite2,
        matrixTheme1,
        matrixTheme2,
        overlayLayer1,
        overlayLayer2,
        Stadia_StamenToner,
        Stadia_StamenTonerBackground,
        Stadia_StamenWatercolor,
        regularTheme1,
        regularTheme2,
        Hillshade1,
        Hillshade2,
        bnw_cartoDB1,
        bnw_cartoDB2,
        openTopoMap,
        Thunderforest_Pioneer,
        BaseMapDE_Grey,
        Stadia_StamenTerrain
    };
}

export function copyLayerShapes(layers) {
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

export function enableCursorCircle(map, cursorCircle) {
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

export function disableCursorCircle(cursorCircle) {
    console.log('test before removing cursor circle')
    if (cursorCircle && cursorCircle.parentNode) {
        console.log('disabling cursor circle')
        cursorCircle.parentNode.removeChild(cursorCircle);
        cursorCircle.style.display = "none";
    }
}

export function resetPOIMarkers(poiMarkers) {
    poiMarkers.forEach(marker => {
        marker.remove();
    });
    poiMarkers = [];
}

export function getContourColor(elev, levels) {
    const index = levels.indexOf(elev);
    const gradient = ['#4c88aa', '#00aa00', '#558000', '#806000', '#995522', '#4d2a00', '#000000' ];
    return index !== -1 ? gradient[index] : '#808080';  // fallback to gray if not found
}
