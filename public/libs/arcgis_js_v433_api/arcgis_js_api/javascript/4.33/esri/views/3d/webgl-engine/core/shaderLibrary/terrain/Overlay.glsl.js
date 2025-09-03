// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec4f64","../../../../../../geometry/support/aaBoundingRect","../../../../terrain/interfaces","../../../../terrain/OverlayContent","../../renderPasses/RenderPassIdentifier","../ShaderOutput","../shading/MainLighting.glsl","../shading/PhysicallyBasedRenderingParameters.glsl","../shading/Water.glsl","../../shaderModules/Float4DrawUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform","../../shaderModules/Texture2DUintPassUniform","../../../../../webgl/Uniform"],(function(e,t,o,r,a,l,i,n,d,s,v,c,u,x,y,g){"use strict";var h;function f(e,t){const o=t.pbrMode===d.PBRMode.Water||t.pbrMode===d.PBRMode.WaterOnIntegratedMesh||t.pbrMode===d.PBRMode.TerrainWithWater;o&&e.include(s.Water,t);const{vertex:r,fragment:l,varyings:v}=e;v.add("vtcOverlay","vec4");const{output:c}=t,x=c===i.ShaderOutput.Highlight;r.code.add(u.glsl`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),l.code.add(u.glsl`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),x?l.uniforms.add(new y.Texture2DUintPassUniform("overlayHighlightTexture",((e,t)=>t.overlay?.getTexture(a.OverlayContent.Highlight)))).code.add(u.glsl`uvec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(overlayHighlightTexture, 0));
uvec2 texelValueInner = texelFetch(overlayHighlightTexture, ivec2(texelCoordInner * texDim), 0).rg;
uvec2 texelValueOuter = texelFetch(overlayHighlightTexture, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
uvec2(0);
}`):(l.code.add(u.glsl`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),l.code.add(u.glsl`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`)),o&&(n.addMainLightDirection(l),n.addMainLightIntensity(l),l.code.add(u.glsl`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getSeaColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}function O(e,t){return e.identifier===l.RenderPassIdentifier.Material&&i.isColorOrColorEmission(e.output)?e.occludedGround?t.overlay?.getTexture(a.OverlayContent.Occluded):t.overlay?.getTexture(a.OverlayContent.ColorNoRasterImage):e.identifier===l.RenderPassIdentifier.Material&&e.output===i.ShaderOutput.ObjectAndLayerIdColor?t.overlay?.getTexture(a.OverlayContent.ObjectAndLayerIdColor):e.identifier===l.RenderPassIdentifier.Highlight?t.overlay?.getTexture(a.OverlayContent.Highlight):null}e.OverlayMode=void 0,(h=e.OverlayMode||(e.OverlayMode={}))[h.Disabled=0]="Disabled",h[h.Enabled=1]="Enabled",h[h.EnabledWithWater=2]="EnabledWithWater",h[h.COUNT=3]="COUNT";const C=t.create();class p extends g.Uniform{constructor(e){super(e,"vec4")}}e.OverlayIM=function(e,t){const{vertex:a,fragment:l}=e;a.uniforms.add(new v.Float4DrawUniform("overlayTexOffset",((e,t)=>function(e,t){const a=t.overlay?.overlays[r.OverlayIndex.INNER]?.extent;o.hasArea(a)&&(C[0]=e.toMapSpace[0]/o.width(a)-a[0]/o.width(a),C[1]=e.toMapSpace[1]/o.height(a)-a[1]/o.height(a));const l=t.overlay?.overlays[r.OverlayIndex.OUTER]?.extent;return o.hasArea(l)&&(C[2]=e.toMapSpace[0]/o.width(l)-l[0]/o.width(l),C[3]=e.toMapSpace[1]/o.height(l)-l[1]/o.height(l)),C}(e,t))),new v.Float4DrawUniform("overlayTexScale",((e,t)=>function(e,t){const a=t.overlay?.overlays[r.OverlayIndex.INNER]?.extent;o.hasArea(a)&&(C[0]=e.toMapSpace[2]/o.width(a),C[1]=e.toMapSpace[3]/o.height(a));const l=t.overlay?.overlays[r.OverlayIndex.OUTER]?.extent;return o.hasArea(l)&&(C[2]=e.toMapSpace[2]/o.width(l),C[3]=e.toMapSpace[3]/o.height(l)),C}(e,t)))),l.constants.add("overlayOpacity","float",1),l.uniforms.add(new x.Texture2DPassUniform("ovColorTex",((e,t)=>O(e,t)))),f(e,t)},e.OverlayTerrain=function(e,t){const{vertex:o,fragment:r}=e,{output:a}=t;o.uniforms.add(new p("overlayTexOffset"),new p("overlayTexScale")),r.uniforms.add(new c.FloatPassUniform("overlayOpacity",(e=>e.overlayOpacity))),a!==i.ShaderOutput.Highlight&&r.uniforms.add(new x.Texture2DPassUniform("ovColorTex",((e,t)=>t.overlay?.getTexture(e.overlayContent)))),f(e,t)},e.getIMColorTexture=O,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));