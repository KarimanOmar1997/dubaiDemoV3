// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform"],(function(o,e,r,l){"use strict";o.Colormap=function(o){o.fragment.uniforms.add(new l.Texture2DPassUniform("u_colormap",(o=>o.u_colormap)),new e.FloatPassUniform("u_colormapOffset",(o=>o.colormap.u_colormapOffset)),new e.FloatPassUniform("u_colormapMaxIndex",(o=>o.colormap.u_colormapMaxIndex)),new e.FloatPassUniform("u_opacity",(o=>o.common.u_opacity))),o.fragment.code.add(r.glsl`vec4 colormap(vec4 currentPixel, bool isFloat) {
float colorIndex = isFloat ? currentPixel.r - u_colormapOffset : currentPixel.r * 255.0 - u_colormapOffset;
vec4 result;
if (currentPixel.a == 0.0 || colorIndex > u_colormapMaxIndex) {
result = vec4(0.0, 0.0, 0.0, 0.0);
} else {
vec2 texelCoordinates = vec2((colorIndex + 0.5), 0.5);
result = texelFetch(u_colormap, ivec2(texelCoordinates), 0);
}
return result;
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));