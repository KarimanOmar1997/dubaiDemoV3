// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../geometry/SpatialReference","../../../layers/graphics/applyEditsUtils"],(function(e,t,r){"use strict";e.handleServiceEdits=function(e){return e.map((e=>{const i=e.editedFeatures,a=t.fromJSON(i?.spatialReference);return i?{layerId:e.id,editedFeatures:r.createEditedFeatures(i,a)}:null})).filter((e=>null!==e))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));