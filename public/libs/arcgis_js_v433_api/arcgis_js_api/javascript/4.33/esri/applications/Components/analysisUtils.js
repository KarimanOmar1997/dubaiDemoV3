// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/quantityUtils","../../views/support/geodesicMeasurementUtils"],(function(e,t,i){"use strict";e.forceInteractive=function(e){return e.forceInteractive()},e.hasValidAreaResult=function(e){return 0===e.viewData.intersectingSegments.size},e.isAboveGeodesicDistanceThreshold=function(e){return t.toUnit(e,"meters").value>i.geodesicDistanceThreshold},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));