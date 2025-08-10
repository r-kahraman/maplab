console.log("Script is running!"); // This should appear in the console

// Check if Leaflet is loaded
if (typeof L !== "undefined") {
    console.log("Leaflet is loaded!");
} else {
    console.log("Leaflet is NOT loaded!");
}

// Main
document.addEventListener("DOMContentLoaded", function () {
    // Create the two map instances
    var map1 = L.map('map1',{ zoomControl: false }).setView([51.505, -0.09], 13);
    var map2 = L.map('map2',{ zoomControl: false }).setView([51.505, -0.09], 13);
    console.log(map2.attributionControl)
    
    // Create marker layer for managing markers
    let markerLayer = L.layerGroup();
    
    // Add map divider functionality
    const divider = document.getElementById('map-divider');
    const mapContainer = document.getElementById('map-container');
    const map1Element = document.getElementById('map1');
    const map2Element = document.getElementById('map2');
    let isDragging = false;
    let startX;
    let startWidth1;
    let startWidth2;

    divider.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startWidth1 = map1Element.offsetWidth;
        startWidth2 = map2Element.offsetWidth;
        
        // Add event listeners for mouse move and up
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Prevent text selection while dragging
        e.preventDefault();
    });

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const newWidth1 = startWidth1 + deltaX;
        const newWidth2 = startWidth2 - deltaX;
        
        // Check if new widths are within minimum bounds
        if (newWidth1 >= 200 && newWidth2 >= 200) {
            map1Element.style.flex = 'none';
            map2Element.style.flex = 'none';
            map1Element.style.width = newWidth1 + 'px';
            map2Element.style.width = newWidth2 + 'px';
            
            // Trigger map resize events
            map1.invalidateSize();
            map2.invalidateSize();
        }
    }

    function handleMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // This add a scale to the map
    L.control.scale({ position: 'topright' }).addTo(map1);
    L.control.scale({ position: 'topright' }).addTo(map2);

    // Create all tile layers using the helper function
    const {
        satellite1: satellite1,
        satellite2: satellite2,
        matrixTheme1: matrixTheme1,
        matrixTheme2: matrixTheme2,
        overlayLayer1: overlayLayer1,
        overlayLayer2: overlayLayer2,
        Stadia_StamenToner: Stadia_StamenToner,
        Stadia_StamenWatercolor: Stadia_StamenWatercolor,
        OSM_Mapnik1: regularTheme1,
        OSM_Mapnik2: regularTheme2,
        Hillshade1: Hillshade1,
        Hillshade2: Hillshade2,
        bnw_cartoDB1: bnw_cartoDB1,
        bnw_cartoDB2: bnw_cartoDB2,
        openTopoMap: openTopoMap //UNUSED right now, might need later
    } = createTileLayers();
    // Add all layers to both maps initially
    satellite1.addTo(map1);
    satellite2.addTo(map2);
    regularTheme1.addTo(map1);
    regularTheme2.addTo(map2);
    overlayLayer1.addTo(map1);
    overlayLayer2.addTo(map2);
    Stadia_StamenToner.addTo(map1);
    Stadia_StamenWatercolor.addTo(map2);
    matrixTheme1.addTo(map1);
    matrixTheme2.addTo(map2);
    Hillshade1.addTo(map1);
    Hillshade2.addTo(map2);
    bnw_cartoDB1.addTo(map1);
    bnw_cartoDB2.addTo(map2);
    overlayLayer1.addTo(map1);
    overlayLayer2.addTo(map2);

    //Set active layers
    const activeBaseLayerMap1 = regularTheme1;  

    // Toggling on and off the attributions might be necessary for the future
    //console.log(map1.attributionControl)
    //console.log(regularTheme1.options.attribution)
    //map1.attributionControl.removeAttribution(regularTheme1.options.attribution); 

    const activeBaseLayerMap2 = regularTheme2;
    
    // Initialize geocoders for both maps and add search functionality
    const geocoder1 = new L.Control.Geocoder({
        geocoder: L.Control.Geocoder.nominatim(),
        position: 'topleft',
        showResultIcons: true,
        collapsed: false,
        defaultMarkGeocode: false
    }).addTo(map1);  
    geocoder1.addEventListener('markgeocode', function(e){
        map1.setView(e.geocode.center, map1.getZoom());
    })

    const geocoder2 = new L.Control.Geocoder({
        geocoder: L.Control.Geocoder.nominatim(),
        position: 'topleft',
        showResultIcons: false,
        collapsed: false,
        defaultMarkGeocode: false
    }).addTo(map2);
    geocoder2.addEventListener('markgeocode', function(e){
        map2.setView(e.geocode.center, map2.getZoom());
    })
    
    // Add marker layer to map1
    markerLayer.addTo(map1);

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

    map1.on('contextmenu', function (e) {
        showContextMenu(e, 'map1');
    });
    
    map2.on('contextmenu', function (e) {
        showContextMenu(e, 'map2');
    });

    // Context Menu Functions
    function showContextMenu(e, mapId) {
        e.originalEvent.preventDefault();
        const contextMenu = document.getElementById('contextMenu');
        
        // Position the context menu at the click coordinates
        contextMenu.style.left = e.originalEvent.clientX + 'px';
        contextMenu.style.top = e.originalEvent.clientY + 'px';
        
        // Show the context menu
        contextMenu.classList.remove('hidden');
        
        // Add click event listeners to menu items
        const menuItems = contextMenu.querySelectorAll('.context-menu-item');
        menuItems.forEach(item => {
            item.onclick = function() {
                handleLayerSelection(this.dataset.layer, mapId);
                contextMenu.classList.add('hidden');
            };
        });
        
        // Hide context menu when clicking outside
        document.addEventListener('click', function hideMenu() {
            contextMenu.classList.add('hidden');
            document.removeEventListener('click', hideMenu);
        });
    }
    
    function handleLayerSelection(layerType, mapId) {
        // This function will be implemented to handle layer visibility
        console.log(`Selected layer: ${layerType} for map: ${mapId}`);

        if (mapId === 'map1') {
            map1.eachLayer(function(layer) {
                if (layer instanceof L.TileLayer) {
                    layer.setOpacity(0);
                    //L.Control.Attribution.removeAttribution(layer);
                }
            });
            
            if (layerType === 'regular') {
                //activeBaseLayerMap1 = regularTheme1;
                regularTheme1.setOpacity(1);
            }
            else if (layerType === 'satellite') {
                satellite1.setOpacity(1);
                overlayLayer1.setOpacity(1);
            }
            else if (layerType === 'dark') {
                matrixTheme1.setOpacity(1);
            }
            else if (layerType === 'bw') {
                bnw_cartoDB1.setOpacity(1);
            }
            else if (layerType === 'hillshade') {
                Hillshade1.setOpacity(0.63);
                satellite1.setOpacity(1);
                overlayLayer1.setOpacity(1);
            }
            else if (layerType === 'watercolor') {
                Stadia_StamenToner.setOpacity(1);
            }
        }

        else if (mapId === 'map2') {
            map2.eachLayer(function(layer) {
                if (layer instanceof L.TileLayer) {
                    layer.setOpacity(0);
                }
            });
            if (layerType === 'regular') {
                //activeBaseLayerMap1 = regularTheme1;
                regularTheme2.setOpacity(1);
            }
            else if (layerType === 'satellite') {
                satellite2.setOpacity(1);
                overlayLayer2.setOpacity(1);
            }
            else if (layerType === 'dark') {
                matrixTheme2.setOpacity(1);
            }
            else if (layerType === 'bw') {
                bnw_cartoDB2.setOpacity(1);
            }
            else if (layerType === 'hillshade') {
                Hillshade2.setOpacity(0.63);
                satellite2.setOpacity(1);
                overlayLayer2.setOpacity(1);
            }
            else if (layerType === 'watercolor') {
                Stadia_StamenWatercolor.setOpacity(1);
            }
        }   
    }

    // Initialize debugging
    // const debug = setupDebugging(map1, map2, regularTheme1, regularTheme2, satellite1, satellite2);

    // // Button to toggle satellite mode for both maps
    // document.getElementById("toggleBtn").addEventListener("click", function () {
    //     isSatellite = !isSatellite;
    //     console.log('Switching to:', isSatellite ? 'Satellite' : 'Regular');

    //     // Toggle opacities
    //     if (isSatellite) {
    //         satellite1.setOpacity(1);
    //         satellite2.setOpacity(1);
    //         regularTheme1.setOpacity(0);
    //         regularTheme2.setOpacity(0);
    //     } else {
    //         satellite1.setOpacity(0);
    //         satellite2.setOpacity(0);
    //         regularTheme1.setOpacity(1);
    //         regularTheme2.setOpacity(1);
    //     }

    //     // Log the state change
    //     //debug.logViewState();
    // });

    // Draw function
    let drawControl1, drawControl2;
    const drawnItems1 = new L.FeatureGroup().addTo(map1);
    const drawnItems2 = new L.FeatureGroup().addTo(map2);
    const drawButton = document.getElementById('drawBtn');
    let drawing = false;

    function toggleDrawing() {
        drawing = !drawing;

        if (drawing) {
            // Change button color
            drawButton.style.backgroundColor = appSettings.buttons.onColor;
            drawButton.innerText = "Stop Drawing!";

            // Disable map interaction
            map1.dragging.disable();
            map1.scrollWheelZoom.disable();
            map1.doubleClickZoom.disable();
            map2.dragging.disable();
            map2.scrollWheelZoom.disable();
            map2.doubleClickZoom.disable();

            drawControl1 = new L.Control.Draw({
                edit: { featureGroup: drawnItems1 },
                draw: { 
                    polygon: {
                        allowIntersection: false,
                        drawError: {
                            color: '#e1e4e8',
                            message: '<strong>Error:</strong> polygon edges cannot intersect!'
                        },
                        shapeOptions: {
                            color: '#ff0000',  // Solid red
                            fillColor: '#ff0000',  // Solid red fill
                            fillOpacity: 1.0,  // Fully opaque
                            weight: 5
                        }
                    },
                    polyline: {
                        shapeOptions: {
                            color: '#ff0000',  // Solid red
                            weight: 5
                        }
                    },
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            });
            drawControl2 = new L.Control.Draw({
                edit: { featureGroup: drawnItems2 },
                draw: { 
                    polygon: {
                        allowIntersection: false,
                        drawError: {
                            color: '#e1e4e8',
                            message: '<strong>Error:</strong> polygon edges cannot intersect!'
                        },
                        shapeOptions: {
                            color: '#ff0000',  // Solid red
                            fillColor: '#ff0000',  // Solid red fill
                            fillOpacity: 1.0,  // Fully opaque
                            weight: 5
                        }
                    },
                    polyline: {
                        shapeOptions: {
                            color: '#ff0000',  // Solid red
                            weight: 5
                        }
                    },
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            });

            map1.addControl(drawControl1);
            map2.addControl(drawControl2);

            map1.on(L.Draw.Event.CREATED, function (event) {
                const layer = event.layer;
                // Ensure the layer scales with zoom
                layer.options.scaleWithZoom = true;
                drawnItems1.addLayer(layer);
            });
            
            map2.on(L.Draw.Event.CREATED, function (event) {
                const layer = event.layer;
                // Ensure the layer scales with zoom
                layer.options.scaleWithZoom = true;
                drawnItems2.addLayer(layer);
            });
        } else {
            drawButton.style.backgroundColor = appSettings.buttons.offColor;
            drawButton.innerText = "Draw!";

            // Re-enable interaction
            map1.dragging.enable();
            map1.scrollWheelZoom.enable();
            map1.doubleClickZoom.enable();
            map2.dragging.enable();
            map2.scrollWheelZoom.enable();
            map2.doubleClickZoom.enable();

            map1.removeControl(drawControl1);
            map2.removeControl(drawControl2);
        }
    }

    document.getElementById('drawBtn').addEventListener('click', toggleDrawing);
    document.querySelectorAll('.leaflet-container').forEach(el =>
        el.classList.toggle('drawing-enabled', drawing)
    );
    
    // This functionality can be improved!
    // The mirror function needs to be disabled when there are no new objects.
    function mirrorDrawing() {
        console.log('mirror drawing pressed');
        if (drawnItems1.getLayers().length + drawnItems2.getLayers().length > 10){
            console.log("Too many drawings! Canceled Mirror operation.")
        }
        else {
            // Get all layers from map1
            const layers1 = drawnItems1.getLayers();
            layerCopies1 = copyLayerShapes(layers1)
            
            // Get all layers from map2
            const layers2 = drawnItems2.getLayers();
            layerCopies2 = copyLayerShapes(layers2)
            
            // Create the copies in the other map
            layerCopies1.forEach(layer => drawnItems2.addLayer(layer));
            layerCopies2.forEach(layer => drawnItems1.addLayer(layer));
            
            console.log('Number of items in map1:', drawnItems1.getLayers().length);
            console.log('Number of items in map2:', drawnItems2.getLayers().length);
        }
    }
    
    document.getElementById('mirrorDrawBtn').addEventListener('click', mirrorDrawing);
    
    function deleteDrawings() {
    // Clear all layers from both feature groups
        drawnItems1.clearLayers();
        drawnItems2.clearLayers();
        console.log('All drawings deleted from both maps');
    }
    document.getElementById('deleteDrawingsBtn').addEventListener('click', deleteDrawings);

    // Functions for adding markers
    let isGetMarkersActive = false;
    let markerClickHandler = null;
    
    function addMarkers() {
        isGetMarkersActive = !isGetMarkersActive;
        const addMarkersBtn = document.getElementById('addMarkersBtn');

        if (isGetMarkersActive) {
            console.log("Marker mode enabled");
            addMarkersBtn.innerText = "Finish adding markers";
            addMarkersBtn.style.backgroundColor = appSettings.buttons.onColor;
            
            // Change cursor to crosshair
            map1.getContainer().style.cursor = 'crosshair';
            
            // Add click handler for adding markers
            markerClickHandler = function(e) {
                const marker = L.marker(e.latlng).addTo(markerLayer);
                
                // richer content (image + title + text)
                const html = `
                    <div class="marker-card">
                        <h3 class="marker-title">Sample spot</h3>
                        <img src="/static/sample.jpg" alt="Photo" class="marker-img" />
                        <p class="marker-desc">Short description about this place.</p>
                    </div>
                    `;
                
                marker.bindPopup(html, {
                    maxWidth: 260,
                    className: "marker-popup"
                });
                console.log("Marker added at:", e.latlng);
            };
            
            map1.on('click', markerClickHandler);
        } else {
            turnOffAddMarkers();
        }
    }
    
    document.getElementById('addMarkersBtn').addEventListener('click', addMarkers);

    // Function to delete all markers
    function deleteMarkers() {
        markerLayer.clearLayers();
        console.log('All markers deleted from the map');
    }
    
    // Add event listener for delete markers button
    document.getElementById('deleteMarkersBtn').addEventListener('click', deleteMarkers);

    function turnOffAddMarkers(){
        console.log("Turning off markers");
        if (markerClickHandler) {
            map1.off('click', markerClickHandler);
            markerClickHandler = null;
        }
        
        const addMarkersBtn = document.getElementById('addMarkersBtn');
        addMarkersBtn.innerText = "Add Markers";
        addMarkersBtn.style.backgroundColor = appSettings.buttons.offColor;
        
        // Reset cursor to default
        map1.getContainer().style.cursor = '';
    }

    // Functions for getting POIs
    let cursorCircle = null;
    document.getElementById('getPoisButton').addEventListener('click', getPOIs);
    let isGetPOIsActive = false;

    function turnOffGetPOIs(){
        console.log("Turning off click")
        map1.off('click');
        getPoisButton.innerText = "Get POIs";
        getPoisButton.style.backgroundColor = appSettings.buttons.offColor;
        
        // Re-enable map interaction
        map1.dragging.enable();
        map1.scrollWheelZoom.enable();
        map1.doubleClickZoom.enable();
        
        if (cursorCircle){
            disableCursorCircle(cursorCircle);
            cursorCircle = null;
        }
    }

    document.getElementById('getBuildingsButton').addEventListener('click', getBuildings);

    let isGetBuildingsActive = false;

    function turnOffGetBuildings(){
        console.log("Turning off click")
        map1.off('click');
        getBuildingsButton.innerText = "Get Buildings";
        getBuildingsButton.style.backgroundColor = appSettings.buttons.offColor;
        
        // Re-enable map interaction
        map1.dragging.enable();
        map1.scrollWheelZoom.enable();
        map1.doubleClickZoom.enable();
        
        if (cursorCircle){
            disableCursorCircle(cursorCircle);
            cursorCircle = null;
        }
    }

    const spinner = document.getElementById("spinner");
    function showSpinner() {
        spinner.classList.remove("hidden");
    }  
    function hideSpinner() {
        spinner.classList.add("hidden");
    }

    let poiMarkers = [];
    function getPOIs() {
        isGetPOIsActive = !isGetPOIsActive;
        const getPoisButton = document.getElementById('getPoisButton');

        if (isGetPOIsActive) {
            console.log("POI mode enabled");
            getPoisButton.innerText = "Stop Getting POIs";
            getPoisButton.style.backgroundColor = appSettings.buttons.onColor;
            
            // Disable map interaction
            map1.dragging.disable();
            map1.scrollWheelZoom.disable();
            map1.doubleClickZoom.disable();
            
            cursorCircle = enableCursorCircle(map1, cursorCircle);
            console.log(cursorCircle)

            function handleClick(e) {
                const { lat, lng } = e.latlng;
                const radius = 500;
                console.log('Fetching POIs at:', lat, lng, 'Radius:', radius);
                showSpinner();

                fetch("/get_pois", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        lat: lat,
                        lon: lng,
                        radius: radius
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                    
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    console.log("POI data received:", data);
                    
                    // Access the elements array from the response, filter unwanted amenities
                    let poiArray = data.elements || [];
                    console.log(poiArray.length)
                    poiArray = poiArray.filter(element => element.type !== "way");
                    console.log(poiArray.length)
                    const excludedAmenities = ["bicycle_parking", "parking", "bench", "telephone", "post_box"];
                    poiArray = poiArray.filter(element => 
                        element.tags &&
                        !excludedAmenities.includes(element.tags.amenity)
                    );
                    console.log(poiArray.length)

                    resetPOIMarkers(poiMarkers);
                    poiArray.forEach(poi => {
                        if (poi.lat && poi.lon) {
                            const marker = L.marker([poi.lat, poi.lon])
                                .addTo(map1)
                                .bindPopup(`<strong>${poi.tags.name}</strong><br>${poi.tags.amenity}`);
                            poiMarkers.push(marker);
                        }
                    });
                    
                    turnOffGetPOIs()
                    hideSpinner();
                })
                .catch(error => {
                    console.error("Error fetching POIs:", error);
                    alert("Error fetching POIs: " + error.message);
                    map1.off('click');
                    turnOffGetPOIs()
                    hideSpinner();
                });
            }

            map1.on('click', handleClick);

        } 
        
        else {
            turnOffGetPOIs()
        }
    }

    
    let buildingContours = [];
    function getBuildings() {
        isGetBuildingsActive = !isGetBuildingsActive;
        const getBuildingsButton = document.getElementById('getBuildingsButton');

        if (isGetBuildingsActive) {
            console.log("Building mode enabled");
            getBuildingsButton.innerText = "Stop Getting Buildings";
            getBuildingsButton.style.backgroundColor = appSettings.buttons.onColor;
            
            // Disable map interaction
            map1.dragging.disable();
            map1.scrollWheelZoom.disable();
            map1.doubleClickZoom.disable();
            
            cursorCircle = enableCursorCircle(map1, cursorCircle);
            console.log(cursorCircle)

            function handleClick(e) {
                const { lat, lng } = e.latlng;
                const radius = 500;
                const queryLimit = 20;
                console.log('Fetching Buildings at:', lat, lng, 'Radius:', radius);
                showSpinner();

                fetch("/get_buildings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        lat: lat,
                        lon: lng,
                        radius: radius,
                        query_limit: queryLimit
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                    
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    console.log("Building polygon data received:", data);
                    
                    const nodeMap = {};
                    const ways = [];
                    // Separate elements
                    data.elements.forEach(el => {
                        if (el.type === "node") {
                            nodeMap[el.id] = [el.lat, el.lon];
                        } else if (el.type === "way") {
                            ways.push(el);
                        }
                    });
                    console.log("ways is:", ways)
                    //console.log(ways)
                    console.log("nodemap is: ",nodeMap)

                    // Reconstruct and draw each building polygon
                    ways.forEach(way => {
                        const latlngs = way.nodes
                            .map(nodeId => nodeMap[nodeId])
                            .filter(coord => coord);  // filter out undefined nodes

                        console.log("adding to map")
                        console.log(latlngs)
                        const polygon = L.polygon(latlngs, {
                            color: "red",
                            weight: 2,
                            fillOpacity: 0.8
                        }).addTo(map1);

                        polygon.bindPopup(`<strong>${way.tags?.name || "Unnamed"}</strong><br>${way.tags?.building || "Building"}`);
                    });
                                        
                    turnOffGetBuildings()
                    hideSpinner();
                })
                .catch(error => {
                    console.error("Error fetching Buildings:", error);
                    alert("Error fetching Buildings: " + error.message);
                    map1.off('click');
                    turnOffGetBuildings()
                    hideSpinner();
                });
            }

            map1.on('click', handleClick);

        } 
        
        else {
            turnOffGetBuildings()
        }
    }
    
    document.getElementById('addTopoButton').addEventListener('click', getTopoContours);
    let contourLayer; 
    function getTopoContours(){
        divisionCount = 7
        // 1. Get map bounds
        const bounds = map1.getBounds();  // assuming you're working with map1
        showSpinner();
        const bbox = {
            south: bounds.getSouth(),
            west: bounds.getWest(),
            north: bounds.getNorth(),
            east: bounds.getEast()
        };

        // 2. POST to backend
        fetch('/get-elevation-contours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bounds: bbox,
                divisionCount: divisionCount
             })
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch contours');
            return response.json();
        })
        .then(data => {
            // 3.Separate the parts of the response
            const features = data.features;
            const levels = data.levels;

            // 4. Remove existing contours if needed
            if (contourLayer) {
                contourLayer.remove();
            }
            //features.forEach((feature) => console.log(feature.properties.elev))
            // 5. Add new contours
            contourLayer = L.geoJSON(features, {
                style: feature => ({
                    color: getContourColor(feature.properties.elev, levels),
                    weight: 2
                })
            }).addTo(map1);
            //console.log(`Elevation range: ${minElev} - ${maxElev}`);

            hideSpinner();
        })
        .catch(err => {
            console.error('Error retrieving contour lines:', err);
        });
    }

    document.getElementById('deleteTopoButton').addEventListener('click', deleteTopoContours);
    function deleteTopoContours() {
        if (contourLayer) {
            contourLayer.remove();
            contourLayer = null;
        }
    }


});