/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as e,l as t,e as a,a as o}from"./geodesicAreaMeasurementUtils.js";const r=t=>({autoAreaByElevationMode(r,n,s=e()){if("on-the-ground"===n){const e=t.geodesicArea(r);return null!=e?e:a(r,s)}return o(r,s)},autoArea2D(t,a=e()){return this.autoAreaByElevationMode(t,"on-the-ground",a)}});let n=null;async function s(){return n||(n=r(await t())),n}export{s as l};
