// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl","../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlpha.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,i,a,o,r,l,t,n,s,d,c,g,v,b,u,h,w,m,f,p,x,y,C,L,P,O,M,A,S,D,F,I,E){"use strict";function V(e){const V=new I.ShaderBuilder,{attributes:T,vertex:B,fragment:N,varyings:R}=V,{output:$,offsetBackfaces:U,instancedColor:_,pbrMode:j,snowCover:z,spherical:G,hasBloom:k}=e,W=j===m.PBRMode.Normal||j===m.PBRMode.Schematic;if(L.addProjViewLocalOrigin(B,e),T.add(D.VertexAttribute.POSITION,"vec3"),R.add("vpos","vec3",{invariant:!0}),V.include(x.VisualVariables,e),V.include(t.InstancedDoublePrecision,e),V.include(g.VerticalOffset,e),V.include(p.terrainDepthTest,e),o.isColorOrColorEmission($)&&(L.addCameraPosition(V.vertex,e),V.include(n.NormalAttribute,e),V.include(l.Transform,e),U&&V.include(a.Offset),_&&V.attributes.add(D.VertexAttribute.INSTANCECOLOR,"vec4"),R.add("vNormalWorld","vec3"),R.add("localvpos","vec3",{invariant:!0}),V.include(d.TextureCoordinateAttribute,e),V.include(i.ForwardLinearDepth,e),V.include(s.SymbolColor,e),V.include(c.VertexColor,e),B.uniforms.add(new O.Float4PassUniform("externalColor",(e=>e.externalColor))),R.add("vcolorExt","vec4"),B.main.add(A.glsl`
      forwardNormalizedVertexColor();
      vcolorExt = externalColor;
      ${A.If(_,"vcolorExt *= instanceColor * 0.003921568627451;")}
      vcolorExt *= vvColor();
      vcolorExt *= getSymbolColor();
      forwardColorMixMode();

      bool alphaCut = vcolorExt.a < ${A.glsl.float(E.alphaCutoff)};
      vpos = getVertexInLocalOriginSpace();
      localvpos = vpos - view[3].xyz;
      vpos = subtractOrigin(vpos);
      vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
      vpos = addVerticalOffset(vpos, localOrigin);
      vec4 basePosition = transformPosition(proj, view, vpos);

      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      forwardLinearDepth();
      forwardTextureCoordinates();

      gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
      ${A.If(U,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
    `)),o.isColorOrColorEmission($)){const{hasColorTexture:i,hasColorTextureTransform:a,receiveShadows:o}=e;V.include(u.EvaluateSceneLighting,e),N.include(b.EvaluateAmbientOcclusion,e),V.include(y.DiscardOrAdjustAlphaPass,e),V.include(e.instancedDoublePrecision?f.ReadShadowMapPass:f.ReadShadowMapDraw,e),N.include(r.SliceDraw,e),V.include(F.outputColorHighlightOID,e),L.addCameraPosition(N,e),h.addMainLightDirection(N),u.addAmbientBoostFactor(N),u.addLightingGlobalFactor(N),N.uniforms.add(B.uniforms.get("localOrigin"),B.uniforms.get("view"),new P.Float3PassUniform("ambient",(e=>e.ambient)),new P.Float3PassUniform("diffuse",(e=>e.diffuse)),new M.FloatPassUniform("opacity",(e=>e.opacity)),new M.FloatPassUniform("layerOpacity",(e=>e.layerOpacity))),i&&N.uniforms.add(new S.Texture2DPassUniform("tex",(e=>e.texture))),V.include(m.PhysicallyBasedRenderingParameters,e),N.include(w.PhysicallyBasedRendering,e),N.include(C.MixExternalColor),h.addMainLightIntensity(N),N.main.add(A.glsl`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${i?`texture(tex, ${a?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${A.If(i,`${A.If(e.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = ${o?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":G?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?A.glsl`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:A.glsl`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
      ${A.If(z,"albedo = mix(albedo, vec3(1), 0.9);")}
      ${A.glsl`vec3 shadingNormal = normalize(vNormalWorld);
             albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}
      ${A.If(W,`vec3 normalGround = ${G?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};`)}
      ${W?A.glsl`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                 ${A.If(z,A.glsl`mrr = applySnowToMRR(mrr, 1.0)`)}
            vec4 emission = ${z||k?"vec4(0.0)":"getEmissions(albedo)"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:A.glsl`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos, albedo ${A.If(z,", 1.0")});`)}return V.include(v.DefaultMaterialAuxiliaryPasses,e),V}const T=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}));e.RealisticTree=T,e.build=V}));