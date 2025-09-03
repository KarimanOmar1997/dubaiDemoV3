/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import s from"../request.js";import i from"../core/Error.js";import{p as t,a as r,e as o}from"./utils10.js";import"../config.js";import"../core/lang.js";import"../kernel.js";import"../core/urlUtils.js";import"./Logger.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function e(e,p,m,n,a){if(!p)throw new i("stop-editing:missing-guid","guid for version is missing");const j=t(e),l=r(j.query,{query:o({sessionId:m,saveEdits:n,f:"json"}),...a,method:"post"});p.startsWith("{")&&(p=p.slice(1,-1));const c=`${j.path}/versions/${p}/stopEditing`,{data:g}=await s(c,l);return g||{success:!1}}export{e as stopEditing};
