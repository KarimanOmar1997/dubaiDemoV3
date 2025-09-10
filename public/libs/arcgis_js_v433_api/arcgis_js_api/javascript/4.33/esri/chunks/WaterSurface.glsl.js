// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Water.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/WaterDistortion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,i,a,r,o,l,t,n,s,d,g,c,v,u,w,h,m,p,b,f,y,C,L,P){"use strict";function O(e){const O=new L.ShaderBuilder,{vertex:S,fragment:D,varyings:x}=O,{output:F,draped:M,receiveShadows:N}=e;m.addProjViewLocalOrigin(S,e),O.include(o.Transform,e),O.attributes.add(y.VertexAttribute.POSITION,"vec3"),O.attributes.add(y.VertexAttribute.UV0,"vec2");const A=new p.Float4PassUniform("waterColor",(e=>e.color));if(x.add("vpos","vec3",{invariant:!0}),S.uniforms.add(A),a.isColorOrColorEmission(F)){if(M)return S.main.add(f.glsl`
      if (waterColor.a < ${f.glsl.float(P.alphaCutoff)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vpos = position;
      gl_Position = transformPosition(proj, view, vpos);`),D.uniforms.add(A),D.main.add(f.glsl`fragColor = waterColor;`),O;O.include(d.NormalUtils,e),O.include(i.ForwardLinearDepth,e),x.add("vuv","vec2"),x.add("vnormal","vec3"),x.add("vtbnMatrix","mat3"),S.main.add(f.glsl`
      if (waterColor.a < ${f.glsl.float(P.alphaCutoff)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vuv = uv0;
      vpos = position;

      vnormal = getLocalUp(vpos, localOrigin);
      vtbnMatrix = getTBNMatrix(vnormal);
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);

      gl_Position = transformPosition(proj, view, vpos);
      forwardLinearDepth();`)}switch(O.include(v.terrainDepthTest,e),F){case a.ShaderOutput.Color:case a.ShaderOutput.ColorEmission:O.include(n.EvaluateAmbientLighting,{pbrMode:g.PBRMode.Disabled,lightingSphericalHarmonicsOrder:2}),O.include(w.WaterDistortion),O.include(c.ReadShadowMapDraw,e),O.include(u.Water,e),D.include(r.SliceDraw,e),O.include(C.outputColorHighlightOID,e),D.include(h.ColorConversion),m.addCameraPosition(D,e),s.addMainLightDirection(D),s.addMainLightIntensity(D),D.uniforms.add(A,new b.FloatPassUniform("timeElapsed",(({timeElapsed:e})=>e)),S.uniforms.get("view"),S.uniforms.get("localOrigin")).main.add(f.glsl`
        discardBySlice(vpos);
        discardByTerrainDepth();
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${N?f.glsl`1.0 - readShadowMap(vpos, linearDepth)`:"1.0"};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getSeaColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        // gamma correction
        fragColor = delinearizeGamma(final);
        outputColorHighlightOID(fragColor, vpos, final.rgb);`);break;case a.ShaderOutput.Normal:O.include(d.NormalUtils,e),O.include(w.WaterDistortion,e),D.include(r.SliceDraw,e),x.add("vuv","vec2"),S.main.add(f.glsl`
        if (waterColor.a < ${f.glsl.float(P.alphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        gl_Position = transformPosition(proj, view, vpos);`),D.uniforms.add(new b.FloatPassUniform("timeElapsed",(({timeElapsed:e})=>e))).main.add(f.glsl`discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
fragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);`);break;case a.ShaderOutput.Highlight:O.include(t.OutputHighlight,e),S.main.add(f.glsl`
        if (waterColor.a < ${f.glsl.float(P.alphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);`),D.include(r.SliceDraw,e),D.main.add(f.glsl`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`);break;case a.ShaderOutput.ObjectAndLayerIdColor:O.include(l.ObjectAndLayerIdColor,e),S.main.add(f.glsl`
        if (waterColor.a < ${f.glsl.float(P.alphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
        forwardObjectAndLayerIdColor();`),D.include(r.SliceDraw,e),D.main.add(f.glsl`discardBySlice(vpos);
outputObjectAndLayerIdColor();`)}return O}const S=Object.freeze(Object.defineProperty({__proto__:null,build:O},Symbol.toStringTag,{value:"Module"}));e.WaterSurface=S,e.build=O}));