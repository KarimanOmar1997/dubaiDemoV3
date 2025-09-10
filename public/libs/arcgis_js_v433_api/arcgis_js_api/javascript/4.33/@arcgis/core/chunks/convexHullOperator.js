/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{e as r}from"./operatorConvexHull.js";import{fromGeometry as o,toGeometry as t}from"./jsonConverter.js";import"./SimpleGeometryCursor.js";import"./Point2D.js";import"./Envelope.js";import"./Envelope2D.js";import"./ProjectionTransformation.js";import"./Transformation2D.js";import"./tslib.es6.js";import"./OperatorDefinitions.js";import"./unitUtils.js";import"../core/lang.js";import"./jsonMap.js";import"../config.js";import"./Logger.js";import"./pe.js";import"./assets.js";import"../request.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";function s(s){const i=o(s);return t(r(i.getGeometry()),i.getSpatialReference())}export{s as execute};
