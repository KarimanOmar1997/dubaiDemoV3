/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as e}from"./SimpleGeometryCursor.js";import{OperatorGeodeticDensifyCursor as r}from"./OperatorGeodeticDensifyByLength.js";import{p as t}from"./Point2D.js";class o{getOperatorType(){return 10317}supportsCurves(){return!0}accelerateGeometry(e,r,t){return!1}canAccelerateGeometry(e){return!1}executeMany(e,t,o,n,s,u){return new r(e,t,4,o,n,s,u)}execute(r,o,n,s,u,a){const p=new e([r]),c=this.executeMany(p,o,n,s,u,a).next();return c||t("null output"),c}}export{o as O};
