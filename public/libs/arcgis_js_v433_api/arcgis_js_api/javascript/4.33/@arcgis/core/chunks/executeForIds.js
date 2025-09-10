/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{p as r}from"./utils10.js";import{a as t,b as a}from"./query.js";import s from"../rest/support/Query.js";async function o(a,o,n,i){const u=r(a),{data:e}=await t(u,s.from(o),n,i);return e.count}async function n(t,o,n,i){const u=r(t),{data:e}=await a(u,s.from(o),n,i);return e.objectIds??function(r){var t;if(r)return t=r,Array.isArray(t[0])?r.map((r=>JSON.stringify(r))):r}(e.uniqueIds)??[]}export{n as a,o as e};
