// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/math/vec2","../../../../../../core/libs/gl-matrix-2/factories/vec2f64","../../shaderModules/Float2BindUniform","../../shaderModules/glsl"],(function(e,t,r,o,d){"use strict";const a=r.create();e.ReadDepth=function(e){e.uniforms.add(new o.Float2BindUniform("zProjectionMap",(e=>function(e){const r=e.projectionMatrix;return t.set(a,r[14],r[10])}(e.camera)))),e.code.add(d.glsl`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`),e.code.add(d.glsl`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return depth;
}`),e.code.add(d.glsl`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));