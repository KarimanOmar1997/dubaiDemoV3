// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/math/mat4","../../../../../../core/libs/gl-matrix-2/factories/mat4f64","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","./CameraSpace.glsl","../../shaderModules/glsl","../../shaderModules/Matrix4PassUniform","../../../../../webgl/NoParameters"],(function(e,r,a,t,c,o,i,s){"use strict";class n extends s.NoParameters{constructor(){super(...arguments),this.localOrigin=t.zeros()}}e.LocalFromScreenSpacePassParameters=n,e.localFromScreenSpace=function(e){e.include(c.CameraSpace),e.fragment.uniforms.add(new i.Matrix4PassUniform("inverseViewMatrix",((e,t)=>{const c=r.translate(a.create(),t.camera.viewMatrix,e.localOrigin);return r.invertOrIdentity(c,c)}))).code.add(o.glsl`vec4 reconstructLocalPosition(vec2 coord, float linearDepth) {
vec4 cameraSpace = vec4(reconstructPosition(coord, linearDepth), 1.0);
return inverseViewMatrix * cameraSpace;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));