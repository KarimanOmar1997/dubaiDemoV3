// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/libs/gl-matrix-2/factories/vec2f64","../../../core/libs/gl-matrix-2/factories/vec4f64","../../../geometry/support/Ellipsoid","../webgl-engine/core/shaderModules/Float2PassUniform","../webgl-engine/core/shaderModules/Float4PassUniform","../webgl-engine/core/shaderModules/glsl","../../webgl/NoParameters"],(function(e,t,r,a,s,i,o,n){"use strict";class c extends n.NoParameters{constructor(){super(...arguments),this.radii=t.create(),this.heightParameters=r.create()}}e.ChapmanApproximation=function(e){e.uniforms.add(new s.Float2PassUniform("radii",(e=>e.radii)),new i.Float4PassUniform("heightParameters",(e=>e.heightParameters))),e.constants.add("scaleHeight","float",a.earth.scaleHeight*a.earth.atmosphereHeight),e.code.add(o.glsl`float chapmanApproximation(float thickness, float height, float cosZenith) {
float c = sqrt(thickness + height);
float cExpH = c * exp(-height);
if (cosZenith >= 0.0) {
return cExpH / (c * cosZenith + 1.0);
} else {
float x0 = sqrt(1.0 - cosZenith * cosZenith) * (thickness + height);
float c0 = sqrt(x0);
return 2.0 * c0 * exp(thickness - x0) - cExpH / (1.0 - c * cosZenith);
}
}`),e.code.add(o.glsl`float getOpticalDepth(vec3 position, vec3 dir, float h) {
return scaleHeight * chapmanApproximation(radii[0] / scaleHeight, h, dot(normalize(position), dir));
}`),e.code.add(o.glsl`vec4 planetIntersect(vec3 cameraPos, vec3 rayDir) {
float reducedPlanetRadius = radii[0] - 20000.0;
float rayPlanetDistance = heightParameters[1] - reducedPlanetRadius * reducedPlanetRadius;
vec2 rayPlanetIntersect = sphereIntersect(cameraPos, rayDir, rayPlanetDistance);
vec2 rayAtmosphereIntersect = sphereIntersect(cameraPos, rayDir, heightParameters[2]);
bool hitsAtmosphere = (rayAtmosphereIntersect.x <= rayAtmosphereIntersect.y) && rayAtmosphereIntersect.x > 0.0;
bool insideAtmosphere = heightParameters[0] < radii[1];
if (!(hitsAtmosphere || insideAtmosphere)) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
float start = insideAtmosphere ? 0.0 : rayAtmosphereIntersect.x;
if (heightParameters[0] < reducedPlanetRadius) {
if (dot(rayDir, normalize(cameraPos)) < -0.025) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
start = rayPlanetIntersect.y;
}
float end = hitsPlanet ? rayPlanetIntersect.x : rayAtmosphereIntersect.y;
return vec4(0.0, hitsPlanet ? 1.0 : 0.0, start, end);
}`)},e.ChapmanApproximationParameters=c,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));