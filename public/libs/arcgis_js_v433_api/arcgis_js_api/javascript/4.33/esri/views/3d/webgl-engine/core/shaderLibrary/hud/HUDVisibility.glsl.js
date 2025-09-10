// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./AlignPixel.glsl","./HUDRenderStyle","../../shaderModules/Float4BindUniform","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../shaderModules/Texture2DBindUniform"],(function(e,i,r,l,n,o,t){"use strict";e.HUDVisibility=function(e){e.vertex.uniforms.add(new n.FloatBindUniform("renderTransparentlyOccludedHUD",(e=>e.hudRenderStyle===r.HUDRenderStyle.Occluded?1:e.hudRenderStyle===r.HUDRenderStyle.NotOccluded?0:.75)),new l.Float4BindUniform("viewport",(e=>e.camera.fullViewport)),new t.Texture2DBindUniform("hudVisibilityTexture",(e=>e.hudVisibility?.getTexture()))),e.vertex.include(i.AlignPixel),e.vertex.code.add(o.glsl`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));