// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../attributes/NormalAttribute.glsl","../attributes/VertexNormal.glsl","../attributes/VertexPosition.glsl","./Normals.glsl","../../shaderModules/glsl"],(function(e,a,o,l,r,d,i){"use strict";e.computeFragmentNormals=function(e,t){const n=e.fragment;switch(t.doubleSidedMode){case d.NormalsDoubleSidedMode.None:n.code.add(i.glsl`vec3 _adjustDoublesided(vec3 normal) {
return normal;
}`);break;case d.NormalsDoubleSidedMode.View:e.include(r.VertexPosition,t),n.code.add(i.glsl`vec3 _adjustDoublesided(vec3 normal) {
return dot(normal, vPositionWorldCameraRelative) > 0.0 ? -normal : normal;
}`);break;case d.NormalsDoubleSidedMode.WindingOrder:n.code.add(i.glsl`vec3 _adjustDoublesided(vec3 normal) {
return gl_FrontFacing ? normal : -normal;
}`);break;default:a.neverReached(t.doubleSidedMode);case d.NormalsDoubleSidedMode.COUNT:}switch(t.normalType){case o.NormalType.Attribute:case o.NormalType.Compressed:e.include(l.VertexNormal,t),n.main.add(i.glsl`vec3 fragmentFaceNormal = _adjustDoublesided(normalize(vNormalWorld));
vec3 fragmentFaceNormalView = gl_FrontFacing ? normalize(vNormalView) : -normalize(vNormalView);`);break;case o.NormalType.ScreenDerivative:e.include(r.VertexPosition,t),n.main.add(i.glsl`vec3 fragmentFaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
vec3 fragmentFaceNormalView = normalize(cross(dFdx(vPosition_view), dFdy(vPosition_view)));`);default:case o.NormalType.COUNT:}t.shadeNormals?n.main.add(i.glsl`vec3 fragmentShadingNormal = fragmentFaceNormal;`):t.spherical?(e.include(r.VertexPosition,t),n.main.add(i.glsl`vec3 fragmentShadingNormal = normalize(positionWorld());`)):n.main.add(i.glsl`vec3 fragmentShadingNormal = vec3(0.0, 0.0, 1.0);`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));