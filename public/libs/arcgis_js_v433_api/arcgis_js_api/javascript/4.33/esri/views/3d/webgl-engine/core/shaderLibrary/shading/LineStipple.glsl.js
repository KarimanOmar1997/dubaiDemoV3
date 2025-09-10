// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../util/RgbaFloatEncoding.glsl","../util/View.glsl","../../shaderModules/Float4PassUniform","../../shaderModules/FloatBindUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform","../../../materials/stippleTextureRepository","../../../shaders/ensureColor4"],(function(e,t,o,l,i,a,r,n,s,p){"use strict";function d(e){const t=e.stipplePattern;return t?s.computeTextureSize(e.stipplePattern)/t.pixelRatio:1}e.LineStipple=function(e,c){if(!c.stippleEnabled)return void e.fragment.code.add(r.glsl`float getStippleAlpha() { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const f=!(c.draped&&c.stipplePreferContinuous),{vertex:S,fragment:u}=e;u.include(t.RgbaFloatEncoding),c.draped||(o.addCameraPosition(S,c),S.uniforms.add(new i.FloatBindUniform("worldToScreenPerDistanceRatio",(({camera:e})=>1/e.perScreenPixelRatio))).code.add(r.glsl`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),S.code.add(r.glsl`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${r.glsl.float(.4)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),S.code.add(r.glsl`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),S.code.add(r.glsl`
    if (segmentLengthPseudoScreen >= ${f?"patternLength":"1e4"}) {
  `),o.addPixelRatio(S),S.code.add(r.glsl`float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
float segmentLengthScreenRounded = flooredRepetitions * patternLength;
float stretch = repetitions / flooredRepetitions;
vStipplePatternStretch = max(0.75, stretch);
return vec2(0.0, segmentLengthScreenRounded);
}
return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
}`),u.uniforms.add(new n.Texture2DPassUniform("stipplePatternTexture",(e=>e.stippleTexture)),new a.FloatPassUniform("stipplePatternSDFNormalizer",(e=>{return(t=e.stipplePattern)?(Math.floor(.5*(s.computeLongestPattern(t)-1))+.5)/t.pixelRatio:1;var t})),new a.FloatPassUniform("stipplePatternPixelSizeInv",(e=>1/d(e)))),c.stippleOffColorEnabled&&u.uniforms.add(new l.Float4PassUniform("stippleOffColor",(e=>p.ensureColor4(e.stippleOffColor)))),u.code.add(r.glsl`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv * vLineSizeInv;
u = fract(u);
float encodedSDF = rgbaTofloat(texture(stipplePatternTexture, vec2(u, 0.5)));
float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha() {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),u.code.add(r.glsl`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${r.If(!c.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${c.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)},e.computePixelSize=d,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));