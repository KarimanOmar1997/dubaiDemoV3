// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec2f64","../../shaderModules/Float2PassUniform","../../shaderModules/Float3PassUniform","../../shaderModules/Float4PassUniform","../../shaderModules/Float4sPassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/FloatsPassUniform","../../shaderModules/glsl","../../../lib/VertexAttribute","../../../materials/VisualVariablePassParameters"],(function(e,a,o,r,t,i,l,s,v,c,n){"use strict";class f extends n.VisualVariablePassParameters{constructor(){super(...arguments),this.size=a.fromValues(1,1)}}e.PathVertexPosition=function(e,a){const{attributes:f,vertex:u}=e;f.add(c.VertexAttribute.POSITION,"vec3"),f.add(c.VertexAttribute.PROFILEVERTEXANDNORMAL,"vec4"),f.add(c.VertexAttribute.PROFILEAUXDATA,"vec3"),f.add(c.VertexAttribute.PROFILERIGHT,"vec2"),f.add(c.VertexAttribute.PROFILEUP,"vec2"),u.code.add(v.glsl`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),u.uniforms.add(new o.Float2PassUniform("size",(e=>e.size)));const{vvSize:p,vvColor:d,vvOpacity:x}=a;p?(f.add(c.VertexAttribute.SIZEFEATUREATTRIBUTE,"float"),u.uniforms.add(new r.Float3PassUniform("vvSizeMinSize",(e=>e.vvSize.minSize)),new r.Float3PassUniform("vvSizeMaxSize",(e=>e.vvSize.maxSize)),new r.Float3PassUniform("vvSizeOffset",(e=>e.vvSize.offset)),new r.Float3PassUniform("vvSizeFactor",(e=>e.vvSize.factor)),new r.Float3PassUniform("vvSizeFallback",(e=>e.vvSize.fallback))),u.code.add(v.glsl`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):u.code.add(v.glsl`vec2 getSize(){
return size;
}`),x?(f.add(c.VertexAttribute.OPACITYFEATUREATTRIBUTE,"float"),u.constants.add("vvOpacityNumber","int",8),u.uniforms.add(new s.FloatsPassUniform("vvOpacityValues",(e=>e.vvOpacity.values),8),new s.FloatsPassUniform("vvOpacityOpacities",(e=>e.vvOpacity.opacityValues),8),new l.FloatPassUniform("vvOpacityFallback",(e=>e.vvOpacity.fallback))),u.code.add(v.glsl`vec4 applyOpacity(vec4 color) {
float value = opacityFeatureAttribute;
if (isnan(value)) {
return vec4(color.rgb, vvOpacityFallback);
}
if (value <= vvOpacityValues[0]) {
return vec4( color.xyz, vvOpacityOpacities[0]);
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return vec4( color.xyz, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
}
}
return vec4( color.xyz, vvOpacityOpacities[vvOpacityNumber - 1]);
}`)):u.code.add(v.glsl`vec4 applyOpacity(vec4 color){
return color;
}`),d?(f.add(c.VertexAttribute.COLORFEATUREATTRIBUTE,"float"),u.constants.add("vvColorNumber","int",n.vvColorNumber),u.uniforms.add(new s.FloatsPassUniform("vvColorValues",(e=>e.vvColor.values),n.vvColorNumber),new i.Float4sPassUniform("vvColorColors",(e=>e.vvColor.colors),n.vvColorNumber),new t.Float4PassUniform("vvColorFallback",(e=>e.vvColor.fallback))),u.code.add(v.glsl`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):u.code.add(v.glsl`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),u.code.add(v.glsl`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),u.code.add(v.glsl`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),u.code.add(v.glsl`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),u.code.add(v.glsl`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)},e.PathVertexPositionPassParameters=f,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));