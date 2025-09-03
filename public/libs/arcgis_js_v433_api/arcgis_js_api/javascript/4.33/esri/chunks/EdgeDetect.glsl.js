// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/ShaderBuilder"],(function(e,t,o,a,l){"use strict";function r(){const e=new l.ShaderBuilder;return e.include(t.ScreenSpacePass),e.outputs.add("fragEdges","vec2"),e.fragment.code.add(o.glsl`float absMax3(vec3 v) {
vec3 t = abs(v);
return max(max(t.r, t.g), t.b);
}`),e.fragment.uniforms.add(new a.Texture2DPassUniform("colorTexture",(e=>e.color))).main.add(o.glsl`
    vec2 resolution = 1.0 / vec2(textureSize(colorTexture, 0));
    vec4 offsets[3];
    offsets[0] = vec4(uv.x - resolution.x, uv.y, uv.x, uv.y + resolution.y);
    offsets[1] = vec4(uv.x + resolution.x, uv.y, uv.x, uv.y - resolution.y);
    offsets[2] = vec4(uv.x - 2.0 * resolution.x, uv.y, uv.x, uv.y + 2.0 * resolution.y);

    // Calculate color deltas:
    vec3 C = texture(colorTexture, uv).rgb;
    vec3 Cleft = texture(colorTexture, offsets[0].xy).rgb;
    vec3 Ctop = texture(colorTexture, offsets[0].zw).rgb;
    vec2 delta = vec2(absMax3(C - Cleft), absMax3(C - Ctop));
    vec2 edges = step(vec2(${o.glsl.float(.05)}), delta);

    // discard if there is no edge:
    if (dot(edges, vec2(1.0)) == 0.0) {
      fragEdges = vec2(0.0);
    }
    else {
      // Calculate right and bottom deltas:
      vec3 Cright = texture(colorTexture, offsets[1].xy).rgb;
      float horizontal = absMax3(C - Cright);

      vec3 Cbottom  = texture(colorTexture, offsets[1].zw).rgb;
      float vertical = absMax3(C - Cbottom);

      // Calculate the maximum delta in the direct neighborhood:
      float maxDelta = max(max(max(delta.x, delta.y), horizontal), vertical);

      // Calculate left-left and top-top deltas:
      vec3 Cleftleft  = texture(colorTexture, offsets[2].xy).rgb;
      horizontal = absMax3(C - Cleftleft);

      vec3 Ctoptop = texture(colorTexture, offsets[2].zw).rgb;
      vertical = absMax3(C - Ctoptop);

      // Calculate the final maximum delta:
      maxDelta = max(max(maxDelta, horizontal), vertical);

      // Local contrast adaptation in action:
      fragEdges = edges * step(maxDelta, float(${o.glsl.float(2)}) * delta);
    }
  `),e}const s=Object.freeze(Object.defineProperty({__proto__:null,build:r},Symbol.toStringTag,{value:"Module"}));e.EdgeDetect=s,e.build=r}));