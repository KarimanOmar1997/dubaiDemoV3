// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../chunks/vec32","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../../../../../../chunks/vec42","../../../../../../core/libs/gl-matrix-2/factories/vec4f64","./PhysicallyBasedRenderingParameters.glsl","../../shaderModules/Float3BindUniform","../../shaderModules/Float4BindUniform","../../shaderModules/glsl"],(function(i,n,t,e,l,g,h,s,a){"use strict";const o=t.create(),r=l.create();i.EvaluateAmbientLighting=function(i,t){const l=i.fragment,m=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===m?(l.uniforms.add(new h.Float3BindUniform("lightingAmbientSH0",(({lighting:i})=>n.set(o,i.sh.r[0],i.sh.g[0],i.sh.b[0])))),l.code.add(a.glsl`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===m?(l.uniforms.add(new s.Float4BindUniform("lightingAmbientSH_R",(({lighting:i})=>e.set(r,i.sh.r[0],i.sh.r[1],i.sh.r[2],i.sh.r[3]))),new s.Float4BindUniform("lightingAmbientSH_G",(({lighting:i})=>e.set(r,i.sh.g[0],i.sh.g[1],i.sh.g[2],i.sh.g[3]))),new s.Float4BindUniform("lightingAmbientSH_B",(({lighting:i})=>e.set(r,i.sh.b[0],i.sh.b[1],i.sh.b[2],i.sh.b[3])))),l.code.add(a.glsl`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===m&&(l.uniforms.add(new h.Float3BindUniform("lightingAmbientSH0",(({lighting:i})=>n.set(o,i.sh.r[0],i.sh.g[0],i.sh.b[0]))),new s.Float4BindUniform("lightingAmbientSH_R1",(({lighting:i})=>e.set(r,i.sh.r[1],i.sh.r[2],i.sh.r[3],i.sh.r[4]))),new s.Float4BindUniform("lightingAmbientSH_G1",(({lighting:i})=>e.set(r,i.sh.g[1],i.sh.g[2],i.sh.g[3],i.sh.g[4]))),new s.Float4BindUniform("lightingAmbientSH_B1",(({lighting:i})=>e.set(r,i.sh.b[1],i.sh.b[2],i.sh.b[3],i.sh.b[4]))),new s.Float4BindUniform("lightingAmbientSH_R2",(({lighting:i})=>e.set(r,i.sh.r[5],i.sh.r[6],i.sh.r[7],i.sh.r[8]))),new s.Float4BindUniform("lightingAmbientSH_G2",(({lighting:i})=>e.set(r,i.sh.g[5],i.sh.g[6],i.sh.g[7],i.sh.g[8]))),new s.Float4BindUniform("lightingAmbientSH_B2",(({lighting:i})=>e.set(r,i.sh.b[5],i.sh.b[6],i.sh.b[7],i.sh.b[8])))),l.code.add(a.glsl`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==g.PBRMode.Normal&&t.pbrMode!==g.PBRMode.Schematic||l.code.add(a.glsl`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))},Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})}));