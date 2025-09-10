// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/Float3BindUniform","../../shaderModules/glsl"],(function(i,n,t){"use strict";function a(i){i.uniforms.add(new n.Float3BindUniform("mainLightDirection",(i=>i.lighting.mainLight.direction)))}function o(i){i.uniforms.add(new n.Float3BindUniform("mainLightIntensity",(i=>i.lighting.mainLight.intensity)))}i.addMainLightDirection=a,i.addMainLightIntensity=o,i.applyShading=function(i){a(i.fragment),o(i.fragment),i.fragment.code.add(t.glsl`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)},Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})}));