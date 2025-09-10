// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/math/mat4","../../../../../../core/libs/gl-matrix-2/factories/mat4f64","../output/ReadDepth.glsl","./calculateUVZShadow.glsl","../util/CameraSpace.glsl","../../shaderModules/glsl","../../shaderModules/Matrix4BindUniform"],(function(e,a,t,r,l,i,c,o){"use strict";function n(e){e.fragment.include(r.ReadDepth),e.include(i.CameraSpace),e.fragment.uniforms.add(new o.Matrix4BindUniform("inverseViewMatrix",(({camera:e})=>a.invert(d,a.translate(d,e.viewMatrix,e.center))))).code.add(c.glsl`vec3 calculateUVZShadowAndPixelPosFromDepth(
in vec2 _uv,
ivec2 shadowMapSize,
in sampler2D _depthMap,
out vec4 currentPixelPos
) {
float depth = depthFromTexture(_depthMap, _uv);
if (depth >= 1.0 || depth <= 0.0) {
return invalidShadowmapUVZ;
}
float currentPixelDepth = linearizeDepth(depth);
currentPixelPos = vec4(reconstructPosition(gl_FragCoord.xy, currentPixelDepth), 1.0);
vec4 worldSpacePos = inverseViewMatrix * currentPixelPos;
float linearDepth = -currentPixelDepth;
return calculateUVZShadow(worldSpacePos.xyz, linearDepth, shadowMapSize);
}
vec3 calculateUVZShadowFromDepth(
in vec2 _uv,
ivec2 shadowMapSize,
in sampler2D _depthMap
) {
vec4 currentPixelPos;
return calculateUVZShadowAndPixelPosFromDepth(_uv, shadowMapSize, _depthMap, currentPixelPos);
}`)}const d=t.create();e.calculateUVZShadowFromDepthDraw=function(e){e.include(l.calculateUVZShadowDraw),n(e)},e.calculateUVZShadowFromDepthPass=function(e){e.include(l.calculateUVZShadowPass),n(e)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));