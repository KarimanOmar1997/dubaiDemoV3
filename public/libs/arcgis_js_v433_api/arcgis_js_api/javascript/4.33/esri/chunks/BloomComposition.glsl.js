// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/bloom/BloomPresets.glsl","../views/3d/webgl-engine/shaders/ToneMapping.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,o,r,s,l,a,t,n,i,d,m,u,c){"use strict";class b extends u.NoParameters{constructor(e=d.defaultExposure,o=d.lodFactorsPresets.sunny.far,r=d.lodFactorsPresets.sunny.near){super(),this.exposure=e,this.lodFactors=o,this.lodFactorsFront=r}}const g=new b;class x extends b{constructor(){super(...arguments),this.bloomLod=-1}}function w(){const e=new c.ShaderBuilder,d=e.fragment;return e.include(o.ScreenSpacePass),d.include(s.Gamma),d.include(r.ReadDepth),d.include(m.ToneMapping),d.uniforms.add(new i.Texture2DPassUniform("colorTexture",(e=>e.color)),new i.Texture2DPassUniform("emissionTexture",(e=>e.emission)),new i.Texture2DPassUniform("bloomTexture0",(e=>e.bloomTexture0)),new i.Texture2DPassUniform("bloomTexture1",(e=>e.bloomTexture1)),new i.Texture2DPassUniform("bloomTexture2",(e=>e.bloomTexture2)),new i.Texture2DPassUniform("bloomTexture3",(e=>e.bloomTexture3)),new i.Texture2DPassUniform("bloomTexture4",(e=>e.bloomTexture4)),new l.FloatPassUniform("exposure",(e=>e.exposure)),new n.IntegerPassUniform("bloomLod",(e=>e.bloomLod)),new a.FloatsPassUniform("lodFactors",(e=>e.lodFactors),5),new a.FloatsPassUniform("lodFactorsFront",(e=>e.lodFactorsFront),5)).main.add(t.glsl`vec4 color = texture(colorTexture, uv);
color = vec4(linearizeGamma(color.rgb), color.a);
vec4 lod0 = texture(bloomTexture0, uv);
lod0 = vec4(linearizeGamma(lod0.rgb), lod0.a);
vec4 lod1 = texture(bloomTexture1, uv);
lod1 = vec4(linearizeGamma(lod1.rgb), lod1.a);
vec4 lod2 = texture(bloomTexture2, uv);
lod2 = vec4(linearizeGamma(lod2.rgb), lod2.a);
vec4 lod3 = texture(bloomTexture3, uv);
lod3 = vec4(linearizeGamma(lod3.rgb), lod3.a);
vec4 lod4 = texture(bloomTexture4, uv);
lod4 = vec4(linearizeGamma(lod4.rgb), lod4.a);
vec4 blur = lodFactors[0] * lod0;
blur += lodFactors[1] * lod1;
blur += lodFactors[2] * lod2;
blur += lodFactors[3] * lod3;
blur += lodFactors[4] * lod4;
blur = bloomLod == 0 ? lodFactors[0] * lod0 : bloomLod == 1 ? lodFactors[1] * lod1 : bloomLod == 2 ? lodFactors[2] * lod2 : bloomLod == 3 ? lodFactors[3] * lod3 : bloomLod == 4 ? lodFactors[4] * lod4 : blur;
vec4 emission = texture(emissionTexture, uv);
emission = vec4(linearizeGamma(emission.rgb), emission.a);
emission += blur;
emission = vec4(tonemapACES(emission.rgb), emission.a);
fragColor = emission + color;
fragColor = delinearizeGamma(fragColor);`),e}const v=Object.freeze(Object.defineProperty({__proto__:null,BloomCompositionPassParameters:x,build:w,defaultCompositionParameters:g},Symbol.toStringTag,{value:"Module"}));e.BloomComposition=v,e.BloomCompositionPassParameters=x,e.build=w,e.defaultCompositionParameters=g}));