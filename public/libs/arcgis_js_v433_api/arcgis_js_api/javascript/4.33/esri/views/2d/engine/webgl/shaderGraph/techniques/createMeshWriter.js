// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./mesh/MeshWriterInputEvaluator"],(function(e,t){"use strict";e.createMeshWriter=async function(e,r,n,a,i,o){const s=new o(a,await t.MeshWriterInputEvaluator.create(e,r,i),{},n);return await s.loadDependencies(),s},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));