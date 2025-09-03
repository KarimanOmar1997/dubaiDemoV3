// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DUintPassUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,t,i,l,r,u){"use strict";class o extends r.NoParameters{}function c(){const e=new u.ShaderBuilder,{outputs:r,fragment:o}=e;return e.include(t.ScreenSpacePass),o.uniforms.add(new l.Texture2DUintPassUniform("highlightTexture",(e=>e.highlightTexture))),o.constants.add("outlineWidth","int",Math.ceil(a)),o.constants.add("cellSize","int",n),r.add("fragGrid","uvec2"),o.main.add(i.glsl`ivec2 inputTextureSize = textureSize(highlightTexture, 0);
ivec2 cellBottomLeftCornerInput = ivec2(ivec2(floor(gl_FragCoord.xy) * vec2(cellSize)));
ivec2 coordMid =  cellBottomLeftCornerInput + ivec2(cellSize >> 1);
uvec2 centreTexel = texelFetch(highlightTexture, coordMid, 0).rg & uvec2(0x55u);
float marginSquare = float(outlineWidth*outlineWidth);
uvec2 outputValue = centreTexel & uvec2(0x55u);
for(int y = -outlineWidth; y <= cellSize + outlineWidth; y+=2) {
int dy = y < 0 ? -y : y > cellSize ? y-cellSize : 0;
int xMargin = dy > 0 ? int(ceil(sqrt(marginSquare - float(dy*dy)))) : outlineWidth;
for(int x = -xMargin; x <= cellSize + xMargin; x+=2) {
ivec2 coord = cellBottomLeftCornerInput + ivec2(x, y);
uvec2[4] texels = uvec2[4] (
texelFetch(highlightTexture,coord+ivec2(0,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(0,1),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,1),0).rg & uvec2(0x55u)
);
if (texels[0] == texels[1] && texels[1] == texels[2] && texels[2] == texels[3] && texels[3] ==  centreTexel) {
continue;
}
for (int i=0; i<4; ++i){
outputValue |= ((texels[i] ^ centreTexel) << 1);
outputValue |= texels[i];
}
}
}
fragGrid = outputValue;`),e}const n=32,a=9,d=Object.freeze(Object.defineProperty({__proto__:null,HighlightDownsampleDrawParameters:o,blurSize:.4,build:c,gridCellPixelSize:n,outlineSize:a},Symbol.toStringTag,{value:"Module"}));e.HighlightDownsample=d,e.HighlightDownsampleDrawParameters=o,e.blurSize=.4,e.build=c,e.gridCellPixelSize=n,e.outlineSize=a}));