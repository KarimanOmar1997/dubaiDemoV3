// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../HighlightReadBitmap.glsl","../ShaderOutput","../../shaderModules/glsl","../../shaderModules/Integer2BindUniform","../../shaderModules/IntegerBindUniform","../../shaderModules/Texture2DBindUniform","../../shaderModules/Texture2DUintBindUniform"],(function(i,e,t,l,g,h,d,u){"use strict";i.OutputHighlight=function(i,o){const{fragment:n}=i,{output:r,draped:c,hasHighlightMixTexture:s}=o;r===t.ShaderOutput.Highlight?(n.uniforms.add(new h.IntegerBindUniform("highlightLevel",(i=>i.highlightLevel??0)),new g.Integer2BindUniform("highlightMixOrigin",(i=>i.highlightMixOrigin))),i.outputs.add("fragHighlight","uvec2",0),i.include(e.HighlightReadBitmap),s?n.uniforms.add(new u.Texture2DUintBindUniform("highlightMixTexture",(i=>i.highlightMixTexture))).code.add(l.glsl`uvec2 getAccumulatedHighlight() {
return texelFetch(highlightMixTexture, ivec2(gl_FragCoord.xy) - highlightMixOrigin, 0).rg;
}
void outputHighlight(bool occluded) {
if (highlightLevel == 0) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
} else {
int ll = (highlightLevel & 3) << 1;
int li = (highlightLevel >> 2) & 3;
uint bits;
if (occluded) {
bits = 3u << ll;
} else {
bits = 1u << ll;
}
uvec2 combinedHighlight = getAccumulatedHighlight();
combinedHighlight[li] |= bits;
fragHighlight = combinedHighlight;
}
}`):n.code.add(l.glsl`void outputHighlight(bool occluded) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
}`),c?n.code.add(l.glsl`bool isHighlightOccluded() {
return false;
}`):n.uniforms.add(new d.Texture2DBindUniform("depthTexture",(i=>i.mainDepth))).code.add(l.glsl`bool isHighlightOccluded() {
float sceneDepth = texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x;
return gl_FragCoord.z > sceneDepth + 5e-7;
}`),n.code.add(l.glsl`void calculateOcclusionAndOutputHighlight() {
outputHighlight(isHighlightOccluded());
}`)):n.code.add(l.glsl`void calculateOcclusionAndOutputHighlight() {}`)},Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})}));