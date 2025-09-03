/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import r from"../request.js";import{p as s,a as o,e as i}from"./utils10.js";import"../config.js";import"../core/lang.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./Logger.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function t(t,e,m){const n=s(t),p=e.toJSON(),a=o(n.query,{query:i({...p,f:"json"}),...m}),j=`${n.path}/versionInfos`,{data:l}=await r(j,a);return l.versions.map((r=>{const{versionName:s,versionGuid:o,...i}=r;return{...i,versionIdentifier:{name:s,guid:o}}}))}export{t as getVersionInfos};
