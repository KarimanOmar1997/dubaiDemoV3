/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{B as s}from"./BindType.js";import{U as r}from"./Matrix4BindUniform.js";class t extends r{constructor(r,t,o){super(r,"mat4",s.Pass,((s,o,a)=>s.setUniformMatrix4fv(r,t(o,a))),o)}}export{t as M};
