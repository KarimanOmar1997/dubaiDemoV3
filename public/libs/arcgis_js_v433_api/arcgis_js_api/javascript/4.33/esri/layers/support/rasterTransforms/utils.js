// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./GCSShiftTransform","./IdentityTransform","./PolynomialTransform"],(function(n,r,t,o){"use strict";const e={GCSShiftXform:r,IdentityXform:t,PolynomialXform:o};n.readTransform=function(n){const r=n?.type;if(!r)return null;const t=e[n?.type];if(t){const r=new t;return r.read(n),r}return null},Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})}));