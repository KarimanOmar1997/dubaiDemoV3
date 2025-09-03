// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/shaderModules/glsl","../../../lib/VertexAttribute","./EdgeUtil.glsl"],(function(e,t,n,s){"use strict";e.UnpackAttributes=function(e,i){const o=i.type===s.EdgeType.Mixed,d=i.type===s.EdgeType.Solid;e.attributes.add(n.VertexAttribute.SIDENESS,"vec2"),e.vertex.code.add(t.glsl`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${t.If(o,"float type;")}
    };
  `).code.add(t.glsl`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${t.If(o,"if (component.type <= 0.0) {")}
      ${t.If(!d,"extensionLengthPixels *= variantExtension * 2.0 - 1.0;")}
      ${t.If(o,"}")}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${t.If(o,", component.type")});
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));