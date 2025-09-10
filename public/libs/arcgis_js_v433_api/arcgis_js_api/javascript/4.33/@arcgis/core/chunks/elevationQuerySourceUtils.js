/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{i as n,m as l}from"../core/lang.js";import{g as t}from"./unitUtils.js";import{i as r}from"./groundInstanceUtils.js";function u(n){if(null==n)return null;if(r(n))return i(n);const l=n.tileInfo;if(null==l)return null;const u=l.lods?.at(-1);return null==u?null:u.resolution*t(l.spatialReference)}function i(t){if(null==t)return null;const r=t.layers.items.map(e).filter(n);return l(r)??null}function e(n){return n&&"tileInfo"in n?u(n):null}export{u as a,i as g};
