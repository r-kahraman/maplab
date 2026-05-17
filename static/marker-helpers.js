
export function addMarkers({map, markerLayer, markerClickHandler, appState, appSettings}) {
    //isGetMarkersActive = !isGetMarkersActive;
    appState.MarkerMode = !appState.MarkerMode;
    const addMarkersBtn = document.getElementById('addMarkersBtn');

    if (appState.MarkerMode) {
        console.log("Marker mode enabled");
        addMarkersBtn.innerText = "Finish adding markers";
        addMarkersBtn.style.backgroundColor = appSettings.buttons.onColor;
        
        // Change cursor to crosshair
        map.getContainer().style.cursor = 'crosshair';
        
        // Add click handler for adding markers
        markerClickHandler = function(e) {
            var currentMarkerCount = countMarkers(markerLayer)
            console.log(currentMarkerCount)
            const marker = L.marker(e.latlng).addTo(markerLayer);
            const html = `
                <div class="marker-card">                        
                    <img src="/static/sample${currentMarkerCount}.jpg" alt="Photo" class="marker-img" />
                </div>
                `;
            
            marker.bindPopup(html, {
                maxWidth: 260,
                className: "marker-popup",
                autoClose: false
            });
            console.log("Marker added at:", e.latlng);

            appState.markers.push({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                image: `/static/sample${currentMarkerCount}.jpg`
            });
            console.log("Marker added to appState:", e.latlng);
        };
        
        map.on('click', markerClickHandler);
    } else {
        turnOffAddMarkers({map, markerLayer, markerClickHandler, appState, appSettings});
    }
}

function turnOffAddMarkers({map, markerLayer, markerClickHandler, appState, appSettings}){
    console.log("Turning off markers");
    if (markerClickHandler) {
        map.off('click', markerClickHandler);
        markerClickHandler = null;
    }
    
    const addMarkersBtn = document.getElementById('addMarkersBtn');
    addMarkersBtn.innerText = "Add Markers";
    addMarkersBtn.style.backgroundColor = appSettings.buttons.offColor;
    
    // Reset cursor to default
    map.getContainer().style.cursor = '';
}

export function countMarkers(_layer) {
    let count = 0;
    _layer.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            count++;
        }
    });
    return count
}

export function deleteMarkers({map, markerLayer, appState}) {
    markerLayer.clearLayers();
    console.log('All markers deleted from the map');
    appState.markers = [];
    console.log('All markers deleted from appState');
}

export function showOrHideMarkerPhotos({map, markerLayer, appState, appSettings}){
    if (!appState.showPhotosActive){
        appState.showPhotosActive = true;
        showHidePhotosBtn.innerText = "Hide Photos";
        showHidePhotosBtn.style.backgroundColor = appSettings.buttons.onColor;
        
        markerLayer.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                layer.openPopup();
            }
        });
    }
    else {
        appState.showPhotosActive = false;
        showHidePhotosBtn.innerText = "Show Photos";
        showHidePhotosBtn.style.backgroundColor = appSettings.buttons.offColor;

        markerLayer.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                layer.closePopup();
            }
        });
    }
}