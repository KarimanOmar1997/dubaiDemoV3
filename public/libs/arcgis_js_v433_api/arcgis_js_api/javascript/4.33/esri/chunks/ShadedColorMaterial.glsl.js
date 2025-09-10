// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderLibrary/ScreenSizeScaling.glsl","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],(function(e,i,r,o,l,n,a,s,d,t,g,c,v,w){"use strict";function u(e){const i=new w.ShaderBuilder;i.include(l.Transform,e),i.include(r.ScreenSizeScaling,e),i.fragment.include(o.SliceDraw,e),i.include(v.outputColorHighlightOID,e),i.include(n.terrainDepthTest,e);const{vertex:u,fragment:h}=i;return h.include(a.ColorConversion),s.addProjViewLocalOrigin(u,e),h.uniforms.add(new t.Float4PassUniform("uColor",(e=>e.color))),i.attributes.add(c.VertexAttribute.POSITION,"vec3"),i.varyings.add("vWorldPosition","vec3"),e.screenSizeEnabled&&i.attributes.add(c.VertexAttribute.OFFSET,"vec3"),e.shadingEnabled&&(s.addViewNormal(u),i.attributes.add(c.VertexAttribute.NORMAL,"vec3"),i.varyings.add("vViewNormal","vec3"),h.uniforms.add(new d.Float3PassUniform("shadingDirection",(e=>e.shadingDirection))),h.uniforms.add(new t.Float4PassUniform("shadedColor",(e=>function(e,i){const r=1-e[3],o=e[3]+i[3]*r;return 0===o?(b[3]=o,b):(b[0]=(e[0]*e[3]+i[0]*i[3]*r)/o,b[1]=(e[1]*e[3]+i[1]*i[3]*r)/o,b[2]=(e[2]*e[3]+i[2]*i[3]*r)/o,b[3]=i[3],b)}(e.shadingTint,e.color))))),u.main.add(g.glsl`
      vWorldPosition = ${e.screenSizeEnabled?g.glsl`screenSizeScaling(offset, position)`:g.glsl`position`};
      ${e.shadingEnabled?g.glsl`vec3 worldNormal = normal;
                 vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`:""}
      forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vWorldPosition);
  `),h.main.add(g.glsl`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${e.shadingEnabled?g.glsl`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:g.glsl`vec4 finalColor = uColor;`}
      outputColorHighlightOID(finalColor, vWorldPosition, finalColor.rgb);`),i}const b=i.create(),h=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:"Module"}));e.ShadedColorMaterial=h,e.build=u}));