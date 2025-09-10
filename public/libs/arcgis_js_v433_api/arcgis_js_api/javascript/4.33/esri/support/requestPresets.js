// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../request"],(function(e,t){"use strict";e.fetchArcGISServiceJSON=async function(e,n){const{data:r}=await t(e,{responseType:"json",query:{f:"json",...n?.customParameters,token:n?.apiKey}});return r},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));