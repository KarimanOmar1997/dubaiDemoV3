// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../support/engineContent/marker","../util/View.glsl","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../../shaders/LineMarkerTechniqueConfiguration"],(function(e,r,t,a,o,n){"use strict";e.MarkerSizing=function(e,i){const d=e.vertex;t.addPixelRatio(d),null==d.uniforms.get("markerScale")&&d.constants.add("markerScale","float",1),d.constants.add("markerSizePerLineWidth","float",r.markerSizePerLineWidth).code.add(o.glsl`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),i.space===n.LineMarkerSpace.World&&(d.constants.add("maxSegmentLengthFraction","float",.45),d.uniforms.add(new a.FloatBindUniform("perRenderPixelRatio",(e=>e.camera.perRenderPixelRatio))),d.code.add(o.glsl`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}
float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}`))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));