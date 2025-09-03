// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../support/buffer/InterleavedLayout","../webgl-engine/lib/VertexAttribute"],(function(e,t,r){"use strict";const i=t.newLayout().vec3f(r.VertexAttribute.POSITION).vec2u16(r.VertexAttribute.UV0,{glNormalized:!0}).vec2i16(r.VertexAttribute.NORMALCOMPRESSED,{glNormalized:!0});e.terrainAttributesLayout=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));