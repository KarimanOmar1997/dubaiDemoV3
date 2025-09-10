/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{S as e,a as t,b as o}from"./VerticalOffset.glsl.js";import{b as a,c as i,F as r,d as n,e as s,g as l,h as c}from"./Matrix4PassUniform.js";import{F as f}from"./Matrix4BindUniform.js";import{g as d}from"./glsl.js";import{V as p}from"./VertexAttribute.js";import{B as u}from"./BooleanBindUniform.js";import{H as v}from"./HUDRenderStyle.js";const m=.5;function x(c,u){c.include(e),c.attributes.add(p.POSITION,"vec3"),c.attributes.add(p.NORMAL,"vec3"),c.attributes.add(p.CENTEROFFSETANDDISTANCE,"vec4");const v=c.vertex;a(v,u),i(v,u),v.uniforms.add(new r("viewport",(e=>e.camera.fullViewport)),new n("polygonOffset",(e=>e.shaderPolygonOffset)),new f("cameraGroundRelative",(e=>e.camera.aboveGround?1:-1))),u.hasVerticalOffset&&t(v),v.code.add(d`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),v.code.add(d`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${u.terrainDepthTest?d.float(0):d`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),u.draped&&!u.hasVerticalOffset||s(v),u.draped||(v.uniforms.add(new f("perDistancePixelRatio",(e=>Math.tan(e.camera.fovY/2)/(e.camera.fullViewport[2]/2)))),v.code.add(d`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${d.float(.5)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),u.screenCenterOffsetUnitsEnabled&&l(v),u.hasScreenSizePerspective&&o(v),v.code.add(d`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${u.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${u.hasScreenSizePerspective&&(u.hasVerticalOffset||u.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${u.hasVerticalOffset?u.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${u.hasVerticalOffset?d`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${u.screenCenterOffsetUnitsEnabled?"":d`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${u.screenCenterOffsetUnitsEnabled?u.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${u.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function w(e){e.uniforms.add(new u("alignPixelEnabled",(e=>e.alignPixelEnabled))),e.code.add(d`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(d`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function O(e){e.vertex.uniforms.add(new f("renderTransparentlyOccludedHUD",(e=>e.hudRenderStyle===v.Occluded?1:e.hudRenderStyle===v.NotOccluded?0:.75)),new r("viewport",(e=>e.camera.fullViewport)),new c("hudVisibilityTexture",(e=>e.hudVisibility?.getTexture()))),e.vertex.include(w),e.vertex.code.add(d`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}export{w as A,x as H,O as a,m as b};
