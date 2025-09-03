// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/queryTopFeatures","../support/TopFeaturesQuery"],(function(e,t,o,r){"use strict";e.executeForTopCount=async function(e,u,n){const a=t.parseUrl(e);return(await o.executeQueryForTopCount(a,r.from(u),{...n})).data.count},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));