// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/mathUtils","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","./vec32","../core/libs/gl-matrix-2/factories/vec3f64","./vec42","../core/libs/gl-matrix-2/factories/vec4f64","../geometry/support/lineSegment","../geometry/support/plane","./sphere","../views/3d/webgl-engine/core/shaderLibrary/Laserline.glsl","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/webgl/ShaderBuilder"],(function(e,i,t,n,a,l,o,r,s,c,d,f,g,h,p,m,u,P,w,x,b){"use strict";const v=i.deg2rad(6);function M(e){const i=new b.ShaderBuilder;i.include(g.ScreenSpacePass),i.include(f.Laserline,e);const t=i.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(t.uniforms.add(new w.FloatPassUniform("maxPixelDistance",((i,t)=>e.heightManifoldEnabled?2*t.camera.computeScreenPixelSizeAt(i.heightManifoldTarget):2*t.camera.computeScreenPixelSizeAt(i.lineVerticalPlaneSegment.origin)))),t.code.add(x.glsl`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){const e=(e,i,t)=>a.transformMat4(e,i.heightManifoldTarget,t.camera.viewMatrix),i=(e,i)=>a.transformMat4(e,[0,0,0],i.camera.viewMatrix);t.uniforms.add(new u.Float4PassUniform("heightManifoldOrigin",((t,n)=>(e(L,t,n),i(F,n),a.subtract(F,F,L),a.normalize(A,F),A[3]=a.length(F),A))),new p.Float3BindUniform("globalOrigin",(e=>i(L,e))),new w.FloatPassUniform("cosSphericalAngleThreshold",((e,i)=>1-Math.max(2,a.distance(i.camera.eye,e.heightManifoldTarget)*i.camera.perRenderPixelRatio)/a.length(e.heightManifoldTarget)))),t.code.add(x.glsl`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else t.code.add(x.glsl`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(t.uniforms.add(new w.FloatPassUniform("maxPixelDistance",((e,i)=>2*i.camera.computeScreenPixelSizeAt(e.pointDistanceTarget)))),t.code.add(x.glsl`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&t.uniforms.add(new P.FloatBindUniform("perScreenPixelRatio",(e=>e.camera.perScreenPixelRatio))).code.add(x.glsl`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&t.code.add(x.glsl`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),t.main.add(x.glsl`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),e.heightManifoldEnabled){t.uniforms.add(new h.Float2PassUniform("angleCutoff",(e=>D(e))),new u.Float4PassUniform("heightPlane",((e,i)=>S(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,L),i.camera.viewMatrix))));const i=e.spherical?x.glsl`normalize(globalOrigin - pos)`:x.glsl`heightPlane.xyz`;t.main.add(x.glsl`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${i})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return e.pointDistanceEnabled&&(t.uniforms.add(new h.Float2PassUniform("angleCutoff",(e=>D(e))),new u.Float4PassUniform("pointDistanceSphere",((e,i)=>function(e,i){return a.transformMat4(d.getCenter(O),e.pointDistanceOrigin,i.camera.viewMatrix),O[3]=a.distance(e.pointDistanceOrigin,e.pointDistanceTarget),O}(e,i)))),t.main.add(x.glsl`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),e.lineVerticalPlaneEnabled&&(t.uniforms.add(new h.Float2PassUniform("angleCutoff",(e=>D(e))),new u.Float4PassUniform("lineVerticalPlane",((e,i)=>function(e,i){const t=s.pointAt(e.lineVerticalPlaneSegment,.5,L),n=e.renderCoordsHelper.worldUpAtPosition(t,U),l=a.normalize(F,e.lineVerticalPlaneSegment.vector),o=a.cross(L,n,l);return a.normalize(o,o),S(e.lineVerticalPlaneSegment.origin,o,i.camera.viewMatrix)}(e,i))),new m.Float3PassUniform("lineVerticalStart",((e,i)=>function(e,i){const t=a.copy(L,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(t,0),a.transformMat4(t,t,i.camera.viewMatrix)}(e,i))),new m.Float3PassUniform("lineVerticalEnd",((e,i)=>function(e,i){const t=a.add(L,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(t,0),a.transformMat4(t,t,i.camera.viewMatrix)}(e,i)))),t.main.add(x.glsl`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),e.intersectsLineEnabled&&(t.uniforms.add(new h.Float2PassUniform("angleCutoff",(e=>D(e))),new m.Float3PassUniform("intersectsLineStart",((e,i)=>a.transformMat4(L,e.lineStartWorld,i.camera.viewMatrix))),new m.Float3PassUniform("intersectsLineEnd",((e,i)=>a.transformMat4(L,e.lineEndWorld,i.camera.viewMatrix))),new m.Float3PassUniform("intersectsLineDirection",((e,i)=>(a.copy(A,e.intersectsLineSegment.vector),A[3]=0,a.normalize(L,o.transformMat4(A,A,i.camera.viewMatrix))))),new w.FloatPassUniform("intersectsLineRadius",(e=>e.intersectsLineRadius))),t.main.add(x.glsl`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),t.main.add(x.glsl`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),i}function D(e){return t.set(C,Math.cos(e.angleCutoff),Math.cos(Math.max(0,e.angleCutoff-i.deg2rad(2))))}function S(e,i,t){return a.transformMat4(y,e,t),a.copy(A,i),A[3]=0,o.transformMat4(A,A,t),c.fromPositionAndNormal(y,A,V)}const C=n.create(),L=l.create(),A=r.create(),U=l.create(),F=l.create(),y=l.create(),V=c.create(),O=d.create(),z=Object.freeze(Object.defineProperty({__proto__:null,build:M,defaultAngleCutoff:v},Symbol.toStringTag,{value:"Module"}));e.Laserlines=z,e.build=M,e.defaultAngleCutoff=v}));