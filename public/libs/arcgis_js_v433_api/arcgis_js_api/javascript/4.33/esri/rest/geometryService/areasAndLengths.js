// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../request","../utils"],(function(e,t,n){"use strict";e.areasAndLengths=async function(e,s,a){const r=n.parseUrl(e),o={...r.query,f:"json",...s.toJSON()},i=n.asValidOptions(o,a);return t(r.path+"/areasAndLengths",i).then((e=>e.data))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));