// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec2f64","../../../core/shaderLibrary/util/IsNaN.glsl","../../../core/shaderModules/Float2BindUniform","../../../core/shaderModules/glsl","../../../core/shaderModules/Matrix3PassUniform","../../../core/shaderModules/Matrix4BindUniform","../../../core/shaderModules/Matrix4PassUniform"],(function(o,r,e,a,s,t,l,i){"use strict";const c=r.fromValues(.5,-4e-4);o.AdjustProjectedPosition=function(o,r){const d=o.vertex;d.include(e.IsNaN),d.constants.add("depthBias","vec2",c),d.uniforms.add(new a.Float2BindUniform("inverseViewport",(o=>o.inverseViewport))),r.legacy?(d.uniforms.add(new l.Matrix4BindUniform("proj",(o=>o.camera.projectionMatrix))),d.code.add(s.glsl`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = proj * localView * vec4(globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)):(d.uniforms.add(new t.Matrix3PassUniform("transformNormalViewFromGlobal",(o=>o.transformNormalViewFromGlobal)),new i.Matrix4PassUniform("transformProjFromView",(o=>o.transformProjFromView))),d.code.add(s.glsl`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = transformProjFromView * vec4(transformNormalViewFromGlobal * globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)),d.code.add(s.glsl`float _calculateProjectedBiasZ(vec4 projPos) {
float offsetZ = depthBias.y;
return sqrt(max(projPos.z,0.0)) * offsetZ;
}
vec4 adjustProjectedPosition(vec4 projPos, vec3 worldNormal, float lineWidth) {
vec2 offsetXY = calculateProjectedBiasXY(projPos, worldNormal);
if (!isNaN(offsetXY.x) && !isNaN(offsetXY.y)) {
projPos.xy += offsetXY;
}
projPos.z += _calculateProjectedBiasZ(projPos);
return projPos;
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));