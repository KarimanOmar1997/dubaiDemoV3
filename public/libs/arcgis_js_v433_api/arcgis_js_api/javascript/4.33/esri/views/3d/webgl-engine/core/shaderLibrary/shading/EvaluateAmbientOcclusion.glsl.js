// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/glsl","../../shaderModules/Texture2DBindUniform","../../../effects/ssao/SSAO"],(function(e,s,t,n){"use strict";e.EvaluateAmbientOcclusion=function(e,r){r.receiveAmbientOcclusion?(e.uniforms.add(new t.Texture2DBindUniform("ssaoTex",(e=>e.ssao?.getTexture()))),e.constants.add("blurSizePixelsInverse","float",1/n.blurSizePixels),e.code.add(s.glsl`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):e.code.add(s.glsl`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));