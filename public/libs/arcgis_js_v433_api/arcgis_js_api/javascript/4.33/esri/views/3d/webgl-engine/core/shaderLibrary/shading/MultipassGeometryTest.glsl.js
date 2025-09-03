// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../output/ReadDepth.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DBindUniform"],(function(e,t,o,r){"use strict";e.multipassGeometryTest=function(e){e.include(t.ReadDepth),e.uniforms.add(new r.Texture2DBindUniform("geometryDepthTexture",(e=>e.geometryDepth?.attachment))),e.code.add(o.glsl`bool geometryDepthTest(vec2 pos, float elementDepth) {
float geometryDepth = linearDepthFromTexture(geometryDepthTexture, pos);
return (elementDepth < (geometryDepth - 1.0));
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));