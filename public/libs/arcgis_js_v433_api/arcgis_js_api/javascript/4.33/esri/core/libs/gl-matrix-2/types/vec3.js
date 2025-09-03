// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../typedArrayUtil"],(function(r,t){"use strict";r.isVec3=function(r){return function(r){return t.isFloat32Array(r)&&r.length>=3}(r)||function(r){return(t.isFloat64Array(r)||Array.isArray(r))&&r.length>=3}(r)},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));