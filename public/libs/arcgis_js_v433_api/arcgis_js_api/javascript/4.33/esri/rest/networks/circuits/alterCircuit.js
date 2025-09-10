// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../request","../../utils","./support/EditCircuitsResult"],(function(t,e,r,i){"use strict";t.alterCircuit=async function(t,o,s){const u=r.parseUrl(t),a={...o.toJSON(),f:"json"},n=r.encode({...u.query,...a}),c=r.asValidOptions(n,{...s,method:"post"}),l=`${u.path}/circuits/alter`,{data:d}=await e(l,c);return i.fromJSON(d)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));