//----------------------------------------
// Configuration file for the application
//----------------------------------------
/**
 * Creates tile layers and adds initial layers to map instances
 * @param {L.Map} map1 
 * @param {L.Map} map2 
 * @returns {Object} All created layers in case other modules need them
*/
import { createTileLayers } from './helpers.js';
//Toggle for loading only a single map, WIP
let loadAllMaps = false;

export function initializeMapLayers(map1, map2) {
    // 1. Create all tile layers using your helper function
    // (Assuming createTileLayers() is accessible here or imported here)
    const layers = createTileLayers();

    // 2. Destructure them so the rest of your conditional code works smoothly
    const {
        satellite1, satellite2, matrixTheme1, matrixTheme2,
        overlayLayer1, overlayLayer2, Stadia_StamenToner,
        Stadia_StamenWatercolor, Stadia_StamenTonerBackground,
        regularTheme1, regularTheme2, Hillshade1, Hillshade2,
        bnw_cartoDB1, bnw_cartoDB2, openTopoMap
    } = layers;

    // 3. Conditional loading logic based on your toggle
    if (loadAllMaps) {
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
    } else {
        Stadia_StamenToner.addTo(map1);
        Stadia_StamenTonerBackground.addTo(map1);
        overlayLayer1.addTo(map1);
    }

    // 4. Return the layers object so map-core or context-menu can reference them later
    return {
        activeBaseLayerMap1: regularTheme1,
        activeBaseLayerMap2: regularTheme2,
        ...layers // Spreads all individual layers into the returned object
    };
}