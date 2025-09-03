// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/unitUtils","../../geometry/support/MeshTransform"],(function(e,t,r){"use strict";e.getMeshTransformForMetersToSpatialReference=function(e){const o=1/t.getMetersPerUnitForSR(e,1);return 1!==o?new r({scale:[o,o,o]}):void 0},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));