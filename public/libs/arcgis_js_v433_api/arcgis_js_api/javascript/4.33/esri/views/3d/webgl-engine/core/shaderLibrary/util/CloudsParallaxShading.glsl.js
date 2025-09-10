// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../../../../../../geometry/support/Ellipsoid","../../../../environment/Clouds","../../../../environment/CloudsParameters","../../../../environment/weather","../shading/MainLighting.glsl","./LookupCloudsFromTextureArray.glsl","../../shaderModules/BooleanBindUniform","../../shaderModules/Float3BindUniform","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../shaderModules/Matrix4BindUniform","../../shaderModules/Texture2DArrayBindUniform"],(function(o,e,t,a,r,i,n,d,l,c,s,u,m,h){"use strict";const C=(t.earth.radius+i.cloudsHeight)**2;o.CloudsParallaxShading=function(o){const t=o.fragment;t.constants.add("radiusCloudsSquared","float",C).code.add(u.glsl`vec3 intersectWithCloudLayer(vec3 dir, vec3 cameraPosition, vec3 spherePos) {
float B = 2.0 * dot(cameraPosition, dir);
float C = dot(cameraPosition, cameraPosition) - radiusCloudsSquared;
float det = B * B - 4.0 * C;
float pointIntDist = max(0.0, 0.5 *(-B + sqrt(det)));
return (cameraPosition + dir * pointIntDist) - spherePos;
}`),t.uniforms.add(new s.FloatBindUniform("radiusCurvatureCorrection",(({clouds:o})=>o.parallax.radiusCurvatureCorrection))).code.add(u.glsl`vec3 correctForPlanetCurvature(vec3 dir) {
dir.z = dir.z * (1.0 - radiusCurvatureCorrection) + radiusCurvatureCorrection;
return dir;
}`),t.code.add(u.glsl`vec3 rotateDirectionToAnchorPoint(mat4 rotMat, vec3 inVec) {
return (rotMat * vec4(inVec, 0.0)).xyz;
}`),n.addMainLightDirection(t),n.addMainLightIntensity(t);const i=e.fromValues(.28,.175,.035);t.constants.add("RIM_COLOR","vec3",i),t.code.add(u.glsl`
    vec3 calculateCloudColor(vec3 cameraPosition, vec3 worldSpaceRay, vec4 clouds) {
      float upDotLight = dot(cameraPosition, mainLightDirection);
      float dirDotLight = max(dot(worldSpaceRay, mainLightDirection), 0.0);
      float sunsetTransition = clamp(pow(max(upDotLight, 0.0), ${u.glsl.float(.3)}), 0.0, 1.0);

      // Base color of the clouds that depends on lighting of the sun and sky
      vec3 ambientLight = calculateAmbientIrradiance(cameraPosition,  0.0);
      vec3 combinedLight = clamp((mainLightIntensity + ambientLight )/PI, vec3(0.0), vec3(1.0));
      vec3 baseCloudColor = pow(combinedLight * pow(clouds.xyz, vec3(GAMMA)), vec3(INV_GAMMA));

      // Rim light around the edge of the clouds simulating scattering of the direct lun light
      float scatteringMod = max(clouds.a < 0.5 ? clouds.a / 0.5 : - clouds.a / 0.5 + 2.0, 0.0);
      float rimLightIntensity = 0.5 + 0.5 * pow(max(upDotLight, 0.0), 0.35);
      vec3 directSunScattering = RIM_COLOR * rimLightIntensity * (pow(dirDotLight, ${u.glsl.float(140)})) * scatteringMod;

      // Brighten the clouds around the sun at the sunsets
      float additionalLight = ${u.glsl.float(.2)} * pow(dirDotLight, ${u.glsl.float(10)}) * (1. - pow(sunsetTransition, ${u.glsl.float(.3)})) ;

      return vec3(baseCloudColor * (1.0 + additionalLight) + directSunScattering);
    }
  `),o.include(d.LookupCloudsFromTextureArray),t.uniforms.add(new l.BooleanBindUniform("readChannelsRG",(o=>o.clouds.readChannels===a.CloudsTextureChannels.RG)),new h.Texture2DArrayBindUniform("cubeMap",(o=>o.clouds.data?.cubeMap?.colorTexture))).code.add(u.glsl`vec4 sampleCloud(vec3 rayDir, bool readOtherChannel) {
vec4 s = lookupCloudsFromTextureArray(cubeMap, rayDir);
bool readRG = readChannelsRG ^^ readOtherChannel;
s = readRG ? vec4(vec3(s.r), s.g) : vec4(vec3(s.b), s.a);
return length(s) == 0.0 ? vec4(s.rgb, 1.0) : s;
}`),t.uniforms.add(new c.Float3BindUniform("anchorPoint",(o=>o.clouds.parallax.anchorPoint)),new c.Float3BindUniform("anchorPointNew",(o=>o.clouds.parallaxNew.anchorPoint)),new m.Matrix4BindUniform("rotationClouds",(o=>o.clouds.parallax.transform)),new m.Matrix4BindUniform("rotationCloudsNew",(o=>o.clouds.parallaxNew.transform)),new s.FloatBindUniform("cloudsOpacity",(o=>o.clouds.opacity)),new s.FloatBindUniform("fadeFactor",(o=>o.clouds.fadeFactor)),new l.BooleanBindUniform("crossFade",(o=>o.clouds.fadeState===r.FadeState.CROSS_FADE))).code.add(u.glsl`vec4 renderClouds(vec3 worldRay, vec3 cameraPosition) {
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
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));