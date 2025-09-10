// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";function e(t,e){const n=Math.floor(Math.log10(t)),o=t/10**n;let r;return r=e?o<1.5?1:o<3?2:o<5?2.5:o<7?5:10:o<=1?1:o<=2?2:o<=3?2.5:o<=5?5:10,r*10**n}t.niceScale=function(t,n,o=10){const r=e(n-t,!1);if(0===r)return[t,n];const c=e(r/(o-1),!0);return[Math.floor(t/c)*c,Math.ceil(n/c)*c]},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));