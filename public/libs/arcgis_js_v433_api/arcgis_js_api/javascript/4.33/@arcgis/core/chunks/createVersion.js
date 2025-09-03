/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import r from"../request.js";import{p as o,a as s,e as t}from"./utils10.js";import"../config.js";import"../core/lang.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./Logger.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function i(i,e,m){const p=o(i),a=e.toJSON(),n=s(p.query,{query:t({...a,f:"json"}),...m,authMode:"immediate",method:"post"}),j=`${p.path}/create`,{data:l}=await r(j,n),{versionName:u,versionGuid:c,...d}=l.versionInfo;return{...d,versionIdentifier:{name:u,guid:c}}}export{i as createVersion};
