// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";function n(t){return t instanceof Float32Array&&t.length>=16}function r(t){return Array.isArray(t)&&t.length>=16}t.isMat4=function(t){return n(t)||r(t)},t.isMat4f32=n,t.isMat4f64=r,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));