/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as r}from"./SimpleGeometryCursor.js";import{f as n}from"./ProjectionTransformation.js";const e=new n;function o(r,n,o,t){return e.execute(r,n,o,t,null)}function t(n,o,t,s){const u=e.executeMany(new r(n),o,t,s,null);return Array.from(u)}function s(){return e.supportsCurves()}export{t as a,o as e,s};
