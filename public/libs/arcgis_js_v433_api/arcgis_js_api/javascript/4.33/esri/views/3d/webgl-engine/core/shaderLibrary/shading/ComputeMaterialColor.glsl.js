// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../attributes/VertexColor.glsl","../util/MixExternalColor.glsl","../../shaderModules/Float4DrawUniform","../../shaderModules/FloatDrawUniform","../../shaderModules/glsl"],(function(o,e,r,l,a,t){"use strict";o.ComputeMaterialColor=function(o,i){o.include(e.VertexColor,i),o.fragment.include(r.MixExternalColor);const s=o.fragment;s.uniforms.add(new l.Float4DrawUniform("baseColor",(o=>o.baseColor))),s.uniforms.add(new a.FloatDrawUniform("objectOpacity",(o=>o.objectOpacity))),i.hasVertexColors?s.code.add(t.glsl`vec3 _baseColor() {
return baseColor.rgb * vColor.rgb;
}
float _baseOpacity() {
return baseColor.a * vColor.a;
}`):s.code.add(t.glsl`vec3 _baseColor() {
return baseColor.rgb;
}
float _baseOpacity() {
return baseColor.a;
}`),s.code.add(t.glsl`vec4 computeMaterialColor(vec4 textureColor, vec4 externalColor, int externalColorMixMode) {
vec3 baseColor = _baseColor();
float baseOpacity = _baseOpacity();
vec3 color = mixExternalColor(
baseColor,
textureColor.rgb,
externalColor.rgb,
externalColorMixMode
);
float opacity = objectOpacity * mixExternalOpacity(
baseOpacity,
textureColor.a,
externalColor.a,
externalColorMixMode
);
return vec4(color, opacity);
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));