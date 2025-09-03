// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/shaderModules/FloatPassUniform","../../../core/shaderModules/glsl"],(function(e,a,t){"use strict";e.DistanceFalloff=function(e){const o=e.vertex;o.uniforms.add(new a.FloatPassUniform("distanceFalloffFactor",(e=>e.distanceFalloffFactor))),o.code.add(t.glsl`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));