// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/typedArrayUtil"],(function(r,e){"use strict";r.newUintArray=function(r,n=!1){return r<=e.nativeArrayMaxSize?n?new Array(r).fill(0):new Array(r):new Uint32Array(r)},r.uintSubArray=function(r,e,n){return Array.isArray(r)?r.slice(e,e+n):r.subarray(e,e+n)},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));