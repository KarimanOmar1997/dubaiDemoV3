// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/mathUtils","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/bloom/BloomPresets.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,l,o,i,s,t,a,n,u){"use strict";var c;e.BlurDirection=void 0,(c=e.BlurDirection||(e.BlurDirection={}))[c.Horizontal=0]="Horizontal",c[c.Vertical=1]="Vertical",c[c.COUNT=2]="COUNT";class d extends n.NoParameters{constructor(){super(...arguments),this.blurRadius=a.blurRadiusPresets.sunny}}function g(a){const n=new u.ShaderBuilder,c=n.fragment;n.include(l.ScreenSpacePass),c.include(o.Gamma),c.uniforms.add(new t.Texture2DPassUniform("colorTexture",(e=>e.color)),new i.FloatPassUniform("blurRadius",(e=>e.blurRadius)));let d="";for(let e=0;e<15;e++)d+=`locations1D[${e}] = ${(e/14*2-1).toFixed(3).toString()};`;let g="";for(let e=0;e<15;e++)g+=`locations1DWeights[${e}] = ${r.gauss(e-Math.floor(7.5),2).toFixed(7).toString()};`;const m=a.bloomStage===e.BlurDirection.Horizontal;return c.code.add(s.glsl`
    float locations1D[${s.glsl.int(15)}];
    float locations1DWeights[${s.glsl.int(15)}];

    vec4 blurUniformSamples(sampler2D toBlur) {
      vec4 res = vec4(0.0);
      vec2 size = vec2(textureSize(toBlur, 0));
      vec2 aspectCorrection = vec2(1.0, size.x / size.y);
      vec2 uvInPixel = uv * size;

      ${d}
      ${g}
      vec2 pixelCenterShift = 0.5 / size;

      for(int i=0;i < ${s.glsl.int(15)}; i++) {
        float uv1D = locations1D[i] + ${m?"pixelCenterShift.x":"pixelCenterShift.y"};
        vec2 uvOffset = ${m?"vec2(uv1D, 0.0)":"vec2(0.0, uv1D)"};

        vec2 uvDistorted = uv + uvOffset * blurRadius * aspectCorrection;
        vec4 sampleColor = texture(toBlur, uvDistorted);
        res += vec4(linearizeGamma(sampleColor.rgb), sampleColor.a)  * locations1DWeights[i];
      }
      res.a = clamp(res.a, 0.0, 1.0);
      return delinearizeGamma(res);
    }
  `).main.add(s.glsl`fragColor = blurUniformSamples(colorTexture);`),n}const m=Object.freeze(Object.defineProperty({__proto__:null,BloomBlurPassParameters:d,get BlurDirection(){return e.BlurDirection},build:g},Symbol.toStringTag,{value:"Module"}));e.BloomBlur=m,e.BloomBlurPassParameters=d,e.build=g}));