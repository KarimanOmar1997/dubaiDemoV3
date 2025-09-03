// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/handleUtils"],(function(e,i){"use strict";e.onVisibilityChange=function(e){const t=()=>e("visible"===document.visibilityState);return document.addEventListener("visibilitychange",t),i.makeHandle((()=>document.removeEventListener("visibilitychange",t)))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));