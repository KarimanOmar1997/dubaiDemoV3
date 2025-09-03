// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/shaders/ScreenSpacePassAtmosphere.glsl","../views/3d/webgl-engine/shaders/SphereIntersect.glsl","../views/3d/webgl-engine/shaders/ToneMapping.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,a,o,t,n,s,i,l,d,g,c,m,h){"use strict";class p extends m.NoParameters{constructor(){super(...arguments),this.color=r.create(),this.strength=4e-6,this.atmosphereC=1,this.amount=0}}function u(){const e=new h.ShaderBuilder;e.include(d.ScreenSpacePassAtmosphere,{needUVs:!0,needEyeDirection:!0});const r=e.fragment;return r.uniforms.add(new s.FloatPassUniform("atmosphereC",(e=>e.atmosphereC)),new t.Float3BindUniform("cameraPosition",(e=>e.camera.eye)),new l.Texture2DBindUniform("depthTexture",(e=>e.mainDepth)),new s.FloatPassUniform("fogStrength",(e=>e.strength)),new s.FloatPassUniform("fogAmount",(e=>e.amount)),new n.Float3PassUniform("fogColor",(e=>e.color))),r.include(o.Gamma),r.include(g.SphereIntersect),r.include(c.ToneMapping),r.include(a.ReadDepth),r.code.add(i.glsl`float getFogAmount(float dist, vec3 rayDir) {
if(dist == -1.0){
dist = 0.055 * sphereIntersect(cameraPosition, rayDir, atmosphereC).y;
}
return fogAmount * (1.0 - exp(-dist * fogStrength));
}`),r.main.add(i.glsl`vec3 rayDir = normalize(worldRay);
float terrainDepth = -1.0;
float depthSample = depthFromTexture(depthTexture, uv);
if(depthSample < 1.0 && depthSample > 0.0){
vec3 cameraSpaceRay = normalize(eyeDir);
cameraSpaceRay /= cameraSpaceRay.z;
cameraSpaceRay *= linearizeDepth(depthSample);;
terrainDepth = max(0.0, length(cameraSpaceRay));
}
float fogAmount = getFogAmount(terrainDepth, rayDir);
vec4 fog = vec4(fogColor, 1.0) * fogAmount;
fragColor = delinearizeGamma(vec4(tonemapACES(fog.rgb), fog.a));`),e}const f=Object.freeze(Object.defineProperty({__proto__:null,FogPassParameters:p,build:u},Symbol.toStringTag,{value:"Module"}));e.Fog=f,e.FogPassParameters=p,e.build=u}));