// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../symbols/support/webStyleSymbolUtils"],(function(e,t){"use strict";e.fetchSymbolFromStyle=function(e,o,r,c,m,i){const l="cimRef"===c?["cim"]:["web"];return t.fetchSymbolFromStyle(e,o,r,(e=>{const t=m(e,c);return t?{format:"cimRef"===c?"cim":"web",url:t}:void 0}),{...i,acceptedFormats:l})},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));