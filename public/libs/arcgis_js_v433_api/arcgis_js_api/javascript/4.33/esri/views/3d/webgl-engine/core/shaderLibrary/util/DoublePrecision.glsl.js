// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/FloatBindUniform","../../shaderModules/glsl"],(function(e,o,d){"use strict";e.DoublePrecision=function({code:e,uniforms:i},l){i.add(new o.FloatBindUniform("dpDummy",(()=>1))),e.add(d.glsl`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));