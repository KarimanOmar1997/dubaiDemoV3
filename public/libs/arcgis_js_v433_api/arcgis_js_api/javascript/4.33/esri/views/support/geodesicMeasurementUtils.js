// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../geometry/support/geodesicUtils","../../geometry/support/spatialReferenceUtils"],(function(e,t,o){"use strict";e.geodesicDistanceThreshold=1e5,e.geodesicMeasure=function(e,o,r,...s){return t.isSupported(e)?o.apply(void 0,s):e.isWebMercator?r.apply(void 0,s):null},e.supportsGeodesicMeasurement=function(e){return t.isSupported(e)||o.isWebMercator(e)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));