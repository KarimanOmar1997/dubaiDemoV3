// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/AlignPixel.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUD.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUDVisibility.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassGeometryTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ScreenSizePerspective.glsl","../views/3d/webgl-engine/core/shaderModules/Float2BindUniform","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder"],(function(e,i,r,o,t,n,l,a,d,s,c,g,p,f,S,v,w,h){"use strict";function u(e){const r=new h.ShaderBuilder,{vertex:u,fragment:m}=r,{terrainDepthTest:z}=e;return u.include(n.AlignPixel),r.include(l.HUD,e),r.vertex.include(t.RejectBySlice,e),r.attributes.add(w.VertexAttribute.UV0,"vec2"),u.uniforms.add(new p.Float4BindUniform("viewport",(e=>e.camera.fullViewport)),new S.FloatPassUniform("lineSize",((e,i)=>e.size>0?Math.max(1,e.size)*i.camera.pixelRatio:0)),new c.Float2BindUniform("pixelToNDC",(e=>i.set(b,2/e.camera.fullViewport[2],2/e.camera.fullViewport[3]))),new S.FloatPassUniform("borderSize",((e,i)=>e.borderColor?i.camera.pixelRatio:0)),new g.Float2PassUniform("screenOffset",((e,r)=>i.set(b,e.horizontalScreenOffset*r.camera.pixelRatio,0)))),r.varyings.add("coverageSampling","vec4"),r.varyings.add("lineSizes","vec2"),z&&r.varyings.add("depth","float"),e.occlusionTestEnabled&&r.include(a.HUDVisibility),e.hasScreenSizePerspective&&s.addScreenSizePerspectiveAlignment(u),u.main.add(v.glsl`
    ProjectHUDAux projectAux;
    vec4 endPoint = projectPositionHUD(projectAux);

    vec3 vpos = projectAux.posModel;
    if (rejectBySlice(vpos)) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
    ${v.If(e.occlusionTestEnabled,v.glsl`if (!testHUDVisibility(endPoint)) {
             gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
             return;
           }`)}

    ${e.hasScreenSizePerspective?v.glsl`vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
               vec2 screenOffsetScaled = applyScreenSizePerspectiveScaleFactorVec2(screenOffset, perspectiveFactor);`:"vec2 screenOffsetScaled = screenOffset;"}
    // Add view dependent polygon offset to get exact same original starting point. This is mostly used to get the
    // correct depth value
    vec3 posView = (view * vec4(position, 1.0)).xyz;
    ${v.If(z,"depth = posView.z;")}

    applyHUDViewDependentPolygonOffset(centerOffsetAndDistance.w, projectAux.absCosAngle, posView);
    vec4 startPoint = proj * vec4(posView, 1.0);

    // Apply screen offset to both start and end point
    vec2 screenOffsetNorm = screenOffsetScaled * 2.0 / viewport.zw;
    startPoint.xy += screenOffsetNorm * startPoint.w;
    endPoint.xy += screenOffsetNorm * endPoint.w;

    // Align start and end to pixel origin
    vec4 startAligned = alignToPixelOrigin(startPoint, viewport.zw);
    vec4 endAligned = alignToPixelOrigin(endPoint, viewport.zw);
    ${v.If(e.hudDepth,e.hudDepthAlignStart?"endAligned = vec4(endAligned.xy / endAligned.w * startAligned.w, startAligned.zw);":"startAligned = vec4(startAligned.xy / startAligned.w * endAligned.w, endAligned.zw);")}
    vec4 projectedPosition = mix(startAligned, endAligned, uv0.y);

    // The direction of the line in screen space
    vec2 screenSpaceDirection = normalize(endAligned.xy / endAligned.w - startAligned.xy / startAligned.w);
    vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x);
    ${e.hasScreenSizePerspective?v.glsl`float lineSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(lineSize, perspectiveFactor);
               float borderSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(borderSize, perspectiveFactor);`:v.glsl`float lineSizeScaled = lineSize;
               float borderSizeScaled = borderSize;`}
    float halfPixelSize = lineSizeScaled * 0.5;

    // Compute full ndc offset, adding 1px padding for doing anti-aliasing and the border size
    float padding = 1.0 + borderSizeScaled;
    vec2 ndcOffset = (-halfPixelSize - padding + uv0.x * (lineSizeScaled + padding + padding)) * pixelToNDC;

    // Offset x/y from the center of the line in screen space
    projectedPosition.xy += perpendicularScreenSpaceDirection * ndcOffset * projectedPosition.w;

    // Compute a coverage varying which we can use in the fragment shader to determine
    // how much a pixel is actually covered by the line (i.e. to anti alias the line).
    // This works by computing two coordinates that can be linearly interpolated and then
    // subtracted to find out how far away from the line edge we are.
    float edgeDirection = (uv0.x * 2.0 - 1.0);

    float halfBorderSize = 0.5 * borderSizeScaled;
    float halfPixelSizeAndBorder = halfPixelSize + halfBorderSize;
    float outerEdgeCoverageSampler = edgeDirection * (halfPixelSizeAndBorder + halfBorderSize + 1.0);

    float isOneSided = float(lineSizeScaled < 2.0 && borderSize < 2.0);

    coverageSampling = vec4(
      // Edge coordinate
      outerEdgeCoverageSampler,

      // Border edge coordinate
      outerEdgeCoverageSampler - halfPixelSizeAndBorder * isOneSided,

      // Line offset
      halfPixelSize - 0.5,

      // Border offset
      halfBorderSize - 0.5 + halfPixelSizeAndBorder * (1.0 - isOneSided)
    );

    lineSizes = vec2(lineSizeScaled, borderSizeScaled);
    gl_Position = projectedPosition;`),m.uniforms.add(new f.Float4PassUniform("uColor",(e=>e.color??o.ZEROS)),new f.Float4PassUniform("borderColor",(e=>e.borderColor??o.ZEROS))),z&&(m.include(d.multipassGeometryTest,e),m.uniforms.add(new c.Float2BindUniform("inverseViewport",(e=>e.inverseViewport)))),m.main.add(v.glsl`
    ${v.If(z,"if( geometryDepthTest(gl_FragCoord.xy * inverseViewport, depth) ){ discard; }")}

    vec2 coverage = min(1.0 - clamp(abs(coverageSampling.xy) - coverageSampling.zw, 0.0, 1.0), lineSizes);

    float borderAlpha = uColor.a * borderColor.a * coverage.y;
    float colorAlpha = uColor.a * coverage.x;

    float finalAlpha = mix(borderAlpha, 1.0, colorAlpha);
    ${v.If(!e.hudDepth,v.glsl`vec3 finalRgb = mix(borderColor.rgb * borderAlpha, uColor.rgb, colorAlpha);
           fragColor = vec4(finalRgb, finalAlpha);`)}`),r}const b=r.create(),m=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:"Module"}));e.LineCallout=m,e.build=u}));