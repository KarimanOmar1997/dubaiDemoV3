// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../ShaderOutput","../attributes/VertexTextureCoordinates.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DDrawUniform","../../../lib/basicInterfaces"],(function(e,r,o,t,a,u){"use strict";e.ReadBaseColorTexture=function(e,s){const d=s.hasColorTexture&&(r.isColorOrColorEmission(s.output)||s.alphaDiscardMode!==u.AlphaDiscardMode.Opaque);d&&(e.include(o.VertexTextureCoordinates,s),e.fragment.uniforms.add(new a.Texture2DDrawUniform("baseColorTexture",(e=>e.texture)))),e.fragment.code.add(t.glsl`
    vec4 readBaseColorTexture() {
      return ${d?"textureLookup(baseColorTexture, vuv0)":"vec4(1.0)"};
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));