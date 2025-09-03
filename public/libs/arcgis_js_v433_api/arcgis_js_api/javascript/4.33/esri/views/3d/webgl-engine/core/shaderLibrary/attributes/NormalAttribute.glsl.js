// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../shaderModules/glsl","../../../lib/VertexAttribute"],(function(e,r,t,o){"use strict";var a;e.NormalType=void 0,(a=e.NormalType||(e.NormalType={}))[a.Attribute=0]="Attribute",a[a.Compressed=1]="Compressed",a[a.ScreenDerivative=2]="ScreenDerivative",a[a.COUNT=3]="COUNT",e.NormalAttribute=function(a,l){switch(l.normalType){case e.NormalType.Compressed:a.attributes.add(o.VertexAttribute.NORMALCOMPRESSED,"vec2"),a.vertex.code.add(t.glsl`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case e.NormalType.Attribute:a.attributes.add(o.VertexAttribute.NORMAL,"vec3"),a.vertex.code.add(t.glsl`vec3 normalModel() {
return normal;
}`);break;case e.NormalType.ScreenDerivative:a.fragment.code.add(t.glsl`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:r.neverReached(l.normalType);case e.NormalType.COUNT:}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));