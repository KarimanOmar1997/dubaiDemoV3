/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as e}from"./SimpleGeometryCursor.js";import{l as r,p as t,i as n}from"./pe.js";let o;function s(){return!!o&&n()}async function a(){if(!s()){const[e,n]=await Promise.all([import("./OperatorGeodesicBuffer2.js"),import("./ProjectionTransformation.js").then((e=>e.bj)).then((({injectPe:e})=>e)),r()]);o=new e.OperatorGeodesicBuffer,n(t)}}function i(e,r,t,n,s){return o.execute(e,r,t,n,s,!1,null)}function u(r,t,n,s,a,i){const u=o.executeMany(new e(r),t,n,s,a,!1,i,null);return Array.from(u)}function c(){return o.supportsCurves()}export{u as a,i as e,s as i,a as l,c as s};
