/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{_ as e}from"./tslib.es6.js";import t from"../core/Evented.js";import{l as r,h as i}from"../core/lang.js";import{s}from"./MapUtils.js";import{c as a,f as o}from"./maybe.js";import{P as n}from"./PooledArray.js";import{watch as l,initial as c,on as h,syncAndInitial as d}from"../core/reactiveUtils.js";import{c as u}from"./SetUtils.js";import{property as g}from"../core/accessorSupport/decorators/property.js";import{L as p}from"./Logger.js";import{subclass as f}from"../core/accessorSupport/decorators/subclass.js";import{A as m,v,m as _,i as x,u as y,F as C,j as w,c as b}from"./mat4.js";import{v as S,n as T,j as D,c as O,l as R,k as P,e as M,u as I,t as F,s as E}from"./vec3.js";import{c as j,f as A,o as L}from"./vec3f64.js";import{f as H,G as V,a as z,D as N,b as U}from"./GridLocalOriginFactory.js";import{d as W}from"./debugFlags2.js";import{c as G,D as k,h as q,E as B,w as Z,o as Q}from"./aaBoundingRect.js";import{C as Y,c as X,e as $,i as K,T as J,a as ee,d as te,P as re,I as ie,F as se,S as ae,D as oe,A as ne}from"./SceneLighting.js";import{S as le,i as ce}from"./ShaderOutput.js";import{o as he,M as de,F as ue,U as ge,a as pe,T as fe}from"./Matrix4BindUniform.js";import me from"../views/3d/webgl/RenderCamera.js";import{c as ve}from"./vec4f64.js";import{g as _e}from"./glsl.js";import{d as xe}from"./colorUtils2.js";import{Y as ye,k as Ce,h as we,a9 as be,d as Se,l as Te,as as De,m as Oe,R as Re,E as Pe,ak as Me}from"./Matrix4PassUniform.js";import{j as Ie}from"./unitUtils.js";import{c as Fe,l as Ee,g as je}from"./mathUtils.js";import{s as Ae}from"./signal.js";import{I as Le,c as He}from"./mat4f64.js";import{e as Ve,h as ze,c as Ne}from"./axisAngleDegrees.js";import{h as Ue,c as We}from"./weather.js";import{B as Ge,S as ke}from"./BooleanBindUniform.js";import{B as qe}from"./BindType.js";import{F as Be}from"./Float4DrawUniform.js";import{N as Ze,p as Qe,S as Ye}from"./ShaderTechniqueConfiguration.js";import{S as Xe}from"./ShaderBuilder.js";import $e from"../core/Accessor.js";import{R as Ke,d as Je,O as et}from"./Material.js";import{s as tt,j as rt,b as it,l as st,p as at,e as ot,h as nt,n as lt,f as ct,c as ht}from"./vec2.js";import{InternalRenderCategory as dt}from"../views/3d/webgl.js";import ut from"../views/3d/webgl/RenderNode.js";import{c as gt}from"./vec2f64.js";import{m as pt,d as ft,u as mt}from"./renderState.js";import{i as vt}from"./HighlightDefaults.js";import{R as _t}from"./basicInterfaces.js";import{V as xt}from"./VertexAttribute.js";import{D as yt,c as Ct,b as wt,p as bt,U as St,e as Tt,g as Dt,m as Ot}from"./enums.js";import{V as Rt}from"./VertexElementDescriptor.js";import{V as Pt}from"./VertexArrayObject2.js";import{B as Mt}from"./VertexArrayObject.js";import{a as It,T as Ft}from"./Texture.js";import{N as Et}from"./NestedMap.js";import{A as jt,T as At,U as Lt,V as Ht}from"./BufferView.js";import{M as Vt}from"../core/scheduling.js";import{H as zt}from"./HUDRenderStyle.js";import{c as Nt}from"./mat3f64.js";import{s as Ut,t as Wt}from"./vec4.js";import{V as Gt}from"./ViewingMode.js";import{U as kt}from"./RibbonLineMaterial.js";import{T as qt,n as Bt}from"./Scheduler.js";import{g as Zt}from"./watch.js";import{N as Qt,c as Yt,g as Xt}from"./sphere.js";import{m as $t}from"./mathUtils2.js";var Kt,Jt,er,tr,rr,ir,sr,ar,or,nr;!function(e){e[e.ADD=0]="ADD",e[e.UPDATE=1]="UPDATE",e[e.REMOVE=2]="REMOVE"}(Kt||(Kt={})),function(e){e[e.NONE=0]="NONE",e[e.VISIBILITY=1]="VISIBILITY",e[e.GEOMETRY=2]="GEOMETRY",e[e.TRANSFORMATION=4]="TRANSFORMATION",e[e.HIGHLIGHT=8]="HIGHLIGHT",e[e.OCCLUDEE=16]="OCCLUDEE"}(Jt||(Jt={})),function(e){e[e.INNER=0]="INNER",e[e.OUTER=1]="OUTER"}(er||(er={})),function(e){e[e.REGULAR=0]="REGULAR",e[e.HAS_NORTH_POLE=1]="HAS_NORTH_POLE",e[e.HAS_SOUTH_POLE=2]="HAS_SOUTH_POLE",e[e.HAS_BOTH_POLES=3]="HAS_BOTH_POLES"}(tr||(tr={})),function(e){e[e.FADING=0]="FADING",e[e.IMMEDIATE=1]="IMMEDIATE",e[e.UNFADED=2]="UNFADED"}(rr||(rr={}));class lr{constructor(){this._extent=G(),this.resolution=0,this.renderLocalOrigin=H(0,0,0,"O"),this.pixelRatio=1,this.mapUnitsPerPixel=1,this.canvasGeometries=new cr}get extent(){return this._extent}setupGeometryViews(e){if(this._setupGeometryView(),!e)return;const t=.001*e.range;if(this._extent[0]-t<=e.min){const t=this.canvasGeometries.extents[this.canvasGeometries.numViews++];k(this._extent,e.range,0,t)}if(this._extent[2]+t>=e.max){const t=this.canvasGeometries.extents[this.canvasGeometries.numViews++];k(this._extent,-e.range,0,t)}}_setupGeometryView(){this.canvasGeometries.numViews=1,q(this.canvasGeometries.extents[0],this._extent)}hasSomeSizedView(){for(let e=0;e<this.canvasGeometries.numViews;e++){const t=this.canvasGeometries.extents[e];if(t[0]!==t[2]&&t[1]!==t[3])return!0}return!1}}class cr{constructor(){this.extents=[G(),G(),G()],this.numViews=0}}!function(e){e[e.Color=0]="Color",e[e.ColorNoRasterImage=1]="ColorNoRasterImage",e[e.Highlight=2]="Highlight",e[e.WaterNormal=3]="WaterNormal",e[e.Occluded=4]="Occluded",e[e.ObjectAndLayerIdColor=5]="ObjectAndLayerIdColor"}(ir||(ir={}));class hr{constructor(e,t,r){this._fbos=e,this._format=t,this._name=r}get valid(){return null!=this._handle?.getTexture()}dispose(){this._handle=a(this._handle)}get texture(){return this._handle?.getTexture()}bind(e,t,r){this._handle&&this._handle.fbo?.width===t&&this._handle.fbo?.height===r||(this._handle?.release(),this._handle=this._fbos.acquire(t,r,this._name,this._format)),e.bindFramebuffer(this._handle?.fbo)}generateMipMap(){this._handle?.getTexture()?.descriptor?.hasMipmap&&this._handle?.getTexture()?.generateMipmap()}}class dr{constructor(e,t,r,i,s=Y.RGBA8UNORM_MIPMAP){this.output=r,this.content=i,this.fbo=new hr(e,s,t)}get valid(){return this.fbo.valid}}class ur{constructor(e){this.targets=[new dr(e,"overlay color",le.Color,ir.Color),new dr(e,"overlay IM color",le.Color,ir.ColorNoRasterImage),new dr(e,"overlay highlight",le.Highlight,ir.Highlight,Y.RG8UINT),new dr(e,"overlay water",le.Normal,ir.WaterNormal),new dr(e,"overlay occluded",le.Color,ir.Occluded)],he()&&this.targets.push(new dr(e,"overlay olid",le.ObjectAndLayerIdColor,ir.ObjectAndLayerIdColor,Y.RGBA8UNORM))}getTexture(e){return this.targets[e]?.fbo.texture}dispose(){for(const e of this.targets)e.fbo.dispose()}computeValidity(){return this.targets.reduce(((e,t,r)=>t.valid?e|=1<<r:e),0)}}function gr(e){e.code.add(_e`float normals2FoamIntensity(vec3 n, float waveStrength){
float normalizationFactor =  max(0.015, waveStrength);
return max((n.x + n.y)*0.3303545/normalizationFactor + 0.3303545, 0.0);
}`)}function pr(e){e.code.add(_e`vec3 foamIntensity2FoamColor(float foamIntensityExternal, float foamPixelIntensity, vec3 skyZenitColor, float dayMod){
return foamIntensityExternal * (0.075 * skyZenitColor * pow(foamPixelIntensity, 4.) +  50.* pow(foamPixelIntensity, 23.0)) * dayMod;
}`)}function fr(e){e.code.add(_e`
    const float GAMMA = ${_e.float(xe)};
    const float INV_GAMMA = ${_e.float(1/xe)};

    vec4 delinearizeGamma(vec4 color) {
      return vec4(pow(color.rgb, vec3(INV_GAMMA)), color.a);
    }

    vec3 linearizeGamma(vec3 color) {
      return pow(color, vec3(GAMMA));
    }
  `)}function mr(e,t){if(!t.screenSpaceReflections)return;const r=e.fragment;r.include(ye),r.uniforms.add(new Ce("nearFar",(e=>e.camera.nearFar)),new we("depthMap",(e=>e.depth?.attachment)),new de("proj",(e=>e.camera.projectionMatrix)),new ue("invResolutionHeight",(e=>1/e.camera.height)),new de("reprojectionMatrix",(e=>e.ssr.reprojectionMatrix))).code.add(_e`
  vec2 reprojectionCoordinate(vec3 projectionCoordinate)
  {
    vec4 zw = proj * vec4(0.0, 0.0, -projectionCoordinate.z, 1.0);
    vec4 reprojectedCoord = reprojectionMatrix * vec4(zw.w * (projectionCoordinate.xy * 2.0 - 1.0), zw.z, zw.w);
    reprojectedCoord.xy /= reprojectedCoord.w;
    return reprojectedCoord.xy * 0.5 + 0.5;
  }

  const int maxSteps = ${t.highStepCount?"150":"75"};

  vec4 applyProjectionMat(mat4 projectionMat, vec3 x)
  {
    vec4 projectedCoord =  projectionMat * vec4(x, 1.0);
    projectedCoord.xy /= projectedCoord.w;
    projectedCoord.xy = projectedCoord.xy*0.5 + 0.5;
    return projectedCoord;
  }

  vec3 screenSpaceIntersection(vec3 dir, vec3 startPosition, vec3 viewDir, vec3 normal)
  {
    vec3 viewPos = startPosition;
    vec3 viewPosEnd = startPosition;

    // Project the start position to the screen
    vec4 projectedCoordStart = applyProjectionMat(proj, viewPos);
    vec3  Q0 = viewPos / projectedCoordStart.w; // homogeneous camera space
    float k0 = 1.0/ projectedCoordStart.w;

    // advance the position in the direction of the reflection
    viewPos += dir;

    vec4 projectedCoordVanishingPoint = applyProjectionMat(proj, dir);

    // Project the advanced position to the screen
    vec4 projectedCoordEnd = applyProjectionMat(proj, viewPos);
    vec3  Q1 = viewPos / projectedCoordEnd.w; // homogeneous camera space
    float k1 = 1.0/ projectedCoordEnd.w;

    // calculate the reflection direction in the screen space
    vec2 projectedCoordDir = (projectedCoordEnd.xy - projectedCoordStart.xy);
    vec2 projectedCoordDistVanishingPoint = (projectedCoordVanishingPoint.xy - projectedCoordStart.xy);

    float yMod = min(abs(projectedCoordDistVanishingPoint.y), 1.0);

    float projectedCoordDirLength = length(projectedCoordDir);
    float maxSt = float(maxSteps);

    // normalize the projection direction depending on maximum steps
    // this determines how blocky the reflection looks
    vec2 dP = yMod * (projectedCoordDir)/(maxSt * projectedCoordDirLength);

    // Normalize the homogeneous camera space coordinates
    vec3  dQ = yMod * (Q1 - Q0)/(maxSt * projectedCoordDirLength);
    float dk = yMod * (k1 - k0)/(maxSt * projectedCoordDirLength);

    // initialize the variables for ray marching
    vec2 P = projectedCoordStart.xy;
    vec3 Q = Q0;
    float k = k0;
    float rayStartZ = -startPosition.z; // estimated ray start depth value
    float rayEndZ = -startPosition.z;   // estimated ray end depth value
    float prevEstimateZ = -startPosition.z;
    float rayDiffZ = 0.0;
    float dDepth;
    float depth;
    float rayDiffZOld = 0.0;

    // early outs
    if (dot(normal, dir) < 0.0 || dot(-viewDir, normal) < 0.0)
      return vec3(P, 0.0);
    float dDepthBefore = 0.0;

    for(int i = 0; i < maxSteps-1; i++)
    {
      depth = -linearDepthFromTexture(depthMap, P); // get linear depth from the depth buffer

      // estimate depth of the marching ray
      rayStartZ = prevEstimateZ;
      dDepth = -rayStartZ - depth;
      rayEndZ = (dQ.z * 0.5 + Q.z)/ ((dk * 0.5 + k));
      rayDiffZ = rayEndZ- rayStartZ;
      prevEstimateZ = rayEndZ;

      if(-rayEndZ > nearFar[1] || -rayEndZ < nearFar[0] || P.y < 0.0  || P.y > 1.0 )
      {
        return vec3(P, 0.);
      }

      // If we detect a hit - return the intersection point, two conditions:
      //  - dDepth > 0.0 - sampled point depth is in front of estimated depth
      //  - if difference between dDepth and rayDiffZOld is not too large
      //  - if difference between dDepth and 0.025/abs(k) is not too large
      //  - if the sampled depth is not behind far plane or in front of near plane

      if((dDepth) < 0.025/abs(k) + abs(rayDiffZ) && dDepth > 0.0 && depth > nearFar[0] && depth < nearFar[1] && abs(P.y - projectedCoordStart.y) > invResolutionHeight)
      {
        float weight = dDepth / (dDepth - dDepthBefore);
        vec2 Pf = mix(P - dP, P, 1.0 - weight);
        if (abs(Pf.y - projectedCoordStart.y) > invResolutionHeight) {
          return vec3(Pf, depth);
        }
        else {
          return vec3(P, depth);
        }
      }

      // continue with ray marching
      P = clamp(P + dP, vec2(0.0), vec2(0.999));
      Q.z += dQ.z;
      k += dk;
      rayDiffZOld = rayDiffZ;
      dDepthBefore = dDepth;
    }
    return vec3(P, 0.0);
  }
  `)}!function(e){e[e.Material=0]="Material",e[e.ShadowMap=1]="ShadowMap",e[e.Highlight=2]="Highlight",e[e.ViewshedShadowMap=3]="ViewshedShadowMap"}(sr||(sr={})),function(e){e[e.Idle=0]="Idle",e[e.Rendering=1]="Rendering",e[e.Ready=2]="Ready",e[e.Fading=3]="Fading"}(ar||(ar={})),function(e){e[e.RG=0]="RG",e[e.BA=1]="BA",e[e.COUNT=2]="COUNT"}(or||(or={}));class vr{constructor(){this.startTime=0,this._data=Ae(null),this.coverage=0,this.absorption=0,this._readChannels=or.RG,this.parallax=new _r,this.parallaxNew=new _r,this._anchorPoint=j(),this._fadeState=Ae(nr.HIDE),this._fadeFactor=Ae(1)}get data(){return this._data.value}set data(e){this._data.value=e}get readChannels(){return this._readChannels}get fadeState(){return this._fadeState.value}get fadeFactor(){return this._fadeFactor.value}get opacity(){switch(this.fadeState){case nr.HIDE:return 0;case nr.FADE_OUT:return 1-this.fadeFactor;case nr.FADE_IN:return this.fadeFactor;case nr.SHOW:case nr.CROSS_FADE:return 1}}fade(e,t,r){this.isFading&&this.fadeFactor<1&&(this._fadeFactor.value=r?Fe((t-this.startTime)/(wr*r),0,1):1,1===this.fadeFactor&&this._endFade()),this._evaluateState(e,t),this._updateParallax(e)}_evaluateState(e,t){const r=e.relativeElevation,i=this._updateAnchorPoint(e);var s;(r>1.7*Ue||r<-1e4||i>Sr)&&this.opacity>0?this._startFade(nr.HIDE,t):this.isFading||(r>Ue||r<-.35*Ue||i>br*Sr?this.opacity>0&&this._startFade(nr.FADE_OUT,t):null==(s=this.data)||s.running||(0===this.opacity?this._startFade(nr.FADE_IN,t):this.data.state===ar.Ready&&(this.fadeState===nr.SHOW?this._startFade(nr.CROSS_FADE,t):this._startFade(nr.SHOW,t))))}_updateParallax(e){const t=S(e.eye);this.parallax.radiusCurvatureCorrection=.84*Math.sqrt(Math.max(t-Ie.radius*Ie.radius,0))/Math.sqrt(t),ze(xr,this.parallax.anchorPoint,yr),m(this.parallax.transform,Le,yr[3],Ne(yr)),ze(xr,this.parallaxNew.anchorPoint,yr),m(this.parallaxNew.transform,Le,yr[3],Ne(yr))}_updateAnchorPoint(e){return T(this._anchorPoint,e.eye),D(this._anchorPoint,this._anchorPoint,Ie.radius),this.fadeState===nr.HIDE&&this.data?.state===ar.Ready?(O(this.parallax.anchorPoint,this._anchorPoint),0):R(P(Cr,this.parallax.anchorPoint,this._anchorPoint))}requestFade(){this._fadeFactor.value=0}_startFade(e,t){switch(this._fadeState.value=e,this.startTime=t,e){case nr.CROSS_FADE:this.requestFade(),this._switchReadChannels(),O(this.parallaxNew.anchorPoint,this._anchorPoint);break;case nr.FADE_IN:this.requestFade(),this._switchReadChannels(),O(this.parallax.anchorPoint,this._anchorPoint),O(this.parallaxNew.anchorPoint,this._anchorPoint);break;case nr.FADE_OUT:this.requestFade();break;case nr.SHOW:this._switchReadChannels(),O(this.parallax.anchorPoint,this._anchorPoint),O(this.parallaxNew.anchorPoint,this._anchorPoint),this._endFade();break;case nr.HIDE:this._endFade()}}_endFade(){switch(this._fadeFactor.value=1,this.data&&this.data.state!==ar.Ready&&(this.data.state=ar.Idle),this.fadeState){case nr.CROSS_FADE:O(this.parallax.anchorPoint,this.parallaxNew.anchorPoint),this._fadeState.value=nr.SHOW;break;case nr.FADE_IN:this._fadeState.value=nr.SHOW;break;case nr.FADE_OUT:this._fadeState.value=nr.HIDE;break;case nr.SHOW:case nr.HIDE:break;default:r(this.fadeState)}}_switchReadChannels(){this.data?.state===ar.Ready&&(this._readChannels=1-this._readChannels,this.data.state=ar.Fading)}get isFading(){return this.fadeState===nr.FADE_OUT||this.fadeState===nr.FADE_IN||this.fadeState===nr.CROSS_FADE}}!function(e){e[e.HIDE=0]="HIDE",e[e.FADE_IN=1]="FADE_IN",e[e.SHOW=2]="SHOW",e[e.CROSS_FADE=3]="CROSS_FADE",e[e.FADE_OUT=4]="FADE_OUT"}(nr||(nr={}));class _r{constructor(){this.anchorPoint=j(),this.radiusCurvatureCorrection=0,this.transform=He()}}const xr=A(0,0,1),yr=Ve(),Cr=j(),wr=1.25,br=.5,Sr=2e5;function Tr(e){e.fragment.uniforms.add(new ue("cloudAbsorption",(e=>e.clouds.absorption)),new ue("cloudCoverage",(e=>e.clouds.coverage))).code.add(_e`vec4 lookupCloudsFromTextureArray(sampler2DArray cubeMap, vec3 rayDir) {
int faceIndex;
vec2 uv;
if(rayDir.z <= 0.0) {
float hazeFactor = smoothstep(-0.01, mix(0.0, 0.075, cloudCoverage), abs(dot(rayDir, vec3(0, 0, 1))));
float shading = clamp(1.0 - cloudAbsorption, 0.6, 1.0) * (1.0 - hazeFactor);
float totalTransmittance = hazeFactor;
return vec4(shading, totalTransmittance, shading, totalTransmittance);
}
if (abs(rayDir.x) >= abs(rayDir.y) && abs(rayDir.x) >= abs(rayDir.z)) {
if(rayDir.x > 0.0) {
faceIndex = 0;
uv = rayDir.yz / rayDir.x;
uv = vec2(-uv.x, uv.y);
} else {
faceIndex = 1;
uv = rayDir.yz / rayDir.x;
uv = vec2(-uv.x, -uv.y);
}
} else if (abs(rayDir.y) >= abs(rayDir.x) && abs(rayDir.y) >= abs(rayDir.z)) {
if(rayDir.y > 0.0) {
faceIndex = 2;
uv = rayDir.xz / rayDir.y;
} else {
faceIndex = 3;
uv = rayDir.xz / rayDir.y;
uv = vec2(uv.x, -uv.y);
}
} else {
if(rayDir.y < 0.0) {
faceIndex = 4;
uv = rayDir.xy / rayDir.z;
uv = vec2(uv.x, -uv.y);
} else {
faceIndex = 5;
uv = rayDir.xy / rayDir.z;
uv = vec2(uv.x, -uv.y);
}
}
uv = 0.5 * (uv + 1.0);
if(faceIndex != 5) {
uv.y = uv.y - 0.5;
}
uv.y = uv.y * 2.0;
vec4 s = texture(cubeMap, vec3(uv, float(faceIndex)));
return s;
}`)}class Dr extends ge{constructor(e,t){super(e,"sampler2DArray",qe.Bind,((r,i)=>r.bindTexture(e,t(i))))}}function Or(e){const t=e.fragment;t.constants.add("radiusCloudsSquared","float",Rr).code.add(_e`vec3 intersectWithCloudLayer(vec3 dir, vec3 cameraPosition, vec3 spherePos) {
float B = 2.0 * dot(cameraPosition, dir);
float C = dot(cameraPosition, cameraPosition) - radiusCloudsSquared;
float det = B * B - 4.0 * C;
float pointIntDist = max(0.0, 0.5 *(-B + sqrt(det)));
return (cameraPosition + dir * pointIntDist) - spherePos;
}`),t.uniforms.add(new ue("radiusCurvatureCorrection",(({clouds:e})=>e.parallax.radiusCurvatureCorrection))).code.add(_e`vec3 correctForPlanetCurvature(vec3 dir) {
dir.z = dir.z * (1.0 - radiusCurvatureCorrection) + radiusCurvatureCorrection;
return dir;
}`),t.code.add(_e`vec3 rotateDirectionToAnchorPoint(mat4 rotMat, vec3 inVec) {
return (rotMat * vec4(inVec, 0.0)).xyz;
}`),X(t),$(t);const r=A(.28,.175,.035);t.constants.add("RIM_COLOR","vec3",r),t.code.add(_e`
    vec3 calculateCloudColor(vec3 cameraPosition, vec3 worldSpaceRay, vec4 clouds) {
      float upDotLight = dot(cameraPosition, mainLightDirection);
      float dirDotLight = max(dot(worldSpaceRay, mainLightDirection), 0.0);
      float sunsetTransition = clamp(pow(max(upDotLight, 0.0), ${_e.float(.3)}), 0.0, 1.0);

      // Base color of the clouds that depends on lighting of the sun and sky
      vec3 ambientLight = calculateAmbientIrradiance(cameraPosition,  0.0);
      vec3 combinedLight = clamp((mainLightIntensity + ambientLight )/PI, vec3(0.0), vec3(1.0));
      vec3 baseCloudColor = pow(combinedLight * pow(clouds.xyz, vec3(GAMMA)), vec3(INV_GAMMA));

      // Rim light around the edge of the clouds simulating scattering of the direct lun light
      float scatteringMod = max(clouds.a < 0.5 ? clouds.a / 0.5 : - clouds.a / 0.5 + 2.0, 0.0);
      float rimLightIntensity = 0.5 + 0.5 * pow(max(upDotLight, 0.0), 0.35);
      vec3 directSunScattering = RIM_COLOR * rimLightIntensity * (pow(dirDotLight, ${_e.float(140)})) * scatteringMod;

      // Brighten the clouds around the sun at the sunsets
      float additionalLight = ${_e.float(.2)} * pow(dirDotLight, ${_e.float(10)}) * (1. - pow(sunsetTransition, ${_e.float(.3)})) ;

      return vec3(baseCloudColor * (1.0 + additionalLight) + directSunScattering);
    }
  `),e.include(Tr),t.uniforms.add(new Ge("readChannelsRG",(e=>e.clouds.readChannels===or.RG)),new Dr("cubeMap",(e=>e.clouds.data?.cubeMap?.colorTexture))).code.add(_e`vec4 sampleCloud(vec3 rayDir, bool readOtherChannel) {
vec4 s = lookupCloudsFromTextureArray(cubeMap, rayDir);
bool readRG = readChannelsRG ^^ readOtherChannel;
s = readRG ? vec4(vec3(s.r), s.g) : vec4(vec3(s.b), s.a);
return length(s) == 0.0 ? vec4(s.rgb, 1.0) : s;
}`),t.uniforms.add(new be("anchorPoint",(e=>e.clouds.parallax.anchorPoint)),new be("anchorPointNew",(e=>e.clouds.parallaxNew.anchorPoint)),new de("rotationClouds",(e=>e.clouds.parallax.transform)),new de("rotationCloudsNew",(e=>e.clouds.parallaxNew.transform)),new ue("cloudsOpacity",(e=>e.clouds.opacity)),new ue("fadeFactor",(e=>e.clouds.fadeFactor)),new Ge("crossFade",(e=>e.clouds.fadeState===nr.CROSS_FADE))).code.add(_e`vec4 renderClouds(vec3 worldRay, vec3 cameraPosition) {
vec3 intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPoint);
vec3 worldRayRotated = rotateDirectionToAnchorPoint(rotationClouds, normalize(intersectionPoint));
vec3 worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
vec4 cloudData = sampleCloud(worldRayRotatedCorrected, crossFade);
vec3 cameraPositionN = normalize(cameraPosition);
vec4 cloudColor = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
if(crossFade) {
intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPointNew);
worldRayRotated = rotateDirectionToAnchorPoint(rotationCloudsNew, normalize(intersectionPoint));
worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
cloudData = sampleCloud(worldRayRotatedCorrected, false);
vec4 cloudColorNew = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
cloudColor = mix(cloudColor, cloudColorNew, fadeFactor);
}
float totalTransmittance = length(cloudColor.rgb) == 0.0 ?
1.0 :
clamp(cloudColor.a * cloudsOpacity + (1.0 - cloudsOpacity), 0.0 , 1.0);
return vec4(cloudColor.rgb, totalTransmittance);
}`)}const Rr=(Ie.radius+We)**2;function Pr(e,t){const r=e.fragment;r.include(K,t),r.include(fr),r.include(pr),t.cloudReflections&&e.include(Or),e.include(mr,t),r.include(J,t),r.constants.add("fresnelSky","vec3",[.02,1,15]),r.constants.add("fresnelMaterial","vec2",[.02,.1]),r.constants.add("roughness","float",.015),r.constants.add("foamIntensityExternal","float",1.7),r.constants.add("ssrIntensity","float",.65),r.constants.add("ssrHeightFadeStart","float",ee),r.constants.add("ssrHeightFadeEnd","float",te),r.constants.add("waterDiffusion","float",.92),r.constants.add("waterSeaColorMod","float",.8),r.constants.add("correctionViewingPowerFactor","float",.4),r.constants.add("skyZenitColor","vec3",[.52,.68,.9]),r.constants.add("skyColor","vec3",[.67,.79,.9]),r.constants.add("cloudFresnelModifier","vec2",[1.2,.01]),r.code.add(_e`PBRShadingWater shadingInfo;
vec3 getSkyGradientColor(in float cosTheta, in vec3 horizon, in vec3 zenit) {
float exponent = pow((1.0 - cosTheta), fresnelSky[2]);
return mix(zenit, horizon, exponent);
}`),r.uniforms.add(new ue("lightingSpecularStrength",(e=>e.lighting.mainLight.specularStrength)),new ue("lightingEnvironmentStrength",(e=>e.lighting.mainLight.environmentStrength))),r.code.add(_e`vec3 getSeaColor(in vec3 n, in vec3 v, in vec3 l, vec3 color, in vec3 lightIntensity, in vec3 localUp, in float shadow, float foamIntensity, vec3 viewPosition, vec3 position) {
float reflectionHit = 0.0;
float reflectionHitDiffused = 0.0;
vec3 seaWaterColor = linearizeGamma(color);
vec3 h = normalize(l + v);
shadingInfo.NdotV = clamp(dot(n, v), 0.001, 1.0);
shadingInfo.VdotN = clamp(dot(v, n), 0.001, 1.0);
shadingInfo.NdotH = clamp(dot(n, h), 0.0, 1.0);
shadingInfo.VdotH = clamp(dot(v, h), 0.0, 1.0);
shadingInfo.LdotH = clamp(dot(l, h), 0.0, 1.0);
float upDotV = max(dot(localUp,v), 0.0);
vec3 skyHorizon = linearizeGamma(skyColor);
vec3 skyZenit = linearizeGamma(skyZenitColor);
vec3 skyColor = getSkyGradientColor(upDotV, skyHorizon, skyZenit );
float upDotL = max(dot(localUp,l),0.0);
float daytimeMod = 0.1 + upDotL * 0.9;
skyColor *= daytimeMod;
float shadowModifier = clamp(shadow, 0.8, 1.0);
vec3 fresnelModifier = fresnelReflection(shadingInfo.VdotN, vec3(fresnelSky[0]), fresnelSky[1]);
vec3 reflSky = lightingEnvironmentStrength * fresnelModifier * skyColor * shadowModifier;
vec3 reflSea = seaWaterColor * mix(skyColor, upDotL * lightIntensity * LIGHT_NORMALIZATION, 2.0 / 3.0) * shadowModifier;
vec3 specular = vec3(0.0);
if(upDotV > 0.0 && upDotL > 0.0) {
vec3 specularSun = brdfSpecularWater(shadingInfo, roughness, vec3(fresnelMaterial[0]), fresnelMaterial[1]);
vec3 incidentLight = lightIntensity * LIGHT_NORMALIZATION * shadow;
float NdotL = clamp(dot(n, l), 0.0, 1.0);
specular = lightingSpecularStrength * NdotL * incidentLight * specularSun;
}
vec3 foam = vec3(0.0);
if(upDotV > 0.0) {
foam = foamIntensity2FoamColor(foamIntensityExternal, foamIntensity, skyZenitColor, daytimeMod);
}
float correctionViewingFactor = pow(max(dot(v, localUp), 0.0), correctionViewingPowerFactor);
vec3 normalCorrectedClouds = mix(localUp, n, correctionViewingFactor);
vec3 reflectedWorld = normalize(reflect(-v, normalCorrectedClouds));`),t.cloudReflections&&r.uniforms.add(new ue("cloudsOpacity",(e=>e.clouds.opacity))).code.add(_e`vec4 cloudsColor = renderClouds(reflectedWorld, position);
cloudsColor.a = 1.0 - cloudsColor.a;
cloudsColor = pow(cloudsColor, vec4(GAMMA));
cloudsColor *= clamp(fresnelModifier.y * cloudFresnelModifier[0] - cloudFresnelModifier[1], 0.0, 1.0) * cloudsOpacity;`),t.screenSpaceReflections?r.uniforms.add(new de("view",(e=>e.camera.viewMatrix)),new we("lastFrameColorTexture",(e=>e.ssr.lastFrameColor?.getTexture())),new ue("fadeFactorSSR",(e=>e.ssr.fadeFactor))).code.add(_e`vec3 viewDir = normalize(viewPosition);
vec4 viewNormalVectorCoordinate = view * vec4(n, 0.0);
vec3 viewNormal = normalize(viewNormalVectorCoordinate.xyz);
vec4 viewUp = view * vec4(localUp, 0.0);
vec3 viewNormalCorrectedSSR = mix(viewUp.xyz, viewNormal, correctionViewingFactor);
vec3 reflected = normalize(reflect(viewDir, viewNormalCorrectedSSR));
vec3 hitCoordinate = screenSpaceIntersection(reflected, viewPosition, viewDir, viewUp.xyz);
vec3 reflectedColor = vec3(0.0);
if (hitCoordinate.z > 0.0)
{
vec2 reprojectedCoordinate = reprojectionCoordinate(hitCoordinate);
vec2 dCoords = smoothstep(0.3, 0.6, abs(vec2(0.5, 0.5) - hitCoordinate.xy));
float heightMod = smoothstep(ssrHeightFadeEnd, ssrHeightFadeStart, -viewPosition.z);
reflectionHit = clamp(1.0 - (1.3 * dCoords.y), 0.0, 1.0) * heightMod * fadeFactorSSR;
reflectionHitDiffused = waterDiffusion * reflectionHit;
reflectedColor = linearizeGamma(texture(lastFrameColorTexture, reprojectedCoordinate).xyz) *
reflectionHitDiffused * fresnelModifier.y * ssrIntensity;
}
float seaColorMod =  mix(waterSeaColorMod, waterSeaColorMod * 0.5, reflectionHitDiffused);
vec3 waterRenderedColor = tonemapACES((1.0 - reflectionHitDiffused) * reflSky + reflectedColor +
reflSea * seaColorMod + specular + foam);`):r.code.add(_e`vec3 waterRenderedColor = tonemapACES(reflSky + reflSea * waterSeaColorMod + specular + foam);`),t.cloudReflections?t.screenSpaceReflections?r.code.add(_e`return waterRenderedColor * (1.0 - (1.0 - reflectionHit) * cloudsColor.a) + (1.0 - reflectionHit) * cloudsColor.xyz;
}`):r.code.add(_e`return waterRenderedColor * (1.0 - cloudsColor.a) + cloudsColor.xyz;
}`):r.code.add(_e`return waterRenderedColor;
}`)}class Mr extends ge{constructor(e,t){super(e,"usampler2D",qe.Pass,((r,i,s)=>r.bindTexture(e,t(i,s))))}}var Ir;function Fr(e,t){const{vertex:r,fragment:i}=e;r.uniforms.add(new Be("overlayTexOffset",((e,t)=>function(e,t){const r=t.overlay?.overlays[er.INNER]?.extent;B(r)&&(Lr[0]=e.toMapSpace[0]/Z(r)-r[0]/Z(r),Lr[1]=e.toMapSpace[1]/Q(r)-r[1]/Q(r));const i=t.overlay?.overlays[er.OUTER]?.extent;return B(i)&&(Lr[2]=e.toMapSpace[0]/Z(i)-i[0]/Z(i),Lr[3]=e.toMapSpace[1]/Q(i)-i[1]/Q(i)),Lr}(e,t))),new Be("overlayTexScale",((e,t)=>function(e,t){const r=t.overlay?.overlays[er.INNER]?.extent;B(r)&&(Lr[0]=e.toMapSpace[2]/Z(r),Lr[1]=e.toMapSpace[3]/Q(r));const i=t.overlay?.overlays[er.OUTER]?.extent;return B(i)&&(Lr[2]=e.toMapSpace[2]/Z(i),Lr[3]=e.toMapSpace[3]/Q(i)),Lr}(e,t)))),i.constants.add("overlayOpacity","float",1),i.uniforms.add(new Te("ovColorTex",((e,t)=>Ar(e,t)))),jr(e,t)}function Er(e,t){const{vertex:r,fragment:i}=e,{output:s}=t;r.uniforms.add(new Hr("overlayTexOffset"),new Hr("overlayTexScale")),i.uniforms.add(new Se("overlayOpacity",(e=>e.overlayOpacity))),s!==le.Highlight&&i.uniforms.add(new Te("ovColorTex",((e,t)=>t.overlay?.getTexture(e.overlayContent)))),jr(e,t)}function jr(e,t){const r=t.pbrMode===re.Water||t.pbrMode===re.WaterOnIntegratedMesh||t.pbrMode===re.TerrainWithWater;r&&e.include(Pr,t);const{vertex:i,fragment:s,varyings:a}=e;a.add("vtcOverlay","vec4");const{output:o}=t,n=o===le.Highlight;i.code.add(_e`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),s.code.add(_e`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),n?s.uniforms.add(new Mr("overlayHighlightTexture",((e,t)=>t.overlay?.getTexture(ir.Highlight)))).code.add(_e`uvec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(overlayHighlightTexture, 0));
uvec2 texelValueInner = texelFetch(overlayHighlightTexture, ivec2(texelCoordInner * texDim), 0).rg;
uvec2 texelValueOuter = texelFetch(overlayHighlightTexture, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
uvec2(0);
}`):(s.code.add(_e`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),s.code.add(_e`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`)),r&&(X(s),$(s),s.code.add(_e`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getSeaColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}function Ar(e,t){return e.identifier===sr.Material&&ce(e.output)?e.occludedGround?t.overlay?.getTexture(ir.Occluded):t.overlay?.getTexture(ir.ColorNoRasterImage):e.identifier===sr.Material&&e.output===le.ObjectAndLayerIdColor?t.overlay?.getTexture(ir.ObjectAndLayerIdColor):e.identifier===sr.Highlight?t.overlay?.getTexture(ir.Highlight):null}!function(e){e[e.Disabled=0]="Disabled",e[e.Enabled=1]="Enabled",e[e.EnabledWithWater=2]="EnabledWithWater",e[e.COUNT=3]="COUNT"}(Ir||(Ir={}));const Lr=ve();class Hr extends ge{constructor(e){super(e,"vec4")}}class Vr extends Ze{constructor(){super(...arguments),this.color=A(1,1,1)}}const zr=Object.freeze(Object.defineProperty({__proto__:null,TextureOnlyPassParameters:Vr,build:function(){const e=new Xe;return e.include(ke),e.fragment.uniforms.add(new Te("tex",(e=>e.texture)),new pe("uColor",(e=>e.color))),e.fragment.main.add(_e`vec4 texColor = texture(tex, uv);
fragColor = texColor * vec4(uColor, 1.0);`),e}},Symbol.toStringTag,{value:"Module"})),Nr={required:[]},Ur={required:[le.Depth]};class Wr extends $e{precompile(e){return!!this.acquireTechniques(e)}consumes(){return Nr}get usedMemory(){return 0}get renderOccludedFlags(){return Ke.Occlude}get isDecoration(){return!1}get running(){return!1}modify(e,t){}get numGeometries(){return 0}get hasOccludees(){return!1}get hasEmissions(){return!1}forEachGeometry(e){}}class Gr extends Wr{}class kr extends Wr{}class qr extends ge{constructor(e,t){super(e,"ivec2",qe.Pass,((r,i,s)=>r.setUniform2iv(e,t(i,s))))}}class Br extends Ze{}const Zr=32,Qr=Object.freeze(Object.defineProperty({__proto__:null,HighlightDownsampleDrawParameters:Br,blurSize:.4,build:function(){const e=new Xe,{outputs:t,fragment:r}=e;return e.include(ke),r.uniforms.add(new Mr("highlightTexture",(e=>e.highlightTexture))),r.constants.add("outlineWidth","int",Math.ceil(9)),r.constants.add("cellSize","int",Zr),t.add("fragGrid","uvec2"),r.main.add(_e`ivec2 inputTextureSize = textureSize(highlightTexture, 0);
ivec2 cellBottomLeftCornerInput = ivec2(ivec2(floor(gl_FragCoord.xy) * vec2(cellSize)));
ivec2 coordMid =  cellBottomLeftCornerInput + ivec2(cellSize >> 1);
uvec2 centreTexel = texelFetch(highlightTexture, coordMid, 0).rg & uvec2(0x55u);
float marginSquare = float(outlineWidth*outlineWidth);
uvec2 outputValue = centreTexel & uvec2(0x55u);
for(int y = -outlineWidth; y <= cellSize + outlineWidth; y+=2) {
int dy = y < 0 ? -y : y > cellSize ? y-cellSize : 0;
int xMargin = dy > 0 ? int(ceil(sqrt(marginSquare - float(dy*dy)))) : outlineWidth;
for(int x = -xMargin; x <= cellSize + xMargin; x+=2) {
ivec2 coord = cellBottomLeftCornerInput + ivec2(x, y);
uvec2[4] texels = uvec2[4] (
texelFetch(highlightTexture,coord+ivec2(0,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(0,1),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,1),0).rg & uvec2(0x55u)
);
if (texels[0] == texels[1] && texels[1] == texels[2] && texels[2] == texels[3] && texels[3] ==  centreTexel) {
continue;
}
for (int i=0; i<4; ++i){
outputValue |= ((texels[i] ^ centreTexel) << 1);
outputValue |= texels[i];
}
}
}
fragGrid = outputValue;`),e},gridCellPixelSize:Zr,outlineSize:9},Symbol.toStringTag,{value:"Module"}));function Yr(e){const{vertex:t}=e;t.uniforms.add(new Mr("coverageTexture",(e=>e.coverageTexture)),new qr("highlightRenderCellCount",(e=>tt(Xr,e.horizontalCellCount,e.verticalCellCount))),new qr("highlightTextureResolution",(({highlightTexture:e})=>tt(Xr,e.descriptor.width,e.descriptor.height))),new ie("highlightLevel",(e=>e.highlightLevel))).constants.add("cellSize","int",Zr),e.varyings.add("sUV","vec2"),e.varyings.add("vOutlinePossible","float"),t.code.add(_e`const ivec2 cellVertices[4] = ivec2[4](ivec2(0,0), ivec2(1,0), ivec2(0,1), ivec2(1,1));`),t.main.add(_e`int cellIndex = gl_InstanceID;
int cellX = cellIndex % highlightRenderCellCount[0];
int cellY = (cellIndex - cellX) / highlightRenderCellCount[0];
ivec2 cellPos = ivec2(cellX, cellY);
uvec2 covTexel = texelFetch(coverageTexture, cellPos, 0).rg;
int channelIndex = (highlightLevel >> 2) & 3;
uint channelValue = covTexel[channelIndex];
int highlightIndex = (highlightLevel & 3) << 1;
bool covered = ((channelValue >> highlightIndex) & 1u) == 1u;
if (!covered) {
gl_Position = vec4(0.0);
return;
}
vOutlinePossible = (((channelValue >> highlightIndex) & 2u) == 2u) ? 1.0 : 0.0;
ivec2 iPosInCell = cellVertices[gl_VertexID];
vec2 sPos = vec2(cellPos * cellSize + iPosInCell * (cellSize));
vec2 vPos = sPos / vec2(highlightTextureResolution);
sUV = vPos;
gl_Position = vec4(2.0 * vPos - vec2(1.0), 0.0, 1.0);`)}const Xr=gt(),$r=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new Xe;e.include(Yr);const{fragment:t}=e;return t.uniforms.add(new Te("blurInput",(e=>e.highlightBlurTexture)),new se("blurSize",(e=>e.blurSize)),new Mr("highlightTexture",(e=>e.highlightTexture)),new Te("highlightOptionsTexture",(e=>e.highlightOptionsTexture)),new ie("highlightLevel",(e=>e.highlightLevel)),new Se("occludedIntensityFactor",(e=>e.occludedFactor))),t.constants.add("inner","float",1-8.6/9),e.include(De),t.main.add(_e`vec2 highlightTextureSize = vec2(textureSize(highlightTexture,0));
vec2 uv = sUV;
vec2 center = texture(blurInput, uv).rg;
vec2 blurredHighlightValue = (vOutlinePossible == 0.0)
? center
: center * 0.204164
+ texture(blurInput, uv + blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv - blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv + blurSize * 3.294215).rg * 0.093913
+ texture(blurInput, uv - blurSize * 3.294215).rg * 0.093913;
float highlightIntensity = blurredHighlightValue.r;
float occlusionWeight = blurredHighlightValue.g;
if (highlightIntensity <= 0.01) {
discard;
}
vec4 fillColor    = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 0), 0);
vec4 outlineColor = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 1), 0);
uvec2 centerTexel = texelFetch(highlightTexture, ivec2(uv * highlightTextureSize), 0).rg;
uint centerBits = readLevelBits(centerTexel, highlightLevel);
bool centerFilled = (centerBits & 1u) == 1u;
bool centerOccluded = (centerBits & 3u) == 3u;
bool occluded = centerOccluded || (0.5 * highlightIntensity < occlusionWeight);
float occlusionFactor = occluded ? occludedIntensityFactor : 1.0;
float outlineFactor = centerFilled ? 1.0 : smoothstep(0.0, inner, highlightIntensity);
float fillFactor = centerFilled ? 1.0 : 0.0;
vec4 baseColor = mix(outlineColor, fillColor, fillFactor);
float intensity = baseColor.a * occlusionFactor * outlineFactor;
fragColor = vec4(baseColor.rgb, intensity);`),e}},Symbol.toStringTag,{value:"Module"}));class Kr extends Oe{constructor(e,t){super(e,t,new Re($r,(()=>Promise.resolve().then((()=>$r)))))}initializePipeline(){return pt({blending:mt,colorWrite:ft})}}class Jr extends Ze{constructor(){super(...arguments),this.blurSize=gt()}}const ei=Object.freeze(Object.defineProperty({__proto__:null,HighlightBlurDrawParameters:Jr,build:function(){const e=new Xe;return e.include(Yr),e.outputs.add("fragHighlight","vec2",0),e.fragment.uniforms.add(new se("blurSize",(e=>e.blurSize)),new fe("blurInput",(e=>e.blurInput))).main.add(_e`vec2 highlightTextureSize = vec2(textureSize(blurInput,0));
vec2 center = texture(blurInput, sUV).rg;
if (vOutlinePossible == 0.0) {
fragHighlight = center;
} else {
vec2 sum = center * 0.204164;
sum += texture(blurInput, sUV + blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV - blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV + blurSize * 3.294215).rg * 0.093913;
sum += texture(blurInput, sUV - blurSize * 3.294215).rg * 0.093913;
fragHighlight = sum;
}`),e}},Symbol.toStringTag,{value:"Module"}));class ti extends Oe{constructor(e,t){super(e,t,new Re(ei,(()=>Promise.resolve().then((()=>ei)))))}initializePipeline(){return pt({colorWrite:ft})}}class ri extends Oe{constructor(e,t){super(e,t,new Re(Qr,(()=>Promise.resolve().then((()=>Qr)))))}initializePipeline(){return pt({colorWrite:ft})}}class ii extends Ze{constructor(){super(...arguments),this.occludedFactor=vt,this.verticalCellCount=0,this.horizontalCellCount=0,this.highlightLevel=0,this.pixelRatio=1}}const si=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new Xe;e.include(Yr),e.include(De);const{fragment:t}=e;return e.outputs.add("fragSingleHighlight","vec2",0),t.uniforms.add(new Mr("highlightTexture",(e=>e.highlightTexture)),new ie("highlightLevel",(e=>e.highlightLevel))),t.main.add(_e`ivec2 iuv = ivec2(gl_FragCoord.xy);
uvec2 inputTexel = texelFetch(highlightTexture, iuv, 0).rg;
uint bits = readLevelBits(inputTexel, highlightLevel);
bool hasHighlight = (bits & 1u) == 1u;
bool hasOccluded  = (bits & 2u) == 2u;
fragSingleHighlight = vec2(hasHighlight ? 1.0 : 0.0, hasOccluded ? 1.0 : 0.0);`),e}},Symbol.toStringTag,{value:"Module"}));class ai extends Oe{constructor(e,t){super(e,t,new Re(si,(()=>Promise.resolve().then((()=>si)))))}initializePipeline(){return pt({colorWrite:ft})}}const oi=[],ni=[new Rt(xt.POSITION,3,yt.FLOAT,0,12)],li=[new Rt(xt.POSITION,2,yt.FLOAT,0,8)],ci=[new Rt(xt.POSITION,2,yt.FLOAT,0,12),new Rt(xt.UV0,2,yt.HALF_FLOAT,8,12)],hi=[new Rt(xt.POSITION,2,yt.FLOAT,0,16),new Rt(xt.UV0,2,yt.FLOAT,8,16)];let di=class extends ut{constructor(){super(...arguments),this.produces=dt.HIGHLIGHTS,this.consumes={required:[dt.HIGHLIGHTS,"highlights"]},this._downsampleDrawParameters=new Br,this._passParameters=new ii,this._highlightBlurDrawParameters=new Jr,this._grid=new ui}initialize(){this.addHandles([l((()=>this._updateOptionsTexture()),(()=>{}),c)])}destroy(){this._grid.coverage=a(this._grid.coverage),this._grid.vao=o(this._grid.vao),this._passParameters.highlightOptionsTexture=a(this._passParameters.highlightOptionsTexture)}_updateOptionsTexture(){if(null==this._passParameters.highlightOptionsTexture){const e=new It(16,2);e.internalFormat=Ct.RGBA,e.samplingMode=wt.NEAREST,this._passParameters.highlightOptionsTexture=new Ft(this.renderingContext,e,null)}this._passParameters.highlightOptionsTexture.setData(function(e){const t=new Uint8Array(128);let r=0;for(const i of e){const e=4*r,s=4*r+64;++r;const{color:a}=i,o=i.haloColor??a;t[e+0]=a.r,t[e+1]=a.g,t[e+2]=a.b,t[e+3]=i.fillOpacity*a.a*255,t[s+0]=o.r,t[s+1]=o.g,t[s+2]=o.b,t[s+3]=i.haloOpacity*o.a*255}return t}(this.view.state.highlights)),this.requestRender(_t.UPDATE)}precompile(){this.techniques.precompile(ri),this.techniques.precompile(ai),this.techniques.precompile(ti),this.techniques.precompile(Kr)}render(e){const t=e.find((({name:e})=>e===dt.HIGHLIGHTS)),{techniques:r,bindParameters:i,_passParameters:s,renderingContext:a}=this;if(!i.decorations)return t;const o=r.get(ri);if(!o.compiled)return this.requestRender(_t.UPDATE),t;const n=e.find((({name:e})=>"highlights"===e)).getTexture();s.highlightTexture=n;const{camera:l}=i;return this._renderHighlightPostprocess(n,(()=>{this._gridUpdateResources(n);const e=this._gridComputeCoverage(o,n,i),{horizontalCellCount:t,verticalCellCount:r}=e;return s.horizontalCellCount=t,s.verticalCellCount=r,s.coverageTexture=e.coverage?.getTexture(),e}),(e=>{const t=e.verticalCellCount*e.horizontalCellCount;a.bindVAO(e.vao),a.drawElementsInstanced(Tt.TRIANGLES,6,yt.UNSIGNED_BYTE,0,t)}),(()=>{a.bindFramebuffer(t.fbo),a.setViewport4fv(l.fullViewport)})),s.highlightTexture=null,s.coverageTexture=null,t}_renderHighlightPostprocess(e,t,r,i){const{fboCache:s,techniques:a,bindParameters:o,_passParameters:n,renderingContext:l}=this,c=a.get(ai),h=a.get(ti),d=a.get(Kr);if(!d.compiled||!h.compiled||!c.compiled)return void this.requestRender(_t.UPDATE);n.highlightTexture=e;const u=t(),{width:g,height:p}=e.descriptor;n.highlightTexture=e;const{camera:f}=o,{fullWidth:m,fullHeight:v,pixelRatio:_}=f,x=Math.ceil(m/_),y=Math.ceil(v/_),{_highlightBlurDrawParameters:C}=this,w=this.view.stage.renderView.renderer,{highlights:b}=o;for(let e=0;e<b.length;++e){const{name:t}=b[e];if(!w.hasHighlight(t))continue;n.highlightLevel=e,l.setClearColor(0,0,0,0);const a=s.acquire(g,p,"single highlight",Y.RG8UNORM);l.bindFramebuffer(a.fbo),l.setViewport(0,0,g,p),l.clear(bt.COLOR),l.bindTechnique(c,o,n),r(u),C.blurInput=a.getTexture(),tt(C.blurSize,1/x,0);const f=s.acquire(x,y,"single highlight blur h",Y.RG8UNORM);l.unbindTexture(f.fbo?.colorTexture),l.bindFramebuffer(f.fbo),l.setViewport(0,0,x,y),l.clear(bt.COLOR),l.bindTechnique(h,o,n,C),r(u),a.release(),tt(C.blurSize,0,1/y),n.highlightBlurTexture=f.getTexture(),i(),l.bindTechnique(d,o,n,C),r(u),f.release()}}_gridUpdateResources(e){const t=this._grid,{width:r,height:i}=e.descriptor;if(t.horizontalCellCount=Math.ceil(r/Zr),t.verticalCellCount=Math.ceil(i/Zr),t.vao)return;const s=this.renderingContext,a=Mt.createIndex(s,St.STATIC_DRAW,pi);t.vao=new Pt(s,Je,new Map([["geometry",oi]]),new Map([["geometry",Mt.createVertex(s,St.STATIC_DRAW)]]),a)}_gridComputeCoverage(e,t,r){const i=this.renderingContext,s=this._grid,a=t.descriptor,o=Math.ceil(a.width/Zr),n=Math.ceil(a.height/Zr);this._downsampleDrawParameters.input=t;const{highlights:l}=r;s.coverage?.release();const c=this.fboCache.acquire(o,n,"highlight coverage",l.length>mi?Y.RG8UINT:Y.R8UINT);return s.coverage=c,i.bindFramebuffer(c.fbo),i.bindTechnique(e,r,this._passParameters,this._downsampleDrawParameters),i.setViewport(0,0,o,n),i.screen.draw(),s}get test(){}};e([g()],di.prototype,"produces",void 0),e([g()],di.prototype,"consumes",void 0),di=e([f("esri.views.3d.webgl-engine.effects.highlight.Highlight")],di);class ui{constructor(){this.coverage=null,this.vao=null,this.verticalCellCount=0,this.horizontalCellCount=0,this.viewportWidth=0,this.viewportHeight=0}}let gi=0;const pi=new Uint8Array([0,1,2,2,1,3]);function fi(e,t,r,i,s,a=0){const{highlights:o}=i,n=o.length>1?t.acquire(r.width,r.height,"highlight mix",o.length>mi?Y.RG8UINT:Y.R8UINT):null,{gl:l}=e;if(n){const t=e.getBoundFramebufferObject();e.bindFramebuffer(n.fbo),l.clearBufferuiv(l.COLOR,0,[0,0,0,0]),e.bindFramebuffer(t)}const c=n?.getTexture();i.highlightMixTexture=c,tt(i.highlightMixOrigin,a,0),o.forEach(((t,o)=>{if(o>0){const t=Ft.TEXTURE_UNIT_FOR_UPDATES;e.bindTexture(c,t),e.setActiveTexture(t),l.copyTexSubImage2D(Dt.TEXTURE_2D,0,0,0,a,0,r.width,r.height),e.bindTexture(null,t)}e.clear(bt.DEPTH),i.highlightLevel=o,s()})),i.highlightLevel=null,i.highlightMixTexture=null,n?.release()}const mi=4;class vi{constructor(e,t,r,i){this.material=e,this.output=t,this.techniques=r,this.textures=i}}class _i{constructor(e,t,r,i){this._textures=e,this._techniques=t,this.materialChanged=r,this.requestRender=i,this._id2glMaterialRef=new Et}dispose(){this._textures.destroy()}acquire(e,t,r){this._ownMaterial(e);const i=e.produces.get(t);if(!i?.(r))return null;let s=this._id2glMaterialRef.get(r,e.id);if(null==s){const t=e.createGLMaterial(new vi(e,r,this._techniques,this._textures));s=new xi(t),this._id2glMaterialRef.set(r,e.id,s)}return s.ref(),s.glMaterial}release(e,t){const r=this._id2glMaterialRef.get(t,e.id);null!=r&&(r.unref(),r.referenced||(o(r.glMaterial),this._id2glMaterialRef.delete(t,e.id)))}_ownMaterial(e){e.repository&&e.repository!==this&&p.getLogger("esri.views.3d.webgl-engine.lib.GLMaterialRepository").error("Material is already owned by a different material repository"),e.repository=this}}class xi{constructor(e){this.glMaterial=e,this._refCnt=0}ref(){++this._refCnt}unref(){--this._refCnt,jt(this._refCnt>=0)}get referenced(){return this._refCnt>0}}var yi;!function(e){e[e.Immediate=0]="Immediate",e[e.FadeWithWeather=1]="FadeWithWeather"}(yi||(yi={}));class Ci{constructor(e,t){this.width=e,this.height=t}}class wi{constructor(e){this.shadowMap=e,this.slot=Pe.OPAQUE_MATERIAL,this.slicePlane=null,this.hasOccludees=!1,this.enableFillLights=!0,this.oitPass=et.NONE,this.alignPixelEnabled=!1,this.decorations=!0,this.overlayStretch=1,this.viewshedEnabled=!1,this._camera=new me,this._inverseViewport=gt(),this._oldLighting=new ae,this._newLighting=new ae,this._fadedLighting=new ae,this._lighting=this._newLighting,this.ssr=new bi,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.highlights=new Array,this.highlightOrderMap=new Map,this.highlightMixOrigin=gt(),this.highlightMixTexture=null,this.hudRenderStyle=zt.Occluded,this.hudOccludedFragmentOpacity=1,this.snowCover=!1,this.clouds=new vr,this.shadowHighlightsVisible=!1}get camera(){return this._camera}set camera(e){this._camera=e,this._inverseViewport[0]=1/e.fullViewport[2],this._inverseViewport[1]=1/e.fullViewport[3]}get inverseViewport(){return this._inverseViewport}get lighting(){return this._lighting}fadeLighting(){switch(this.clouds.fadeFactor){case 0:this._lighting=this._oldLighting;break;default:this._fadedLighting.lerpLighting(this._oldLighting,this._newLighting,this.clouds.fadeFactor),this._lighting=this._fadedLighting;break;case 1:this._lighting=this._newLighting,this._oldLighting.copyFrom(this._newLighting)}}updateLighting(e,t,r,i){this._oldLighting.copyFrom(this.lighting),this._newLighting.noonFactor=t,this._newLighting.globalFactor=r,this._newLighting.set(e),i===yi.FadeWithWeather&&this.clouds.requestFade(),this.fadeLighting()}get highlight(){return null==this.highlightLevel?null:this.highlights[this.highlightLevel]}}class bi{constructor(){this.fadeFactor=1,this.reprojectionMatrix=He()}}class Si{constructor(e,t,r){this.rctx=e,this.techniques=r,this.lastFrameCamera=new me,this.output=le.Color,this.renderOccludedMask=Ti,this.time=Vt(0),this.bind=new wi(t),this.bind.alignPixelEnabled=!0}}const Ti=Ke.Occlude|Ke.OccludeAndTransparent|Ke.OccludeAndTransparentStencil;let Di=class extends me{constructor(){super(...arguments),this._projectionMatrix=He()}get projectionMatrix(){return this._projectionMatrix}};var Oi;e([g()],Di.prototype,"_projectionMatrix",void 0),e([g({readOnly:!0})],Di.prototype,"projectionMatrix",null),Di=e([f("esri.views.3d.webgl-engine.lib.CascadeCamera")],Di),function(e){e[e.Highlight=0]="Highlight",e[e.ExcludeHighlight=1]="ExcludeHighlight"}(Oi||(Oi={}));class Ri{constructor(){this.camera=new Di,this.lightMat=He()}}class Pi{constructor(){this.maxNumCascadesHighQuality=4,this.maxNumCascadesLowQuality=4,this.textureSizeModHighQuality=1.3,this.textureSizeModLowQuality=.9,this.splitSchemeLambda=0}}class Mi{constructor(e,t){this._fbos=e,this._viewingMode=t,this._snapshots=new Array,this._textureHeight=0,this._numCascades=1,this.settings=new Pi,this._projectionView=He(),this._projectionViewInverse=He(),this._modelViewLight=He(),this._cascadeDistances=[0,0,0,0,0],this._usedCascadeDistances=ve(),this._cascades=[new Ri,new Ri,new Ri,new Ri],this._lastOrigin=null,this._enabled=!1,this._maxTextureWidth=Math.min(i("esri-mobile")?4096:16384,e.rctx.parameters.maxTextureSize)}dispose(){this.enabled=!1,this.disposeOffscreenBuffers()}get depthTexture(){return this._handle?.getTexture(Ot)}get _textureWidth(){return this._textureHeight*this._numCascades}get numCascades(){return this._numCascades}get cascadeDistances(){return Ut(this._usedCascadeDistances,this._cascadeDistances[0],this._numCascades>1?this._cascadeDistances[1]:1/0,this._numCascades>2?this._cascadeDistances[2]:1/0,this._numCascades>3?this._cascadeDistances[3]:1/0)}disposeMainBuffer(){this._handle=a(this._handle)}disposeOffscreenBuffers(){this.disposeMainBuffer(),this._discardSnapshots()}set maxCascades(e){this.settings.maxNumCascadesHighQuality=Fe(Math.floor(e),1,4)}get maxCascades(){return this.settings.maxNumCascadesHighQuality}set enabled(e){this._enabled=e,e||this.disposeOffscreenBuffers()}get enabled(){return this._enabled}get ready(){return this._enabled&&null!=this.depthTexture}get cascades(){for(let e=0;e<this._numCascades;++e)Ni[e]=this._cascades[e];return Ni.length=this._numCascades,Ni}start(e,t,r,i,s){jt(this.enabled);const{near:a,far:o}=function(e){let{near:t,far:r}=e;return t<2&&(t=2),r<2&&(r=2),t>=r&&(t=2,r=4),{near:t,far:r}}(r);this._computeCascadeDistances(a,o,i),this._textureHeight=this._computeTextureHeight(e,s,i),this._setupMatrices(e,t);const{viewMatrix:n,projectionMatrix:l}=e;for(let e=0;e<this._numCascades;++e)this._constructCascade(e,l,n,t);this._lastOrigin=null,this.clear()}finish(){jt(this.enabled)}getShadowMapMatrices(e){if(!this._lastOrigin||!M(e,this._lastOrigin)){this._lastOrigin=this._lastOrigin||j(),O(this._lastOrigin,e);for(let t=0;t<this._numCascades;++t){v(Ui,this._cascades[t].lightMat,e);for(let e=0;e<16;++e)Wi[16*t+e]=Ui[e]}}return Wi}moveSnapshot(e){jt(this.enabled),this._snapshots[e]?.release(),this._snapshots[e]=this._handle,this._handle?.setName(e===Oi.Highlight?"shadow map highlight":"shadow map excluding highlight"),this._handle=null}copySnapshot(e){if(!this.enabled)return;const t=this._handle?.getTexture(Ot)?.descriptor;if(!t)return;this._snapshots[e]?.release();const r=e===Oi.Highlight?"shadow map highlight":"shadow map excluding highlight",i=this._acquireFBO(r);this._snapshots[e]=i;const s=this._handle?.fbo;if(!s||!i?.fbo)return void console.error("No FBO");const{rctx:a}=this._fbos;a.blitFramebuffer(s,i.fbo,bt.DEPTH)}getSnapshot(e){return this.enabled?this._snapshots[e]?.getTexture(Ot):null}clear(){this._ensureFbo(),this.bindFbo(),this._fbos.rctx.clear(bt.DEPTH)}_computeTextureHeight({pixelRatio:e,fullWidth:t,fullHeight:r},i,s){const a=Math.min(window.devicePixelRatio,i)/e,o=s?this.settings.textureSizeModHighQuality:this.settings.textureSizeModLowQuality;return Me(Math.max(t,r)*a*o,this._maxTextureWidth/this._numCascades)}_ensureFbo(){this._handle?.fbo?.width===this._textureWidth&&this._handle?.fbo.height===this._textureHeight||(this._handle?.release(),this._handle=this._acquireFBO("shadow map"))}_acquireFBO(e){const t=this._fbos.acquire(this._textureWidth,this._textureHeight,e,oe.DEPTH16);return t.getTexture(Ot)?.setShadowFiltering(!0),t}_discardSnapshot(e){this._snapshots[e]=a(this._snapshots[e])}_discardSnapshots(){for(let e=0;e<this._snapshots.length;++e)this._discardSnapshot(e);this._snapshots.length=0}bindFbo(){this._fbos.rctx.bindFramebuffer(this._handle?.fbo)}_constructCascade(e,t,r,i){const s=this._cascades[e],a=-this._cascadeDistances[e],o=-this._cascadeDistances[e+1],n=(t[10]*a+t[14])/Math.abs(t[11]*a+t[15]),l=(t[10]*o+t[14])/Math.abs(t[11]*o+t[15]);jt(n<l);for(let e=0;e<8;++e){Ut(Fi,e%4==0||e%4==3?-1:1,e%4==0||e%4==1?-1:1,e<4?n:l,1);const t=Ei[e];Wt(t,Fi,this._projectionViewInverse),t[0]/=t[3],t[1]/=t[3],t[2]/=t[3]}I(zi,Ei[0]),s.camera.viewMatrix=v(Ii,this._modelViewLight,zi);for(let e=0;e<8;++e)F(Ei[e],Ei[e],s.camera.viewMatrix);let c=Ei[0][2],h=Ei[0][2];for(let e=1;e<8;++e)c=Math.min(c,Ei[e][2]),h=Math.max(h,Ei[e][2]);c-=200,h+=200,s.camera.near=-h,s.camera.far=-c,function(e,t,r,i,s){const a=1/Ei[0][3],o=1/Ei[4][3];jt(a<o);let n=a+Math.sqrt(a*o);const l=Math.sin(je(e[2]*t[0]+e[6]*t[1]+e[10]*t[2]));n/=l,function(e,t,r,i,s,a,o,n){tt(Gi,0,0);for(let t=0;t<4;++t)rt(Gi,Gi,e[t]);it(Gi,Gi,.25),tt(ki,0,0);for(let t=4;t<8;++t)rt(ki,ki,e[t]);it(ki,ki,.25),st(qi[0],e[4],e[5],.5),st(qi[1],e[5],e[6],.5),st(qi[2],e[6],e[7],.5),st(qi[3],e[7],e[4],.5);let l=0,c=at(qi[0],Gi);for(let e=1;e<4;++e){const t=at(qi[e],Gi);t<c&&(c=t,l=e)}ot(Bi,qi[l],e[l+4]);const h=Bi[0];let d,u;Bi[0]=-Bi[1],Bi[1]=h,ot(Zi,ki,Gi),nt(Zi,Bi)<0&&lt(Bi,Bi),st(Bi,Bi,Zi,r),ct(Bi,Bi),d=u=nt(ot(Qi,e[0],Gi),Bi);for(let t=1;t<8;++t){const r=nt(ot(Qi,e[t],Gi),Bi);r<d?d=r:r>u&&(u=r)}ht(i,Gi),it(Qi,Bi,d-t),rt(i,i,Qi);let g=-1,p=1,f=0,m=0;for(let t=0;t<8;++t){ot(Yi,e[t],i),ct(Yi,Yi);const r=Bi[0]*Yi[1]-Bi[1]*Yi[0];r>0?r>g&&(g=r,f=t):r<p&&(p=r,m=t)}Lt(g>0,"leftArea"),Lt(p<0,"rightArea"),it(Xi,Bi,d),rt(Xi,Xi,Gi),it($i,Bi,u),rt($i,$i,Gi),Ki[0]=-Bi[1],Ki[1]=Bi[0];const v=Ht(i,e[m],$i,rt(Qi,$i,Ki),1,s),_=Ht(i,e[f],$i,Qi,1,a),x=Ht(i,e[f],Xi,rt(Qi,Xi,Ki),1,o),y=Ht(i,e[m],Xi,Qi,1,n);Lt(v,"rayRay"),Lt(_,"rayRay"),Lt(x,"rayRay"),Lt(y,"rayRay")}(Ei,n,l,ji,Ai,Li,Hi,Vi),function(e,t,r,i,s){ot(rs,r,i),it(rs,rs,.5),is[0]=rs[0],is[1]=rs[1],is[2]=0,is[3]=rs[1],is[4]=-rs[0],is[5]=0,is[6]=rs[0]*rs[0]+rs[1]*rs[1],is[7]=rs[0]*rs[1]-rs[1]*rs[0],is[8]=1,is[Ji(0,2)]=-nt(ts(is,0),e),is[Ji(1,2)]=-nt(ts(is,1),e);let a=nt(ts(is,0),r)+is[Ji(0,2)],o=nt(ts(is,1),r)+is[Ji(1,2)],n=nt(ts(is,0),i)+is[Ji(0,2)],l=nt(ts(is,1),i)+is[Ji(1,2)];a=-(a+n)/(o+l),is[Ji(0,0)]+=is[Ji(1,0)]*a,is[Ji(0,1)]+=is[Ji(1,1)]*a,is[Ji(0,2)]+=is[Ji(1,2)]*a,a=1/(nt(ts(is,0),r)+is[Ji(0,2)]),o=1/(nt(ts(is,1),r)+is[Ji(1,2)]),is[Ji(0,0)]*=a,is[Ji(0,1)]*=a,is[Ji(0,2)]*=a,is[Ji(1,0)]*=o,is[Ji(1,1)]*=o,is[Ji(1,2)]*=o,is[Ji(2,0)]=is[Ji(1,0)],is[Ji(2,1)]=is[Ji(1,1)],is[Ji(2,2)]=is[Ji(1,2)],is[Ji(1,2)]+=1,a=nt(ts(is,1),t)+is[Ji(1,2)],o=nt(ts(is,2),t)+is[Ji(2,2)],n=nt(ts(is,1),r)+is[Ji(1,2)],l=nt(ts(is,2),r)+is[Ji(2,2)],a=-.5*(a/o+n/l),is[Ji(1,0)]+=is[Ji(2,0)]*a,is[Ji(1,1)]+=is[Ji(2,1)]*a,is[Ji(1,2)]+=is[Ji(2,2)]*a,a=nt(ts(is,1),t)+is[Ji(1,2)],o=nt(ts(is,2),t)+is[Ji(2,2)],n=-o/a,is[Ji(1,0)]*=n,is[Ji(1,1)]*=n,is[Ji(1,2)]*=n,s[0]=is[0],s[1]=is[1],s[2]=0,s[3]=is[2],s[4]=is[3],s[5]=is[4],s[6]=0,s[7]=is[5],s[8]=0,s[9]=0,s[10]=1,s[11]=0,s[12]=is[6],s[13]=is[7],s[14]=0,s[15]=is[8]}(ji,Ai,Hi,Vi,s.projectionMatrix),s.projectionMatrix[10]=2/(r-i),s.projectionMatrix[14]=-(r+i)/(r-i)}(r,i,c,h,s.camera),_(s.lightMat,s.camera.projectionMatrix,s.camera.viewMatrix);const d=this._textureHeight;s.camera.viewport=[e*d,0,d,d]}_setupMatrices(e,t){_(this._projectionView,e.projectionMatrix,e.viewMatrix),x(this._projectionViewInverse,this._projectionView);const r=this._viewingMode===Gt.Global?e.eye:E(zi,0,0,1);y(this._modelViewLight,[0,0,0],[-t[0],-t[1],-t[2]],r)}_computeCascadeDistances(e,t,r){const i=r?this.settings.maxNumCascadesHighQuality:this.settings.maxNumCascadesLowQuality;this._numCascades=Math.min(1+Math.floor(At(t/e,4)),i);const s=(t-e)/this._numCascades,a=(t/e)**(1/this._numCascades);let o=e,n=e;for(let e=0;e<this._numCascades+1;++e)this._cascadeDistances[e]=Ee(o,n,this.settings.splitSchemeLambda),o*=a,n+=s}get test(){}}const Ii=He(),Fi=ve(),Ei=[];for(let e=0;e<8;++e)Ei.push(ve());const ji=gt(),Ai=gt(),Li=gt(),Hi=gt(),Vi=gt(),zi=j(),Ni=[],Ui=He(),Wi=Le.concat(Le,Le,Le,Le),Gi=gt(),ki=gt(),qi=[gt(),gt(),gt(),gt()],Bi=gt(),Zi=gt(),Qi=gt(),Yi=gt(),Xi=gt(),$i=gt(),Ki=gt();function Ji(e,t){return 3*t+e}const es=gt();function ts(e,t){return tt(es,e[t],e[t+3]),es}const rs=gt(),is=Nt();class ss extends Oe{constructor(e,t){super(e,t,new Re(zr,(()=>Promise.resolve().then((()=>zr)))))}initializePipeline(e){return e.hasAlpha?pt({blending:mt,colorWrite:ft}):pt({colorWrite:ft})}}class as extends Ye{constructor(){super(...arguments),this.hasAlpha=!1}}e([Qe()],as.prototype,"hasAlpha",void 0);class os extends Ze{constructor(){super(...arguments),this.overlayIndex=er.INNER,this.opacity=1}}const ns=Object.freeze(Object.defineProperty({__proto__:null,OverlayCompositingPassParameters:os,build:function(){const e=new Xe;return e.include(ke),e.fragment.uniforms.add(new Te("tex",(e=>e.texture))),e.fragment.uniforms.add(new ie("overlayIdx",(e=>e.overlayIndex))),e.fragment.uniforms.add(new Se("opacity",(e=>e.opacity))),e.fragment.main.add(_e`vec2 overlayUV = overlayIdx == 0 ? vec2(uv.x * 0.5, uv.y) : vec2(uv.x * 0.5 + 0.5, uv.y);
fragColor = texture(tex, overlayUV) * opacity;`),e}},Symbol.toStringTag,{value:"Module"}));class ls extends Oe{constructor(e,t){super(e,t,new Re(ns,(()=>Promise.resolve().then((()=>ns)))))}}let cs=class extends Gr{constructor(e){super(e),this._overlays=null,this._renderTargets=null,this._overlayParameters=new os,this.hasHighlights=!1,this._hasWater=!1,this._renderers=new Map,this._sortedDrapeSourceRenderersDirty=!1,this._sortedRenderers=new n,this._passParameters=new Vr,this._screenToWorldRatio=1,this._localOriginFactory=null,this.unloadedMemory=0,this.ignoresMemoryFactor=!1,this._camera=new me,this.events=new t,this.longitudeCyclical=null,this.produces=new Map([[Pe.DRAPED_MATERIAL,e=>e!==le.Highlight||this.hasHighlights],[Pe.DRAPED_WATER,()=>this._hasWater]]),this._hasTargetWithoutRasterImage=!1,this._hasDrapedFeatureSource=!1,this._hasDrapedRasterSource=!1}initialize(){const e=this._view,t=e.stage,r=t.renderer.fboCache,{waterTextures:i,techniques:s}=t.renderView;this._renderContext=new Si(this._rctx,new Mi(r,e.state.viewingMode),s),this.addHandles([l((()=>i.updating),(()=>this.events.emit("content-changed")),d),l((()=>this.spatialReference),(e=>this._localOriginFactory=new V(e)),d),h((()=>e.allLayerViews),"after-changes",(()=>this._sortedDrapeSourceRenderersDirty=!0)),l((()=>function(e){let t=0;for(const r of e){const{name:e}=r;t+=e.length;const{color:i,fillOpacity:s,haloColor:a,haloOpacity:o}=r;t+=i.r+i.g+i.b+i.a+s,t+=a?a.r+a.g+a.b+a.a+o:0}const r=e.at(0);if(r){const{shadowOpacity:e,shadowDifference:i,shadowColor:s}=r;t+=e+i+s.r+s.g+s.b+s.a}return gi+++(t>=0?0:1)}(e.state.highlights)),(()=>this._sortedDrapeSourceRenderersDirty=!0),c),l((()=>e.state.highlights),(t=>{this._bindParameters.highlights=t,this._bindParameters.highlightOrderMap=e.state.highlightOrderMap}),c),e.resourceController.scheduler.registerTask(qt.OVERLAY_RENDERER,this)]);const{_bindParameters:a,_camera:o}=this;o.near=1,o.far=1e4,o.relativeElevation=null,a.slot=Pe.DRAPED_MATERIAL,a.mainDepth=null,a.camera=o,a.oitPass=et.NONE,a.updateLighting([new ne(L())],0,0,yi.Immediate)}destroy(){this._renderers.forEach((e=>e.destroy())),this._renderers.clear(),this._passParameters.texture=o(this._passParameters.texture),this.disposeOverlays()}get _bindParameters(){return this._renderContext.bind}get _rctx(){return this._stage.renderView.renderingContext}get _view(){return this.parent.view}get _stage(){return this.parent.view.stage}get spatialReference(){return this.parent.spatialReference}get _techniques(){return this._stage.renderView.techniques}get rctx(){return this._rctx}get materials(){return this._pluginContext.materials}get screenToWorldRatio(){return this._screenToWorldRatio}get localOriginFactory(){return this._localOriginFactory}get pluginContext(){return this._pluginContext}initializeRenderContext(e){const t=new _i(this._view.stage.renderView.textures,this._techniques,(()=>{this.notifyChange("rendersOccludedDraped"),this.events.emit("content-changed"),this.notifyChange("updating"),this.notifyChange("isEmpty")}),(()=>this.events.emit("content-changed")));this._pluginContext={...e,materials:t},this._techniques.precompile(ls)}uninitializeRenderContext(){}acquireTechniques(){return[]}render(){}get updating(){return this._sortedDrapeSourceRenderersDirty||s(this._renderers,(e=>e.updating||e.canCompact))}get hasOverlays(){return null!=this._overlays&&null!=this._renderTargets}getMaterialRenderer(e){for(const t of this._renderers.values()){const r=t.getMaterialRenderer(e);if(r)return r}return null}get layers(){return this._sortedDrapeSourceRenderersDirty&&this._updateSortedDrapeSourceRenderers(),this._sortedRenderers.map((e=>e.drapeSource.layer)).filter((e=>!!e))}registerDrapeSource(e,t){const r=this._renderers.get(e);null!=r&&r.destroy(),this._renderers.set(e,t),this._sortedDrapeSourceRenderersDirty=!0,"fullOpacity"in e&&this.addHandles(l((()=>e.fullOpacity),(()=>this.events.emit("content-changed"))),e)}removeDrapeSourceRenderer(e){if(null==e)return;const t=this._renderers.get(e);null!=t&&(this._sortedDrapeSourceRenderersDirty=!0,this._renderers.delete(e),this.removeHandles(e),t.destroy())}computeValidity(){return this._renderTargets?.computeValidity()??0}releaseRenderTargets(){this._renderTargets?.dispose()}get overlays(){return this._overlays??[]}ensureDrapeTargets(e){this._hasTargetWithoutRasterImage=!!this._overlays&&u(e,(e=>e.drapeTargetType===z.WithoutRasterImage))}ensureDrapeSources(e){this._overlays?(this._hasDrapedFeatureSource=u(e,(e=>e.drapeSourceType===N.Features)),this._hasDrapedRasterSource=u(e,(e=>e.drapeSourceType===N.RasterImage))):this._hasDrapedFeatureSource=this._hasDrapedRasterSource=!1}get _needsColorWithoutRasterImage(){return this._hasDrapedRasterSource&&this._hasDrapedFeatureSource&&this._hasTargetWithoutRasterImage}ensureOverlays(e,t,r=this._bindParameters.overlayStretch){null==this._overlays&&(this._renderTargets=new ur(this._stage.renderer.fboCache),this._overlays=[new lr,new lr]),this.ensureDrapeTargets(e),this.ensureDrapeSources(t),this._bindParameters.overlayStretch=r}disposeOverlays(){this._overlays=null,this._renderTargets=o(this._renderTargets),this.events.emit("textures-disposed")}getTexture(e){return e===ir.ColorNoRasterImage&&!this._needsColorWithoutRasterImage&&this._hasDrapedFeatureSource?this._renderTargets?.getTexture(ir.Color):this._renderTargets?.getTexture(e)}get running(){return this.updating}runTask(e){this._processDrapeSources(e,(()=>!0))}_processDrapeSources(e,t){let r=!1;for(const[i,s]of this._renderers){if(e.done)break;(i.destroyed||t(i))&&s.commitChanges()&&(r=!0,e.madeProgress())}this._sortedDrapeSourceRenderersDirty&&(this._sortedDrapeSourceRenderersDirty=!1,r=!0,this._updateSortedDrapeSourceRenderers(),e.madeProgress()),this.compact(e),r&&(null!=this._overlays&&0===this._renderers.size&&this.disposeOverlays(),this.notifyChange("updating"),this.notifyChange("isEmpty"),this.events.emit("content-changed"),this.hasHighlights=s(this._renderers,(e=>e.hasHighlights)),this.notifyChange("rendersOccludedDraped"))}compact(e){let t=!1;for(const r of this._renderers.values()){if(e.done)break;t=r.compact(e)||t}return t&&this.notifyChange("updating"),t}hasHighlight(e){return s(this._renderers,(t=>t.hasHighlight(e)))}processSyncDrapeSources(){this._processDrapeSources(Bt,(e=>e.updatePolicy===kt.SYNC))}get isEmpty(){return!W.OVERLAY_DRAW_DEBUG_TEXTURE&&!s(this._renderers,(e=>!e.isEmpty))}get hasWater(){const e=s(this._renderers,(({hasWater:e})=>e));return e!==this._hasWater&&(this._hasWater=e,this.events.emit("has-water")),this._hasWater}get rendersOccludedDraped(){const e=this._renderContext.renderOccludedMask;this._renderContext.renderOccludedMask=gs,++this._techniques.precompiling;const t=this._sortedRenderers.some((({renderer:e})=>e.precompile(this._renderContext)));return--this._techniques.precompiling,this._renderContext.renderOccludedMask=e,t}renders(e){if(W.OVERLAY_DRAW_DEBUG_TEXTURE&&e!==ir.Occluded&&e!==ir.Highlight)return!0;if(!this._overlays)return!1;const t=this._overlays[er.INNER];for(const e of this._overlays)e.setupGeometryViews(this.longitudeCyclical);if(!t.hasSomeSizedView())return!1;const r=this._renderContext.output;this._renderContext.output=this._renderTargets?.targets.find((t=>t.content===e))?.output??le.Color,++this._techniques.precompiling;const i=this._sortedRenderers.some((({renderer:e})=>e.precompile(this._renderContext)));return--this._techniques.precompiling,this._renderContext.output=r,i}get mode(){return this.isEmpty?Ir.Disabled:this.hasWater&&this.renders(ir.WaterNormal)?Ir.EnabledWithWater:this._renderTargets?.getTexture(ir.Color)?Ir.Enabled:Ir.Disabled}updateAnimation(e){let t=!1;return this._renderers.forEach((r=>t=r.updateAnimation(e)||t)),t&&this.parent.requestRender(_t.BACKGROUND),t}updateDrapeSourceOrder(){this._sortedDrapeSourceRenderersDirty=!0}precompileShaders(e){if(!this._overlays||!this._renderTargets)return;const t=this._bindParameters;t.alignPixelEnabled=e.alignPixelEnabled,++this._techniques.precompiling;for(const e of this._renderTargets.targets){if(e.content===ir.ColorNoRasterImage&&!this._needsColorWithoutRasterImage)continue;const r=e.output;this._renderContext.output=r,t.slot=r===le.Normal?Pe.DRAPED_WATER:Pe.DRAPED_MATERIAL,r===le.Highlight&&(t.highlightMixTexture=t.highlights.length>1?this._rctx.emptyTexture:null),e.content===ir.Occluded&&(this._renderContext.renderOccludedMask=gs),this._sortedRenderers.forAll((({drapeSource:t,renderer:r})=>{e.content===ir.ColorNoRasterImage&&t.drapeSourceType===N.RasterImage||r.precompile(this._renderContext)})),this._renderContext.renderOccludedMask=Ti,t.highlightMixTexture=null}--this._techniques.precompiling}drawOverlays(e){if(this._overlays&&this._renderTargets){for(const e of this._overlays)e.setupGeometryViews(this.longitudeCyclical);this._bindParameters.alignPixelEnabled=e.alignPixelEnabled;for(const e of this._renderTargets.targets){if(e.content===ir.ColorNoRasterImage&&!this._needsColorWithoutRasterImage)continue;const t=this._drawTarget(er.INNER,e),r=this._drawTarget(er.OUTER,e);(t||r)&&e.fbo.generateMipMap()}}}_drawTarget(e,t){const r=this._overlays[e],i=r.canvasGeometries;if(0===i.numViews)return!1;const s=this._view.state.contentPixelRatio;this._screenToWorldRatio=s*r.mapUnitsPerPixel/this._bindParameters.overlayStretch;const{output:a}=t;if(this.isEmpty||a===le.Normal&&!this.hasWater||!r.hasSomeSizedView())return!1;const{_rctx:o,_camera:n,_renderContext:l,_bindParameters:c}=this;if(n.pixelRatio=r.pixelRatio*s,l.output=a,c.screenToWorldRatio=this._screenToWorldRatio,c.screenToPCSRatio=this._screenToWorldRatio*this.parent.worldToPCSRatio,c.slot=a===le.Normal?Pe.DRAPED_WATER:Pe.DRAPED_MATERIAL,t.content===ir.Occluded&&(l.renderOccludedMask=gs),!this.renders(t.content))return l.renderOccludedMask=Ti,!1;const{resolution:h}=r,d=e===er.INNER,u=d?0:h;if(o.setViewport(u,0,h,h),this._bindTargetFBO(t),d)if(t.output!==le.Highlight)o.setClearColor(0,0,0,0),o.clear(bt.COLOR);else{const{gl:e}=o;e.clearBufferuiv(e.COLOR,0,[0,0,0,0])}if(W.OVERLAY_DRAW_DEBUG_TEXTURE&&t.content!==ir.Occluded&&t.content!==ir.Highlight){this._techniques.precompile(ss,ps);const t=this._techniques.get(ss,ps);for(let s=0;s<i.numViews;s++)this._setViewParameters(i.extents[s],r),this._ensureDebugPatternResources(r.resolution,ds[e]),o.bindTechnique(t,c,this._passParameters),o.screen.draw()}if(t.output===le.Highlight){const{fboCache:r}=this._stage.renderer,i=this._resolution;this._bindTargetFBO(t),fi(o,r,{width:i,height:i},c,(()=>this._renderAllGeometry(e,t)),u)}else this._renderAllGeometry(e,t);return o.bindFramebuffer(null),l.renderOccludedMask=Ti,!0}_renderAllGeometry(e,t){const r=this._overlays[e],i=r.canvasGeometries;this._sortedRenderers.forAll((({drapeSource:s,renderer:a})=>{if(t.content===ir.ColorNoRasterImage&&s.drapeSourceType===N.RasterImage)return;const{fullOpacity:o}=s,n=null!=o&&o<1&&t.output===le.Color&&this._bindTemporaryFBO();for(let e=0;e<i.numViews;e++)this._setViewParameters(i.extents[e],r),a.render(this._renderContext);if(n){this._bindTargetFBO(t),this._overlayParameters.texture=n.getTexture(),this._overlayParameters.opacity=o,this._overlayParameters.overlayIndex=e;const r=this._techniques.get(ls);this._rctx.bindTechnique(r,this._bindParameters,this._overlayParameters),this._rctx.screen.draw(),n.release()}}))}_bindTargetFBO(e){const t=this._resolution,r=2*t;e.fbo.bind(this._rctx,r,t)}_bindTemporaryFBO(){const e=this._resolution,t=2*e,r=this._stage.renderer.fboCache,i=r.acquire(t,e,"overlay tmp");return r.rctx.bindFramebuffer(i.fbo),r.rctx.clear(bt.COLOR),i}get _resolution(){return this._overlays?.[er.INNER].resolution??0}notifyContentChanged(){this.events.emit("content-changed")}intersect(e,t,r,i){this._sortedDrapeSourceRenderersDirty&&this._updateSortedDrapeSourceRenderers();let s=0;for(const{renderer:a}of this._sortedRenderers)s=a.intersect?.(e,t,r,i,s)??s}_updateSortedDrapeSourceRenderers(){if(this._sortedRenderers.clear(),0===this._renderers.size)return;const e=this._view.map.allLayers,t=e.length;this._renderers.forEach(((r,i)=>{const s=e.indexOf(i.layer),a=s>=0,o=i.renderGroup??(a?U.MapLayer:U.ViewLayer),n=i.drapeSourcePriorityOffset??0,l=t*o+(a?s:0)+n;this._sortedRenderers.push(new hs(i,r,l))})),this._sortedRenderers.sort(((e,t)=>e.index-t.index))}_setViewParameters(e,t){const r=this._camera;r.viewport=[0,0,t.resolution,t.resolution],C(r.projectionMatrix,0,e[2]-e[0],0,e[3]-e[1],r.near,r.far),w(r.viewMatrix,[-e[0],-e[1],0])}_ensureDebugPatternResources(e,t){if(E(this._passParameters.color,t[0],t[1],t[2]),this._passParameters.texture)return;const r=new Uint8Array(e*e*4);let i=0;for(let t=0;t<e;t++)for(let s=0;s<e;s++){const a=Math.floor(s/10),o=Math.floor(t/10);a<2||o<2||10*a>e-20||10*o>e-20?(r[i++]=255,r[i++]=255,r[i++]=255,r[i++]=255):(r[i++]=255,r[i++]=255,r[i++]=255,r[i++]=1&a&&1&o?1&s^1&t?0:255:1&a^1&o?0:128)}const s=new It(e);s.samplingMode=wt.NEAREST,this._passParameters.texture=new Ft(this._rctx,s,r)}get test(){}};e([g()],cs.prototype,"hasHighlights",void 0),e([g()],cs.prototype,"_sortedDrapeSourceRenderersDirty",void 0),e([g({constructOnly:!0})],cs.prototype,"parent",void 0),e([g({readOnly:!0})],cs.prototype,"_techniques",null),e([g({type:Boolean,readOnly:!0})],cs.prototype,"updating",null),e([g()],cs.prototype,"isEmpty",null),e([g({readOnly:!0})],cs.prototype,"rendersOccludedDraped",null),cs=e([f("esri.views.3d.terrain.OverlayRenderer")],cs);class hs{constructor(e,t,r){this.drapeSource=e,this.renderer=t,this.index=r}}const ds=[[1,.5,.5],[.5,.5,1]],us=-2,gs=Ke.OccludeAndTransparent,ps=new as;ps.hasAlpha=!0;class fs{constructor(e,t={}){this.geometry=e,this.screenToWorldRatio=1,this._transformation=He(),this._shaderTransformation=null,this._boundingSphere=null,this.id=Zt(),this.layerViewUid=t.layerViewUid,this.graphicUid=t.graphicUid,this.castShadow=t.castShadow??!1,t.objectShaderTransformation&&this.objectShaderTransformationChanged(t.objectShaderTransformation)}get transformation(){return this._transformation}set transformation(e){b(this._transformation,e),this._boundingSphere=null}get boundingInfo(){return this.geometry.boundingInfo}objectShaderTransformationChanged(e){null==e?this._shaderTransformation=null:(this._shaderTransformation??=He(),_(this._shaderTransformation,e,this.geometry.transformation)),this._boundingSphere=null}get boundingSphere(){return this.boundingInfo?(null==this._boundingSphere&&(this._boundingSphere??=Yt(),F(Xt(this._boundingSphere),this.boundingInfo.center,this.shaderTransformation),this._boundingSphere[3]=this.boundingInfo.radius*$t(this.shaderTransformation)),this._boundingSphere):Qt}get material(){return this.geometry.material}get type(){return this.geometry.type}get shaderTransformation(){return this._shaderTransformation??this.transformation}get attributes(){return this.geometry.attributes}get highlight(){return this.geometry.highlights}foreachHighlightOptions(e){this.geometry.foreachHighlightOptions(e)}get hasHighlights(){return this.geometry.hasHighlights}get occludees(){return this.geometry.occludees}get visible(){return this.geometry.visible}set visible(e){this.geometry.visible=e}}export{kr as A,wi as B,or as C,Kt as D,gr as F,fr as G,di as H,er as O,ni as P,fs as R,Gr as S,rr as T,yi as U,Ci as V,Pr as W,Jt as a,ar as b,cs as c,us as d,Er as e,Ir as f,ir as g,tr as h,ci as i,hi as j,li as k,Ur as l,Nr as m,Or as n,gs as o,Fr as p,Ar as q,sr as r,Oi as s,Mr as t,Mi as u,Si as v,Ti as w,mi as x,fi as y,_i as z};
