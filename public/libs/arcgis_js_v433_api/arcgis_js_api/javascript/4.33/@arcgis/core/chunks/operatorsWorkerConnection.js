/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{open as r}from"../core/workers/workers.js";let e,o,t=!1;async function a(i,n){return t?o.apply("invokeGeometryOp",[i,n]):(await(e??=r("arcadeGeometryOperatorsWorker").then((r=>{o=r,t=!0,e=void 0}))),a(i,n))}export{a as i};
