// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.memoize=function(t){let e,n,r=[],i=!1;return function(...u){return i&&e===this&&function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(u,r)||(n=t.apply(this,u),e=this,r=u,i=!0),n}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));