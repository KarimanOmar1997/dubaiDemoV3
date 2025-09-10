/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as e}from"./mathUtils.js";import{g as o}from"./glsl.js";import{l as r}from"../core/lang.js";import{V as a}from"./VertexAttribute.js";var l;function t(e){switch(e){case"multiply":default:return l.Multiply;case"ignore":return l.Ignore;case"replace":return l.Replace;case"tint":return l.Tint}}function s(o,r,a){if(null==o||r===l.Ignore)return a[0]=255,a[1]=255,a[2]=255,void(a[3]=255);const t=e(Math.round(o[3]*i),0,i),s=0===t||r===l.Tint?0:r===l.Replace?c:m;a[0]=e(Math.round(o[0]*n),0,n),a[1]=e(Math.round(o[1]*n),0,n),a[2]=e(Math.round(o[2]*n),0,n),a[3]=t+s}!function(e){e[e.Multiply=1]="Multiply",e[e.Ignore=2]="Ignore",e[e.Replace=3]="Replace",e[e.Tint=4]="Tint"}(l||(l={}));const n=255,i=85,c=i,m=2*i;function d(e){e.vertex.code.add(o`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${o.int(l.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${o.int(l.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${o.int(l.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${o.int(l.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}function p(e,l){switch(l.normalType){case u.Compressed:e.attributes.add(a.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(o`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case u.Attribute:e.attributes.add(a.NORMAL,"vec3"),e.vertex.code.add(o`vec3 normalModel() {
return normal;
}`);break;case u.ScreenDerivative:e.fragment.code.add(o`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:r(l.normalType);case u.COUNT:}}var u;!function(e){e[e.Attribute=0]="Attribute",e[e.Compressed=1]="Compressed",e[e.ScreenDerivative=2]="ScreenDerivative",e[e.COUNT=3]="COUNT"}(u||(u={}));export{l as C,d as D,u as N,p as a,s as e,t as p};
