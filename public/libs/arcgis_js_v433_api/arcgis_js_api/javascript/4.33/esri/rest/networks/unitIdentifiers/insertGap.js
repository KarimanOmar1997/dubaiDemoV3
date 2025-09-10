// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../request","../../utils","./support/EditUnitIdentifiersResult"],(function(t,e,i,n){"use strict";t.insertGap=async function(t,s,r){const o=i.parseUrl(t),a={...s.toJSON(),f:"json"},u=i.encode({...o.query,...a}),d=i.asValidOptions(u,{...r,method:"post"}),p=`${o.path}/unitIdentifiers/insertGap`,{data:f}=await e(p,d);return n.fromJSON(f)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));