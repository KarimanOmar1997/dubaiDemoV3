// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../request","../../utils","./support/EditUnitIdentifiersResult"],(function(e,t,i,s){"use strict";e.resize=async function(e,n,r){const o=i.parseUrl(e),u={...n.toJSON(),f:"json"},a=i.encode({...o.query,...u}),d=i.asValidOptions(a,{...r,method:"post"}),f=`${o.path}/unitIdentifiers/resize`,{data:p}=await t(f,d);return s.fromJSON(p)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));