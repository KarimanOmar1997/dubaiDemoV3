// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],(function(e,r,o,i,l,s,t,a,d,n,g,u,b,c){"use strict";function v(e){const v=new c.ShaderBuilder,{vertex:w,fragment:C,attributes:h,varyings:p}=v,{vvColor:y,hasVertexColors:f}=e;return d.addProjViewLocalOrigin(w,e),v.include(o.Transform,e),v.include(l.VertexColor,e),v.include(t.VisualVariables,e),v.include(i.ObjectAndLayerIdColor,e),C.include(r.SliceDraw,e),v.include(b.outputColorHighlightOID,e),v.include(s.terrainDepthTest,e),h.add(u.VertexAttribute.POSITION,"vec3"),y&&h.add(u.VertexAttribute.COLORFEATUREATTRIBUTE,"float"),f||p.add("vColor","vec4"),p.add("vpos","vec3",{invariant:!0}),w.uniforms.add(new n.Float4PassUniform("uColor",(e=>e.color))),w.main.add(g.glsl`
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();

      ${f?"vColor *= uColor;":y?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),C.include(a.ColorConversion),C.main.add(g.glsl`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOID(vColor, vpos, vColor.rgb);`),v}const w=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:"Module"}));e.ColorMaterial=w,e.build=v}));