/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as e}from"./SimpleGeometryCursor.js";import"./Point2D.js";import{O as n}from"./ProjectionTransformation.js";import"./Envelope2D.js";import"./Envelope.js";const o=new n;function r(e,n,r){return o.execute(e,n,r,null)}function t(n,r){return o.executeMany(new e(n),r,null).next()}function s(){return o.supportsCurves()}export{t as a,r as e,s};
