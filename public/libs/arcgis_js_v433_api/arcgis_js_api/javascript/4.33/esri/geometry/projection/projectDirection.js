// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../chunks/vec32","../../core/libs/gl-matrix-2/factories/vec3f64","./projectVectorToVector"],(function(e,t,o,c){"use strict";const r=o.create(),i=o.create();e.projectDirection=function(e,o,n,a,s){t.copy(r,e),t.add(i,e,o),c.projectVectorToVector(r,n,r,s),c.projectVectorToVector(i,n,i,s),t.subtract(a,i,r),t.normalize(a,a)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));