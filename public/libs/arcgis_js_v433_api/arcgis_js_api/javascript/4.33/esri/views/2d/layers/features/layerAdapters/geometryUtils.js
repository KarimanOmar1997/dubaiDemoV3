// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.getServiceGeometryType=function(e){switch(e.geometryType){case"point":return"esriGeometryPoint";case"polyline":return"esriGeometryPolyline";case"mesh":case"polygon":return"esriGeometryPolygon";case"multipatch":return"esriGeometryMultiPatch";case"multipoint":return"esriGeometryMultipoint";default:return null}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));