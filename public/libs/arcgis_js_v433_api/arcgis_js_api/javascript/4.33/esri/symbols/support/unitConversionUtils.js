// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/arrayUtils","../../renderers/support/lengthUtils"],(function(e,t,r){"use strict";const n=function(){const e=Object.keys(r.meterIn);return t.remove(e,"decimal-degrees"),e.sort(),e}();e.getMetersPerUnit=function(e){return 1/(r.meterIn[e]||1)},e.supportedUnits=n,e.supportsUnit=function(e){return!!e&&null!=r.meterIn[e]},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));