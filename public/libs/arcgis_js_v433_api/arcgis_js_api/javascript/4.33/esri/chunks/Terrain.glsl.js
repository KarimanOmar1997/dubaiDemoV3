// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","./vec32","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/terrain/OverlayContent","../views/3d/terrain/TransparencyMode","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexTangent.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlightOverlay","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/Overlay.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/TerrainTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4DrawUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,a,r,i,o,l,t,n,s,d,c,g,v,m,u,p,h,w,f,b,y,C,O,S,x,T,L,P,M,z,I,D,N){"use strict";class $ extends x.OverlayTerrainPassParameters{}function A(e){const r=new D.ShaderBuilder,{attributes:o,vertex:$,fragment:A,varyings:W}=r;o.add(I.VertexAttribute.POSITION,"vec3"),r.include(g.NormalAttribute,e),r.include(v.TextureCoordinateAttribute,e);const V=()=>{r.include(y.NormalUtils,e),$.code.add(P.glsl`vec3 getNormal() {
float z = 1.0 - abs(normalCompressed.x) - abs(normalCompressed.y);
vec3 n = vec3(normalCompressed + vec2(normalCompressed.x >= 0.0 ? 1.0 : -1.0,
normalCompressed.y >= 0.0 ? 1.0 : -1.0) * min(z, 0.0), z);
return normalize(n);
}`)};T.addProjViewLocalOrigin($,e),r.include(c.Transform,e);const{output:U,pbrMode:j,overlayMode:_,tileBorders:E,spherical:H,transparencyMode:R,screenSizePerspective:k,overlayEnabled:G}=e,q=R===t.TransparencyMode.InvisibleWithDraped||R===t.TransparencyMode.Invisible,J=G&&q;switch(U){case s.ShaderOutput.ColorEmission:case s.ShaderOutput.Color:{r.include(x.TerrainTexture,e),r.include(f.EvaluateSceneLighting,e),G&&(e.pbrMode=j===C.PBRMode.Simplified?C.PBRMode.TerrainWithWater:C.PBRMode.Water,r.include(S.OverlayTerrain,e),e.pbrMode=j);const o=_===S.OverlayMode.EnabledWithWater;o&&r.include(m.VertexTangent,e),W.add("vnormal","vec3"),W.add("vpos","vec3",{invariant:!0}),W.add("vup","vec3"),V(),k&&T.addViewNormal($);const t=e.receiveShadows&&!e.renderOccluded;t&&r.include(n.ForwardLinearDepth,e),k&&(W.add("screenSizeDistanceToCamera","float"),W.add("screenSizeCosAngle","float")),$.main.add(P.glsl`
          vpos = position;
          vec3 positionWorld = position + localOrigin;
          gl_Position = transformPosition(proj, view, vpos);
          vnormal = getNormal();
          vup = getLocalUp(position, localOrigin);
          ${P.If(o,P.glsl`forwardVertexTangent(vnormal);`)}

          forwardTextureCoordinatesWithTransform(uv0);
          ${P.If(G,"setOverlayVTC(uv0);")}
          ${P.If(E,"forwardTextureCoordinates();")}
          ${P.If(k,P.glsl`vec3 viewPos = (view * vec4(vpos, 1.0)).xyz;
                 screenSizeDistanceToCamera = length(viewPos);
                 vec3 viewSpaceNormal = (viewNormal * vec4(normalize(positionWorld), 1.0)).xyz;
                 screenSizeCosAngle = abs(viewSpaceNormal.z);`)}
          ${P.If(t,"forwardLinearDepth();")}`),A.include(d.SliceDraw,e),r.include(f.EvaluateSceneLighting,e),A.include(w.EvaluateAmbientOcclusion,e),r.include(O.ReadShadowMapDraw,e),T.addCameraPosition(A,e),f.addAmbientBoostFactor(A),f.addLightingGlobalFactor(A),A.uniforms.add($.uniforms.get("localOrigin"),new L.Float3BindUniform("viewDirection",(({camera:e})=>i.normalize(B,i.set(B,e.viewMatrix[12],e.viewMatrix[13],e.viewMatrix[14]))))),o&&A.uniforms.add(new z.Texture2DBindUniform("ovWaterTex",(e=>e.overlay?.getTexture(l.OverlayContent.WaterNormal))),new M.Matrix4DrawUniform("view",(({origin:e},{camera:r})=>a.translate(F,r.viewMatrix,e))));const s=.2;A.code.add(P.glsl`float lum(vec3 c) {
return (min(min(c.r, c.g), c.b) + max(max(c.r, c.g), c.b)) * 0.5;
}`),b.addMainLightDirection(A),b.addMainLightIntensity(A),A.main.add(P.glsl`
          vec3 normal = normalize(vnormal);
          float vndl = dot(normal, mainLightDirection);

          float additionalAmbientScale = smoothstep(0.0, 1.0, clamp(vndl*2.5, 0.0, 1.0));
          float shadow = ${t?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":H?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

          float ssao = evaluateAmbientOcclusionInverse();
          vec4 tileColor = getTileColor();

          ${P.If(G,P.glsl`vec4 overlayColorOpaque = getOverlayColor(ovColorTex, vtcOverlay);
                   vec4 overlayColor = overlayOpacity * overlayColorOpaque;
                   ${P.If(q,`if (overlayColor.a < ${P.glsl.float(N.alphaCutoff)}) { discard; }`)}
                   vec4 groundColor = tileColor;
                   tileColor = tileColor * (1.0 - overlayColor.a) + overlayColor;`)}

          // If combined alpha is 0 we can discard pixel. The performance impact by having a discard here
          // is neglectable because terrain typically renders first into the framebuffer.
          if(tileColor.a < ${P.glsl.float(N.alphaCutoff)}) {
            discard;
          }

          bool sliced = rejectBySlice(vpos);
          if (sliced) {
            tileColor *= ${P.glsl.float(s)};
          }

          vec3 albedo = tileColor.rgb;

          // heuristic shading function used in the old terrain, now used to add ambient lighting

          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

          ${j===C.PBRMode.Simplified||j===C.PBRMode.TerrainWithWater?P.glsl`fragColor = vec4(evaluatePBRSimplifiedLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight, normalize(vpos - cameraPosition), vup), tileColor.a);`:P.glsl`fragColor = vec4(evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight), tileColor.a);`}
          ${P.If(o,P.glsl`vec4 overlayWaterMask = getOverlayColor(ovWaterTex, vtcOverlay);
                   float waterNormalLength = length(overlayWaterMask);
                   if (waterNormalLength > 0.95) {
                     mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, vnormal);
                     vec4 waterOverlayColor = vec4(overlayColor.w > 0.0 ? overlayColorOpaque.xyz/overlayColor.w : vec3(1.0), overlayColor.w);
                     vec4 viewPosition = view*vec4(vpos, 1.0);
                     vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, waterOverlayColor, -normalize(vpos - cameraPosition), shadow, vnormal, tbnMatrix, viewPosition.xyz,  vpos + localOrigin);
                     vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                     float opacity = sliced ? ${P.glsl.float(s)} : 1.0;
                     // un-gamma the ground color to mix in linear space
                     fragColor = mix(groundColor, waterColorNonLinear, waterColorLinear.w) * opacity;
                   }`)}
          ${P.If(k,P.glsl`float perspectiveScale = screenSizePerspectiveScaleFloat(1.0, screenSizeCosAngle, screenSizeDistanceToCamera, vec4(0.0));
                   if (perspectiveScale <= 0.25) {
                     fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), perspectiveScale * 4.0);
                   } else if (perspectiveScale <= 0.5) {
                     fragColor = mix(fragColor, vec4(0.0, 0.0, 1.0, 1.0), (perspectiveScale - 0.25) * 4.0);
                   } else if (perspectiveScale >= 0.99) {
                     fragColor = mix(fragColor, vec4(0.0, 1.0, 0.0, 1.0), 0.2);
                   } else {
                     fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), (perspectiveScale - 0.5) * 2.0);
                   }`)}
          ${P.If(e.visualizeNormals,H?P.glsl`
                  vec3 localUp = normalize(vpos + localOrigin);
                  vec3 right = normalize(cross(vec3(0.0, 0.0, 1.0), localUp));
                  vec3 forward = normalize(cross(localUp, right));
                  mat3 tbn = mat3(right, forward, localUp);
                  vec3 tNormal = normalize(normal * tbn);
                  fragColor = vec4(vec3(0.5) + 0.5 * tNormal, 0.0);`:P.glsl`
                  vec3 tNormal = normalize(normal);
                  fragColor = vec4(vec3(0.5) + 0.5 * tNormal, 0.0);`)}
          ${P.If(E,P.glsl`vec2 dVuv = fwidth(vuv0);
                 vec2 edgeFactors = smoothstep(vec2(0.0), 1.5 * dVuv, min(vuv0, 1.0 - vuv0));
                 float edgeFactor = 1.0 - min(edgeFactors.x, edgeFactors.y);
                 fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), edgeFactor);`)}
          fragColor = applySlice(fragColor, vpos);`)}break;case s.ShaderOutput.Depth:J&&r.include(S.OverlayTerrain,e),$.main.add(P.glsl`
        ${P.If(J,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),A.main.add(`${P.If(J,`if (getCombinedOverlayColor().a < ${P.glsl.float(N.alphaCutoff)}) discard;`)}`);break;case s.ShaderOutput.Shadow:case s.ShaderOutput.ShadowHighlight:case s.ShaderOutput.ShadowExcludeHighlight:case s.ShaderOutput.ViewshedShadow:r.include(u.OutputDepth,e),n.addLinearDepth(r),n.addNearFar(r),$.main.add(P.glsl`gl_Position = transformPositionWithDepth(proj, view, position, nearFar, linearDepth);`),A.main.add(P.glsl`outputDepth(linearDepth);`);break;case s.ShaderOutput.Normal:J&&r.include(S.OverlayTerrain,e),W.add("vnormal","vec3"),T.addViewNormal($),V(),$.main.add(P.glsl`
        ${P.If(J,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);
        vnormal = normalize((viewNormal * vec4(getNormal(), 1.0)).xyz);`),A.main.add(P.glsl`
        ${P.If(J,`if (getCombinedOverlayColor().a < ${P.glsl.float(N.alphaCutoff)}) discard;`)}
        vec3 normal = normalize(vnormal);
        if (gl_FrontFacing == false) {
          normal = -normal;
        }
        fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case s.ShaderOutput.Highlight:G&&(r.include(S.OverlayTerrain,e),r.include(h.OutputHighlightOverlay,e)),$.main.add(P.glsl`
        ${P.If(G,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),r.include(p.OutputHighlight,e),A.main.add(P.glsl`
        ${P.If(G,P.glsl`
           calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,"calculateOcclusionAndOutputHighlight();")}
      `)}if(U===s.ShaderOutput.ObjectAndLayerIdColor)if(G)e.pbrMode=C.PBRMode.Disabled,r.include(S.OverlayTerrain,e),e.pbrMode=j,$.main.add(P.glsl`gl_Position = transformPosition(proj, view, position);
setOverlayVTC(uv0);`),A.main.add(P.glsl`fragColor = getOverlayColorTexel();`);else{const e=R===t.TransparencyMode.Opaque;$.main.add(P.glsl`${P.If(e,"gl_Position = transformPosition(proj, view, position);")}`),A.main.add(P.glsl`fragColor = vec4(0.0);`)}return r}const F=r.create(),B=o.create(),W=Object.freeze(Object.defineProperty({__proto__:null,TerrainPassParameters:$,build:A},Symbol.toStringTag,{value:"Module"}));e.Terrain=W,e.TerrainPassParameters=$,e.build=A}));