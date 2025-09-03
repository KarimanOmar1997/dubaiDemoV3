// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/query","../support/Query"],(function(e,r,t,u){"use strict";e.executeForIds=async function(e,n,o,i){const s=r.parseUrl(e),{data:a}=await t.executeQueryForIds(s,u.from(n),o,i);return a.objectIds??function(e){var r;if(e)return r=e,Array.isArray(r[0])?e.map((e=>JSON.stringify(e))):e}(a.uniqueIds)??[]},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));