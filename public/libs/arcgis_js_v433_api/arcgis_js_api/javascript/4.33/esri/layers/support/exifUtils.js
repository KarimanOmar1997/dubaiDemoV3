// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(n){"use strict";n.getExifValue=function(n){const{exifInfo:e,exifName:t,tagName:a}=n;if(!e||!t||!a)return null;const u=e.find((n=>n.name===t));return u?function(n){const{tagName:e,tags:t}=n;if(!t||!e)return null;const a=t.find((n=>n.name===e));return a?.value||null}({tagName:a,tags:u.tags}):null},Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})}));