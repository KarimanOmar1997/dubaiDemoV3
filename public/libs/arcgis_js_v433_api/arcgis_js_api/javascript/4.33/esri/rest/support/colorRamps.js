// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./AlgorithmicColorRamp","./ColorRamp","./MultipartColorRamp"],(function(t,o,e,r){"use strict";const l={key:"type",base:e,typeMap:{algorithmic:o,multipart:r}};t.fromJSON=function(t){return t?.type?"algorithmic"===t.type?o.fromJSON(t):"multipart"===t.type?r.fromJSON(t):null:null},t.types=l,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));