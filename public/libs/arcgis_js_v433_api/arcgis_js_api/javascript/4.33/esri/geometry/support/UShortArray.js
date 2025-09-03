// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/typedArrayUtil"],(function(r,e){"use strict";r.compactUShortArray=function(r){return Array.isArray(r)?r.length<e.nativeArrayMaxSize?r:new Uint16Array(r):r.length<e.nativeArrayMaxSize?Array.from(r):r},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));