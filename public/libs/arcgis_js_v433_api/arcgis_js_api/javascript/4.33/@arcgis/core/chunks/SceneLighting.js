/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as t,S as e,T as n,b as a,P as o,l as i,n as s,i as r}from"./enums.js";import{a as c,i as l}from"./Texture.js";import{a9 as h,ab as d,l as u,ac as m}from"./Matrix4PassUniform.js";import{g,I as f}from"./glsl.js";import{T as p,a as R,c as N,U as T}from"./Matrix4BindUniform.js";import{B as _}from"./BindType.js";import{c as v,l as M}from"./mathUtils.js";import{s as S,c as L,u as O,j as E,i as F,m as b}from"./vec3.js";import{z as H,f as y,c as A}from"./vec3f64.js";var G,P;function I(t){return t>=G.COUNT}!function(t){t[t.R8UNORM=0]="R8UNORM",t[t.R8UINT=1]="R8UINT",t[t.RG8UNORM=2]="RG8UNORM",t[t.RG8UINT=3]="RG8UINT",t[t.RGBA4UNORM=4]="RGBA4UNORM",t[t.RGBA8UNORM=5]="RGBA8UNORM",t[t.RGBA8UNORM_MIPMAP=6]="RGBA8UNORM_MIPMAP",t[t.R16FLOAT=7]="R16FLOAT",t[t.RGBA16FLOAT=8]="RGBA16FLOAT",t[t.R32FLOAT=9]="R32FLOAT",t[t.COUNT=10]="COUNT"}(G||(G={})),function(t){t[t.DEPTH16=10]="DEPTH16",t[t.DEPTH24_STENCIL8=11]="DEPTH24_STENCIL8"}(P||(P={})),G.R8UNORM,G.R8UINT,G.R16FLOAT,G.R32FLOAT,G.RG8UNORM,G.RG8UINT,G.RGBA8UNORM,G.RGBA4UNORM,G.RGBA8UNORM_MIPMAP,G.RGBA16FLOAT,P.DEPTH16,P.DEPTH24_STENCIL8;const w=new c;w.pixelFormat=t.RED,w.internalFormat=e.R8,w.wrapMode=n.CLAMP_TO_EDGE;const D=new c;D.pixelFormat=t.RED_INTEGER,D.internalFormat=e.R8UI,D.wrapMode=n.CLAMP_TO_EDGE,D.samplingMode=a.NEAREST;const U=new c;U.pixelFormat=t.RG,U.internalFormat=e.RG8,U.wrapMode=n.CLAMP_TO_EDGE;const x=new c;x.pixelFormat=t.RG_INTEGER,x.internalFormat=e.RG8UI,x.wrapMode=n.CLAMP_TO_EDGE,x.samplingMode=a.NEAREST;const C=new c;C.internalFormat=e.RGBA4,C.dataType=o.UNSIGNED_SHORT_4_4_4_4,C.wrapMode=n.CLAMP_TO_EDGE;const B=new c;B.wrapMode=n.CLAMP_TO_EDGE;const V=new c;V.wrapMode=n.CLAMP_TO_EDGE,V.samplingMode=a.LINEAR_MIPMAP_LINEAR,V.hasMipmap=!0,V.maxAnisotropy=8;const W=new c;W.pixelFormat=t.RED,W.dataType=o.HALF_FLOAT,W.internalFormat=e.R16F,W.samplingMode=a.NEAREST;const k=new c;k.dataType=o.HALF_FLOAT,k.internalFormat=e.RGBA16F,k.wrapMode=n.CLAMP_TO_EDGE;const j=new c;j.pixelFormat=t.RED,j.dataType=o.FLOAT,j.internalFormat=e.R32F,j.samplingMode=a.NEAREST;const z={[G.R8UNORM]:w,[G.R8UINT]:D,[G.RG8UNORM]:U,[G.RG8UINT]:x,[G.RGBA4UNORM]:C,[G.RGBA8UNORM]:B,[G.RGBA8UNORM_MIPMAP]:V,[G.R16FLOAT]:W,[G.RGBA16FLOAT]:k,[G.R32FLOAT]:j,[G.COUNT]:null},$={[s.DEPTH_COMPONENT16]:o.UNSIGNED_SHORT,[s.DEPTH_COMPONENT24]:o.UNSIGNED_INT,[s.DEPTH_COMPONENT32F]:o.FLOAT,[i.DEPTH24_STENCIL8]:o.UNSIGNED_INT_24_8,[i.DEPTH32F_STENCIL8]:o.FLOAT_32_UNSIGNED_INT_24_8_REV},K={[P.DEPTH24_STENCIL8]:q(i.DEPTH24_STENCIL8),[P.DEPTH16]:q(s.DEPTH_COMPONENT16)};function q(t){const e=new c;return e.pixelFormat=l(t)?r.DEPTH_COMPONENT:r.DEPTH_STENCIL,e.dataType=$[t],e.samplingMode=a.NEAREST,e.wrapMode=n.CLAMP_TO_EDGE,e.internalFormat=t,e.hasMipmap=!1,e.isImmutable=!0,e}function J(t){t.uniforms.add(new h("mainLightDirection",(t=>t.lighting.mainLight.direction)))}function Q(t){t.uniforms.add(new h("mainLightIntensity",(t=>t.lighting.mainLight.intensity)))}function X(t){J(t.fragment),Q(t.fragment),t.fragment.code.add(g`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}var Y;function Z(t,e){const n=e.pbrMode,a=t.fragment;if(n!==Y.Schematic&&n!==Y.Disabled&&n!==Y.Normal)return void a.code.add(g`void applyPBRFactors() {}`);if(n===Y.Disabled)return void a.code.add(g`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(n===Y.Schematic)return void a.code.add(g`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);const{hasMetallicRoughnessTexture:o,hasMetallicRoughnessTextureTransform:i,hasOcclusionTexture:s,hasOcclusionTextureTransform:r,bindType:c}=e;(o||s)&&t.include(d,e),a.code.add(g`vec3 mrr;
float occlusion;`),o&&a.uniforms.add(c===_.Pass?new u("texMetallicRoughness",(t=>t.textureMetallicRoughness)):new p("texMetallicRoughness",(t=>t.textureMetallicRoughness))),s&&a.uniforms.add(c===_.Pass?new u("texOcclusion",(t=>t.textureOcclusion)):new p("texOcclusion",(t=>t.textureOcclusion))),a.uniforms.add(c===_.Pass?new R("mrrFactors",(t=>t.mrrFactors)):new N("mrrFactors",(t=>t.mrrFactors))),a.code.add(g`
    ${f(o,g`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${f(s,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${s?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${f(o,`applyMetallicRoughness(${i?"metallicRoughnessUV":"vuv0"});`)}
      ${f(s,`applyOcclusion(${r?"occlusionUV":"vuv0"});`)}
    }
  `)}function tt(t){t.code.add(g`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.code.add(g`float integratedRadiance(float cosTheta2, float roughness) {
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.code.add(g`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness) {
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function et(t,e){t.include(m),e.pbrMode!==Y.Normal&&e.pbrMode!==Y.Schematic&&e.pbrMode!==Y.Simplified&&e.pbrMode!==Y.TerrainWithWater||(t.code.add(g`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),t.code.add(g`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),e.pbrMode!==Y.Normal&&e.pbrMode!==Y.Schematic||(t.include(tt),t.code.add(g`struct PBRShadingInfo
{
float NdotV;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),t.code.add(g`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`))}function nt(t,e){t.include(m),t.code.add(g`
  struct PBRShadingWater {
      float NdotL;   // cos angle between normal and light direction
      float NdotV;   // cos angle between normal and view direction
      float NdotH;   // cos angle between normal and half vector
      float VdotH;   // cos angle between view direction and half vector
      float LdotH;   // cos angle between light direction and half vector
      float VdotN;   // cos angle between view direction and normal vector
  };

  float dtrExponent = ${e.useCustomDTRExponentForWater?"2.2":"2.0"};
  `),t.code.add(g`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),t.code.add(g`float normalDistributionWater(float NdotH, float roughness) {
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),t.code.add(g`float geometricOcclusionKelemen(float LoH) {
return 0.25 / (LoH * LoH);
}`),t.code.add(g`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max) {
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze) * strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}`)}!function(t){t[t.Disabled=0]="Disabled",t[t.Normal=1]="Normal",t[t.Schematic=2]="Schematic",t[t.Water=3]="Water",t[t.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",t[t.Simplified=5]="Simplified",t[t.TerrainWithWater=6]="TerrainWithWater",t[t.COUNT=7]="COUNT"}(Y||(Y={}));const at=3e5,ot=5e5;function it(t){t.code.add(g`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`)}class st extends T{constructor(t,e){super(t,"int",_.Pass,((n,a,o)=>n.setUniform1i(t,e(a,o))))}}class rt extends T{constructor(t,e){super(t,"vec2",_.Draw,((n,a,o,i)=>n.setUniform2fv(t,e(a,o,i))))}}class ct{constructor(t=H()){this.intensity=t}}class lt{constructor(t=H(),e=y(.57735,.57735,.57735)){this.intensity=t,this.direction=e}}class ht{constructor(t=H(),e=y(.57735,.57735,.57735),n=!0,a=1,o=1){this.intensity=t,this.direction=e,this.castShadows=n,this.specularStrength=a,this.environmentStrength=o}}class dt{constructor(){this.r=[0],this.g=[0],this.b=[0]}}function ut(t,e,n){(n=n||t).length=t.length;for(let a=0;a<t.length;a++)n[a]=t[a]*e[a];return n}function mt(t,e,n){(n=n||t).length=t.length;for(let a=0;a<t.length;a++)n[a]=t[a]*e;return n}function gt(t,e,n){(n=n||t).length=t.length;for(let a=0;a<t.length;a++)n[a]=t[a]+e[a];return n}function ft(t){return(t+1)*(t+1)}function pt(t,e,n){const a=t[0],o=t[1],i=t[2],s=n||[];return s.length=ft(e),e>=0&&(s[0]=.28209479177),e>=1&&(s[1]=.4886025119*a,s[2]=.4886025119*i,s[3]=.4886025119*o),e>=2&&(s[4]=1.09254843059*a*o,s[5]=1.09254843059*o*i,s[6]=.31539156525*(3*i*i-1),s[7]=1.09254843059*a*i,s[8]=.54627421529*(a*a-o*o)),s}const Rt=[],Nt=[],Tt=[],_t=[0],vt=[0],Mt=A(),St=[3.141593,2.094395,2.094395,2.094395,.785398,.785398,.785398,.785398,.785398];class Lt{constructor(){this.color=A(),this.intensity=1}}class Ot{constructor(){this.direction=A(),this.ambient=new Lt,this.diffuse=new Lt}}const Et=.4;class Ft{constructor(){this._shOrder=2,this._legacy=new Ot,this.globalFactor=.5,this.noonFactor=.5,this._sphericalHarmonics=new dt,this._mainLight=new ht(A(),y(1,0,0),!1)}get legacy(){return this._legacy}get sh(){return this._sphericalHarmonics}get mainLight(){return this._mainLight}set(t){(function(t,e,n,a){!function(t,e){const n=ft(t),a=e||{r:[],g:[],b:[]};a.r.length=a.g.length=a.b.length=n;for(let t=0;t<n;t++)a.r[t]=a.g[t]=a.b[t]=0}(e,a),S(n.intensity,0,0,0);let o=!1;const i=Rt,s=Nt,r=Tt;i.length=0,s.length=0,r.length=0;for(const e of t)e instanceof ht&&!o?(L(n.direction,e.direction),L(n.intensity,e.intensity),n.specularStrength=e.specularStrength,n.environmentStrength=e.environmentStrength,n.castShadows=e.castShadows,o=!0):e instanceof ht||e instanceof lt?i.push(e):e instanceof ct?s.push(e):e instanceof dt&&r.push(e);(function(t,e){const n=(a=e.r.length,v(Math.floor(Math.sqrt(a)-1),0,2));var a;for(const a of t)O(Mt,a.direction),pt(Mt,n,_t),ut(_t,St),mt(_t,a.intensity[0],vt),gt(e.r,vt),mt(_t,a.intensity[1],vt),gt(e.g,vt),mt(_t,a.intensity[2],vt),gt(e.b,vt)})(i,a),function(t,e){pt(Mt,0,_t);for(const n of t)e.r[0]+=_t[0]*St[0]*n.intensity[0]*4*Math.PI,e.g[0]+=_t[0]*St[0]*n.intensity[1]*4*Math.PI,e.b[0]+=_t[0]*St[0]*n.intensity[2]*4*Math.PI}(s,a);for(const t of r)gt(a.r,t.r),gt(a.g,t.g),gt(a.b,t.b)})(t,this._shOrder,this._mainLight,this._sphericalHarmonics),L(this._legacy.direction,this._mainLight.direction);const e=1/Math.PI;this._legacy.ambient.color[0]=.282095*this._sphericalHarmonics.r[0]*e,this._legacy.ambient.color[1]=.282095*this._sphericalHarmonics.g[0]*e,this._legacy.ambient.color[2]=.282095*this._sphericalHarmonics.b[0]*e,E(this._legacy.diffuse.color,this._mainLight.intensity,e),L(bt,this._legacy.diffuse.color),E(bt,bt,.4*this.globalFactor),F(this._legacy.ambient.color,this._legacy.ambient.color,bt)}copyFrom(t){this._sphericalHarmonics.r=Array.from(t.sh.r),this._sphericalHarmonics.g=Array.from(t.sh.g),this._sphericalHarmonics.b=Array.from(t.sh.b),L(this._mainLight.direction,t.mainLight.direction),L(this._mainLight.intensity,t.mainLight.intensity),this._mainLight.castShadows=t.mainLight.castShadows,this._mainLight.specularStrength=t.mainLight.specularStrength,this._mainLight.environmentStrength=t.mainLight.environmentStrength,this.globalFactor=t.globalFactor,this.noonFactor=t.noonFactor}lerpLighting(t,e,n){if(b(this._mainLight.intensity,t.mainLight.intensity,e.mainLight.intensity,n),this._mainLight.environmentStrength=M(t.mainLight.environmentStrength,e.mainLight.environmentStrength,n),this._mainLight.specularStrength=M(t.mainLight.specularStrength,e.mainLight.specularStrength,n),L(this._mainLight.direction,e.mainLight.direction),this._mainLight.castShadows=e.mainLight.castShadows,this.globalFactor=M(t.globalFactor,e.globalFactor,n),this.noonFactor=M(t.noonFactor,e.noonFactor,n),t.sh.r.length===e.sh.r.length)for(let a=0;a<e.sh.r.length;a++)this._sphericalHarmonics.r[a]=M(t.sh.r[a],e.sh.r[a],n),this._sphericalHarmonics.g[a]=M(t.sh.g[a],e.sh.g[a],n),this._sphericalHarmonics.b[a]=M(t.sh.b[a],e.sh.b[a],n);else for(let t=0;t<e.sh.r.length;t++)this._sphericalHarmonics.r[t]=e.sh.r[t],this._sphericalHarmonics.g[t]=e.sh.g[t],this._sphericalHarmonics.b[t]=e.sh.b[t]}}const bt=A();export{ct as A,G as C,P as D,rt as F,st as I,ht as M,Y as P,Ft as S,it as T,at as a,et as b,J as c,ot as d,Q as e,X as f,Et as g,Z as h,nt as i,lt as j,I as k,K as l,z as m};
