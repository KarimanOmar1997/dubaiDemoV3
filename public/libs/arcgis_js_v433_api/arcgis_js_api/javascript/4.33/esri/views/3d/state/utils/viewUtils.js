// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/mathUtils","../../../../chunks/vec32","../../../../core/libs/gl-matrix-2/factories/vec3f64"],(function(e,t,o,c){"use strict";const r=c.create(),n=c.create();e.viewAngle=function(e,c,i){e.worldUpAtPosition(c,r),o.subtract(n,i,c);const s=o.length(n);return 0===s?0:t.acosClamped(o.dot(n,r)/s)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));