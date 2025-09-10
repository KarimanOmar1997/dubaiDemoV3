// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/shaderModules/glsl"],(function(e,t){"use strict";e.SphereIntersect=function(e){e.code.add(t.glsl`vec2 sphereIntersect(vec3 start, vec3 dir, float distance) {
float a = dot(dir, dir);
float b = 2.0 * dot(dir, start);
float d = (b * b) - 4.0 * a * distance;
if (d < 0.0) {
return vec2(1e5, -1e5);
}
return vec2((-b - sqrt(d)) / (2.0 * a), (-b + sqrt(d)) / (2.0 * a));
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));