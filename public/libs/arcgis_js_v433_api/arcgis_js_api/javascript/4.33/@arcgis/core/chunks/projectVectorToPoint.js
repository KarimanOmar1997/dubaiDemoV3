/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as r}from"./vec3f64.js";import{initializeProjection as t}from"./projectionUtils.js";import{p as e}from"./projectVectorToVector.js";function o(r,t,o){return!!e(r,t,c,o.spatialReference)&&(o.x=c[0],o.y=c[1],o.z=c[2],!0)}async function a(r,e,a,c){return await t(e,a.spatialReference,null,c),o(r,e,a)}const c=r();export{a,o as p};
