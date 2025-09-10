/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{r as t,e as n}from"./mathUtils.js";import{g as r}from"./mat4.js";import{s,m as a,g as o}from"./quat.js";import{c as u}from"./quatf64.js";import{c as f,f as c,n as i,h as e}from"./vec3.js";import{U as m,d as p,e as j}from"./vec3f64.js";function g(t=w){return[t[0],t[1],t[2],t[3]]}function h(t,n,r=g()){return f(r,t),r[3]=n,r}function d(t,n,r){return c(r,t,n),i(r,r),r[3]=-e(t,n),r}function q(n,s=g()){const a=r(y,n);return k(s,t(o(s,a))),s}function v(n,r,u=g()){return s(y,n,x(n)),s(z,r,x(r)),a(y,z,y),k(u,t(o(u,y)))}function U(t,n,r,s=g()){return h(m,t,A),h(p,n,B),h(j,r,C),v(A,B,A),v(A,C,s),s}function b(t){return t}function l(t){return t[3]}function x(t){return n(t[3])}function k(t,n){return t[3]=n,t}const w=[0,0,1,0],y=u(),z=u();g();const A=g(),B=g(),C=g();export{l as a,x as b,b as c,q as d,g as e,h as f,U as g,d as h,w as u};
