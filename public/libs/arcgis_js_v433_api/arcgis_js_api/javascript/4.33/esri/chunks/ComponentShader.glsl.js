// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../geometry/support/Ellipsoid","../views/3d/terrain/OverlayContent","../views/3d/webgl-engine/collections/Component/Material/shader/ComponentData.glsl","../views/3d/webgl-engine/collections/Component/Material/shader/VertexDiscardMode","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexPosition.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlightOverlay","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeFragmentNormals.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeMaterialColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadBaseColorTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/Overlay.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlpha.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/EllipsoidMode","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/weather/SnowCover.glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,a,o,r,l,t,i,n,d,s,g,c,u,h,v,m,w,b,C,p,f,y,x,L,O,S,M,N,I,T,D,$,P,A){"use strict";function B(e){const B=new P.ShaderBuilder,{vertex:W,fragment:R}=B;B.include(c.VertexPosition,e),B.include(g.VertexNormal,e),B.include(s.VertexColor,e),B.include(d.TextureCoordinateAttribute,e),B.include(t.ForwardLinearDepth,e),B.include(r.ComponentData,e),B.include(S.DiscardOrAdjustAlphaDraw,e),R.include(n.SlicePass,e),B.include(y.ReadBaseColorTexture,e),B.include(L.terrainDepthTest,e);const{output:E,pbrMode:F,hasNormalTexture:V,snowCover:H,receiveShadows:z,shadeNormals:j,spherical:_,ellipsoidMode:G,overlayEnabled:U,componentData:k,vertexDiscardMode:q,hasBloom:J,renderOccluded:K}=e,Q=F===f.PBRMode.Normal||F===f.PBRMode.Schematic;Q&&(B.include(f.PhysicallyBasedRenderingParameters,e),V&&B.include(b.ComputeNormalTexture,e));const X=E===i.ShaderOutput.Shadow||E===i.ShaderOutput.ShadowHighlight||E===i.ShaderOutput.ShadowExcludeHighlight,Y=X&&k===r.ComponentDataType.Varying;if(U){B.include(C.EvaluateSceneLighting,e),B.include(O.OverlayIM,e);const o=G===M.EllipsoidMode.Earth,r=G===M.EllipsoidMode.Earth,l=o?a.earth.radius:r?a.mars.radius:a.moon.radius;W.code.add(`\n      ${N.If(_,`const float invRadius = ${N.glsl.float(1/l)};`)}\n      vec2 projectOverlay(vec3 pos) { return pos.xy ${N.If(_,"/ (1.0 + invRadius * pos.z);")}; }`)}const Z=U&&i.isColorOrColorEmission(E)&&F===f.PBRMode.WaterOnIntegratedMesh;Z&&(B.varyings.add("tbnTangent","vec3"),B.varyings.add("tbnBiTangent","vec3"),B.varyings.add("groundNormal","vec3"));const ee=q===l.VertexDiscardMode.None,ae=q===l.VertexDiscardMode.Opaque;if(W.main.add(N.glsl`
    bool castShadows;
    vec4 externalColor = forwardExternalColor(castShadows);
    ${N.If(Y,"if(!castShadows) { gl_Position = vec4(vec3(1e38), 1.0); return; }")}

    ${N.If(!ee,`{ if (externalColor.a ${ae?">":"<="} ${N.glsl.float(1-1/255)}) { gl_Position = vec4(vec3(1e38), 1.0); return; } }`)}

    ${N.If(E===i.ShaderOutput.ObjectAndLayerIdColor,"externalColor.a = 1.0;")}

    forwardPosition(readElevationOffset());
    forwardViewPosDepth(vPosition_view);
    forwardNormal();
    forwardTextureCoordinates();
    forwardVertexColor();
    forwardLinearDepth();
    forwardObjectAndLayerIdColor();
    ${N.If(Z,_?N.glsl`
            groundNormal = normalize(positionWorld());
            tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
            tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:N.glsl`
            groundNormal = vec3(0.0, 0.0, 1.0);
            tbnTangent = vec3(1.0, 0.0, 0.0);
            tbnBiTangent = vec3(0.0, 1.0, 0.0);`)}
    ${N.If(U,"setOverlayVTC(projectOverlay(position));")}

    if (externalColor.a < ${N.glsl.float(A.alphaCutoff)}) {
      // Discard this vertex
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
  `),i.isColorOrColorEmission(E))return B.include(w.ComputeMaterialColor,e),B.include(m.computeFragmentNormals,e),B.include(C.EvaluateSceneLighting,e),B.include($.outputColorHighlightOID,e),R.include(D.SnowCover,e),z&&B.include(x.ReadShadowMapPass,e),R.code.add(N.glsl`
      float evaluateShadow() {
        return ${z?"readShadowMap(vPositionWorldCameraRelative, linearDepth)":"0.0"};
      }`),U&&R.uniforms.add(new T.Texture2DPassUniform("ovColorTex",((e,a)=>O.getIMColorTexture(e,a)))),R.main.add(N.glsl`
      discardBySlice(vPositionWorldCameraRelative);
      discardByTerrainDepth();

      vec4 textureColor = readBaseColorTexture();
      discardOrAdjustAlpha(textureColor);

      /* When rendering the occluded overlay, we still need to read the base color texture
       * because we need to use the same discard logic. However after that to render only the
       * draped overlay, we simply set the base texture color to zero. */
      ${N.If(K,N.glsl`textureColor = vec4(0);`)}

      ${N.If(U,N.glsl`vec4 overlayColor = getOverlayColor(ovColorTex, vtcOverlay);`)}

      /* Early discard to only emit when we have overlay */
      ${N.If(U&&K,N.glsl`if (overlayColor.a < ${N.glsl.float(A.alphaCutoff)}) { discard; }`)}

      vec4 externalColor;
      int externalColorMixMode;
      readExternalColor(externalColor, externalColorMixMode);

      vec4 materialColor = computeMaterialColor(textureColor, externalColor, externalColorMixMode);
    `),Q?(p.addMainLightIntensity(R),_&&C.addLightingGlobalFactor(R),R.main.add(N.glsl`
        applyPBRFactors();
        ${N.If(F===f.PBRMode.Normal,N.glsl`if (externalColorMixMode == 3) {
              mrr = vec3(0.0, 0.6, 0.2);
            }`)}
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
        ${N.If(V,"mat3 tangentSpace = computeTangentSpace(fragmentFaceNormal, vPositionWorldCameraRelative, vuv0);")}
        vec3 shadingNormal = ${V?"computeTextureNormal(tangentSpace, vuv0)":"fragmentShadingNormal"};
        vec3 groundNormal = ${_?N.glsl`normalize(positionWorld())`:N.glsl`vec3(0.0, 0.0, 1.0)`};

        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * evaluateAmbientOcclusionInverse();
        ${N.If(H,N.glsl`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
                 materialColor.rgb = mix(materialColor.rgb, vec3(1.1), snow);
                 ssao = mix(ssao, 0.5 * ssao, snow);
                 shadingNormal = mix(shadingNormal, fragmentFaceNormal, snow);`)}
        ${N.If(U,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        vec4 emission = ${J?"vec4(0.0)":"getEmissions(materialColor.rgb)"};
        ${N.If(_,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        ${_?N.glsl`float shadow = max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow());`:"float shadow = evaluateShadow();"}
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, shadow, ssao, additionalLight, viewDir, groundNormal, mrr, emission, additionalIrradiance), materialColor.a);
        `)):(p.addMainLightDirection(R),_&&C.addLightingGlobalFactor(R),Z&&R.uniforms.add(new I.Texture2DBindUniform("ovNormalTex",(e=>e.overlay?.getTexture(o.OverlayContent.WaterNormal)))),R.main.add(N.glsl`
        ${N.If(_,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        float shadow = ${z?_?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow())":"evaluateShadow()":_?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        ${N.If(z&&!j,N.glsl`
            float dotFL = dot(fragmentFaceNormal, mainLightDirection);
            if( dotFL <= 0.0) shadow = 1.0;
        `)}
        ${N.If(H,N.glsl`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
               materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`)}

        // At global scale we create some additional ambient light based on the main light to simulate global illumination
        float ssao = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());

        ${N.If(U,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec4 shadedColor = vec4(evaluateSceneLighting(fragmentShadingNormal, materialColor.rgb, shadow, ssao, additionalLight), materialColor.a);
        ${N.If(Z,N.glsl`vec4 overlayWaterMask = getOverlayColor(ovNormalTex, vtcOverlay);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   // un-gamma the ground color to mix in linear space
                   shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
                 }`)}
      `)),R.main.add(`outputColorHighlightOID(shadedColor, vPositionWorldCameraRelative, materialColor.rgb ${N.If(H,", snow")});`),B;const oe=E===i.ShaderOutput.Normal,re=E===i.ShaderOutput.ObjectAndLayerIdColor,le=E===i.ShaderOutput.Highlight,te=X||E===i.ShaderOutput.ViewshedShadow;return te&&B.include(u.OutputDepth,e),oe&&B.include(m.computeFragmentNormals,e),U&&B.include(v.OutputHighlightOverlay,e),B.include(h.OutputHighlight,e),R.main.add(N.glsl`
    discardBySlice(vPositionWorldCameraRelative);

    vec4 textureColor = readBaseColorTexture();
    discardOrAdjustAlpha(textureColor);

    ${N.If(te,"outputDepth(linearDepth);")}
    ${N.If(oe,N.glsl`fragColor = vec4(vec3(0.5) + 0.5 * fragmentFaceNormalView, 1.0);`)}
    ${N.If(re,U?"fragColor = getOverlayColorTexel();":"outputObjectAndLayerIdColor();")}
    ${N.If(le,N.If(U,N.glsl`calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,N.glsl`calculateOcclusionAndOutputHighlight();`))}`),B}const W=Object.freeze(Object.defineProperty({__proto__:null,build:B},Symbol.toStringTag,{value:"Module"}));e.ComponentShader=W,e.build=B}));