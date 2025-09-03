// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./util/View.glsl","../shaderModules/FloatBindUniform","../shaderModules/FloatPassUniform","../shaderModules/glsl"],(function(e,i,r,o,n){"use strict";e.ScreenSizeScaling=function(e,a){if(!a.screenSizeEnabled)return;const c=e.vertex;i.addCameraPosition(c,a),c.uniforms.add(new r.FloatBindUniform("perScreenPixelRatio",(e=>e.camera.perScreenPixelRatio)),new o.FloatPassUniform("screenSizeScale",(e=>e.screenSizeScale))).code.add(n.glsl`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));