// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/calculateUVZShadowFromDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DShadowBindUniform","../views/3d/webgl-engine/shaders/ReadShadowMapConfiguration","../views/3d/webgl-engine/shaders/ShadowCastAccumulateTechniqueConfiguration","../views/webgl/ShaderBuilder"],(function(e,a,d,o,s,n,t,r,i,l){"use strict";const u=1/255;function w(e){const r=new l.ShaderBuilder,{fragment:w}=r;r.include(a.ScreenSpacePass),r.include(d.calculateUVZShadowFromDepthPass),r.include(o.ReadShadowMapPass,h),w.uniforms.add(new t.Texture2DShadowBindUniform("shadowMap",(e=>e.shadowMap.depthTexture)),new n.Texture2DBindUniform("depthMap",(e=>e.depth?.attachment))),w.constants.add("sampleValue","float",u);const c=e.index===i.ShadowCastAccumulateIndex.CONTEXT?"vec2":"float";return r.outputs.add("sampleCount",c),w.main.add(s.glsl`
    sampleCount = ${c}(0.0);

    vec3 uvzShadow = calculateUVZShadowFromDepth(uv, textureSize(shadowMap,0), depthMap);
    if (uvzShadow.z < 0.0) {
      return;
    }

    // The shadow map sampler returns a value between 0 and 1, we take the midpoint as we count discrete samples
    bool shadow = readShadowMapUVZ(uvzShadow, shadowMap) > 0.5;

    if (shadow) {
      sampleCount = ${c}(sampleValue); // Add 1 to the sample count
    }
  `),r}const h=new r.ReadShadowMapConfiguration,c=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastMaxSamples:255,build:w},Symbol.toStringTag,{value:"Module"}));e.ShadowCastAccumulate=c,e.ShadowCastMaxSamples=255,e.build=w}));