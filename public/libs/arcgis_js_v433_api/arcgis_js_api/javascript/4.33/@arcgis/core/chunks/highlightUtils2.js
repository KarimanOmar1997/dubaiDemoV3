/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import r from"../core/Collection.js";import{m as o}from"./handleUtils.js";import{c as s}from"./guards.js";function i(o){return r.isCollection(o)?o.toArray():Array.isArray(o)?o:t(o)||s(o)||"esri.views.3d.layers.i3s.PointCloudGraphic"===o.declaredClass?[o]:e}function t(r){return"number"==typeof r||"string"==typeof r}const e=[],a=o();export{a as e,t as i,i as n};
