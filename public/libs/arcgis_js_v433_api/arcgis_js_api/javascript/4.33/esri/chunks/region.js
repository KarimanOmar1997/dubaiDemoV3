// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./index-p4VH55K1"],(function(e,n){"use strict";const t="Global";e.extractRegion=function(e){if(function(e){return 0===n.getTimezone(e).countries.length}(e))return t;const o=e.indexOf("/");return-1===o?e:e.slice(0,o)},e.getCountry=function(e){return n.getCountryForTimezone(e)?.id??e},e.global=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));