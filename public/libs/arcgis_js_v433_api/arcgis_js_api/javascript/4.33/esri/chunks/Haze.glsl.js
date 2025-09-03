// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/environment/ChapmanRaymarching.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/shaders/ScreenSpacePassAtmosphere.glsl","../views/3d/webgl-engine/shaders/SphereIntersect.glsl","../views/3d/webgl-engine/shaders/ToneMapping.glsl","../views/webgl/ShaderBuilder"],(function(e,a,t,r,i,n,l,d,s,o,c,h){"use strict";function p(e){const p=new h.ShaderBuilder,{fragment:g}=p;p.include(s.ScreenSpacePassAtmosphere),i.addMainLightDirection(g),g.include(r.Gamma),g.include(t.ReadDepth),g.include(o.SphereIntersect),g.include(c.ToneMapping),g.include(a.ChapmanRaymarching,!0),g.uniforms.add(new d.Texture2DBindUniform("depthTexture",(e=>e.mainDepth)),new n.FloatPassUniform("hazeStrength",(e=>e.hazeStrength)));const{reduced:u}=e;return u&&g.code.add(l.glsl`float getDepth(vec2 uv){
return linearDepthFromTexture(depthTexture, uv);
}
float textureBilinear(vec2 uv) {
vec2 depthTextureSize = vec2(textureSize(depthTexture, 0));
vec2 texelSize = 1.0 / depthTextureSize;
vec2 depthUV = (uv * depthTextureSize) - vec2(0.5);
vec2 f = fract(depthUV);
vec2 snapUV = (floor(depthUV) + vec2(0.5)) / depthTextureSize;
float d0 = getDepth(snapUV);
float d1 = getDepth(snapUV + vec2(texelSize.x, 0.0));
float d2 = getDepth(snapUV + vec2(0.0, texelSize.y));
float d3 = getDepth(snapUV + texelSize);
return mix(mix(d0, d1, f.x), mix(d2, d3, f.x), f.y);
}`),g.main.add(l.glsl`
      vec3 rayDir = normalize(worldRay);
      float terrainDepth = -1.0;

      float depthSample = texture(depthTexture, uv).r;
      if (depthSample != 1.0) {
        vec3 cameraSpaceRay = normalize(eyeDir);
        cameraSpaceRay /= cameraSpaceRay.z;

        cameraSpaceRay *= ${l.If(u,"-textureBilinear(uv)","-linearDepthFromTexture(depthTexture, uv)")};
        terrainDepth = max(0.0, length(cameraSpaceRay));
      } else {
        discard;
      }

      // Alpha is ignored for haze blending
      vec3 col = vec3(0);
      float fadeOut = smoothstep(-10000.0, -15000.0, heightParameters[0] - radii[0]);
      if(depthSample != 1.0){
        col = (1.0 - fadeOut) * hazeStrength * raymarchAtmosphere(cameraPosition, rayDir, mainLightDirection, terrainDepth);
      }
      float alpha = 1.0;

      col = tonemapACES(col);
      fragColor = delinearizeGamma(vec4(col, alpha));
  `),p}const g=Object.freeze(Object.defineProperty({__proto__:null,build:p},Symbol.toStringTag,{value:"Module"}));e.Haze=g,e.build=p}));