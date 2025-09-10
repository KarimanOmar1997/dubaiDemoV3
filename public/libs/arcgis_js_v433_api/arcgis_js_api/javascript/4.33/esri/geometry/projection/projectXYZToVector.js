// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/libs/gl-matrix-2/factories/vec3f64","./projectBuffer"],(function(e,t,r){"use strict";const o=t.create();e.projectXYZToVector=function(e,t,c,f,i,n){return o[0]=e,o[1]=t,o[2]=c,r.projectBuffer(o,f,0,i,n,0)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));