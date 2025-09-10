// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,s,o,n,a){"use strict";class t extends n.NoParameters{}function i(e){const n=new a.ShaderBuilder;n.include(r.ScreenSpacePass);const t=e.hasEmission,i=n.fragment;return i.uniforms.add(new o.Texture2DPassUniform("colorTexture",(e=>e.colorTexture)),new o.Texture2DPassUniform("alphaTexture",(e=>e.alphaTexture)),new o.Texture2DPassUniform("frontFaceTexture",(e=>e.frontFaceTexture))),n.outputs.add("fragColor","vec4",0),t&&(n.outputs.add("fragEmission","vec4",1),i.uniforms.add(new o.Texture2DPassUniform("emissionTexture",(e=>e.emissionTexture))),i.uniforms.add(new o.Texture2DPassUniform("emissionFrontFaceTexture",(e=>e.emissionFrontFaceTexture)))),i.main.add(s.glsl`
      float srcAlpha = texture(alphaTexture, uv).r;
      if(srcAlpha == 0.0){
        fragColor = vec4(0.0);
        ${s.If(t,"fragEmission = vec4(0.0);")}
        return;
      }

      vec4 srcColor = texture(colorTexture, uv);
      vec4 frontFace = texture(frontFaceTexture, uv);

      vec4 transparentColor = vec4(mix(srcColor.rgb / srcAlpha, frontFace.rgb, frontFace.a), 1.0 - srcColor.a);
      fragColor = transparentColor;

      ${s.If(t,"vec4 emission = texture(emissionTexture, uv);\n         vec4 emissionFrontFace = texture(emissionFrontFaceTexture, uv);\n        fragEmission = vec4(mix(emission.rgb / srcAlpha, emissionFrontFace.rgb, emissionFrontFace.a), emissionFrontFace.a);")}
    `),n}const u=Object.freeze(Object.defineProperty({__proto__:null,OITBlendPassParameters:t,build:i},Symbol.toStringTag,{value:"Module"}));e.OITBlend=u,e.OITBlendPassParameters=t,e.build=i}));