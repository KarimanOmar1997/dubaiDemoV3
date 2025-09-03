/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as r}from"./SimpleGeometryCursor.js";import"./Point2D.js";import{d as n}from"./ProjectionTransformation.js";import"./Envelope.js";const e=new n;function o(r,n,o){return e.execute(r,n,o,null)}function t(n,o,t){const s=e.executeMany(new r(n),o,t,null);return Array.from(s)}function s(r,n,o){return e.isSimpleAsFeature(r,n,o,null,null)}function u(){return e.supportsCurves()}export{t as a,o as e,s as i,u as s};
