// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../attributes/VertexTextureCoordinates.glsl","../../shaderModules/Float3DrawUniform","../../shaderModules/Float3PassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DDrawUniform","../../shaderModules/Texture2DPassUniform","../../../materials/pbrUtils","../../../../../webgl/BindType","../../../../../webgl/NoParameters"],(function(e,r,s,o,t,a,l,i,c,n){"use strict";var u;e.PBRMode=void 0,(u=e.PBRMode||(e.PBRMode={}))[u.Disabled=0]="Disabled",u[u.Normal=1]="Normal",u[u.Schematic=2]="Schematic",u[u.Water=3]="Water",u[u.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",u[u.Simplified=5]="Simplified",u[u.TerrainWithWater=6]="TerrainWithWater",u[u.COUNT=7]="COUNT";class d extends n.NoParameters{constructor(e,r){super(),this.textureOcclusion=e,this.textureMetallicRoughness=r,this.mrrFactors=i.schematicMRRFactors}}e.PBRRenderingParameters=d,e.PhysicallyBasedRenderingParameters=function(i,n){const u=n.pbrMode,d=i.fragment;if(u!==e.PBRMode.Schematic&&u!==e.PBRMode.Disabled&&u!==e.PBRMode.Normal)return void d.code.add(t.glsl`void applyPBRFactors() {}`);if(u===e.PBRMode.Disabled)return void d.code.add(t.glsl`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(u===e.PBRMode.Schematic)return void d.code.add(t.glsl`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);const{hasMetallicRoughnessTexture:m,hasMetallicRoughnessTextureTransform:g,hasOcclusionTexture:h,hasOcclusionTextureTransform:f,bindType:R}=n;(m||h)&&i.include(r.VertexTextureCoordinates,n),d.code.add(t.glsl`vec3 mrr;
float occlusion;`),m&&d.uniforms.add(R===c.BindType.Pass?new l.Texture2DPassUniform("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new a.Texture2DDrawUniform("texMetallicRoughness",(e=>e.textureMetallicRoughness))),h&&d.uniforms.add(R===c.BindType.Pass?new l.Texture2DPassUniform("texOcclusion",(e=>e.textureOcclusion)):new a.Texture2DDrawUniform("texOcclusion",(e=>e.textureOcclusion))),d.uniforms.add(R===c.BindType.Pass?new o.Float3PassUniform("mrrFactors",(e=>e.mrrFactors)):new s.Float3DrawUniform("mrrFactors",(e=>e.mrrFactors))),d.code.add(t.glsl`
    ${t.If(m,t.glsl`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${t.If(h,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${h?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${t.If(m,`applyMetallicRoughness(${g?"metallicRoughnessUV":"vuv0"});`)}
      ${t.If(h,`applyOcclusion(${f?"occlusionUV":"vuv0"});`)}
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));