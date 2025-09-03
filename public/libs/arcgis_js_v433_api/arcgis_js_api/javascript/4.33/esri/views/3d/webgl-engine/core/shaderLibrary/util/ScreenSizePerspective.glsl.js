// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../chunks/vec32","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../../shaderModules/Float3PassUniform","../../shaderModules/glsl"],(function(e,a,r,c,s){"use strict";function t(e){return a.set(i,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}const i=r.create();e.ScreenSizePerspective=function(e){e.vertex.code.add(s.glsl`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(s.glsl`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(s.glsl`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(s.glsl`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(s.glsl`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(s.glsl`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)},e.addScreenSizePerspective=function(e){e.uniforms.add(new c.Float3PassUniform("screenSizePerspective",(e=>t(e.screenSizePerspective))))},e.addScreenSizePerspectiveAlignment=function(e){e.uniforms.add(new c.Float3PassUniform("screenSizePerspectiveAlignment",(e=>t(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));