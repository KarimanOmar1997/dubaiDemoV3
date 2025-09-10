// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../../core/shaderModules/FloatDrawUniform","../../../core/shaderModules/glsl","./EdgeUtil.glsl","./UnpackAttributes.glsl"],(function(e,t,r,d,a,l){"use strict";e.LineAmplitude=function(e,s){const u=e.vertex;switch(e.include(l.UnpackAttributes,s),s.type){case a.EdgeType.Solid:u.code.add(d.glsl`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case a.EdgeType.Sketch:u.uniforms.add(new r.FloatDrawUniform("strokesAmplitude",(e=>e.strokesTexture.amplitude))).code.add(d.glsl`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case a.EdgeType.Mixed:u.uniforms.add(new r.FloatDrawUniform("strokesAmplitude",(e=>e.strokesTexture.amplitude))).code.add(d.glsl`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case a.EdgeType.COUNT:break;default:t.neverReached(s.type)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));