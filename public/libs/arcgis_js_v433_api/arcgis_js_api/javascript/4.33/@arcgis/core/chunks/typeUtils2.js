/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{s as o}from"./jsonMap.js";import e from"../geometry/Extent.js";import t from"../geometry/Geometry.js";import i from"../geometry/Multipoint.js";import r from"../geometry/Point.js";import m from"../geometry/Polygon.js";import n from"../geometry/Polyline.js";const y=o()({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon"}),p=o()({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryEnvelope:"extent",mesh:"mesh"}),s={base:t,key:"type",typeMap:{extent:e,multipoint:i,point:r,polyline:n,polygon:m}};function l(o){return"point"===o.type}export{y as f,s as g,l as i,p as t};
