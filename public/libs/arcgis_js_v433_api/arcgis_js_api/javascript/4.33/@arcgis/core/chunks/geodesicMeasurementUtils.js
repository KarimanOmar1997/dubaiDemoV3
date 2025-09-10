/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{isSupported as o}from"../geometry/support/geodesicUtils.js";import{i as t}from"./unitUtils.js";function r(r){return o(r)||t(r)}function s(t,r,s,...i){return o(t)?r.apply(void 0,i):t.isWebMercator?s.apply(void 0,i):null}const i=1e5;export{s as a,i as g,r as s};
