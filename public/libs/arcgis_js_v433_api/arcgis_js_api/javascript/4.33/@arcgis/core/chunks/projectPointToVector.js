/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as e}from"./vec3f64.js";import{canProjectWithoutEngine as r,tryProjectWithZConversion as t,initializeProjection as n}from"./projectionUtils.js";import{p as o}from"./projectBuffer.js";function s(e,n,s,a){if(r(e.spatialReference,s)){c[0]=e.x,c[1]=e.y;const r=e.z;return c[2]=r??a??0,o(c,e.spatialReference,0,n,s,0)}const f=t(e,s);return!!f&&(n[0]=f?.x,n[1]=f?.y,n[2]=f?.z??a??0,!0)}async function a(e,r,t,o,a){return await n(e.spatialReference,t,null,a),s(e,r,t,o)}const c=e();export{a,s as p};
