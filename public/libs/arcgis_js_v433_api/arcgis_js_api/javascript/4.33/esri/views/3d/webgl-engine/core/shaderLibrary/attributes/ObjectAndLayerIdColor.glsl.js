// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../ShaderOutput","../../shaderModules/glsl","../../../lib/VertexAttribute"],(function(e,d,r,o){"use strict";e.ObjectAndLayerIdColor=function(e,t){if(t.output!==d.ShaderOutput.ObjectAndLayerIdColor)return e.vertex.code.add(r.glsl`void forwardObjectAndLayerIdColor() {}`),void e.fragment.code.add(r.glsl`void outputObjectAndLayerIdColor() {}`);const a=t.objectAndLayerIdColorInstanced;e.varyings.add("objectAndLayerIdColorVarying","vec4"),e.attributes.add(a?o.VertexAttribute.INSTANCEOBJECTANDLAYERIDCOLOR:o.VertexAttribute.OLIDCOLOR,"vec4"),e.vertex.code.add(r.glsl`
    void forwardObjectAndLayerIdColor() {
      objectAndLayerIdColorVarying = ${a?"instanceObjectAndLayerIdColor":"objectAndLayerIdColor"} * 0.003921568627451;
    }`),e.fragment.code.add(r.glsl`void outputObjectAndLayerIdColor() {
fragColor = objectAndLayerIdColorVarying;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));