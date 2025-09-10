// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/focusArea/FocusAreaEffect","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,o,s,a,c,t,l){"use strict";class u extends t.NoParameters{constructor(){super(...arguments),this.effect=c.FocusAreaEffect.BRIGHT}}function n(){const e=new l.ShaderBuilder;return e.include(r.ScreenSpacePass),e.outputs.add("fragColor","vec4",0),e.fragment.uniforms.add(new a.Texture2DPassUniform("colorTexture",(e=>e.color)),new a.Texture2DPassUniform("focusArea",(e=>e.focusArea)),new s.IntegerPassUniform("focusAreaEffectMode",(e=>e.effect))).main.add(o.glsl`
      float mask = texture( focusArea, uv, 0.0 ).r;
      vec4 color = texture( colorTexture, uv, 0.0 );
      vec4 colorDeSaturate = vec4(color.r * 0.25 + color.g * 0.5 + color.b * 0.25);
      if (focusAreaEffectMode == ${o.glsl.int(c.FocusAreaEffect.BRIGHT)}) {
        fragColor = mask > 0.0 ? color : 0.55 * colorDeSaturate + 0.45;
      } else {
        fragColor = mask > 0.0 ? color : 0.33 * mix(color, colorDeSaturate, 0.);
      }
  `),e}const f=Object.freeze(Object.defineProperty({__proto__:null,FocusAreaColorPassParameters:u,build:n},Symbol.toStringTag,{value:"Module"}));e.FocusAreaColor=f,e.FocusAreaColorPassParameters=u,e.build=n}));