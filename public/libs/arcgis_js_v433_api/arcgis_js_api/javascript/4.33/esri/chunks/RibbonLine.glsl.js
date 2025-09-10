// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/RibbonVertexPosition.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/LineStipple.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MarkerSizing.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PiUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float2BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/shaders/LineMarkerTechniqueConfiguration","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/3d/webgl-engine/shaders/RibbonLineTechniqueConfiguration","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,i,t,n,r,o,a,l,s,d,p,c,g,m,v,f,h,u,S,D,x,b,L,w){"use strict";function y(e){const y=new L.ShaderBuilder,{attributes:P,varyings:C,vertex:F,fragment:A}=y,{applyMarkerOffset:R,draped:z,output:T,capType:j,stippleEnabled:V,falloffEnabled:W,roundJoins:O,wireframe:E,innerColorEnabled:U}=e;A.include(l.PiUtils),y.include(r.RibbonVertexPosition,e),y.include(o.LineStipple,e),y.include(n.ObjectAndLayerIdColor,e),y.include(s.terrainDepthTest,e);const M=R&&!z;M&&(F.uniforms.add(new f.FloatPassUniform("markerScale",(e=>e.markerScale))),y.include(a.MarkerSizing,{space:D.LineMarkerSpace.World})),p.addProjViewLocalOrigin(F,e),F.uniforms.add(new u.Matrix4BindUniform("inverseProjectionMatrix",(e=>e.camera.inverseProjectionMatrix)),new c.Float2BindUniform("nearFar",(e=>e.camera.nearFar)),new f.FloatPassUniform("miterLimit",(e=>"miter"!==e.join?0:e.miterLimit)),new g.Float4BindUniform("viewport",(e=>e.camera.fullViewport))),F.constants.add("LARGE_HALF_FLOAT","float",65500),P.add(S.VertexAttribute.POSITION,"vec3"),P.add(S.VertexAttribute.PREVIOUSDELTA,"vec4"),P.add(S.VertexAttribute.NEXTDELTA,"vec4"),P.add(S.VertexAttribute.LINEPARAMETERS,"vec2"),P.add(S.VertexAttribute.U0,"float"),C.add("vColor","vec4"),C.add("vpos","vec3",{invariant:!0}),C.add("vLineDistance","float"),C.add("vLineWidth","float");const N=V;N&&C.add("vLineSizeInv","float");const _=j===b.CapType.ROUND,I=V&&_,B=W||I;B&&C.add("vLineDistanceNorm","float"),_&&(C.add("vSegmentSDF","float"),C.add("vReverseSegmentSDF","float")),F.code.add(h.glsl`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),F.code.add(h.glsl`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),F.code.add(h.glsl`void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
float vnp = nearFar[0] * 0.99;
if(pos.z > -nearFar[0]) {
if (!isStartVertex) {
if(prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if(next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
forwardViewPosDepth(pos.xyz);
pos = projectAndScale(pos);
next = projectAndScale(next);
prev = projectAndScale(prev);
}`),p.addPixelRatio(F),F.constants.add("aaWidth","float",V?0:1).main.add(h.glsl`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y)-3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(lineParameters.y) < 3.0;
      float lineSize = getSize();

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = lineWidth;
      ${N?h.glsl`vLineSizeInv = 1.0 / lineSize;`:""}

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);
  `),M&&F.main.add(h.glsl`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),F.main.add(h.glsl`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),(V||_)&&F.main.add(h.glsl`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${_?h.glsl`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),F.main.add(h.glsl`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),O?F.main.add(h.glsl`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${V?h.glsl`min(1.0, subdivisionFactor * ${h.glsl.float(1.5)})`:h.glsl`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):F.main.add(h.glsl`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const k=j!==b.CapType.BUTT;return F.main.add(h.glsl`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${k?h.glsl`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),F.main.add(h.glsl`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = sign(lineParameters.y) * pos.w;

    vLineDistance =  lineWidth * lineDistNorm;
    ${B?h.glsl`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),_&&F.main.add(h.glsl`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),V&&(z?F.uniforms.add(new v.FloatBindUniform("worldToScreenRatio",(e=>1/e.screenToPCSRatio))):F.main.add(h.glsl`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),F.main.add(h.glsl`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),z?F.main.add(h.glsl`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):F.main.add(h.glsl`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),F.uniforms.add(new f.FloatPassUniform("stipplePatternPixelSize",(e=>o.computePixelSize(e)))),F.main.add(h.glsl`float patternLength = lineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits *= pos.w;
vStippleDistance *= pos.w;
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),F.main.add(h.glsl`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${E&&!z?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),y.fragment.include(t.SliceDraw,e),y.include(x.outputColorHighlightOID,e),A.include(d.ColorConversion),A.main.add(h.glsl`discardBySlice(vpos);
discardByTerrainDepth();`),E?A.main.add(h.glsl`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(_&&A.main.add(h.glsl`
        float sdf = min(vSegmentSDF, vReverseSegmentSDF);
        vec2 fragmentPosition = vec2(
          min(sdf, 0.0),
          vLineDistance
        ) * gl_FragCoord.w;

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${h.glsl.float(w.alphaCutoff)}) {
          discard;
        }
      `),I?A.main.add(h.glsl`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${h.glsl.float(w.alphaCutoff)}, stippleCoverage);
      `):A.main.add(h.glsl`float stippleAlpha = getStippleAlpha();`),T!==i.ShaderOutput.ObjectAndLayerIdColor&&A.main.add(h.glsl`discardByStippleAlpha(stippleAlpha, ${h.glsl.float(w.alphaCutoff)});`),A.uniforms.add(new m.Float4PassUniform("intrinsicColor",(e=>e.color))),A.main.add(h.glsl`vec4 color = intrinsicColor * vColor;`),U&&(A.uniforms.add(new m.Float4PassUniform("innerColor",(e=>e.innerColor??e.color)),new f.FloatPassUniform("innerWidth",((e,i)=>e.innerWidth*i.camera.pixelRatio))),A.main.add(h.glsl`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),A.main.add(h.glsl`vec4 finalColor = blendStipple(color, stippleAlpha);`),W&&(A.uniforms.add(new f.FloatPassUniform("falloff",(e=>e.falloff))),A.main.add(h.glsl`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`)),V||A.main.add(h.glsl`float featherStartDistance = max(vLineWidth - 2.0, 0.0);
float value = abs(vLineDistance) * gl_FragCoord.w;
float feather = (value - featherStartDistance) / (vLineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`)),A.main.add(h.glsl`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),y}const P=Object.freeze(Object.defineProperty({__proto__:null,build:y,ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:"Module"}));e.RibbonLine=P,e.build=y,e.ribbonlineNumRoundJoinSubdivisions=1}));