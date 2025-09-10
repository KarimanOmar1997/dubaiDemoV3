// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../chunks/vec32","./projectors"],(function(e,r,t){"use strict";e.projectVec3Array=function(e,o,n,c,u,f,i=1){const s=t.getProjector(o,u);if(null==s)return!1;if(s===t.copy3){if(e===c&&n===f)return!0;const t=n+i;for(let o=n,u=f;o<t;++o,++u)r.copy(c[u],e[o]);return!0}const l=n+i;for(let r=n,t=f;r<l;++r,++t)s(e[r],0,c[t],0);return!0},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));