// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(o){"use strict";o.iterateXML=function*o(e,i){for(const n of e.children)if(n.localName in i){const e=i[n.localName];"function"==typeof e?yield e(n):yield*o(n,e)}},o.visitXML=function o(e,i){if(e&&i)for(const n of e.children)if(n.localName in i){const e=i[n.localName];if("function"==typeof e){const i=e(n);i&&o(n,i)}else o(n,e)}},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));