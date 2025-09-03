// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/3d/webgl-engine/materials/PatternStyle","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],(function(e,o,t,l,r,a,i,n,d,c,s,g,v,u,p,f,m){"use strict";const w=.70710678118,b=w;function h(e){const h=new m.ShaderBuilder,{vertex:y,fragment:S,attributes:x,varyings:C}=h,V=e.output===o.ShaderOutput.Highlight;c.addProjViewLocalOrigin(y,e),h.include(l.Transform,e),h.include(a.VertexColor,e),h.include(n.VisualVariables,e),h.include(r.ObjectAndLayerIdColor,e),h.fragment.include(t.SliceDraw,e),h.include(f.outputColorHighlightOID,e),h.include(i.terrainDepthTest,e),e.draped?y.uniforms.add(new g.FloatBindUniform("worldToScreenRatio",(e=>1/e.screenToPCSRatio))):x.add(u.VertexAttribute.BOUNDINGRECT,"mat3"),x.add(u.VertexAttribute.POSITION,"vec3"),x.add(u.VertexAttribute.UVMAPSPACE,"vec4"),e.vvColor&&x.add(u.VertexAttribute.COLORFEATUREATTRIBUTE,"float"),e.hasVertexColors||C.add("vColor","vec4"),C.add("vpos","vec3",{invariant:!0}),C.add("vuv","vec2"),y.uniforms.add(new s.Float4PassUniform("uColor",(e=>e.color)));const T=e.style===p.Style.ForwardDiagonal||e.style===p.Style.BackwardDiagonal||e.style===p.Style.DiagonalCross;return T&&y.code.add(v.glsl`
      const mat2 rotate45 = mat2(${v.glsl.float(w)}, ${v.glsl.float(-.70710678118)},
                                 ${v.glsl.float(b)}, ${v.glsl.float(w)});
    `),e.draped||(c.addCameraPosition(y,e),y.uniforms.add(new g.FloatBindUniform("worldToScreenPerDistanceRatio",(e=>1/e.camera.perScreenPixelRatio))),y.code.add(v.glsl`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),y.code.add(v.glsl`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),y.code.add(v.glsl`
      float boundingRectDistanceToCamera() {
        vec3 center = vec3(boundingRect[0][0], boundingRect[0][1], boundingRect[0][2]);
        vec3 halfU = vec3(boundingRect[1][0], boundingRect[1][1], boundingRect[1][2]);
        vec3 halfV = vec3(boundingRect[2][0], boundingRect[2][1], boundingRect[2][2]);
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${v.glsl.float(.08715574274)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),y.code.add(v.glsl`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${v.If(T," * rotate45")};
      vec2 uvCellOrigin = uvMapSpace.zw ${v.If(T," * rotate45")};

      ${v.If(!e.draped,v.glsl`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${v.glsl.float(10)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),y.main.add(v.glsl`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardNormalizedVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?"vColor *= uColor;":e.vvColor?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
    gl_Position = transformPosition(proj, view, vpos);
  `),S.include(d.ColorConversion),e.draped&&S.uniforms.add(new g.FloatBindUniform("texelSize",(e=>1/e.camera.pixelRatio))),V||(S.code.add(v.glsl`
      const float lineWidth = ${v.glsl.float(1)};
      const float spacing = ${v.glsl.float(10)};
      const float spacingINV = ${v.glsl.float(.1)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||S.code.add(v.glsl`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),S.main.add(v.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${v.If(!V,v.glsl`color.a *= ${function(e){function o(o){return e.draped?v.glsl`coverage(vuv.${o}, texelSize)`:v.glsl`sampleAA(vuv.${o})`}switch(e.style){case p.Style.ForwardDiagonal:case p.Style.Horizontal:return o("y");case p.Style.BackwardDiagonal:case p.Style.Vertical:return o("x");case p.Style.DiagonalCross:case p.Style.Cross:return v.glsl`1.0 - (1.0 - ${o("x")}) * (1.0 - ${o("y")})`;default:return"0.0"}}(e)};`)}
    outputColorHighlightOID(color, vpos, color.rgb);
  `),h}const y=Object.freeze(Object.defineProperty({__proto__:null,build:h},Symbol.toStringTag,{value:"Module"}));e.Pattern=y,e.build=h}));