// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./output/ReadDepth.glsl","./util/BlendColorsPremultiplied.glsl","./util/CameraSpace.glsl","../shaderModules/Float3PassUniform","../shaderModules/FloatPassUniform","../shaderModules/glsl","../shaderModules/Texture2DBindUniform","../shaderModules/Texture2DPassUniform"],(function(e,o,l,t,a,r,n,i,d){"use strict";e.Laserline=function(e,s){const p=e.fragment;p.include(o.ReadDepth),e.include(t.CameraSpace),p.include(l.BlendColorsPremultiplied),p.uniforms.add(new r.FloatPassUniform("globalAlpha",(e=>e.globalAlpha)),new a.Float3PassUniform("glowColor",(e=>e.glowColor)),new r.FloatPassUniform("glowWidth",((e,o)=>e.glowWidth*o.camera.pixelRatio)),new r.FloatPassUniform("glowFalloff",(e=>e.glowFalloff)),new a.Float3PassUniform("innerColor",(e=>e.innerColor)),new r.FloatPassUniform("innerWidth",((e,o)=>e.innerWidth*o.camera.pixelRatio)),new i.Texture2DBindUniform("depthMap",(e=>e.depth?.attachment)),new d.Texture2DPassUniform("normalMap",(e=>e.normals))),p.code.add(n.glsl`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),p.code.add(n.glsl`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),p.code.add(n.glsl`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),s.contrastControlEnabled?p.uniforms.add(new d.Texture2DPassUniform("frameColor",((e,o)=>e.colors)),new r.FloatPassUniform("globalAlphaContrastBoost",(e=>e.globalAlphaContrastBoost))).code.add(n.glsl`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):p.code.add(n.glsl`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));