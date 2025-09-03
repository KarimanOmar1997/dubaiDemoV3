// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder"],(function(e,t,i,a,r,o,l,n,s){"use strict";function d(){const e=new s.ShaderBuilder;return e.attributes.add(n.VertexAttribute.POSITION,"vec3"),e.attributes.add(n.VertexAttribute.COLOR,"vec4"),e.attributes.add(n.VertexAttribute.SIZE,"float"),e.varyings.add("vcolor","vec4"),e.varyings.add("vsize","float"),e.vertex.uniforms.add(new l.Matrix4PassUniform("transform",((e,i)=>function(e,i){const a=24e-8;return t.copy(c,i.camera.projectionMatrix),c[10]=a-1,c[11]=-1,c[14]=(a-2)*i.camera.near,t.multiply(c,c,i.camera.viewMatrix),t.multiply(c,c,e.modelMatrix)}(e,i))),new a.Float4BindUniform("viewport",(e=>e.camera.fullViewport)),new r.FloatBindUniform("pixelRatio",(e=>e.camera.pixelRatio))),e.vertex.main.add(o.glsl`gl_Position = transform * vec4(position, 0);
vcolor = color / 1.2;
vsize = size * 5.0 * pixelRatio;
gl_PointSize = vsize;`),e.fragment.main.add(o.glsl`float cap = 0.7;
float scale = 1.0 / cap;
float helper = clamp(length(abs(gl_PointCoord - vec2(0.5))), 0.0, cap);
float alpha = clamp((cap - helper) * scale, 0.0, 1.0);
float intensity = alpha * alpha * alpha;
if (vsize < 3.0) {
intensity *= 0.5;
}
fragColor = vec4(vcolor.xyz, intensity);`),e}const c=i.create(),f=Object.freeze(Object.defineProperty({__proto__:null,build:d},Symbol.toStringTag,{value:"Module"}));e.Stars=f,e.build=d}));