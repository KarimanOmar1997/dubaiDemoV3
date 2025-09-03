// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../geometry/support/spatialReferenceUtils"],(function(e,t){"use strict";function r(e){return t.isWGS84(e)||t.isCGCS2000(e)}e.isSupportedEarthGCS=r,e.isSupportedGCSOnGlobe=function(e){return r(e)||t.isMars(e)||t.isMoon(e)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));