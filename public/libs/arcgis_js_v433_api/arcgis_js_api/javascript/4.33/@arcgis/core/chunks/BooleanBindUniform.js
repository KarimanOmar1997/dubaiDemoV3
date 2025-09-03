/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{B as o}from"./BindType.js";import{U as r}from"./Matrix4BindUniform.js";import{g as t}from"./glsl.js";import{V as s}from"./VertexAttribute.js";import{s as e}from"./vec2.js";import{c as a}from"./vec2f64.js";import{s as i}from"./vec4.js";import{c as n}from"./vec4f64.js";import{F as c,k as f}from"./Matrix4PassUniform.js";class m extends r{constructor(r,t){super(r,"vec2",o.Pass,((o,s,e)=>o.setUniform2fv(r,t(s,e))))}}function d(o,r=!0){o.attributes.add(s.POSITION,"vec2"),r&&o.varyings.add("uv","vec2"),o.vertex.main.add(t`
      gl_Position = vec4(position, 0.0, 1.0);
      ${r?t`uv = position * 0.5 + vec2(0.5);`:""}
  `)}function p(o){o.fragment.uniforms.add(new c("projInfo",(o=>function(o){const r=o.projectionMatrix;return 0===r[11]?i(u,2/(o.fullWidth*r[0]),2/(o.fullHeight*r[5]),(1+r[12])/r[0],(1+r[13])/r[5]):i(u,-2/(o.fullWidth*r[0]),-2/(o.fullHeight*r[5]),(1-r[8])/r[0],(1-r[9])/r[5])}(o.camera)))),o.fragment.uniforms.add(new f("zScale",(o=>0===o.camera.projectionMatrix[11]?e(l,0,1):e(l,1,0)))),o.fragment.code.add(t`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}const u=n(),l=a();class v extends r{constructor(r,t){super(r,"bool",o.Bind,((o,s)=>o.setUniform1b(r,t(s))))}}export{v as B,p as C,m as F,d as S};
