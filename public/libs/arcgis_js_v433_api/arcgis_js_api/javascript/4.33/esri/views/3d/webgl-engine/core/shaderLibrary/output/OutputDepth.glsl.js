// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../ShaderOutput","../../shaderModules/glsl"],(function(t,e,a){"use strict";t.OutputDepth=function(t,h){switch(h.output){case e.ShaderOutput.Shadow:case e.ShaderOutput.ShadowHighlight:case e.ShaderOutput.ShadowExcludeHighlight:case e.ShaderOutput.ViewshedShadow:t.fragment.code.add(a.glsl`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth){
float fragDepth = _calculateFragDepth(_linearDepth);
gl_FragDepth = fragDepth;
}`)}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));