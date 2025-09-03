// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/typedArrayUtil"],(function(r,e){"use strict";r.compactShortArray=function(r){return Array.isArray(r)?r.length<e.nativeArrayMaxSize?r:new Int16Array(r):r.length<e.nativeArrayMaxSize?Array.from(r):r},r.newShortArray=function(r){return r<=e.nativeArrayMaxSize?new Array(r):new Int16Array(r)},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));