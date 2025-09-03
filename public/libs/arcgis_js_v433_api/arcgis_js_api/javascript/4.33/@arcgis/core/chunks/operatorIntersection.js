/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as r}from"./SimpleGeometryCursor.js";import"./Point2D.js";import{u as e}from"./ProjectionTransformation.js";import"./Envelope.js";const n=new e;function o(r,e){return n.accelerateGeometry(r,e,1)}function t(r,e,o){return n.execute(r,e,o,null)}function s(e,o,t,s){const u=n.executeMany(new r(e),new r([o]),t,null,s);return Array.from(u)}function u(){return n.supportsCurves()}export{o as a,s as b,t as e,u as s};
