// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../colorUtils","../../shaderModules/glsl"],(function(o,e,l){"use strict";o.Gamma=function(o){o.code.add(l.glsl`
    const float GAMMA = ${l.glsl.float(e.colorGamma)};
    const float INV_GAMMA = ${l.glsl.float(1/e.colorGamma)};

    vec4 delinearizeGamma(vec4 color) {
      return vec4(pow(color.rgb, vec3(INV_GAMMA)), color.a);
    }

    vec3 linearizeGamma(vec3 color) {
      return pow(color, vec3(GAMMA));
    }
  `)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));