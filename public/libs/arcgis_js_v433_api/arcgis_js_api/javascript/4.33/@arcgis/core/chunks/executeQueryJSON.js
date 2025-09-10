/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{p as r}from"./utils10.js";import{e as t}from"./query.js";import o from"../rest/support/FeatureSet.js";import s from"../rest/support/Query.js";async function e(r,t,s,e){const n=await a(r,t,s,e);return o.fromJSON(n)}async function a(o,e,a,n){const p=r(o),u={...a},i=s.from(e),{data:m}=await t(p,i,i.sourceSpatialReference,u,n);return m}export{a,e};
