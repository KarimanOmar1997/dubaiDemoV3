// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/BlendColorsPremultiplied.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/CameraSpace.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","./ShadowCastAccumulate.glsl","../views/3d/webgl-engine/shaders/ShadowCastVisualizeTechniqueConfiguration","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,a,o,s,t,r,l,i,n,d,h,u,c,m,w){"use strict";class g extends m.NoParameters{constructor(e){super(),this._data=e,this.sampleScale=a.create(),this.opacityFromElevation=1,this.gradientColor=o.clone(f),this.thresholdColor=o.clone(S),this.bandedGradientColor=o.clone(C),this.bandSize=.1,this.threshold=.5}get shadowCastMap(){return this._data.shadowCastTexture}}const p=50/255,f=o.fromValues(0,0,1,.7),S=o.fromValues(1,0,0,.7),C=o.fromValues(p,p,p,.7);function b(e){const a=new w.ShaderBuilder,o=a.fragment;a.include(r.CameraSpace),a.include(s.ScreenSpacePass);const{visualization:m}=e;o.constants.add("inverseSampleValue","float",u.ShadowCastMaxSamples),o.uniforms.add(new h.Texture2DPassUniform("shadowCastMap",(e=>e.shadowCastMap)),new l.Float2PassUniform("sampleScale",(e=>e.sampleScale)),new n.FloatPassUniform("opacityFromElevation",(e=>e.opacityFromElevation)));const g=m===c.ShadowCastVisualization.Threshold,p=m===c.ShadowCastVisualization.ThresholdAndGradient,f=m===c.ShadowCastVisualization.BandedGradient;switch(p&&o.include(t.BlendColorsPremultiplied),m){case c.ShadowCastVisualization.Gradient:o.uniforms.add(new i.Float4PassUniform("uColor",(e=>t.premultiplyAlpha(v,e.gradientColor))));break;case c.ShadowCastVisualization.BandedGradient:o.uniforms.add(new i.Float4PassUniform("uColor",(e=>t.premultiplyAlpha(v,e.bandedGradientColor))),new n.FloatPassUniform("bandSize",(e=>e.bandSize)));break;case c.ShadowCastVisualization.ThresholdAndGradient:o.uniforms.add(new i.Float4PassUniform("uColor",(e=>t.premultiplyAlpha(v,e.thresholdColor))),new i.Float4PassUniform("gradientColor",(e=>t.premultiplyAlpha(v,e.gradientColor))),new n.FloatPassUniform("threshold",(e=>e.threshold)));break;case c.ShadowCastVisualization.Threshold:o.uniforms.add(new i.Float4PassUniform("uColor",(e=>t.premultiplyAlpha(v,e.thresholdColor))),new n.FloatPassUniform("threshold",(e=>e.threshold)))}const{type:S,selector:C,thresholdStrengthSelector:b}=p?{type:"vec2",selector:"rg",thresholdStrengthSelector:"strength.x"}:{type:"float",selector:"r",thresholdStrengthSelector:"strength"};return o.main.add(d.glsl`
    ${S} numSamples = texture(shadowCastMap, uv).${C} * inverseSampleValue;

    fragColor = vec4(0.0);

    // early out if we do not have any samples in one or more channels
    if (dot(numSamples, ${S}(1)) < 1.0) {
      return;
    }

    // sampleScale is the number of total samples taken, so this brings strength to a 0-1 range.
    // note that sampleScale is always a vec2 even if we have only the primary channel.
    ${S} strength = numSamples * sampleScale.${C};

    // in threshold mode, step the strength to 0 if we are at or below the threshold, 1 otherwise.
    ${d.If(g||p,d.glsl`
      ${b} = 1.0 - step(${b}, threshold);
    `)}

    // bail out if we are below the threshold
    ${d.If(g,d.glsl`if (${b} == 0.0) { return; }`)}

    ${d.If(f,d.glsl`strength = ceil(strength / bandSize) * bandSize;`)}

    ${S} attenuation = opacityFromElevation * strength;

    // in ThresholdAndGradient mode we blend the threshold color on top of the gradient color
    fragColor = ${d.If(p,d.glsl`blendColorsPremultiplied(uColor * attenuation.r, gradientColor * attenuation.g)`,d.glsl`uColor * attenuation`)};
  `),a}const v=o.create(),P=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastVisualizePassParameters:g,build:b},Symbol.toStringTag,{value:"Module"}));e.ShadowCastVisualize=P,e.ShadowCastVisualizePassParameters=g,e.build=b}));