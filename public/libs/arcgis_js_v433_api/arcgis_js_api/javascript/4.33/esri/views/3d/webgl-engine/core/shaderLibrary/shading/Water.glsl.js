// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./FoamRendering.glsl","./Gamma.glsl","./PhysicallyBasedRendering.glsl","./ScreenSpaceConstants","./ScreenSpaceReflections.glsl","../util/CloudsParallaxShading.glsl","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../shaderModules/Matrix4BindUniform","../../shaderModules/Texture2DBindUniform","../../../shaders/ToneMapping.glsl"],(function(e,o,t,r,n,a,i,l,d,c,s,f){"use strict";e.Water=function(e,v){const m=e.fragment;m.include(r.PhysicallyBasedRenderingWater,v),m.include(t.Gamma),m.include(o.FoamColor),v.cloudReflections&&e.include(i.CloudsParallaxShading),e.include(a.ScreenSpaceReflections,v),m.include(f.ToneMapping,v),m.constants.add("fresnelSky","vec3",[.02,1,15]),m.constants.add("fresnelMaterial","vec2",[.02,.1]),m.constants.add("roughness","float",.015),m.constants.add("foamIntensityExternal","float",1.7),m.constants.add("ssrIntensity","float",.65),m.constants.add("ssrHeightFadeStart","float",n.distanceFadeStart),m.constants.add("ssrHeightFadeEnd","float",n.distanceFadeEnd),m.constants.add("waterDiffusion","float",.92),m.constants.add("waterSeaColorMod","float",.8),m.constants.add("correctionViewingPowerFactor","float",.4),m.constants.add("skyZenitColor","vec3",[.52,.68,.9]),m.constants.add("skyColor","vec3",[.67,.79,.9]),m.constants.add("cloudFresnelModifier","vec2",[1.2,.01]),m.code.add(d.glsl`PBRShadingWater shadingInfo;
vec3 getSkyGradientColor(in float cosTheta, in vec3 horizon, in vec3 zenit) {
float exponent = pow((1.0 - cosTheta), fresnelSky[2]);
return mix(zenit, horizon, exponent);
}`),m.uniforms.add(new l.FloatBindUniform("lightingSpecularStrength",(e=>e.lighting.mainLight.specularStrength)),new l.FloatBindUniform("lightingEnvironmentStrength",(e=>e.lighting.mainLight.environmentStrength))),m.code.add(d.glsl`vec3 getSeaColor(in vec3 n, in vec3 v, in vec3 l, vec3 color, in vec3 lightIntensity, in vec3 localUp, in float shadow, float foamIntensity, vec3 viewPosition, vec3 position) {
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
vec3 reflectedWorld = normalize(reflect(-v, normalCorrectedClouds));`),v.cloudReflections&&m.uniforms.add(new l.FloatBindUniform("cloudsOpacity",(e=>e.clouds.opacity))).code.add(d.glsl`vec4 cloudsColor = renderClouds(reflectedWorld, position);
cloudsColor.a = 1.0 - cloudsColor.a;
cloudsColor = pow(cloudsColor, vec4(GAMMA));
cloudsColor *= clamp(fresnelModifier.y * cloudFresnelModifier[0] - cloudFresnelModifier[1], 0.0, 1.0) * cloudsOpacity;`),v.screenSpaceReflections?m.uniforms.add(new c.Matrix4BindUniform("view",(e=>e.camera.viewMatrix)),new s.Texture2DBindUniform("lastFrameColorTexture",(e=>e.ssr.lastFrameColor?.getTexture())),new l.FloatBindUniform("fadeFactorSSR",(e=>e.ssr.fadeFactor))).code.add(d.glsl`vec3 viewDir = normalize(viewPosition);
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
reflSea * seaColorMod + specular + foam);`):m.code.add(d.glsl`vec3 waterRenderedColor = tonemapACES(reflSky + reflSea * waterSeaColorMod + specular + foam);`),v.cloudReflections?v.screenSpaceReflections?m.code.add(d.glsl`return waterRenderedColor * (1.0 - (1.0 - reflectionHit) * cloudsColor.a) + (1.0 - reflectionHit) * cloudsColor.xyz;
}`):m.code.add(d.glsl`return waterRenderedColor * (1.0 - cloudsColor.a) + cloudsColor.xyz;
}`):m.code.add(d.glsl`return waterRenderedColor;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));