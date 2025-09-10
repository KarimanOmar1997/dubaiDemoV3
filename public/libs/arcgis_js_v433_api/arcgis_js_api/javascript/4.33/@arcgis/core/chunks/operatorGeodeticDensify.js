/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as e}from"./SimpleGeometryCursor.js";import{l as t,p as n,i as r}from"./pe.js";let o;function s(){return!!o&&r()}async function i(){if(!s()){const[e,r]=await Promise.all([import("./OperatorGeodeticDensifyByLength.js"),import("./ProjectionTransformation.js").then((e=>e.bj)).then((({injectPe:e})=>e)),t()]);o=new e.OperatorGeodeticDensifyByLength,r(n)}}function a(e,t,n,r){return o.execute(e,t,n,r,null)}function u(t,n,r,s){const i=o.executeMany(new e(t),n,r,s,null);return Array.from(i)}function c(){return o.supportsCurves()}export{u as a,a as e,s as i,i as l,c as s};
