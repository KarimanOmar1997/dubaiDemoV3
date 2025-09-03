// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/shaderModules/glsl"],(function(o,e){"use strict";o.SnowCover=function(o,n){n.snowCover&&(o.code.add(e.glsl`float getSnow(vec3 normal, vec3 normalGround) {
return smoothstep(0.5, 0.55, dot(normal, normalGround));
}`),o.code.add(e.glsl`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}
vec4 snowCoverForEmissions(vec4 emission, float snow) {
return mix(emission, vec4(0.0), snow);
}`))},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));