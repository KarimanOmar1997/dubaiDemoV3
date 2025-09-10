// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/queryAttributeBins","../support/AttributeBinsFeatureSet","../support/AttributeBinsQuery"],(function(t,e,r,u,i){"use strict";t.executeAttributeBinsQuery=async function(t,n,s){const{data:o}=await r.executeAttributeBinsQuery(e.parseUrl(t),i.from(n),s);return u.fromJSON(o)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));