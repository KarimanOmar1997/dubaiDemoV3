// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/support/engineContent/marker","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/RibbonVertexPosition.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MarkerSizing.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float2BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/LineMarkerTechniqueConfiguration","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],(function(e,r,i,a,o,n,t,s,l,c,d,p,v,g,h,f,m,u,w,S,b){"use strict";function x(e){const x=new b.ShaderBuilder,{space:y,anchor:P,hasTip:z}=e,L=y===w.LineMarkerSpace.World;x.include(a.RibbonVertexPosition,e),x.include(n.MarkerSizing,e),x.include(t.terrainDepthTest,e);const{vertex:k,fragment:M,varyings:D}=x;M.include(l.RgbaFloatEncoding),c.addProjViewLocalOrigin(k,e),x.attributes.add(u.VertexAttribute.POSITION,"vec3"),x.attributes.add(u.VertexAttribute.PREVIOUSDELTA,"vec4"),x.attributes.add(u.VertexAttribute.UV0,"vec2"),D.add("vColor","vec4"),D.add("vpos","vec3",{invariant:!0}),D.add("vUV","vec2"),D.add("vSize","float"),z&&D.add("vLineWidth","float"),k.uniforms.add(new d.Float2BindUniform("nearFar",(({camera:e})=>e.nearFar)),new p.Float4BindUniform("viewport",(({camera:e})=>e.fullViewport))).code.add(h.glsl`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),k.code.add(h.glsl`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),L?(x.attributes.add(u.VertexAttribute.NORMAL,"vec3"),c.addViewNormal(k),k.constants.add("tiltThreshold","float",.7),k.code.add(h.glsl`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):k.code.add(h.glsl`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const C=L?"vec3":"vec2";return k.code.add(h.glsl`
      ${C} normalizedSegment(${C} pos, ${C} prev) {
        ${C} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${L?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${C} displace(${C} pos, ${C} prev, float displacementLen) {
        ${C} segment = normalizedSegment(pos, prev);

        ${C} displacementDirU = perpendicular(segment);
        ${C} displacementDirV = segment;

        ${P===w.LineMarkerAnchor.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),y===w.LineMarkerSpace.Screen&&(k.uniforms.add(new f.Matrix4BindUniform("inverseProjectionMatrix",(({camera:e})=>e.inverseProjectionMatrix))),k.code.add(h.glsl`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),k.code.add(h.glsl`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),k.uniforms.add(new g.FloatBindUniform("perScreenPixelRatio",(({camera:e})=>e.perScreenPixelRatio))),k.code.add(h.glsl`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${h.If(e.hasCap,"if(prev.z > posLeft.z) {\n                vec2 diff = posLeft.xy - posRight.xy;\n                planeOrigin.xy += perpendicular(diff) / 2.0;\n             }")};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),c.addPixelRatio(k),k.main.add(h.glsl`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      float lineWidth = getLineWidth();
      float screenMarkerSize = getScreenMarkerSize();

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);
      clip(pos, prev);

      ${L?h.glsl`${h.If(e.hideOnShortSegments,h.glsl`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:h.glsl`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${h.If(y===w.LineMarkerSpace.Screen,h.glsl`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${h.If(!L,"vUV *= displacedPosScreen.w;")}
      ${h.If(z,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),M.include(i.SliceDraw,e),x.include(S.outputColorHighlightOID,e),M.include(s.ColorConversion),M.uniforms.add(new v.Float4PassUniform("intrinsicColor",(({color:e})=>e)),new m.Texture2DPassUniform("tex",(({markerTexture:e})=>e))).constants.add("texelSize","float",1/r.markerTextureSize).code.add(h.glsl`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),z&&M.constants.add("relativeMarkerSize","float",r.markerSymbolSize/r.markerTextureSize).constants.add("relativeTipLineWidth","float",r.markerTipThicknessFactor).code.add(h.glsl`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${h.If(L,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),x.include(o.OutputHighlight,e),M.main.add(h.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${h.If(!L,"* gl_FragCoord.w")};
    finalColor.a *= ${z?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),x}const y=Object.freeze(Object.defineProperty({__proto__:null,build:x},Symbol.toStringTag,{value:"Module"}));e.LineMarker=y,e.build=x}));