/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import t from"../request.js";import{a as r}from"./ensureType.js";import{getJsonType as o}from"../geometry/support/jsonUtils.js";import{p as s,a as e}from"./utils10.js";import{d as p}from"./utils11.js";import m from"../rest/support/ProjectParameters.js";const a=r(m);async function i(r,m,i){m=a(m);const n=s(r),j={...n.query,f:"json",...m.toJSON()},u=m.outSpatialReference,f=o(m.geometries[0]),c=e(j,i);return t(n.path+"/project",c).then((({data:{geometries:t}})=>p(t,f,u)))}export{i as p};
