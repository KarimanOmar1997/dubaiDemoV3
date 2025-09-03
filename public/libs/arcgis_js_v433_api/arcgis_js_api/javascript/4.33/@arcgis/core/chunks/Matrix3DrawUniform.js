/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{F as o,U as r}from"./Matrix4BindUniform.js";import{g as i}from"./glsl.js";import{B as s}from"./BindType.js";function e({code:r,uniforms:s},e){s.add(new o("dpDummy",(()=>1))),r.add(i`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}class m extends r{constructor(o,r){super(o,"mat3",s.Draw,((i,s,e)=>i.setUniformMatrix3fv(o,r(s,e))))}}export{e as D,m as M};
