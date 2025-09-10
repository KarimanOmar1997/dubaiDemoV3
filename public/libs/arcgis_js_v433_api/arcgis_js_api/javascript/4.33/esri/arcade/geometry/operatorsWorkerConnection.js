// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/workers/workers"],(function(e,o){"use strict";let r,t,n=!1;e.invokeRemoteGeometryOp=async function e(i,a){return n?t.apply("invokeGeometryOp",[i,a]):(await(r??=o.open("arcadeGeometryOperatorsWorker").then((e=>{t=e,n=!0,r=void 0}))),e(i,a))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));