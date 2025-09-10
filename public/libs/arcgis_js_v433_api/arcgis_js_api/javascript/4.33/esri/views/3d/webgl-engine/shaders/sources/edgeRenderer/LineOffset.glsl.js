// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl","../../../core/shaderModules/FloatDrawUniform","../../../core/shaderModules/glsl","../../../core/shaderModules/Texture2DDrawUniform","./EdgeUtil.glsl","./UnpackAttributes.glsl","../../../../../webgl/NoParameters"],(function(e,t,r,a,s,l,o,u,c){"use strict";class n extends c.NoParameters{}e.LineOffset=function(e,c){e.include(u.UnpackAttributes,c);const{vertex:n,fragment:i}=e;switch(o.usesSketchLogic(c.type)&&(e.varyings.add("vStrokeUV","vec2"),n.uniforms.add(new l.Texture2DDrawUniform("strokesTexture",(e=>e.strokesTexture.texture)),new a.FloatDrawUniform("strokesLog2Resolution",(e=>Math.log2(e.strokesTexture.resolution))),new a.FloatDrawUniform("strokeVariants",(e=>e.strokesTexture.variants))).code.add(s.glsl`void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
vec2 sidenessNorm = unpackedAttributes.sidenessNorm;
float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);
vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) / vec2(textureSize(strokesTexture, 0));
vStrokeUV.x += variantOffset;
}`),e.fragment.include(r.RgbaFloatEncoding),i.uniforms.add(new l.Texture2DDrawUniform("strokesTexture",(e=>e.strokesTexture.texture)),new a.FloatDrawUniform("strokesNormalizationScale",(e=>e.strokesTexture.normalizationScale))).code.add(s.glsl`float calculateLineOffsetSketch() {
float offsetNorm = rgbaTofloat(texture(strokesTexture, vStrokeUV));
return (offsetNorm - 0.5) * strokesNormalizationScale;
}
float calculateLinePressureSketch() {
return rgbaTofloat(texture(strokesTexture, vStrokeUV + vec2(0.0, 0.5)));
}`)),c.type){case o.EdgeType.Solid:n.code.add(s.glsl`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),i.code.add(s.glsl`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case o.EdgeType.Sketch:n.code.add(s.glsl`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),i.code.add(s.glsl`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case o.EdgeType.Mixed:e.varyings.add("vType","float"),n.code.add(s.glsl`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),i.code.add(s.glsl`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`);break;case o.EdgeType.COUNT:break;default:t.neverReached(c.type)}},e.LineOffsetDrawParameters=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));