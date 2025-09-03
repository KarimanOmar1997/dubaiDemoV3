// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,i,t,o,a,s,l,n,d,g,u,c,v,b){"use strict";class w extends v.NoParameters{}function p(e){const v=new b.ShaderBuilder,{vertex:w,fragment:p,varyings:h}=v,{output:f,perspectiveInterpolation:m}=e;return l.addProjViewLocalOrigin(w,e),v.include(t.Transform,e),v.include(a.terrainDepthTest,e),v.fragment.include(i.SliceDraw,e),v.include(o.ObjectAndLayerIdColor,e),v.include(c.outputColorHighlightOID,e),v.attributes.add(u.VertexAttribute.POSITION,"vec3"),v.attributes.add(u.VertexAttribute.UV0,"vec2"),m&&v.attributes.add(u.VertexAttribute.PERSPECTIVEDIVIDE,"float"),w.main.add(d.glsl`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${d.If(m,"gl_Position *= perspectiveDivide;")}`),h.add("vpos","vec3",{invariant:!0}),h.add("vTexCoord","vec2"),p.include(s.ColorConversion),p.uniforms.add(new n.FloatPassUniform("opacity",(e=>e.opacity)),new g.Texture2DPassUniform("tex",(e=>e.glTexture))).main.add(d.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${d.If(f===r.ShaderOutput.ObjectAndLayerIdColor,"fragColor = vec4(0, 0, 0, 1); return;")}
    vec4 finalColor = texture(tex, vTexCoord) * opacity;
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),v}const h=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:w,build:p},Symbol.toStringTag,{value:"Module"}));e.ImageMaterial=h,e.ImageMaterialPassParameters=w,e.build=p}));