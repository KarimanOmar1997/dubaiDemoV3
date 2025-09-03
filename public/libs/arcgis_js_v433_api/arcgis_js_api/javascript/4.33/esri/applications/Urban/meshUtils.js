// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/promiseUtils"],(function(e,t,r){"use strict";t.convertVertexSpaceEllipsoid=async function(t,o,i){const{convertMeshVertexSpace:s}=await new Promise(((t,r)=>e(["../../geometry/support/meshUtils/convertMeshVertexSpace"],t,r)));return r.throwIfAborted(i),s(t,o,{...i,useEllipsoid:!0})},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));