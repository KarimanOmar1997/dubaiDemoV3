// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/PathVertexPosition.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/effects/weather/SnowCover.glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],(function(e,a,i,o,r,l,n,s,d,t,c,g,h,u,m,v,w,b,p,f,S,y,L,P,O){"use strict";function C(e){const C=new O.ShaderBuilder,{vertex:D,fragment:I,varyings:A}=C;p.addProjViewLocalOrigin(D,e),A.add("vpos","vec3",{invariant:!0}),C.include(n.PathVertexPosition,e);const{output:F,spherical:B,pbrMode:j,receiveShadows:M,hasBloom:V,snowCover:N}=e,T=i.isColorOrColorEmission(F);switch((T||F===i.ShaderOutput.ObjectAndLayerIdColor)&&(C.include(r.Transform,e),C.include(v.ReadShadowMapDraw,e),C.include(a.ForwardLinearDepth,e),C.include(l.ObjectAndLayerIdColor,e),C.include(w.terrainDepthTest,e),A.add("vnormal","vec3"),A.add("vcolor","vec4"),D.main.add(y.glsl`
      vpos = calculateVPos();
      vnormal = normalize(localNormal());
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);

      gl_Position = transformPosition(proj, view, vpos);

      ${T?"forwardLinearDepth();":""}
      forwardObjectAndLayerIdColor();

      vcolor = getColor();`)),F){case i.ShaderOutput.ColorEmission:case i.ShaderOutput.Color:C.include(m.PhysicallyBasedRenderingParameters,e),C.include(c.EvaluateSceneLighting,e),I.include(t.EvaluateAmbientOcclusion,e),C.include(v.ReadShadowMapDraw,e),C.include(h.Normals,e),I.include(o.SliceDraw,e),C.include(P.outputColorHighlightOID,e),p.addCameraPosition(I,e),c.addAmbientBoostFactor(I),c.addLightingGlobalFactor(I),I.uniforms.add(D.uniforms.get("localOrigin"),new f.Float3PassUniform("ambient",(e=>e.ambient)),new f.Float3PassUniform("diffuse",(e=>e.diffuse)),new S.FloatPassUniform("opacity",(e=>e.opacity))),I.include(b.ColorConversion),I.include(L.SnowCover,e),g.addMainLightIntensity(I),I.main.add(y.glsl`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${B?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${y.If(N,y.glsl`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = ${M?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth));":B?"lightingGlobalFactor * (1.0 - additionalAmbientScale);":"0.0;"}

        ${y.If(j===m.PBRMode.Schematic,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];\n           vec4 emission = ${V?"vec4(0.0)":"getEmissions(albedo)"};\n           ${y.If(N,"mrr = applySnowToMRR(mrr, snow);\n              emission = snowCoverForEmissions(emission, snow);")}`)}

        vec3 shadedColor = ${j===m.PBRMode.Schematic?"evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);":"evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);"}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOID(finalColor, vpos, albedo ${y.If(N,", snow")});`);break;case i.ShaderOutput.Depth:C.include(r.Transform,e),D.main.add(y.glsl`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),C.fragment.include(o.SliceDraw,e),I.main.add(y.glsl`discardBySlice(vpos);`);break;case i.ShaderOutput.Shadow:case i.ShaderOutput.ShadowHighlight:case i.ShaderOutput.ShadowExcludeHighlight:case i.ShaderOutput.ViewshedShadow:C.include(r.Transform,e),a.addNearFar(C),A.add("depth","float"),D.main.add(y.glsl`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),C.fragment.include(o.SliceDraw,e),C.include(s.OutputDepth,e),I.main.add(y.glsl`discardBySlice(vpos);
outputDepth(depth);`);break;case i.ShaderOutput.ObjectAndLayerIdColor:C.fragment.include(o.SliceDraw,e),I.main.add(y.glsl`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case i.ShaderOutput.Normal:C.include(r.Transform,e),C.include(u.NormalUtils,e),p.addViewNormal(D),A.add("vnormal","vec3"),D.main.add(y.glsl`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),C.fragment.include(o.SliceDraw,e),I.main.add(y.glsl`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case i.ShaderOutput.Highlight:C.include(r.Transform,e),C.include(u.NormalUtils,e),A.add("vnormal","vec3"),D.main.add(y.glsl`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),C.fragment.include(o.SliceDraw,e),C.include(d.OutputHighlight,e),I.main.add(y.glsl`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return C}const D=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));e.Path=D,e.build=C}));