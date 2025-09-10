// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderModules/Float2BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/sources/edgeRenderer/AdjustProjectedPosition.glsl","../views/3d/webgl-engine/shaders/sources/edgeRenderer/DiscardNonSilhouetteEdges.glsl","../views/3d/webgl-engine/shaders/sources/edgeRenderer/DistanceFalloff.glsl","../views/3d/webgl-engine/shaders/sources/edgeRenderer/EdgeUtil.glsl","../views/3d/webgl-engine/shaders/sources/edgeRenderer/LineAmplitude.glsl","../views/3d/webgl-engine/shaders/sources/edgeRenderer/LineOffset.glsl","../views/3d/webgl-engine/shaders/sources/edgeRenderer/UnpackAttributes.glsl","../views/webgl/ShaderBuilder","../views/webgl/Uniform"],(function(e,i,o,n,t,s,l,d,a,r,c,p,P,u,g,f,v,x,w){"use strict";function h(e){const o=new x.ShaderBuilder,{vertex:w,fragment:h,varyings:L,attributes:b}=o;e.legacy&&w.uniforms.add(new A("model"),new A("localView")),o.include(c.AdjustProjectedPosition,e),o.include(u.EdgeUtil,e),o.include(g.LineAmplitude,e),o.include(v.UnpackAttributes,e),o.include(f.LineOffset,e),h.include(n.SliceDraw,e),o.include(p.DiscardNonSilhouetteEdges,e),o.include(t.terrainDepthTest,e),o.include(P.DistanceFalloff,e),L.add("vColor","vec4"),L.add("vRadius","float"),L.add("vPosition","vec3",{invariant:!0}),L.add("vWorldPosition","vec3",{invariant:!0}),L.add("vLineLengthPixels","float"),L.add("vSizeFalloffFactor","float"),w.uniforms.add(new s.Float2BindUniform("pixelToNDC",(({camera:e})=>i.set(m,2/e.fullViewport[2],2/e.fullViewport[3]))),new l.Float4BindUniform("viewport",(e=>e.camera.fullViewport)),new d.FloatBindUniform("pixelRatio",(e=>e.camera.pixelRatio))),b.add(r.VertexAttribute.POSITION0,"vec3"),b.add(r.VertexAttribute.POSITION1,"vec3"),b.add(r.VertexAttribute.VARIANTOFFSET,"float"),b.add(r.VertexAttribute.VARIANTSTROKE,"float"),b.add(r.VertexAttribute.VARIANTEXTENSION,"float");const V=e.type===u.EdgeType.Sketch,S=e.type===u.EdgeType.Mixed;return w.code.add(a.glsl`
    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {
      vec2 sideness = unpackedAttributes.sideness;
      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;

      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);
      forwardViewPosDepth(viewPos);

      vec4 projPosV0 = projFromViewPosition(viewPosV0);
      vec4 projPosV1 = projFromViewPosition(viewPosV1);
      vec4 projPos = projFromViewPosition(viewPos);

      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);
      vec2 ndcToPixel = viewport.zw * 0.5;
      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * ndcToPixel;
      float lineLengthPixels = length(screenSpaceLinePixels);

      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;
      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;
      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;

      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * pixelRatio;
      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;

      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;
      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * pixelRatio;

      vSizeFalloffFactor = falloffFactor;

      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;
      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;

      // Line size with padding
      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + ${a.glsl.float(1)};
      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + ${a.glsl.float(1)};

      // Half line width in NDC including padding for anti aliasing
      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * pixelToNDC;
      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * pixelToNDC;
      vec2 extensionLengthNDC = extensionLengthPixels * pixelToNDC;

      // Compute screen space position of vertex, offsetting for line size and end caps
      vec2 ndcOffset = (
          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)
        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC
      );

      projPos.xy += ndcOffset * projPos.w;
      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;

      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));

      // Line length with end caps
      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;

      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;

      // Position in pixels with origin at first vertex of line segment
      vPosition = vec3(
        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,
        pixelPositionAlongLine,
        pixelPositionAlongLine / extendedLineLengthPixels
      );

      // The line width radius in pixels
      vRadius = lineWidthPixels * 0.5;
      vLineLengthPixels = extendedLineLengthPixels;

      // discard short edges below a certain length threshold
      ${a.If(V||S,a.glsl`if (lineLengthPixels <= 3.0 ${a.If(S," && unpackedAttributes.type <= 0.0")}) {
                gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
                return;
             }`)}
      gl_Position = projPos;
    }`),w.main.add(a.glsl`
    ComponentData component = readComponentData();
    UnpackedAttributes unpackedAttributes = unpackAttributes(component);

    vec3 worldPosV0, worldPosV1, viewPosV0, viewPosV1;
    worldAndViewFromModelPosition(position0, component.verticalOffset, worldPosV0, viewPosV0);
    worldAndViewFromModelPosition(position1, component.verticalOffset, worldPosV1, viewPosV1);

    // Component color
    vColor = component.color;

    // Discard fully transparent edges
    if (vColor.a < ${a.glsl.float(1/255)}) {
      gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
      return;
    }

    if (discardNonSilhouetteEdges(viewPosV0, worldPosV0, component)) {
      return;
    }

    // General geometric computation for all types of edges
    calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(component), unpackedAttributes);

    // Specific computation for different edge styles
    calculateStyleOutputs(unpackedAttributes);`),h.code.add(a.glsl`float lineWithCapsDistance(float radius, vec2 position, float lineLength) {
float positionX = position.x - calculateLineOffset();
if (radius < 1.0) {
float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);
float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);
return 0.5 - min(coverageX, coverageY);
}
else {
float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);
return length(vec2(positionX, positionOnCap)) - radius;
}
}`),h.main.add(a.glsl`discardByTerrainDepth();
float radius = vRadius * calculateLinePressure();
float distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);
float coverage = clamp(0.5 - distance, 0.0, 1.0);
discardBySlice(vWorldPosition);
fragColor = vec4(vColor.rgb, vColor.a * coverage);`),o}const m=o.create();class A extends w.Uniform{constructor(e){super(e,"mat4")}}const L=Object.freeze(Object.defineProperty({__proto__:null,build:h},Symbol.toStringTag,{value:"Module"}));e.EdgeShader=L,e.build=h}));