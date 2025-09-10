// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./projectors"],(function(t,e){"use strict";t.projectBuffer=function(t,r,o,n,f,c,u=Math.floor(t.length/3)){const i=e.getProjector(r,f);if(null==i)return!1;if(i===e.copy3){if(t===n&&o===c)return!0;const e=o+3*u;for(let r=o,f=c;r<e;r++,f++)n[f]=t[r];return!0}const l=o+3*u;for(let e=o,r=c;e<l;e+=3,r+=3)i(t,e,n,r);return!0},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));