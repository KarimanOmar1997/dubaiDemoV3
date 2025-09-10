// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/math/mat3","../../../../../../core/libs/gl-matrix-2/factories/mat3f64","../../../../../../core/libs/gl-matrix-2/factories/mat4f64","../../../../../../chunks/vec32","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../ShaderOutput","../util/DoublePrecision.glsl","../util/View.glsl","../../shaderModules/Float3BindUniform","../../shaderModules/glsl","../../shaderModules/Matrix3PassUniform","../../shaderModules/Matrix4PassUniform","../../../lib/VertexAttribute","../../../../../webgl/doublePrecisionUtils","../../../../../webgl/NoParameters"],(function(e,r,o,a,n,t,i,l,s,c,d,m,u,v,g,x){"use strict";class M extends x.NoParameters{constructor(){super(...arguments),this.modelTransformation=null}}const b=o.create(),N=t.create();e.InstancedDoublePassParameters=M,e.InstancedDoublePrecision=function(e,o){const{hasModelTransformation:t,instancedDoublePrecision:x,instanced:M,output:O,hasVertexTangents:f}=o;t&&(e.vertex.uniforms.add(new u.Matrix4PassUniform("model",(e=>e.modelTransformation??a.IDENTITY))),e.vertex.uniforms.add(new m.Matrix3PassUniform("normalLocalOriginFromModel",(e=>(r.normalFromMat4(b,e.modelTransformation??a.IDENTITY),b))))),M&&x&&(e.attributes.add(v.VertexAttribute.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(v.VertexAttribute.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(v.VertexAttribute.INSTANCEMODEL,"mat3"),e.attributes.add(v.VertexAttribute.INSTANCEMODELNORMAL,"mat3"));const w=e.vertex;x&&(w.include(l.DoublePrecision,o),w.uniforms.add(new c.Float3BindUniform("viewOriginHi",(e=>g.encodeDoubleHi(n.set(N,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),N))),new c.Float3BindUniform("viewOriginLo",(e=>g.encodeDoubleLo(n.set(N,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),N))))),w.code.add(d.glsl`
    vec3 getVertexInLocalOriginSpace() {
      return ${t?x?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":x?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${x?d.glsl`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),w.code.add(d.glsl`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${t?x?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":x?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),O===i.ShaderOutput.Normal&&(s.addViewNormal(w),w.code.add(d.glsl`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${t?x?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":x?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),f&&w.code.add(d.glsl`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t?x?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":x?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));