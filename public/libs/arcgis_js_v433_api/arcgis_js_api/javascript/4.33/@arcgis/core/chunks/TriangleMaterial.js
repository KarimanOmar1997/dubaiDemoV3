/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{f as s}from"./vec3f64.js";import{M as t}from"./Material.js";import{i as p}from"./VertexColor.glsl.js";class r extends t{constructor(){super(...arguments),this._pp0=s(0,0,1),this._pp1=s(0,0,0)}intersect(s,t,r,i,e,o){return p(s,r,i,e,void 0,o)}intersectDraped(s,t,r,i){return this._pp0[0]=this._pp1[0]=r[0],this._pp0[1]=this._pp1[1]=r[1],p(s,t,this._pp0,this._pp1,void 0,i)}}export{r as T};
