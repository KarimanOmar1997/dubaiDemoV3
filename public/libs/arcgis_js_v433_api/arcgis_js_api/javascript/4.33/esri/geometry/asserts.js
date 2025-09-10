// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/Error"],(function(e,t){"use strict";function o(e){if(e&&"object"==typeof e&&"type"in e&&"mesh"===e.type)throw new t("internal:mesh","Mesh geometries are not supported for this operation")}e.assertNotMesh=o,e.assertNotMeshes=function(e){e.forEach(o)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));