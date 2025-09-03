// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.findLastObjectIdFromFeatures=function(t,e){let i=0;for(const n of e){const e=n.attributes?.[t];"number"==typeof e&&isFinite(e)&&(i=Math.max(i,e))}return i},t.initialObjectId=1,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));