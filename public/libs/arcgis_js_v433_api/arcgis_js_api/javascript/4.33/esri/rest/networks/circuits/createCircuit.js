// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../request","../../utils","./support/EditCircuitsResult"],(function(t,e,r,i){"use strict";t.createCircuit=async function(t,o,s){const u=r.parseUrl(t),a={...o.toJSON(),f:"json"},c=r.encode({...u.query,...a}),n=r.asValidOptions(c,{...s,method:"post"}),d=`${u.path}/circuits/create`,{data:p}=await e(d,n);return i.fromJSON(p)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));