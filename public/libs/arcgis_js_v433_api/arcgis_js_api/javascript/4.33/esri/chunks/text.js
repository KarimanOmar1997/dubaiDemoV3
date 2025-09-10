// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./componentsUtils"],(function(t,e){"use strict";t.capitalizeWord=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},t.highlightText=function({text:t,pattern:n}){if(!n||!t)return t;const r=t.split(n);return r.length>1&&(r[1]=e.x`<mark class=${e.safeClassMap("text-match")}>${r[1]}</mark>`),r}}));