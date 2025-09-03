// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../../shaderModules/Float4BindUniform","../../shaderModules/glsl","../../shaderModules/IntegerBindUniform","../../shaderModules/Matrix4sDrawUniform","../../shaderModules/Matrix4sPassUniform","../../../../../webgl/NoParameters"],(function(a,e,s,i,o,t,r,n){"use strict";class d extends n.NoParameters{constructor(){super(...arguments),this.origin=e.create()}}function c(a){const{fragment:e}=a;e.uniforms.add(new s.Float4BindUniform("cascadeDistances",(a=>a.shadowMap.cascadeDistances)),new o.IntegerBindUniform("numCascades",(a=>a.shadowMap.numCascades))),e.code.add(i.glsl`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}a.ReadShadowMapOrigin=d,a.calculateUVZShadowDraw=function(a){a.fragment.uniforms.add(new t.Matrix4sDrawUniform("shadowMapMatrix",((a,e)=>e.shadowMap.getShadowMapMatrices(a.origin)),4)),c(a)},a.calculateUVZShadowPass=function(a){a.fragment.uniforms.add(new r.Matrix4sPassUniform("shadowMapMatrix",((a,e)=>e.shadowMap.getShadowMapMatrices(a.origin)),4)),c(a)},Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})}));