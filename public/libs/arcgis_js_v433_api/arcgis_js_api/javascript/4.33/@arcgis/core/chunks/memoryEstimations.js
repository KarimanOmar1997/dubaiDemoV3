/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as r}from"../core/lang.js";function n(r){return 32+r.length}const t=16;function e(r){if(!r)return 0;let n=c;for(const t in r)r.hasOwnProperty(t)&&(n+=o(r[t],!1));return n}function u(r){if(!r)return 0;if("number"==typeof r[0])return s(r);if(Array.isArray(r))return function(r){const n=r.length;if(0===n||"number"==typeof r[0])return a(r,8);let t=f;for(let e=0;e<n;e++)t+=o(r[e]);return t}(r);let n=c;for(const t in r)r.hasOwnProperty(t)&&(n+=o(r[t]));return n}function o(r,t=!0){switch(typeof r){case"object":return t?u(r):c;case"string":return n(r);case"number":return 16;case"boolean":return 4;default:return 8}}function s(...n){return n.reduce(((n,t)=>n+(t?r(t)?t.byteLength+i:Array.isArray(t)?a(t,16):0:0)),0)}function a(r,n){return f+r.length*n}const c=32,f=16,i=145;export{u as a,e as b,i as c,c as d,s as e,f,t as g,a as h,n as i};
