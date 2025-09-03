// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl","../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TextureTransformUV.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlpha.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/weather/SnowCover.glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,r,a,i,o,l,s,n,t,d,c,g,u,m,v,b,w,h,f,p,x,y,C,L,P,T,S,O,V,N,A,M,D,I,U,E,$,F,B){"use strict";function R(e){const R=new F.ShaderBuilder,{attributes:_,vertex:j,fragment:G,varyings:z}=R,{output:W,normalType:k,offsetBackfaces:H,instancedColor:q,spherical:J,receiveShadows:K,snowCover:Q,pbrMode:X,textureAlphaPremultiplied:Y,instancedDoublePrecision:Z,hasVertexColors:ee,hasVertexTangents:re,hasColorTexture:ae,hasNormalTexture:ie,hasNormalTextureTransform:oe,hasColorTextureTransform:le,hasBloom:se}=e;if(V.addProjViewLocalOrigin(j,e),_.add(E.VertexAttribute.POSITION,"vec3"),z.add("vpos","vec3",{invariant:!0}),R.include(T.VisualVariables,e),R.include(n.InstancedDoublePrecision,e),R.include(m.VerticalOffset,e),R.include(P.colorTextureUV,e),!o.isColorOrColorEmission(W))return R.include(v.DefaultMaterialAuxiliaryPasses,e),R;R.include(P.normalTextureUV,e),R.include(P.emissiveTextureUV,e),R.include(P.occlusionTextureUV,e),R.include(P.metallicRoughnessTextureUV,e),V.addCameraPosition(j,e),R.include(t.NormalAttribute,e),R.include(s.Transform,e);const ne=k===t.NormalType.Attribute||k===t.NormalType.Compressed;return ne&&H&&R.include(i.Offset),R.include(b.ComputeNormalTexture,e),R.include(u.VertexNormal,e),q&&R.attributes.add(E.VertexAttribute.INSTANCECOLOR,"vec4"),z.add("vPositionLocal","vec3"),R.include(c.TextureCoordinateAttribute,e),R.include(a.ForwardLinearDepth,e),R.include(d.SymbolColor,e),R.include(g.VertexColor,e),j.uniforms.add(new A.Float4PassUniform("externalColor",(e=>"ignore"===e.colorMixMode?r.ONES:e.externalColor))),z.add("vcolorExt","vec4"),R.include(L.terrainDepthTest,e),j.main.add(D.glsl`
    forwardNormalizedVertexColor();
    vcolorExt = externalColor;
    ${D.If(q,"vcolorExt *= instanceColor * 0.003921568627451;")}
    vcolorExt *= vvColor();
    vcolorExt *= getSymbolColor();
    forwardColorMixMode();

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${D.If(ne,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${D.If(re,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${D.If(ne&&H,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardLinearDepth();
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (vcolorExt.a < ${D.glsl.float(B.alphaCutoff)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
  `),R.include(h.EvaluateSceneLighting,e),G.include(w.EvaluateAmbientOcclusion,e),R.include(S.DiscardOrAdjustAlphaPass,e),R.include(Z?C.ReadShadowMapPass:C.ReadShadowMapDraw,e),G.include(l.SliceDraw,e),R.include($.outputColorHighlightOID,e),V.addCameraPosition(G,e),G.uniforms.add(j.uniforms.get("localOrigin"),new N.Float3PassUniform("ambient",(e=>e.ambient)),new N.Float3PassUniform("diffuse",(e=>e.diffuse)),new M.FloatPassUniform("opacity",(e=>e.opacity)),new M.FloatPassUniform("layerOpacity",(e=>e.layerOpacity))),ae&&G.uniforms.add(new I.Texture2DPassUniform("tex",(e=>e.texture))),R.include(y.PhysicallyBasedRenderingParameters,e),G.include(x.PhysicallyBasedRendering,e),G.include(O.MixExternalColor),R.include(p.Normals,e),G.include(U.SnowCover,e),h.addAmbientBoostFactor(G),h.addLightingGlobalFactor(G),f.addMainLightIntensity(G),G.main.add(D.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${ae?D.glsl`
            vec4 texColor = texture(tex, ${le?"colorUV":"vuv0"});
            ${D.If(Y,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:D.glsl`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${k===t.NormalType.ScreenDerivative?D.glsl`vec3 normal = screenDerivativeNormal(vPositionLocal);`:D.glsl`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

      float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
      float shadow = ${K?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":D.If(J,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${D.If(ee,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
    float opacity_ = layerOpacity * mixExternalOpacity(${D.If(ee,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, int(colorMixMode));
    ${ie?`mat3 tangentSpace = computeTangentSpace(${re?"normal":"normal, vpos, vuv0"});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${oe?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${J?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${D.If(Q,D.glsl`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${X===y.PBRMode.Normal||X===y.PBRMode.Schematic?D.glsl`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            vec4 emission = ${se?"vec4(0.0)":"getEmissions(albedo)"};
            ${D.If(Q,"mrr = applySnowToMRR(mrr, snow);\n                 emission = snowCoverForEmissions(emission, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:D.glsl`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos, albedo ${D.If(Q,", snow")});
  `),R}const _=Object.freeze(Object.defineProperty({__proto__:null,build:R},Symbol.toStringTag,{value:"Module"}));e.DefaultMaterial=_,e.build=R}));