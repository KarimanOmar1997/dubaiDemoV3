// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","../views/3d/webgl-engine/core/shaderLibrary/Laserline.glsl","../views/3d/webgl-engine/core/shaderModules/Float2BindUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder"],(function(e,t,a,r,i,o,n,l,s,d,c,v,p,m){"use strict";function g(e){const a=new m.ShaderBuilder;a.include(o.Laserline,e);const{vertex:i,fragment:g}=a;i.uniforms.add(new v.Matrix4PassUniform("modelView",((e,{camera:a})=>t.translate(u,a.viewMatrix,e.origin))),new c.Matrix4BindUniform("proj",(({camera:e})=>e.projectionMatrix)),new s.FloatPassUniform("glowWidth",((e,{camera:t})=>e.glowWidth*t.pixelRatio)),new n.Float2BindUniform("pixelToNDC",(({camera:e})=>r.set(w,2/e.fullViewport[2],2/e.fullViewport[3])))),a.attributes.add(p.VertexAttribute.START,"vec3"),a.attributes.add(p.VertexAttribute.END,"vec3"),e.spherical&&(a.attributes.add(p.VertexAttribute.START_UP,"vec3"),a.attributes.add(p.VertexAttribute.END_UP,"vec3")),a.attributes.add(p.VertexAttribute.EXTRUDE,"vec2"),a.varyings.add("uv","vec2"),a.varyings.add("vViewStart","vec3"),a.varyings.add("vViewEnd","vec3"),a.varyings.add("vViewSegmentNormal","vec3"),a.varyings.add("vViewStartNormal","vec3"),a.varyings.add("vViewEndNormal","vec3");const x=!e.spherical;return i.main.add(d.glsl`
    vec3 pos = mix(start, end, extrude.x);

    vec4 viewPos = modelView * vec4(pos, 1);
    vec4 projPos = proj * viewPos;
    vec2 ndcPos = projPos.xy / projPos.w;

    // in planar we hardcode the up vectors to be Z-up */
    ${d.If(x,d.glsl`vec3 startUp = vec3(0, 0, 1);`)}
    ${d.If(x,d.glsl`vec3 endUp = vec3(0, 0, 1);`)}

    // up vector corresponding to the location of the vertex, selecting either startUp or endUp */
    vec3 up = extrude.y * mix(startUp, endUp, extrude.x);
    vec3 viewUp = (modelView * vec4(up, 0)).xyz;

    vec4 projPosUp = proj * vec4(viewPos.xyz + viewUp, 1);
    vec2 projUp = normalize(projPosUp.xy / projPosUp.w - ndcPos);

    // extrude ndcPos along projUp to the edge of the screen
    vec2 lxy = abs(sign(projUp) - ndcPos);
    ndcPos += length(lxy) * projUp;

    vViewStart = (modelView * vec4(start, 1)).xyz;
    vViewEnd = (modelView * vec4(end, 1)).xyz;

    vec3 viewStartEndDir = vViewEnd - vViewStart;

    vec3 viewStartUp = (modelView * vec4(startUp, 0)).xyz;

    // the normal of the plane that aligns with the segment and the up vector
    vViewSegmentNormal = normalize(cross(viewStartUp, viewStartEndDir));

    // the normal orthogonal to the segment normal and the start up vector
    vViewStartNormal = -normalize(cross(vViewSegmentNormal, viewStartUp));

    // the normal orthogonal to the segment normal and the end up vector
    vec3 viewEndUp = (modelView * vec4(endUp, 0)).xyz;
    vViewEndNormal = normalize(cross(vViewSegmentNormal, viewEndUp));

    // Add enough padding in the X screen space direction for "glow"
    float xPaddingPixels = sign(dot(vViewSegmentNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
    ndcPos.x += xPaddingPixels * pixelToNDC.x;

    // uv is used to read back depth to reconstruct the position at the fragment
    uv = ndcPos * 0.5 + 0.5;

    gl_Position = vec4(ndcPos, 0, 1);
  `),g.uniforms.add(new l.FloatBindUniform("perScreenPixelRatio",(e=>e.camera.perScreenPixelRatio))),g.code.add(d.glsl`float planeDistance(vec3 planeNormal, vec3 planeOrigin, vec3 pos) {
return dot(planeNormal, pos - planeOrigin);
}
float segmentDistancePixels(vec3 segmentNormal, vec3 startNormal, vec3 endNormal, vec3 pos, vec3 start, vec3 end) {
float distSegmentPlane = planeDistance(segmentNormal, start, pos);
float distStartPlane = planeDistance(startNormal, start, pos);
float distEndPlane = planeDistance(endNormal, end, pos);
float dist = max(max(distStartPlane, distEndPlane), abs(distSegmentPlane));
float width = fwidth(distSegmentPlane);
float maxPixelDistance = length(pos) * perScreenPixelRatio * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}`),g.main.add(d.glsl`fragColor = vec4(0.0);
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
return;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
return;
}
float distance = segmentDistancePixels(
vViewSegmentNormal,
vViewStartNormal,
vViewEndNormal,
pos,
vViewStart,
vViewEnd
);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewSegmentNormal))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);`),a}const w=i.create(),u=a.create(),x=Object.freeze(Object.defineProperty({__proto__:null,build:g},Symbol.toStringTag,{value:"Module"}));e.LaserlinePath=x,e.build=g}));