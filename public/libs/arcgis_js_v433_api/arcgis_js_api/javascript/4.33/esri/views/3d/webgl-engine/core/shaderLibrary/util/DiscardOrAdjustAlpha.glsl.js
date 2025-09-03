// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/FloatDrawUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../../lib/basicInterfaces","../../../../../../webscene/support/AlphaCutoff"],(function(a,o,e,l,r,s){"use strict";function t(a,o,e){const t=a.fragment,d=o.alphaDiscardMode,f=d===r.AlphaDiscardMode.Blend;d!==r.AlphaDiscardMode.Mask&&d!==r.AlphaDiscardMode.MaskBlend||t.uniforms.add(e),t.code.add(l.glsl`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${d===r.AlphaDiscardMode.Opaque?"color.a = 1.0;":`if (color.a < ${f?l.glsl.float(s.alphaCutoff):"textureAlphaCutoff"}) {\n              discard;\n             } ${l.If(d===r.AlphaDiscardMode.Mask,"else { color.a = 1.0; }")}`}
    }
  `)}a.DiscardOrAdjustAlphaDraw=function(a,e){t(a,e,new o.FloatDrawUniform("textureAlphaCutoff",(a=>a.textureAlphaCutoff)))},a.DiscardOrAdjustAlphaPass=function(a,o){t(a,o,new e.FloatPassUniform("textureAlphaCutoff",(a=>a.textureAlphaCutoff)))},Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})}));