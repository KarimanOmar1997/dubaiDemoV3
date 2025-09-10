// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,t,r,o,i,l,n,a){"use strict";function s(e){const s=new n.ShaderBuilder,{vertex:d,fragment:c}=s;t.addProjViewLocalOrigin(d,e),d.uniforms.add(new o.FloatPassUniform("width",(e=>e.width))),s.attributes.add(l.VertexAttribute.POSITION,"vec3"),s.attributes.add(l.VertexAttribute.NORMAL,"vec3"),s.attributes.add(l.VertexAttribute.UV0,"vec2"),s.attributes.add(l.VertexAttribute.LENGTH,"float"),s.varyings.add("vtc","vec2"),s.varyings.add("vlength","float"),s.varyings.add("vradius","float"),d.main.add(i.glsl`vec3 bitangent = normal;
vtc = uv0;
vlength = length;
vradius = 0.5 * width;
vec4 pos = view * vec4(position + vradius * bitangent * uv0.y, 1.0);
gl_Position = proj * pos;`),c.uniforms.add(new o.FloatPassUniform("outlineSize",(e=>e.outlineSize)),new r.Float4PassUniform("outlineColor",(e=>e.outlineColor)),new o.FloatPassUniform("stripeLength",(e=>e.stripeLength)),new r.Float4PassUniform("stripeEvenColor",(e=>e.stripeEvenColor)),new r.Float4PassUniform("stripeOddColor",(e=>e.stripeOddColor)));const u=1/Math.sqrt(2);return c.code.add(i.glsl`
    const float INV_SQRT2 = ${i.glsl.float(u)};

    vec4 arrowColor(vec2 tc, float len) {
      float d = INV_SQRT2 * (tc.x - abs(tc.y));
      d = min(d, INV_SQRT2 * (len - tc.x - abs(tc.y)));
      d = min(d, 1.0 - abs(tc.y));

      if (d < 0.0) {
        return vec4(0.0);
      }
      if (d < outlineSize) {
        return outlineColor;
      }
      return fract(0.5 / stripeLength * tc.x * vradius) >= 0.5 ? stripeOddColor : stripeEvenColor;
    }`),c.main.add(i.glsl`
    vec2 ntc = vec2(vtc.x / vradius, vtc.y);
    vec4 color = arrowColor(ntc, vlength / vradius);
    if (color.a < ${i.glsl.float(a.alphaCutoff)}) {
      discard;
    }
    fragColor = color;`),s}const d=Object.freeze(Object.defineProperty({__proto__:null,build:s},Symbol.toStringTag,{value:"Module"}));e.MeasurementArrow=d,e.build=s}));