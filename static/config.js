//----------------------------------------
// Configuration file for the application
//----------------------------------------

//Toggle for loading only a single map, WIP
let loadAllMaps = false;

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
    Stadia_StamenTonerBackground: Stadia_StamenTonerBackground,
    regularTheme1: regularTheme1,
    regularTheme2: regularTheme2,
    Hillshade1: Hillshade1,
    Hillshade2: Hillshade2,
    bnw_cartoDB1: bnw_cartoDB1,
    bnw_cartoDB2: bnw_cartoDB2,
    openTopoMap: openTopoMap //UNUSED right now, might need later
} = createTileLayers();

if (loadAllMaps) {
    // Add all layers to both maps initially
    satellite1.addTo(map1);
    satellite2.addTo(map2);
    regularTheme1.addTo(map1);
    regularTheme2.addTo(map2);
    overlayLayer1.addTo(map1);
    overlayLayer2.addTo(map2);
    Stadia_StamenToner.addTo(map1);
    Stadia_StamenTonerBackground.addTo(map1);
    Stadia_StamenWatercolor.addTo(map2);
    matrixTheme1.addTo(map1);
    matrixTheme2.addTo(map2);
    Hillshade1.addTo(map1);
    Hillshade2.addTo(map2);
    bnw_cartoDB1.addTo(map1);
    bnw_cartoDB2.addTo(map2);
    overlayLayer1.addTo(map1);
    overlayLayer2.addTo(map2);
}

else {
    Stadia_StamenToner.addTo(map1);
    Stadia_StamenTonerBackground.addTo(map1);
    overlayLayer1.addTo(map1);
    //bnw_cartoDB2.addTo(map2);
}

//Set active layers
const activeBaseLayerMap1 = regularTheme1;  

// Toggling on and off the attributions might be necessary for the future
//console.log(map1.attributionControl)
//console.log(regularTheme1.options.attribution)
//map1.attributionControl.removeAttribution(regularTheme1.options.attribution); 

const activeBaseLayerMap2 = regularTheme2;