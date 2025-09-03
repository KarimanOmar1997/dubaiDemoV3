// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/shaderModules/glsl"],(function(e,o){"use strict";e.ToneMapping=function(e){e.code.add(o.glsl`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));