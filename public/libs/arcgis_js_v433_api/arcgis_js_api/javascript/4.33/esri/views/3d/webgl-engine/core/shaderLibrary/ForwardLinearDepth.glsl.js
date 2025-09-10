// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./ShaderOutput","./attributes/VertexPosition.glsl","../shaderModules/Float2BindUniform","../shaderModules/glsl"],(function(e,a,r,t,d){"use strict";function i(e){e.varyings.add("linearDepth","float",{invariant:!0})}function o(e){e.vertex.uniforms.add(new t.Float2BindUniform("nearFar",(e=>e.camera.nearFar)))}function n(e){e.vertex.code.add(d.glsl`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}e.ForwardLinearDepth=function(e,t){const{vertex:l}=e;switch(t.output){case a.ShaderOutput.Color:case a.ShaderOutput.ColorEmission:if(t.receiveShadows)return i(e),void l.code.add(d.glsl`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case a.ShaderOutput.Shadow:case a.ShaderOutput.ShadowHighlight:case a.ShaderOutput.ShadowExcludeHighlight:case a.ShaderOutput.ViewshedShadow:return e.include(r.VertexPosition,t),i(e),o(e),n(e),void l.code.add(d.glsl`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}l.code.add(d.glsl`void forwardLinearDepth() {}`)},e.addCalculateLinearDepth=n,e.addLinearDepth=i,e.addNearFar=o,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));