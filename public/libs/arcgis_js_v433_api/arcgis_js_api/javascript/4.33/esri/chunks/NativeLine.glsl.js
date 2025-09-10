// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,r,o,i,l,t,a,s,n,d,g,u,c){"use strict";function w(e){const w=new u.ShaderBuilder,{vertex:b,fragment:v,varyings:h}=w;return w.include(i.Transform,e),w.include(l.VertexColor,e),a.addProjViewLocalOrigin(b,e),w.attributes.add(g.VertexAttribute.POSITION,"vec3"),h.add("vpos","vec3",{invariant:!0}),b.main.add(d.glsl`vpos = position;
forwardNormalizedVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),w.include(t.OutputHighlight,e),w.fragment.include(o.SliceDraw,e),v.uniforms.add(new n.FloatPassUniform("alphaCoverage",((e,r)=>Math.min(1,e.width*r.camera.pixelRatio)))),e.hasVertexColors||v.uniforms.add(new s.Float4PassUniform("constantColor",(e=>e.color))),v.main.add(d.glsl`
    discardBySlice(vpos);

    vec4 color = ${e.hasVertexColors?"vColor":"constantColor"};

    ${e.output===r.ShaderOutput.ObjectAndLayerIdColor?"color.a = 1.0;":""}

    if (color.a < ${d.glsl.float(c.alphaCutoff)}) {
      discard;
    }

    ${r.isColorOrColorEmission(e.output)?d.glsl`fragColor = applySlice(color, vpos);`:""}
    calculateOcclusionAndOutputHighlight();
  `),w}const b=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));e.NativeLine=b,e.build=w}));