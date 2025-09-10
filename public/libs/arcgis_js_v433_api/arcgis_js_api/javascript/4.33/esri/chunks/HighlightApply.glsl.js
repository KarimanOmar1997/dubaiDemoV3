// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/HighlightCellGridScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/HighlightReadBitmap.glsl","../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DUintPassUniform","./HighlightDownsample.glsl","../views/webgl/ShaderBuilder"],(function(e,i,t,l,r,n,o,u,g,h,s){"use strict";function c(){const e=new s.ShaderBuilder;e.include(i.HighlightCellGridScreenSpacePass);const{fragment:c}=e;return c.uniforms.add(new u.Texture2DPassUniform("blurInput",(e=>e.highlightBlurTexture)),new l.Float2DrawUniform("blurSize",(e=>e.blurSize)),new g.Texture2DUintPassUniform("highlightTexture",(e=>e.highlightTexture)),new u.Texture2DPassUniform("highlightOptionsTexture",(e=>e.highlightOptionsTexture)),new o.IntegerPassUniform("highlightLevel",(e=>e.highlightLevel)),new r.FloatPassUniform("occludedIntensityFactor",(e=>e.occludedFactor))),c.constants.add("inner","float",1-(h.outlineSize-h.blurSize)/h.outlineSize),e.include(t.HighlightReadBitmap),c.main.add(n.glsl`vec2 highlightTextureSize = vec2(textureSize(highlightTexture,0));
vec2 uv = sUV;
vec2 center = texture(blurInput, uv).rg;
vec2 blurredHighlightValue = (vOutlinePossible == 0.0)
? center
: center * 0.204164
+ texture(blurInput, uv + blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv - blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv + blurSize * 3.294215).rg * 0.093913
+ texture(blurInput, uv - blurSize * 3.294215).rg * 0.093913;
float highlightIntensity = blurredHighlightValue.r;
float occlusionWeight = blurredHighlightValue.g;
if (highlightIntensity <= 0.01) {
discard;
}
vec4 fillColor    = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 0), 0);
vec4 outlineColor = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 1), 0);
uvec2 centerTexel = texelFetch(highlightTexture, ivec2(uv * highlightTextureSize), 0).rg;
uint centerBits = readLevelBits(centerTexel, highlightLevel);
bool centerFilled = (centerBits & 1u) == 1u;
bool centerOccluded = (centerBits & 3u) == 3u;
bool occluded = centerOccluded || (0.5 * highlightIntensity < occlusionWeight);
float occlusionFactor = occluded ? occludedIntensityFactor : 1.0;
float outlineFactor = centerFilled ? 1.0 : smoothstep(0.0, inner, highlightIntensity);
float fillFactor = centerFilled ? 1.0 : 0.0;
vec4 baseColor = mix(outlineColor, fillColor, fillFactor);
float intensity = baseColor.a * occlusionFactor * outlineFactor;
fragColor = vec4(baseColor.rgb, intensity);`),e}const a=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:"Module"}));e.HighlightApply=a,e.build=c}));