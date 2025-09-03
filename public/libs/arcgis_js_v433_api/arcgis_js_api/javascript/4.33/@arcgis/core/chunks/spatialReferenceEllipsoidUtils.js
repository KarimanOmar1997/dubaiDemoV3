/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{W as e,x as t,y as s,S as n,z as a,A as o}from"./unitUtils.js";import i from"../geometry/SpatialReference.js";const r=new i(o),l=new i(n),p=new i(a),f=new i(e);function w(e){const n=c.get(e);if(n)return n;let a=r;if(e)if(e===l)a=l;else if(e===p)a=p;else{const n=e.wkid,o=e.latestWkid;if(null!=n||null!=o)t(n)||t(o)?a=l:(s(n)||s(o))&&(a=p);else{const t=e.wkt2??e.wkt;if(t){const e=t.toUpperCase();e===k?a=l:e===u&&(a=p)}}}return c.set(e,a),a}const c=new Map,k=l.wkt.toUpperCase(),u=p.wkt.toUpperCase();export{l as S,f as W,p as a,w as g};
