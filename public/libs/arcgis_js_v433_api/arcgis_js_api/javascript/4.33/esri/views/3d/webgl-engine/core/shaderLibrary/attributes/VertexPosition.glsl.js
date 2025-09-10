// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/mat3f64","../../../../../../core/libs/gl-matrix-2/factories/mat4f64","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../util/DoublePrecision.glsl","../../shaderModules/Float3DrawUniform","../../shaderModules/Float3PassUniform","../../shaderModules/glsl","../../shaderModules/Matrix3DrawUniform","../../shaderModules/Matrix3PassUniform","../../shaderModules/Matrix4PassUniform","../../../lib/VertexAttribute","../../../../../webgl/NoParameters"],(function(r,o,e,a,t,i,s,l,m,n,d,f,v){"use strict";class c extends v.NoParameters{constructor(){super(...arguments),this.transformWorldFromViewTH=a.create(),this.transformWorldFromViewTL=a.create(),this.transformViewFromCameraRelativeRS=o.create(),this.transformProjFromView=e.create()}}class F extends v.NoParameters{constructor(){super(...arguments),this.transformWorldFromModelRS=o.create(),this.transformWorldFromModelTH=a.create(),this.transformWorldFromModelTL=a.create()}}r.VertexPosition=function(r,o){const{attributes:e,vertex:a,varyings:v,fragment:c}=r;a.include(t.DoublePrecision,o),e.add(f.VertexAttribute.POSITION,"vec3"),v.add("vPositionWorldCameraRelative","vec3"),v.add("vPosition_view","vec3",{invariant:!0}),a.uniforms.add(new s.Float3PassUniform("transformWorldFromViewTH",(r=>r.transformWorldFromViewTH)),new s.Float3PassUniform("transformWorldFromViewTL",(r=>r.transformWorldFromViewTL)),new n.Matrix3PassUniform("transformViewFromCameraRelativeRS",(r=>r.transformViewFromCameraRelativeRS)),new d.Matrix4PassUniform("transformProjFromView",(r=>r.transformProjFromView)),new m.Matrix3DrawUniform("transformWorldFromModelRS",(r=>r.transformWorldFromModelRS)),new i.Float3DrawUniform("transformWorldFromModelTH",(r=>r.transformWorldFromModelTH)),new i.Float3DrawUniform("transformWorldFromModelTL",(r=>r.transformWorldFromModelTL))),a.code.add(l.glsl`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * position;
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),a.code.add(l.glsl`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${o.spherical?l.glsl`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:l.glsl`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),c.uniforms.add(new s.Float3PassUniform("transformWorldFromViewTL",(r=>r.transformWorldFromViewTL))),a.code.add(l.glsl`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),c.code.add(l.glsl`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)},r.VertexPositionDrawParameters=F,r.VertexPositionPassParameters=c,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));