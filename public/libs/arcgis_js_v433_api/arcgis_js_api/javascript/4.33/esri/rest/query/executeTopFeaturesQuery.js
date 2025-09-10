// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/queryTopFeatures","../support/FeatureSet","../support/TopFeaturesQuery"],(function(e,t,r,u,o){"use strict";e.executeTopFeaturesQuery=async function(e,a,s,p){const n=t.parseUrl(e),i={...p},{data:c}=await r.executeTopFeaturesQuery(n,o.from(a),s,i);return u.fromJSON(c)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));