/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{a as o}from"./operatorUnion.js";import{fromGeometries as r,toGeometry as s}from"./jsonConverter.js";import"./SimpleGeometryCursor.js";import"./Point2D.js";import"./ProjectionTransformation.js";import"./Envelope2D.js";import"./Envelope.js";import"./Transformation2D.js";import"./tslib.es6.js";import"./OperatorDefinitions.js";import"./unitUtils.js";import"../core/lang.js";import"./jsonMap.js";import"../config.js";import"./Logger.js";import"./pe.js";import"./assets.js";import"../request.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";function t(t){const[i,p]=r(t);return s(o(i,p),p)}export{t as executeMany};
