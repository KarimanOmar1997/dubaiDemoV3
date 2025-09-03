// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";function r(e,r){return!(!e.layerType||"ArcGISFeatureLayer"!==e.layerType)&&e.featureCollectionType===r}e.isMapNotesLayer=function(e){return r(e,"notes")},e.isMarkupLayer=function(e){return r(e,"markup")},e.isRouteLayer=function(e){return r(e,"route")},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));