// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.padStops=function(t,e){const n=t.slice(0,e),o=e-n.length;for(let t=0;t<o;t++){const t=n[n.length-1];n.push(t)}return n},t.premultiplyColor=function(t){if(!t)return[0,0,0,0];const{r:e,g:n,b:o,a:r}=t;return[e*(r/255),n*(r/255),o*(r/255),r]},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));