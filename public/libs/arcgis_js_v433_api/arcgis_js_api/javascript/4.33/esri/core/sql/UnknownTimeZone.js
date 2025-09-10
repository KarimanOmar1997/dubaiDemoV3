// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../chunks/datetime"],(function(n,e){"use strict";class t{static{this.instance=new e.IANAZone("Etc/UTC")}}function o(n){return n instanceof e.Zone?n===t.instance:"unknown"===n?.toString().toLowerCase()}n.UnknownTimeZone=t,n.isUnknownTimeZone=o,n.substituteUnknownTimezone=function(n){return o(n)?t.instance:n},Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})}));