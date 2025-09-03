// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],(function(e,i,r,o,l,a,s,t,d,n,c){"use strict";function g(e){const g=new c.ShaderBuilder,{vertex:u,fragment:v,varyings:w}=g;return g.fragment.include(i.SliceDraw,e),g.include(r.terrainDepthTest,e),g.include(n.outputColorHighlightOID,e),l.addProjViewLocalOrigin(u,e),g.attributes.add(d.VertexAttribute.POSITION,"vec3"),g.attributes.add(d.VertexAttribute.UV0,"vec2"),w.add("vUV","vec2"),w.add("vpos","vec3"),u.main.add(t.glsl`vUV = uv0;
vpos = position;
forwardViewPosDepth((view * vec4(position, 1.0)).xyz);
gl_Position = proj * view * vec4(position, 1.0);`),v.uniforms.add(new a.Float2PassUniform("size",(e=>e.size))),v.uniforms.add(new s.Float4PassUniform("color1",(e=>e.color1))),v.uniforms.add(new s.Float4PassUniform("color2",(e=>e.color2))),v.include(o.ColorConversion),v.main.add(t.glsl`discardByTerrainDepth();
vec2 uvScaled = vUV / (2.0 * size);
vec2 uv = fract(uvScaled - 0.25);
vec2 ab = clamp((abs(uv - 0.5) - 0.25) / fwidth(uvScaled), -0.5, 0.5);
float fade = smoothstep(0.25, 0.5, max(fwidth(uvScaled.x), fwidth(uvScaled.y)));
float t = mix(abs(ab.x + ab.y), 0.5, fade);
fragColor = mix(color2, color1, t);
outputColorHighlightOID(fragColor, vpos, fragColor.rgb);`),g}const u=Object.freeze(Object.defineProperty({__proto__:null,build:g},Symbol.toStringTag,{value:"Module"}));e.CheckerBoard=u,e.build=g}));