/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import s from"../request.js";import r from"../core/Error.js";import{p as t,a as i,e as o}from"./utils10.js";import"../config.js";import"../core/lang.js";import"../kernel.js";import"../core/urlUtils.js";import"./Logger.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function e(e,m,p,n){if(!m)throw new r("start-reading:missing-guid","guid for version is missing");const a=t(e),j=i(a.query,{query:o({sessionId:p,f:"json"}),...n,method:"post"});m.startsWith("{")&&(m=m.slice(1,-1));const l=`${a.path}/versions/${m}/startReading`,{data:c}=await s(l,j);return c||{success:!1}}export{e as startReading};
