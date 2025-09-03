// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/queryTopFeatures","../support/TopFeaturesQuery"],(function(e,t,o,r){"use strict";e.executeForTopIds=async function(e,u,s){const a=t.parseUrl(e);return(await o.executeQueryForTopIds(a,r.from(u),{...s})).data.objectIds},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));