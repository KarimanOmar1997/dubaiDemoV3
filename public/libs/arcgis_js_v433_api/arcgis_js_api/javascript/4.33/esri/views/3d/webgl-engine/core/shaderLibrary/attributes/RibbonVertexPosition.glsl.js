// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../shading/VisualVariables.glsl","../../shaderModules/Float3PassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/FloatsPassUniform","../../shaderModules/glsl","../../../lib/VertexAttribute"],(function(e,t,i,a,r,l,v){"use strict";e.RibbonVertexPosition=function(e,o){const{vertex:s,attributes:c}=e;s.uniforms.add(new a.FloatPassUniform("intrinsicWidth",(e=>e.width))),o.vvSize?(c.add(v.VertexAttribute.SIZEFEATUREATTRIBUTE,"float"),s.uniforms.add(new i.Float3PassUniform("vvSizeMinSize",(e=>e.vvSize.minSize)),new i.Float3PassUniform("vvSizeMaxSize",(e=>e.vvSize.maxSize)),new i.Float3PassUniform("vvSizeOffset",(e=>e.vvSize.offset)),new i.Float3PassUniform("vvSizeFactor",(e=>e.vvSize.factor)),new i.Float3PassUniform("vvSizeFallback",(e=>e.vvSize.fallback))),s.code.add(l.glsl`float getSize() {
if (isnan(sizeFeatureAttribute)) {
return vvSizeFallback.x;
}
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(c.add(v.VertexAttribute.SIZE,"float"),s.code.add(l.glsl`float getSize(){
return intrinsicWidth * size;
}`)),o.vvOpacity?(c.add(v.VertexAttribute.OPACITYFEATUREATTRIBUTE,"float"),s.constants.add("vvOpacityNumber","int",8),s.uniforms.add(new r.FloatsPassUniform("vvOpacityValues",(e=>e.vvOpacity.values),8),new r.FloatsPassUniform("vvOpacityOpacities",(e=>e.vvOpacity.opacityValues),8),new a.FloatPassUniform("vvOpacityFallback",(e=>e.vvOpacity.fallback))),s.code.add(l.glsl`float interpolateOpacity(float value){
if (isnan(value)) {
return vvOpacityFallback;
}
if (value <= vvOpacityValues[0]) {
return vvOpacityOpacities[0];
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
}
}
return vvOpacityOpacities[vvOpacityNumber - 1];
}
vec4 applyOpacity( vec4 color ){
return vec4(color.xyz, interpolateOpacity(opacityFeatureAttribute));
}`)):s.code.add(l.glsl`vec4 applyOpacity( vec4 color ){
return color;
}`),o.vvColor?(e.include(t.VisualVariables,o),c.add(v.VertexAttribute.COLORFEATUREATTRIBUTE,"float"),s.code.add(l.glsl`vec4 getColor(){
return applyOpacity(interpolateVVColor(colorFeatureAttribute));
}`)):(c.add(v.VertexAttribute.COLOR,"vec4"),s.code.add(l.glsl`vec4 getColor(){
return applyOpacity(color);
}`))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));