// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.getEffectiveFeatureReduction=function(e,t){const n=e.featureReduction;return n&&"selection"!==n.type&&(!("maxScale"in n)||!n.maxScale||n.maxScale<t.scale)?n:null},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));