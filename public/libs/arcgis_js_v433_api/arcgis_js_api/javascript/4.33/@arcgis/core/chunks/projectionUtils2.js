/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{throwIfAborted as t}from"../core/promiseUtils.js";import{isLoaded as e,canProjectWithoutEngine as r,project as n,load as i,projectWithZConversion as a}from"./projectionUtils.js";let o,c=null;async function s(e){c||(c=import("./geometryServiceUtils.js").then((t=>o=t))),await c,t(e)}async function l(t,a,c,u){if(!t)return null;const p=t.spatialReference;return e()||r(p,a)?n(t,a):o?o.projectGeometry(t,a,c,u):(await Promise.race([s(u),i(u)]),l(t,a,c,u))}async function u(t,e){try{return t?.spatialReference?await a(t,e):null}catch{return null}}export{u as a,l as p};
