// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/HighlightCellGridScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/HighlightReadBitmap.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DUintPassUniform","../views/webgl/ShaderBuilder"],(function(e,i,l,g,t,r,h){"use strict";function n(){const e=new h.ShaderBuilder;e.include(i.HighlightCellGridScreenSpacePass),e.include(l.HighlightReadBitmap);const{fragment:n}=e;return e.outputs.add("fragSingleHighlight","vec2",0),n.uniforms.add(new r.Texture2DUintPassUniform("highlightTexture",(e=>e.highlightTexture)),new t.IntegerPassUniform("highlightLevel",(e=>e.highlightLevel))),n.main.add(g.glsl`ivec2 iuv = ivec2(gl_FragCoord.xy);
uvec2 inputTexel = texelFetch(highlightTexture, iuv, 0).rg;
uint bits = readLevelBits(inputTexel, highlightLevel);
bool hasHighlight = (bits & 1u) == 1u;
bool hasOccluded  = (bits & 2u) == 2u;
fragSingleHighlight = vec2(hasHighlight ? 1.0 : 0.0, hasOccluded ? 1.0 : 0.0);`),e}const s=Object.freeze(Object.defineProperty({__proto__:null,build:n},Symbol.toStringTag,{value:"Module"}));e.HighlightToSingle=s,e.build=n}));