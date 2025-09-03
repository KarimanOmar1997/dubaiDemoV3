// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl","../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DDrawUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/ShaderBuilder"],(function(e,r,t,l,a,o,n,s,d){"use strict";function i(){const e=new d.ShaderBuilder,i=e.fragment;return e.include(r.ScreenSpacePass),i.include(t.ReadDepth),i.uniforms.add(new s.Texture2DPassUniform("depthMap",(e=>e.depthTexture)),new n.Texture2DDrawUniform("tex",(e=>e.colorTexture)),new l.Float2DrawUniform("blurSize",(e=>e.blurSize)),new a.FloatPassUniform("projScale",((e,r)=>{const t=r.camera.distance;return t>5e4?Math.max(0,e.projScale-(t-5e4)):e.projScale}))),i.code.add(o.glsl`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${o.glsl.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),i.main.add(o.glsl`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${o.glsl.int(4)}; r <= ${o.glsl.int(4)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}const u=Object.freeze(Object.defineProperty({__proto__:null,build:i},Symbol.toStringTag,{value:"Module"}));e.SSAOBlur=u,e.build=i}));