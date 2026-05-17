//----------------------------------------
// All the functions needed for exporting to image
//----------------------------------------
import { initializeExportMapLayer } from './config-map-layers.js'

/**
 * Creates tile layers and adds initial layers to map instances
 * @param {Object} appState 
 * @param {L.Map} map1
 * @returns {Object} 
*/


export function updateAppStateVariable(appState, map) {
    appState.center = map.getCenter()
    appState.zoom = map.getZoom()
}

/**
 * Creates tile layers and adds initial layers to map instances
 * @param {L.Map} map
*/
export function updateExportMap(mapInstance, state) {
    mapInstance.setView(state.center, state.zoom)
}