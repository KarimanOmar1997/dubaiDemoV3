/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{a as r,S as t}from"./debounce.js";var e=Array.isArray,n=t?t.prototype:void 0,a=n?n.toString:void 0;function o(t){if("string"==typeof t)return t;if(e(t))return function(r,t){for(var e=-1,n=null==r?0:r.length,a=Array(n);++e<n;)a[e]=t(r[e],e,r);return a}(t,o)+"";if(r(t))return a?a.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}var i=/[\\^$.*+?()[\]{}|]/g,u=RegExp(i.source);function f(r){var t;return(r=null==(t=r)?"":o(t))&&u.test(r)?r.replace(i,"\\$&"):r}export{f as e,e as i};
