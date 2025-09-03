/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import s from"../request.js";import r from"../core/Error.js";import{p as i,a as o,e as t}from"./utils10.js";import"../config.js";import"../core/lang.js";import"../kernel.js";import"../core/urlUtils.js";import"./Logger.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function e(e,p,m,n){if(!p)throw new r("stop-reading:missing-guid","guid for version is missing");const a=i(e),j=o(a.query,{query:t({sessionId:m,f:"json"}),...n,method:"post"});p.startsWith("{")&&(p=p.slice(1,-1));const l=`${a.path}/versions/${p}/stopReading`,{data:c}=await s(l,j);return c||{success:!1}}export{e as stopReading};
