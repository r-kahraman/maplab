//----------------------------------------
// All the functions needed for exporting to image
//----------------------------------------
import { initializeExportMapLayer } from './config-map-layers.js'

/**
 * Copies the current app state into the export map
 * INCLUDING markers
 * @param {L.Map} exportMap
 * @param {Object} appState
 * @returns {Array} exportMarkers
 */

function syncAppStateFromMainMap({mainMap, appState}){
    appState.center = mainMap.getCenter(),
    appState.zoom = mainMap.getZoom()
}

export function syncExportMap({mainMap, exportMap, exportMarkerLayer, appState}) {
    // sync appState first
    syncAppStateFromMainMap({mainMap, appState})

    exportMarkerLayer.clearLayers()

    // Recreate markers
    appState.markers.forEach(markerData => {
        const marker = L.marker([
            markerData.lat,
            markerData.lng
        ])

        // recreate popup html
        const html = `
            <div class="marker-card">                        
                <img 
                    src="${markerData.image}" 
                    alt="Photo" 
                    class="marker-img"
                />
            </div>
        `

        marker.bindPopup(html, {
            maxWidth: 260,
            className: "marker-popup",
            autoClose: false
        })

        marker.addTo(exportMarkerLayer)
        marker.openPopup()
    })
}

/**
 * Exports map with a given aspect ratio
 * 
 * Requires leaflet-image OR html2canvas
 * 
 * @param {L.Map} exportMap
 * @param {String} aspectRatio
 */
export async function exportMapImage(exportMap, aspectRatio, appState) {
    const exportContainer = exportMap.getContainer()
    // Target its parent wrapper (#export-map-container)
    const parentWrapper = exportContainer.parentElement
    
    // Set dimensions
    let width
    let height
    
    switch (aspectRatio) {
        case "16:9":
            width = 1600
            height = 900
            break
            
            case "9:16":
                width = 900
                height = 1600
                break
                
                case "4:5":
                    width = 1080
                    height = 1350
                    break
                    
                    case "1:1":
                        default:
                            width = 1080
                            height = 1080
                            break
                        }
                        // Force clear any restricting styles on BOTH elements
                        const elementsToResize = [exportContainer, parentWrapper]
                        elementsToResize.forEach(el => {
                            if (el) {
                                el.style.setProperty('width', `${width}px`, 'important')
                                el.style.setProperty('height', `${height}px`, 'important')
                                el.style.maxHeight = 'none'
                                el.style.maxWidth = 'none'
                                el.style.minHeight = 'none'
                                el.style.minWidth = 'none'
                            }
                        })
                        
   // Tell Leaflet the physical size changed
    exportMap.invalidateSize({ animate: false })

    // NOW set the view while Leaflet knows the exact canvas dimensions
    if (appState && appState.center && appState.zoom) {
        console.log("Setting map center on the correctly sized container:", appState.center)
        exportMap.setView(appState.center, appState.zoom, { animate: false })
    }
    
    console.log("ready before promise")
    
    // Create a promise that resolves when the tile layer finishes loading
    await new Promise(resolve => {
        // Find the active tile layer on your export map
        let tileLayer;
        exportMap.eachLayer(layer => {
            if (layer instanceof L.TileLayer) {
                tileLayer = layer;
            }
        });

        // If for some reason there's no tile layer found, don't get stuck
        if (!tileLayer) {
            console.log("No tile layer found, moving on...");
            resolve();
            return;
        }

        if (!tileLayer.isLoading()) {
            console.log("Tiles are already loaded");
            resolve();
        } else {
            console.log("Tiles are loading, attaching event listener...");
            // Listen to the TILE LAYER's 'load' event, not the map's
            tileLayer.once('load', () => {
                console.log("Tile layer finished loading!");
                setTimeout(resolve, 100);
            });
        }
    });

    console.log("Proceeding to html2canvas...");
    
    const canvas = await html2canvas(exportContainer, {
        useCORS: true,          // Allows cross-origin tile grabbing
        allowTaint: false,      // Prevents dirtying the canvas
        logging: false,          // Turn to true if you still need to debug
        scale: 1 
    })

    const image = canvas.toDataURL("image/png")

    // download
    const link = document.createElement("a")
    link.href = image
    link.download = "map-export.png"
    link.click()
}