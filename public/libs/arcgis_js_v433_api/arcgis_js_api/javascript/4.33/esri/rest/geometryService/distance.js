// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../request","../utils"],(function(t,e,n){"use strict";t.distance=async function(t,s,a){const i=n.parseUrl(t),o={...i.query,f:"json",...s.toJSON()},r=n.asValidOptions(o,a);return e(i.path+"/distance",r).then((({data:t})=>t&&t.distance))},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));