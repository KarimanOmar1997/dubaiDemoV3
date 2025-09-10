// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./TextureCoordinateAttribute.glsl","../util/TextureAtlasLookup.glsl","../../shaderModules/glsl"],(function(e,t,o,r){"use strict";e.VertexTextureCoordinates=function(e,u){const{textureCoordinateType:n}=u;if(n===t.TextureCoordinateType.None||n===t.TextureCoordinateType.COUNT)return;e.include(t.TextureCoordinateAttribute,u);const i=n===t.TextureCoordinateType.Atlas;i&&e.include(o.TextureAtlasLookup),e.fragment.code.add(r.glsl`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${i?"textureAtlasLookup(tex, uv, vuvRegion)":"texture(tex, uv)"};
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));