// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../output/ReadDepth.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DBindUniform"],(function(e,t,r,i){"use strict";e.terrainDepthTest=function(e,{occlusionPass:o,terrainDepthTest:d,cullAboveTerrain:a}){const{vertex:n,fragment:s,varyings:p}=e;if(!d)return n.code.add("void forwardViewPosDepth(vec3 pos) {}"),void s.code.add(`${o?"bool":"void"} discardByTerrainDepth() { ${r.If(o,"return false;")}}`);p.add("viewPosDepth","float",{invariant:!0}),n.code.add("void forwardViewPosDepth(vec3 pos) {\n    viewPosDepth = pos.z;\n  }"),s.include(t.ReadDepth),s.uniforms.add(new i.Texture2DBindUniform("terrainDepthTexture",(e=>e.terrainDepth?.attachment))).code.add(r.glsl`
    ${o?"bool":"void"} discardByTerrainDepth() {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${o?"return viewPosDepth < linearDepth && depth < 1.0;":`if(viewPosDepth ${a?">":"<="} linearDepth) discard;`}
    }`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));