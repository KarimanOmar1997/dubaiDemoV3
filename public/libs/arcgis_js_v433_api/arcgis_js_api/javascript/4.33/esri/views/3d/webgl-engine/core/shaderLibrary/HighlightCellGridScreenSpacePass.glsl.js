// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../core/libs/gl-matrix-2/math/vec2","../../../../../core/libs/gl-matrix-2/factories/vec2f64","../shaderModules/glsl","../shaderModules/Integer2PassUniform","../shaderModules/IntegerPassUniform","../shaderModules/Texture2DUintPassUniform","../../../../../chunks/HighlightDownsample.glsl"],(function(e,l,i,t,n,s,c,o){"use strict";const r=i.create();e.HighlightCellGridScreenSpacePass=function(e){const{vertex:i}=e;i.uniforms.add(new c.Texture2DUintPassUniform("coverageTexture",(e=>e.coverageTexture)),new n.Integer2PassUniform("highlightRenderCellCount",(e=>l.set(r,e.horizontalCellCount,e.verticalCellCount))),new n.Integer2PassUniform("highlightTextureResolution",(({highlightTexture:e})=>l.set(r,e.descriptor.width,e.descriptor.height))),new s.IntegerPassUniform("highlightLevel",(e=>e.highlightLevel))).constants.add("cellSize","int",o.gridCellPixelSize),e.varyings.add("sUV","vec2"),e.varyings.add("vOutlinePossible","float"),i.code.add(t.glsl`const ivec2 cellVertices[4] = ivec2[4](ivec2(0,0), ivec2(1,0), ivec2(0,1), ivec2(1,1));`),i.main.add(t.glsl`int cellIndex = gl_InstanceID;
int cellX = cellIndex % highlightRenderCellCount[0];
int cellY = (cellIndex - cellX) / highlightRenderCellCount[0];
ivec2 cellPos = ivec2(cellX, cellY);
uvec2 covTexel = texelFetch(coverageTexture, cellPos, 0).rg;
int channelIndex = (highlightLevel >> 2) & 3;
uint channelValue = covTexel[channelIndex];
int highlightIndex = (highlightLevel & 3) << 1;
bool covered = ((channelValue >> highlightIndex) & 1u) == 1u;
if (!covered) {
gl_Position = vec4(0.0);
return;
}
vOutlinePossible = (((channelValue >> highlightIndex) & 2u) == 2u) ? 1.0 : 0.0;
ivec2 iPosInCell = cellVertices[gl_VertexID];
vec2 sPos = vec2(cellPos * cellSize + iPosInCell * (cellSize));
vec2 vPos = sPos / vec2(highlightTextureResolution);
sUV = vPos;
gl_Position = vec4(2.0 * vPos - vec2(1.0), 0.0, 1.0);`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));