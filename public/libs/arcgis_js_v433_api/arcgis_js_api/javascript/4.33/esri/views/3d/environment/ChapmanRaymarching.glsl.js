// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./atmosphereUtils","./ChapmanApproximation.glsl","../webgl-engine/core/shaderModules/Float3BindUniform","../webgl-engine/core/shaderModules/glsl"],(function(e,a,t,i,l){"use strict";e.ChapmanRaymarching=function(e,r){e.include(t.ChapmanApproximation),e.uniforms.add(new i.Float3BindUniform("cameraPosition",(e=>e.camera.eye))),e.constants.add("betaRayleigh","vec3",a.betaRayleigh),e.constants.add("betaCombined","vec3",a.betaCombined),e.constants.add("betaMie","float",a.betaMie),e.code.add(l.glsl`
    vec3 raymarchAtmosphere(vec3 cameraPos, vec3 rayDir, vec3 lightDir, float terrainDepth) {
      vec4 ray = planetIntersect(cameraPos, rayDir);
      if(ray.x == 1.0) {
        return vec3(0);
      }
      ${l.If(r,"if (terrainDepth != -1.0) { ray.w = terrainDepth; }")}

      vec3 samplePoint = cameraPos + rayDir * ray.w;
      float multiplier = ray.y == 1.0 ? -1.0 : 1.0;

      vec3 scattering = vec3(0);
      float scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
      float lastOpticalDepth = getOpticalDepth(samplePoint, rayDir, scaleFract);
      float stepSize = (ray.w - ray.z) / ${l.glsl.float(6)};

      for (int i = 0; i < ${l.glsl.int(6)}; i++) {
        samplePoint -= stepSize * rayDir;
        scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
        float opticalDepth = multiplier * getOpticalDepth(samplePoint, rayDir * multiplier, scaleFract);

        if (i > 0) {
          scattering *= exp(-(mix(betaCombined, betaRayleigh, 0.5) + betaMie) * max(0.0, (opticalDepth - lastOpticalDepth)));
          ${l.If(!r,"scattering *= mix(2.5, 1.0, clamp((length(cameraPos) - radii[0]) / 50e3, 0.0, 1.0))")};
        }

        if (dot(normalize(samplePoint), lightDir) > -0.3) {
          float scale = exp(-scaleFract);
          float lightDepth = getOpticalDepth(samplePoint, lightDir, scaleFract);
          scattering += scale * exp(-(betaCombined + betaMie) * lightDepth);
          ${l.If(!r,"scattering += scale * exp(-(0.25 * betaCombined ) * lightDepth);")}
        }
        lastOpticalDepth = opticalDepth;
      }

      float mu = dot(rayDir, lightDir);
      float mumu = 1.0 + mu * mu;

      float phaseRayleigh = 0.0596831 * mumu;
      ${r?"return 3.0 * scattering * stepSize * phaseRayleigh * betaRayleigh;":l.glsl`const float g = 0.8;
             const float gg = g * g;
             float phaseMie = 0.1193662 * ((1.0 - gg) * mumu) / (pow(1.0 + gg - 2.0 * mu * g, 1.5) * (2.0 + gg));
             phaseMie = clamp(phaseMie, 0.0, 128.0);
             return 3.0 * scattering * stepSize * (phaseRayleigh * betaRayleigh + 0.025 * phaseMie * betaMie);`}
    }`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));