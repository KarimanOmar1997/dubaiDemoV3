/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{s as r}from"../../chunks/signal.js";import{t as n,r as s}from"../../chunks/tracking.js";import{S as t}from"../../chunks/SimpleObservable.js";import{S as i}from"../../chunks/SimpleTrackingTarget.js";import"../../core/lang.js";import"../../chunks/Logger.js";import"../../config.js";import"../../chunks/utils.js";import"../../chunks/handleUtils.js";import"../../chunks/ObservableBase.js";function o(n,s){return r(n,s)}function e(){return new t}function u(r){return new i(r)}function c(r){n(r)}function m(r,n){return s(r,n)}export{e as createObservable,u as createTrackingTarget,m as runTracked,o as signal,c as trackAccess};
