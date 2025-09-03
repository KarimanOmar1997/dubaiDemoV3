// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../catalog/catalogUtils","./layerUtils"],(function(e,t,i){"use strict";e.isEditableLayer=function(e){return!(!function(e){return"object"==typeof e&&null!=e&&"loaded"in e&&!0===e.loaded&&"type"in e}(e)||!i.getEffectiveLayerCapabilities(e)?.operations?.supportsEditing||"editingEnabled"in e&&!i.getEffectiveEditingEnabled(e)||t.isLayerFromCatalog(e))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));