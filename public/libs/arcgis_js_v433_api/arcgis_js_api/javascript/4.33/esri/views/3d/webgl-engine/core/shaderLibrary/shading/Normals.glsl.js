// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../shaderModules/glsl"],(function(e,a,r){"use strict";var o;e.NormalsDoubleSidedMode=void 0,(o=e.NormalsDoubleSidedMode||(e.NormalsDoubleSidedMode={}))[o.None=0]="None",o[o.View=1]="View",o[o.WindingOrder=2]="WindingOrder",o[o.COUNT=3]="COUNT",e.Normals=function(o,d){const i=o.fragment;switch(i.code.add(r.glsl`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),d.doubleSidedMode){case e.NormalsDoubleSidedMode.None:i.code.add(r.glsl`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case e.NormalsDoubleSidedMode.View:i.code.add(r.glsl`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case e.NormalsDoubleSidedMode.WindingOrder:i.code.add(r.glsl`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:a.neverReached(d.doubleSidedMode);case e.NormalsDoubleSidedMode.COUNT:}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));