// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,s,t,o,n,i){"use strict";class a extends n.NoParameters{}function l(){const e=new i.ShaderBuilder;return e.include(r.ScreenSpacePass),e.fragment.uniforms.add(new o.Texture2DPassUniform("colorTexture",(e=>e.color)),new t.Texture2DBindUniform("depthTexture",(e=>e.mainDepth))),e.fragment.main.add(s.glsl`float depthSample = texture(depthTexture, uv).r;
if (depthSample != 1.0 ) {
fragColor = vec4(0);
return;
}
fragColor = texture(colorTexture, uv);`),e}const d=Object.freeze(Object.defineProperty({__proto__:null,AtmosphereCompositingPassParameters:a,build:l},Symbol.toStringTag,{value:"Module"}));e.AtmosphereCompositing=d,e.AtmosphereCompositingPassParameters=a,e.build=l}));