// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/devEnvironmentUtils"],(function(n,t){"use strict";n.adjustStaticAGOUrl=function(n,e){return t.adjustStaticAGOUrl(n,e)},n.isDevEnvironment=function(n){return t.isDevEnvironment(n)},n.isTelemetryDevEnvironment=function(n){return n=n||globalThis.location.hostname,[/^zrh-.+?\.esri\.com$/].concat(t.devHostnames).some((t=>null!=n?.match(t)))},Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})}));