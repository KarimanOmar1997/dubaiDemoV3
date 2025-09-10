/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{e as r,s as e}from"./screenUtils.js";import{c as n}from"./vec2.js";import{k as o,n as t,c,s}from"./vec3.js";import{c as i}from"./ray.js";import{a as u}from"./vector.js";function a(r,n,o=i()){return m(r,e(n),o),t(o.direction,o.direction),o}function m(e,n,o){return f(e,e.screenToRender(n,r(u.get())),o)}function f(e,t,c){const s=r(n(u.get(),t));if(s[2]=0,!e.unprojectFromRenderScreen(s,c.origin))return null;const i=r(n(u.get(),t));i[2]=1;const a=e.unprojectFromRenderScreen(i,u.get());return null==a?null:(o(c.direction,a,c.origin),c)}function g(e,n,o){return l(e,e.screenToRender(n,r(u.get())),o)}function l(r,e,n){c(n.origin,r.eye);const t=s(u.get(),e[0],e[1],1),i=r.unprojectFromRenderScreen(t,u.get());return null==i?null:(o(n.direction,i,n.origin),n)}export{a,f as b,g as c,l as d,m as f};
