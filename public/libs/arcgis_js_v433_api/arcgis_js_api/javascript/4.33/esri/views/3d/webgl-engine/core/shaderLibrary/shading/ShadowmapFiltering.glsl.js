// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./calculateUVZShadow.glsl","../../shaderModules/glsl"],(function(a,e,d){"use strict";class o extends e.ReadShadowMapOrigin{}a.ReadShadowMapDrawParameters=o,a.ShadowmapFiltering=function(a){a.fragment.code.add(d.glsl`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)},Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})}));