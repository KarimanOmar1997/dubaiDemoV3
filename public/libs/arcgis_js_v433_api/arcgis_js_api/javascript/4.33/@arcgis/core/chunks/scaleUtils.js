/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{f as n}from"./mathUtils.js";import{g as t,K as e}from"./unitUtils.js";function r(n,r){const i=r||n.extent,u=n.width,a=t(i?.spatialReference);return i&&u?i.width/u*a*e*96:0}function i(n,r){return n/(t(r)*e*96)}function u(n){return n/(96*e)}function a(n,r){return n*(t(r)*e*96)}function s(n,t){const e=n.extent,r=n.width-(n.padding?n.padding.left+n.padding.right:0),u=i(t,e.spatialReference);return e.clone().expand(u*r/e.width)}function o(t,e,r){return function(t,e){return 0===e||n(t,e)||t<e}(t,e)&&function(t,e){return 0===e||n(t,e)||t>e}(t,r)}function c(t,e){return n(t,e)?0:(t||Number.POSITIVE_INFINITY)>(e||Number.POSITIVE_INFINITY)?1:-1}export{a,u as b,c,s as d,i as e,r as g,o as i};
