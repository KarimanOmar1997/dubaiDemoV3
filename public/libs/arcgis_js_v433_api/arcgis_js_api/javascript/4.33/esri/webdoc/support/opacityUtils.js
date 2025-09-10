// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/accessorSupport/ensureType"],(function(e,t){"use strict";e.opacityToTransparency=function(e){const n=t.ensureInteger(100*(1-e));return Math.max(0,Math.min(n,100))},e.transparencyToOpacity=function(e){const t=1-e/100;return Math.max(0,Math.min(t,1))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));