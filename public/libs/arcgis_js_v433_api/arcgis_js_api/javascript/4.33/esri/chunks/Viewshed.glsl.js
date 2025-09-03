// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PiUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/LocalFromScreenSpace.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/core/shaderModules/Matrix4sPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/ShaderBuilder"],(function(e,i,s,o,a,t,r,n,d,l,h,c,v,w,f,p,g,u){"use strict";class m extends r.LocalFromScreenSpacePassParameters{constructor(){super(...arguments),this.shadowMap={depthTexture:null,nearFar:[1,100],numActiveFaces:1,atlasRegions:[[0,0,1,1]]},this.targetVector=[1,0,0],this.upVector=[0,0,1],this.fovs=[45,45],this.headingAndTilt=[0,0],this.observerOffset=[0,0,0],this.projectionMatrices=s.IDENTITY.flat(),this.viewMatrices=s.IDENTITY.flat(),this.volumeOffset=0}}function x(){const e=new u.ShaderBuilder,s=e.fragment;return e.include(o.ScreenSpacePass),e.include(r.localFromScreenSpace),s.include(a.ReadDepth),s.include(t.PiUtils),s.uniforms.add(new p.Texture2DBindUniform("depthTexture",(e=>e.depth?.attachment)),new w.Matrix4BindUniform("inverseProjectionMatrix",(e=>e.camera.inverseProjectionMatrix)),new w.Matrix4BindUniform("inverseViewNormalMatrix",(({camera:e})=>i.invertOrIdentity(V,e.viewInverseTransposeMatrix))),new d.Float3PassUniform("viewshedObserverOffset",(e=>e.observerOffset)),new d.Float3PassUniform("viewshedTargetVector",(e=>e.targetVector)),new d.Float3PassUniform("viewshedUpVector",(e=>e.upVector)),new n.Float2PassUniform("viewshedFOVs",(e=>e.fovs)),new n.Float2PassUniform("viewshedHeadingAndTilt",(e=>e.headingAndTilt)),new n.Float2PassUniform("viewshedNearFar",(e=>e.shadowMap.nearFar??[1,100])),new l.FloatPassUniform("viewshedVolumeOffset",(e=>e.volumeOffset)),new g.Texture2DPassUniform("viewshedShadowMap",(e=>e.shadowMap.depthTexture)),new f.Matrix4sPassUniform("viewshedProjectionMatrices",(e=>e.projectionMatrices),6),new f.Matrix4sPassUniform("viewshedViewMatrices",(e=>e.viewMatrices),6),new v.IntegerPassUniform("viewshedNumFaces",(e=>e.shadowMap.numActiveFaces)),new h.FloatsPassUniform("viewshedAtlasRegions",(e=>e.shadowMap.atlasRegions.flat()),24),new g.Texture2DPassUniform("normalMap",(e=>e.normals))),s.constants.add("visibleColor","vec4",[0,1,0,.5]),s.constants.add("occludedColor","vec4",[1,0,0,.5]),s.code.add(c.glsl`vec2 getViewshedUv(vec4 worldPosition, int face) {
mat4 viewshedMatrix = viewshedProjectionMatrices[face];
vec4 viewshedUv4 = viewshedMatrix * worldPosition;
vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
return viewshedUv.xy;
}
float viewshedDepthToFloat(float depth) {
return (depth - viewshedNearFar[0]) / (viewshedNearFar[1] - viewshedNearFar[0]);
}
float getOrthographicDepthToViewshed(vec4 worldPosition, int face) {
mat4 viewshedViewMatrix = viewshedViewMatrices[face];
vec4 viewshedUv4 = viewshedViewMatrix * worldPosition;
vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
float depth = -viewshedUv.z;
return viewshedDepthToFloat(depth);
}
float viewshedReadShadowMapDepth(sampler2D _viewshedShadowmap, ivec2 uv) {
return texelFetch(_viewshedShadowmap, uv, 0).r;
}
float viewshedFilterShadow(sampler2D _viewshedShadowmap, vec2 uv) {
vec2 uvScaled = uv * vec2(textureSize(_viewshedShadowmap, 0));
vec2 st    = fract(uvScaled);
ivec2 base = ivec2(uvScaled);
float s00 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x,     base.y    ));
float s10 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x + 1, base.y    ));
float s11 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x + 1, base.y + 1));
float s01 = viewshedReadShadowMapDepth( _viewshedShadowmap, ivec2(base.x,     base.y + 1));
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float viewshedTextureAtlasLookup(sampler2D _viewshedShadowmap, vec2 uv, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(uv) * atlasScale + atlasRegion.xy;
return viewshedFilterShadow(_viewshedShadowmap, uvAtlas);
}
float getDepthFromShadowMap(vec2 uv, int face) {
int index = 4 * face;
float umin = viewshedAtlasRegions[index];
float umax = viewshedAtlasRegions[index + 1];
float vmin = viewshedAtlasRegions[index + 2];
float vmax = viewshedAtlasRegions[index + 3];
vec4 atlasRegion = vec4(umin, vmin, umax, vmax);
return viewshedTextureAtlasLookup(viewshedShadowMap, uv, atlasRegion);
}
struct ViewshedPoint {
int face;
vec2 uv;
bool isWithin;
float orthographicDepth;
};
mat3 rotationMatrix(vec3 axis, float angle)
{
float s = sin(angle);
float c = cos(angle);
float oc = 1.0 - c;
return mat3(
oc * axis.xxz * axis.xyx + vec3(c, axis.zy) * vec3(1., -s, s),
oc * axis.xyy * axis.yyz + vec3(axis.z, c, axis.x) * vec3(s, 1., -s),
oc * axis.zyz * axis.xzz + vec3(axis.yx, c) * vec3(-s, s, 1.)
);
}
float distanceToPlane(vec3 position, vec3 normal) {
return dot(position, normal);
}
bool outsideViewshed(float distance) {
return distance > -viewshedVolumeOffset;
}
bool isWithinViewshed(vec3 position) {
float positionLength = length(position - viewshedObserverOffset);
float farSphereDistance = positionLength - viewshedNearFar[1];
if (outsideViewshed(farSphereDistance)) { return false; }
float nearSphereDistance = viewshedNearFar[0] - positionLength;
if (outsideViewshed(nearSphereDistance)) { return false; }
vec3 westVector = normalize(cross(viewshedUpVector, viewshedTargetVector));
bool leftOfTarget = distanceToPlane(position, westVector) > 0.0;
if (viewshedFOVs[0] < TWO_PI) {
float horAngle = viewshedFOVs[0] / 2.0;
horAngle = leftOfTarget ? horAngle : -horAngle;
vec3 sideVector = viewshedTargetVector * rotationMatrix(viewshedUpVector, horAngle);
bool inFront = distanceToPlane(position, sideVector) > 0.0;
if (inFront) {
vec3 sideNormal = cross(viewshedUpVector, sideVector) * (leftOfTarget ? 1. : -1.);
float sideDistance = distanceToPlane(position, normalize(sideNormal));
if (outsideViewshed(sideDistance)) { return false; }
} else if (viewshedFOVs[0] < PI) { return false; }
}
if (viewshedFOVs[1] < PI) {
float t = dot(viewshedUpVector, position);
vec3 nProjVector = normalize(position - t * viewshedUpVector);
float heading = acos(clamp(dot(normalize(viewshedTargetVector), nProjVector), -1.0, 1.0));
heading = leftOfTarget ? heading : -heading;
bool aboveTarget = distanceToPlane(position, viewshedUpVector) > 0.0;
float verFOV = viewshedFOVs[1] / 2.0;
verFOV = aboveTarget ? -verFOV : verFOV;
mat3 rotateByHeading = rotationMatrix(viewshedUpVector, heading);
vec3 sideVector = viewshedTargetVector * rotationMatrix(westVector, verFOV) * rotateByHeading;
vec3 leftVector = westVector * rotateByHeading;
vec3 sideNormal = cross(sideVector, leftVector) * (aboveTarget ? 1. : -1.);
float sideDistance = distanceToPlane(position, normalize(sideNormal));
if (outsideViewshed(sideDistance)) { return false; }
}
return true;
}
bool getViewshedPoint(vec4 localPosition, out ViewshedPoint point) {
for(int i=0; i < viewshedNumFaces; i++) {
vec2 viewshedUv = getViewshedUv(localPosition, i);
if (viewshedUv.x > 0. && viewshedUv.x < 1. && viewshedUv.y > 0. && viewshedUv.y < 1.) {
float orthoDepth = getOrthographicDepthToViewshed(localPosition, i);
if (orthoDepth >= 0.) {
bool isWithin = isWithinViewshed(localPosition.xyz);
point = ViewshedPoint(i, viewshedUv, isWithin, orthoDepth);
return true;
}
}
}
return false;
}
float normalCosAngle(float linearDepth, vec3 localPosition) {
vec4 normal4 = texture(normalMap, uv);
vec3 normalN = normalize(normal4.xyz * 2.0 - 1.0);
vec3 normal =  normalize((inverseViewNormalMatrix * vec4(normalN, 1.0)).xyz);
vec3 viewingDir = normalize(localPosition);
return dot(normal, viewingDir);
}`),s.main.add(c.glsl`float depth = depthFromTexture(depthTexture, uv);
if (depth >= 1.0 || depth <= 0.0) {
return;
}
float linearDepth = linearizeDepth(depth);
vec4 localPosition = reconstructLocalPosition(gl_FragCoord.xy, linearDepth);
ViewshedPoint point;
bool foundFace = getViewshedPoint(localPosition, point);
if (!foundFace || !point.isWithin) {
return;
}
float viewshedDepth = getDepthFromShadowMap(point.uv, point.face);
float distance = point.orthographicDepth;
bool visible = distance < viewshedDepth;
fragColor = visible ? visibleColor : occludedColor;
float cosAngle = normalCosAngle(linearDepth, localPosition.xyz);
float threshold = -0.01;
if (cosAngle > threshold) {
fragColor = occludedColor;
}`),e}const V=s.create(),P=Object.freeze(Object.defineProperty({__proto__:null,ViewshedPassParameters:m,build:x},Symbol.toStringTag,{value:"Module"}));e.Viewshed=P,e.ViewshedPassParameters=m,e.build=x}));