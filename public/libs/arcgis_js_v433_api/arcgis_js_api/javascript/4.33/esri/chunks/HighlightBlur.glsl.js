// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec2f64","../views/3d/webgl-engine/core/shaderLibrary/HighlightCellGridScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DDrawUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,t,i,l,u,s,n){"use strict";class g extends s.NoParameters{constructor(){super(...arguments),this.blurSize=r.create()}}function a(){const e=new n.ShaderBuilder;return e.include(t.HighlightCellGridScreenSpacePass),e.outputs.add("fragHighlight","vec2",0),e.fragment.uniforms.add(new i.Float2DrawUniform("blurSize",(e=>e.blurSize)),new u.Texture2DDrawUniform("blurInput",(e=>e.blurInput))).main.add(l.glsl`vec2 highlightTextureSize = vec2(textureSize(blurInput,0));
vec2 center = texture(blurInput, sUV).rg;
if (vOutlinePossible == 0.0) {
fragHighlight = center;
} else {
vec2 sum = center * 0.204164;
sum += texture(blurInput, sUV + blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV - blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV + blurSize * 3.294215).rg * 0.093913;
sum += texture(blurInput, sUV - blurSize * 3.294215).rg * 0.093913;
fragHighlight = sum;
}`),e}const o=Object.freeze(Object.defineProperty({__proto__:null,HighlightBlurDrawParameters:g,build:a},Symbol.toStringTag,{value:"Module"}));e.HighlightBlur=o,e.HighlightBlurDrawParameters=g,e.build=a}));