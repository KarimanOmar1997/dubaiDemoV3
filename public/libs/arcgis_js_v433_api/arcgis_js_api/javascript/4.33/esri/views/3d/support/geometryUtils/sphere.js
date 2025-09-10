// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../geometry/support/ray","../../../../chunks/sphere","./ray"],(function(e,t,r,n){"use strict";const c=t.create();e.intersectScreen=function(e,t,o,s){const i=n.fromScreenAtEye(t,o,c);return r.intersectRay(e,i,s)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));