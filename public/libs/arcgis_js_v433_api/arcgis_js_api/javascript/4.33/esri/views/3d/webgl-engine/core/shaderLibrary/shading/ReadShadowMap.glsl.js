// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","./calculateUVZShadow.glsl","./ShadowmapFiltering.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DShadowBindUniform","../../../../../webgl/NoParameters"],(function(a,e,o,d,r,t,s){"use strict";class l extends o.ReadShadowMapOrigin{}class i extends s.NoParameters{constructor(){super(...arguments),this.origin=e.create()}}function n(a){a.include(d.ShadowmapFiltering);const{fragment:e}=a;e.uniforms.add(new t.Texture2DShadowBindUniform("shadowMap",(a=>a.shadowMap.depthTexture))),e.code.add(r.glsl`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}a.ReadShadowMapDraw=function(a,e){e.receiveShadows&&(a.include(o.calculateUVZShadowDraw),n(a))},a.ReadShadowMapDrawParameters=l,a.ReadShadowMapPass=function(a,e){e.receiveShadows&&(a.include(o.calculateUVZShadowPass),n(a))},a.ReadShadowMapPassParameters=i,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})}));