// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../collections/Component/Material/shader/DecodeSymbolColor.glsl","../../shaderModules/glsl","../../shaderModules/IntegerPassUniform","../../../lib/VertexAttribute","../../../materials/internal/MaterialUtil"],(function(o,e,l,r,d,t){"use strict";o.SymbolColor=function(o,i){i.hasSymbolColors?(o.include(e.DecodeSymbolColor),o.attributes.add(d.VertexAttribute.SYMBOLCOLOR,"vec4"),o.varyings.add("colorMixMode","mediump float"),o.vertex.code.add(l.glsl`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(o.fragment.uniforms.add(new r.IntegerPassUniform("colorMixMode",(o=>t.colorMixModes[o.colorMixMode]))),o.vertex.code.add(l.glsl`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));