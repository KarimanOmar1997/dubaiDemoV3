// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../shaderModules/glsl","../../lib/VertexAttribute"],(function(e,t,i){"use strict";e.ScreenSpacePass=function(e,s=!0){e.attributes.add(i.VertexAttribute.POSITION,"vec2"),s&&e.varyings.add("uv","vec2"),e.vertex.main.add(t.glsl`
      gl_Position = vec4(position, 0.0, 1.0);
      ${s?t.glsl`uv = position * 0.5 + vec2(0.5);`:""}
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));