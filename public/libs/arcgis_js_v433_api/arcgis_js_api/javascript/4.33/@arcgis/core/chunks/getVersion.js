/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import r from"../request.js";import{join as s}from"../core/urlUtils.js";import{p as i,a as t,e as o}from"./utils10.js";import"../config.js";import"../core/lang.js";import"../kernel.js";import"../core/Error.js";import"./Logger.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";import"./jsonUtils.js";async function e(e,m,p){const n=i(e),a=t(n.query,{query:o({f:"json"}),...p});m.startsWith("{")&&(m=m.slice(1,-1));const j=s(n.path,"versions",m),{data:l}=await r(j,a),{versionName:c,versionGuid:u,...f}=l;return{...f,versionIdentifier:{name:c,guid:u}}}export{e as getVersion};
