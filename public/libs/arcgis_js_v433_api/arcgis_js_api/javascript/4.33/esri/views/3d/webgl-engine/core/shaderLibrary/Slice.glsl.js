// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../core/libs/gl-matrix-2/math/mat4","../../../../../core/libs/gl-matrix-2/factories/mat4f64","../../../../../chunks/vec32","../../../../../core/libs/gl-matrix-2/factories/vec3f64","../shaderModules/Float3DrawUniform","../shaderModules/Float3PassUniform","../shaderModules/glsl","../../../../webgl/NoParameters"],(function(e,s,a,i,l,n,c,o,t){"use strict";class r extends t.NoParameters{constructor(e){super(),this.slicePlaneLocalOrigin=e}}const f=o.glsl`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
bool rejectBySlice(vec3 pos) {
return sliceByPlane(pos);
}`;function d(e,s,...a){s.hasSlicePlane?(e.uniforms.add(...a),e.code.add(f)):e.code.add("bool rejectBySlice(vec3 pos) { return false; }")}function u(e,s,...a){d(e,s,...a),s.hasSlicePlane?e.code.add("\n    void discardBySlice(vec3 pos) {\n      if (sliceByPlane(pos)) {\n        discard;\n      }\n    }\n\n    vec4 applySliceOutline(vec4 color, vec3 pos) {\n      SliceFactors factors = calculateSliceFactors(pos);\n\n      factors.front /= 2.0 * fwidth(factors.front);\n      factors.side0 /= 2.0 * fwidth(factors.side0);\n      factors.side1 /= 2.0 * fwidth(factors.side1);\n      factors.side2 /= 2.0 * fwidth(factors.side2);\n      factors.side3 /= 2.0 * fwidth(factors.side3);\n\n      // return after calling fwidth, to avoid aliasing caused by discontinuities in the input to fwidth\n      if (sliceByFactors(factors)) {\n        return color;\n      }\n\n      float outlineFactor = (1.0 - step(0.5, factors.front))\n        * (1.0 - step(0.5, factors.side0))\n        * (1.0 - step(0.5, factors.side1))\n        * (1.0 - step(0.5, factors.side2))\n        * (1.0 - step(0.5, factors.side3));\n\n      return mix(color, vec4(vec3(0.0), color.a), outlineFactor * 0.3);\n    }\n\n    vec4 applySlice(vec4 color, vec3 pos) {\n      return sliceEnabled() ? applySliceOutline(color, pos) : color;\n    }\n  "):e.code.add(o.glsl`void discardBySlice(vec3 pos) { }
vec4 applySlice(vec4 color, vec3 pos) { return color; }`)}function P(e,s,a){return e.instancedDoublePrecision?i.set(w,a.camera.viewInverseTransposeMatrix[3],a.camera.viewInverseTransposeMatrix[7],a.camera.viewInverseTransposeMatrix[11]):s.slicePlaneLocalOrigin}function b(e,s){return null!=e?i.subtract(B,s.origin,e):s.origin}function p(e,a,i){return e.hasSliceTranslatedView?null!=a?s.translate(F,i.camera.viewMatrix,a):i.camera.viewMatrix:null}function m(e,s,a){if(null==a.slicePlane)return l.ZEROS;const n=P(e,s,a),c=b(n,a.slicePlane),o=p(e,n,a);return null!=o?i.transformMat4(B,c,o):c}function v(e,s,a,n){if(null==n||null==a.slicePlane)return l.ZEROS;const c=P(e,s,a),o=b(c,a.slicePlane),t=p(e,c,a);return null!=t?(i.add(S,n,o),i.transformMat4(B,o,t),i.transformMat4(S,S,t),i.subtract(S,S,B)):n}const w=l.create(),B=l.create(),S=l.create(),F=a.create();e.RejectBySlice=function(e,s){d(e,s,new n.Float3DrawUniform("slicePlaneOrigin",((e,a)=>m(s,e,a))),new n.Float3DrawUniform("slicePlaneBasis1",((e,a)=>v(s,e,a,a.slicePlane?.basis1))),new n.Float3DrawUniform("slicePlaneBasis2",((e,a)=>v(s,e,a,a.slicePlane?.basis2))))},e.SliceDraw=function(e,s){u(e,s,new n.Float3DrawUniform("slicePlaneOrigin",((e,a)=>m(s,e,a))),new n.Float3DrawUniform("slicePlaneBasis1",((e,a)=>v(s,e,a,a.slicePlane?.basis1))),new n.Float3DrawUniform("slicePlaneBasis2",((e,a)=>v(s,e,a,a.slicePlane?.basis2))))},e.SlicePass=function(e,s){u(e,s,new c.Float3PassUniform("slicePlaneOrigin",((e,a)=>m(s,e,a))),new c.Float3PassUniform("slicePlaneBasis1",((e,a)=>v(s,e,a,a.slicePlane?.basis1))),new c.Float3PassUniform("slicePlaneBasis2",((e,a)=>v(s,e,a,a.slicePlane?.basis2))))},e.SlicePlaneParameters=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));