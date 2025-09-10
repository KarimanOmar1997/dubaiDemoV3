// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/query","../support/Query"],(function(e,t,o,r){"use strict";e.executeForCount=async function(e,u,n,a){const c=t.parseUrl(e),{data:i}=await o.executeQueryForCount(c,r.from(u),n,a);return i.count},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));