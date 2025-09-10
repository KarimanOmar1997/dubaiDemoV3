/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{e,s as a,c as o,n as t,k as r,l as i,j as n,d as s,q as l}from"./vec3.js";import{g as c,Z as d,c as m,f as u}from"./vec3f64.js";import{E as h}from"./materialUtils.js";import{V as p}from"./ViewingMode.js";import{n as v}from"./InterleavedLayout.js";import{S as f,i as g,k as x,l as b,m as w,n as M}from"./ShaderOutput.js";import{N as T,a as S,D as C,C as y}from"./NormalAttribute.glsl.js";import{$ as O,a9 as E,ao as N,ap as z,e as j,d as L,aj as I,b as P,aq as A,J as G,l as D,S as F,O as R,K as B,M as _,ab as V,Y as U,m as H,R as W,k as q,h as Y,F as J,ac as Z,ar as k,C as $,c as X,j as K,t as Q,o as ee,L as ae,r as oe,x as te,u as re,v as ie,w as ne,s as se,p as le,q as ce,N as de,E as me,P as ue}from"./Matrix4PassUniform.js";import{l as he}from"../core/lang.js";import{g as pe,I as ve}from"./glsl.js";import{I as fe,F as ge,C as xe,d as be,a as we,P as Me,b as Te,T as Se,c as Ce,e as ye,f as Oe,g as Ee,h as Ne}from"./SceneLighting.js";import{b as ze,T as je,F as Le,U as Ie,a as Pe,o as Ae}from"./Matrix4BindUniform.js";import{A as Ge,R as De,C as Fe,D as Re}from"./basicInterfaces.js";import{V as Be,d as _e}from"./VerticalOffset.glsl.js";import{e as Ve,R as Ue,D as He,M as We,v as qe}from"./Material.js";import{a as Ye,b as Je,T as Ze,c as ke,F as $e,V as Xe,i as Ke,D as Qe}from"./VertexColor.glsl.js";import{V as ea}from"./VertexAttribute.js";import{g as aa}from"./verticalOffsetUtils.js";import{c as oa,O as ta,f as ra}from"./vec4f64.js";import{c as ia,I as na}from"./mat3f64.js";import{M as sa,D as la}from"./Matrix3DrawUniform.js";import{b as ca}from"./mat3.js";import{I as da}from"./mat4f64.js";import{a as ma}from"./AlphaCutoff.js";import{O as ua,c as ha}from"./vec2f64.js";import{F as pa,S as va,C as fa,B as ga}from"./BooleanBindUniform.js";import{B as xa}from"./BindType.js";import{_ as ba}from"./tslib.es6.js";import{c as wa}from"./mathUtils.js";import{f as Ma}from"./maybe.js";import{watch as Ta}from"../core/reactiveUtils.js";import{M as Sa}from"../core/scheduling.js";import{property as Ca}from"../core/accessorSupport/decorators/property.js";import"./Logger.js";import{subclass as ya}from"../core/accessorSupport/decorators/subclass.js";import{s as Oa}from"./vec2.js";import{InternalRenderCategory as Ea}from"../views/3d/webgl.js";import Na from"../views/3d/webgl/RenderNode.js";import{S as za}from"./ShaderBuilder.js";import{m as ja,d as La,c as Ia}from"./renderState.js";import{N as Pa,p as Aa}from"./ShaderTechniqueConfiguration.js";import{T as Ga,c as Da,m as Fa,p as Ra,r as Ba}from"./enums.js";import{a as _a,T as Va}from"./Texture.js";import{d as Ua}from"./colorUtils2.js";import{s as Ha}from"./vec4.js";import{M as Wa}from"./Matrix4sPassUniform.js";function qa({normalTexture:a,metallicRoughnessTexture:o,metallicFactor:t,roughnessFactor:r,emissiveTexture:i,emissiveFactor:n,occlusionTexture:s}){return null==a&&null==o&&null==i&&(null==n||e(n,d))&&null==s&&(null==r||1===r)&&(null==t||1===t)}function Ya({normalTexture:a,metallicRoughnessTexture:o,metallicFactor:t,roughnessFactor:r,emissiveTexture:i,emissiveFactor:n,occlusionTexture:s}){return null==a&&null==o&&null==i&&(null==n||e(n,d))&&null==s&&(null==r||1===r)&&(null==t||1===t||0===t)}const Ja=c(1,1,.5),Za=c(0,.6,.2),ka=c(0,1,.2);function $a(e,a){const o=e.fragment;switch(o.code.add(pe`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),a.doubleSidedMode){case Xa.None:o.code.add(pe`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case Xa.View:o.code.add(pe`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case Xa.WindingOrder:o.code.add(pe`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:he(a.doubleSidedMode);case Xa.COUNT:}}var Xa;function Ka(e,a){switch(a.normalType){case T.Attribute:case T.Compressed:e.include(S,a),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new sa("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new ze("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),e.vertex.code.add(pe`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case T.ScreenDerivative:e.vertex.code.add(pe`void forwardNormal() {}`);break;default:he(a.normalType);case T.COUNT:}}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(Xa||(Xa={}));class Qa extends Ye{constructor(){super(...arguments),this.transformNormalViewFromGlobal=ia()}}class eo extends Je{constructor(){super(...arguments),this.transformNormalGlobalFromModel=ia(),this.toMapSpace=oa()}}function ao(e){e.vertex.code.add(pe`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}const oo=ia();function to(e,o){const{hasModelTransformation:t,instancedDoublePrecision:r,instanced:i,output:n,hasVertexTangents:s}=o;t&&(e.vertex.uniforms.add(new O("model",(e=>e.modelTransformation??da))),e.vertex.uniforms.add(new ze("normalLocalOriginFromModel",(e=>(ca(oo,e.modelTransformation??da),oo))))),i&&r&&(e.attributes.add(ea.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(ea.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(ea.INSTANCEMODEL,"mat3"),e.attributes.add(ea.INSTANCEMODELNORMAL,"mat3"));const l=e.vertex;r&&(l.include(la,o),l.uniforms.add(new E("viewOriginHi",(e=>N(a(ro,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),ro))),new E("viewOriginLo",(e=>z(a(ro,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),ro))))),l.code.add(pe`
    vec3 getVertexInLocalOriginSpace() {
      return ${t?r?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":r?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${r?pe`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),l.code.add(pe`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${t?r?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":r?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),n===f.Normal&&(j(l),l.code.add(pe`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${t?r?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":r?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),s&&l.code.add(pe`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t?r?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":r?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const ro=m();function io(e,a){a.hasSymbolColors?(e.include(C),e.attributes.add(ea.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(pe`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new fe("colorMixMode",(e=>Ve[e.colorMixMode]))),e.vertex.code.add(pe`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}function no(e,a){switch(a.output){case f.Shadow:case f.ShadowHighlight:case f.ShadowExcludeHighlight:case f.ViewshedShadow:e.fragment.code.add(pe`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth){
float fragDepth = _calculateFragDepth(_linearDepth);
gl_FragDepth = fragDepth;
}`)}}function so(e,a){co(e,a,new L("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function lo(e,a){co(e,a,new I("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function co(e,a,o){const t=e.fragment,r=a.alphaDiscardMode,i=r===Ge.Blend;r!==Ge.Mask&&r!==Ge.MaskBlend||t.uniforms.add(o),t.code.add(pe`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${r===Ge.Opaque?"color.a = 1.0;":`if (color.a < ${i?pe.float(ma):"textureAlphaCutoff"}) {\n              discard;\n             } ${ve(r===Ge.Mask,"else { color.a = 1.0; }")}`}
    }
  `)}function mo(e,a){const{vertex:o,fragment:t,varyings:r}=e,{hasColorTexture:i,alphaDiscardMode:n}=a,s=i&&n!==Ge.Opaque,{output:l,normalType:c,hasColorTextureTransform:d}=a;switch(l){case f.Depth:P(o,a),e.include(Ze,a),t.include(F,a),e.include(A,a),s&&t.uniforms.add(new D("tex",(e=>e.texture))),o.main.add(pe`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(so,a),t.main.add(pe`
        discardBySlice(vpos);
        ${ve(s,pe`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case f.Shadow:case f.ShadowHighlight:case f.ShadowExcludeHighlight:case f.ViewshedShadow:case f.ObjectAndLayerIdColor:P(o,a),e.include(Ze,a),e.include(A,a),e.include(G,a),e.include(no,a),t.include(F,a),e.include(B,a),ke(e),r.add("depth","float",{invariant:!0}),s&&t.uniforms.add(new D("tex",(e=>e.texture))),o.main.add(pe`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(so,a),t.main.add(pe`
        discardBySlice(vpos);
        ${ve(s,pe`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        ${l===f.ObjectAndLayerIdColor?pe`outputObjectAndLayerIdColor();`:pe`outputDepth(depth);`}`);break;case f.Normal:{P(o,a),e.include(Ze,a),e.include(S,a),e.include(Ka,a),e.include(A,a),e.include(G,a),s&&t.uniforms.add(new D("tex",(e=>e.texture))),c===T.ScreenDerivative&&r.add("vPositionView","vec3",{invariant:!0});const i=c===T.Attribute||c===T.Compressed;o.main.add(pe`
        vpos = getVertexInLocalOriginSpace();
        ${i?pe`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:pe`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),t.include(F,a),e.include(so,a),t.main.add(pe`
        discardBySlice(vpos);
        ${ve(s,pe`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${c===T.ScreenDerivative?pe`vec3 normal = screenDerivativeNormal(vPositionView);`:pe`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case f.Highlight:P(o,a),e.include(Ze,a),e.include(A,a),e.include(G,a),s&&t.uniforms.add(new D("tex",(e=>e.texture))),o.main.add(pe`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),t.include(F,a),e.include(so,a),e.include(R,a),t.main.add(pe`
        discardBySlice(vpos);
        ${ve(s,pe`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}function uo(e,a){const o=e.fragment,{hasVertexTangents:t,doubleSidedMode:r,hasNormalTexture:i,textureCoordinateType:n,bindType:s,hasNormalTextureTransform:l}=a;t?(e.attributes.add(ea.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),r===Xa.WindingOrder?o.code.add(pe`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):o.code.add(pe`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):o.code.add(pe`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),i&&n!==_.None&&(e.include(V,a),o.uniforms.add(s===xa.Pass?new D("normalTexture",(e=>e.textureNormal)):new je("normalTexture",(e=>e.textureNormal))),l&&(o.uniforms.add(new pa("scale",(e=>e.scale??ua))),o.uniforms.add(new ze("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??na)))),o.code.add(pe`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),l&&o.code.add(pe`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),o.code.add(pe`return tangentSpace * rawNormal;
}`))}const ho=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new za,a=e.fragment;return e.include(va),a.include(U),a.uniforms.add(new D("depthMap",(e=>e.depthTexture)),new je("tex",(e=>e.colorTexture)),new ge("blurSize",(e=>e.blurSize)),new L("projScale",((e,a)=>{const o=a.camera.distance;return o>5e4?Math.max(0,e.projScale-(o-5e4)):e.projScale}))),a.code.add(pe`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${pe.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),a.main.add(pe`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${pe.int(4)}; r <= ${pe.int(4)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}},Symbol.toStringTag,{value:"Module"}));class po extends H{constructor(e,a){super(e,a,new W(ho,(()=>Promise.resolve().then((()=>ho)))))}initializePipeline(){return ja({colorWrite:La})}}class vo extends Pa{constructor(){super(...arguments),this.projScale=1}}class fo extends vo{constructor(){super(...arguments),this.intensity=1}}class go extends Pa{}class xo extends go{constructor(){super(...arguments),this.blurSize=ha()}}function bo(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const wo=ha(),Mo=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new za,a=e.fragment;return e.include(va),e.include(fa),a.include(U),a.uniforms.add(new Le("radius",(e=>bo(e.camera)))).code.add(pe`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),a.code.add(pe`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),e.outputs.add("fragOcclusion","float"),a.uniforms.add(new D("normalMap",(e=>e.normalTexture)),new D("depthMap",(e=>e.depthTexture)),new L("projScale",(e=>e.projScale)),new D("rnm",(e=>e.noiseTexture)),new pa("rnmScale",((e,a)=>Oa(wo,a.camera.fullWidth/e.noiseTexture.descriptor.width,a.camera.fullHeight/e.noiseTexture.descriptor.height))),new L("intensity",(e=>e.intensity)),new q("screenSize",(e=>Oa(wo,e.camera.fullWidth,e.camera.fullHeight)))).main.add(pe`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragOcclusion = 1.0;
      return;
    }

    // get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 norm4 = texelFetch(normalMap, iuv, 0);
    if(norm4.a != 1.0) {
      fragOcclusion = 1.0;
      return;
    }
    vec3 norm = normalize(norm4.xyz * 2.0 - 1.0);

    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

    float sum = 0.0;
    vec3 tapPixelPos;

    vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
    // bug or deviation from CE somewhere else?
    float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

    for(int i = 0; i < ${pe.int(16)}; ++i) {
      vec2 unitOffset = reflect(sphere[i], fres).xy;
      vec2 offset = vec2(-unitOffset * radius * ps);

      // don't use current or very nearby samples
      if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
        continue;
      }

      vec2 tc = vec2(gl_FragCoord.xy + offset);
      if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
      vec2 tcTap = tc / screenSize;
      float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

      tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

      sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
    }

    // output the result
    float A = max(1.0 - sum * intensity / float(${pe.int(16)}), 0.0);

    // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
    A = (pow(A, 0.2) + 1.2 * A * A * A * A) / 2.2;

    fragOcclusion = A;
  `),e},getRadius:bo},Symbol.toStringTag,{value:"Module"}));class To extends H{constructor(e,a){super(e,a,new W(Mo,(()=>Promise.resolve().then((()=>Mo)))))}initializePipeline(){return ja({colorWrite:La})}}let So=class extends Na{constructor(e){super(e),this.consumes={required:["normals"]},this.produces=Ea.SSAO,this.isEnabled=()=>!1,this._enableTime=Sa(0),this._passParameters=new fo,this._drawParameters=new xo}initialize(){const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),(e=>e.charCodeAt(0))),a=new _a;a.wrapMode=Ga.CLAMP_TO_EDGE,a.pixelFormat=Da.RGB,a.wrapMode=Ga.REPEAT,a.hasMipmap=!0,a.width=32,a.height=32,this._passParameters.noiseTexture=new Va(this.renderingContext,a,e),this.techniques.precompile(To),this.techniques.precompile(po),this.addHandles(Ta((()=>this.isEnabled()),(()=>this._enableTime=Sa(0))))}destroy(){this._passParameters.noiseTexture=Ma(this._passParameters.noiseTexture)}render(e){const a=e.find((({name:e})=>"normals"===e)),o=a?.getTexture(),t=a?.getTexture(Fa);if(!o||!t)return;const r=this.techniques.get(To),i=this.techniques.get(po);if(!r.compiled||!i.compiled)return this._enableTime=Sa(performance.now()),void this.requestRender(De.UPDATE);0===this._enableTime&&(this._enableTime=Sa(performance.now()));const n=this.renderingContext,s=this.view.qualitySettings.fadeDuration,l=this.bindParameters,c=l.camera,d=c.relativeElevation,m=wa((be-d)/(be-we),0,1),u=s>0?Math.min(s,performance.now()-this._enableTime)/s:1,h=u*m;this._passParameters.normalTexture=o,this._passParameters.depthTexture=t,this._passParameters.projScale=1/c.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*Co/bo(c)**6*h;const p=c.fullViewport[2],v=c.fullViewport[3],f=this.fboCache.acquire(p,v,"ssao input",xe.RG8UNORM);n.bindFramebuffer(f.fbo),n.setViewport(0,0,p,v),n.bindTechnique(r,l,this._passParameters,this._drawParameters),n.screen.draw();const g=Math.round(p/2),x=Math.round(v/2),b=this.fboCache.acquire(g,x,"ssao blur",xe.R8UNORM);n.bindFramebuffer(b.fbo),this._drawParameters.colorTexture=f.getTexture(),Oa(this._drawParameters.blurSize,0,2/v),n.bindTechnique(i,l,this._passParameters,this._drawParameters),n.setViewport(0,0,g,x),n.screen.draw(),f.release();const w=this.fboCache.acquire(g,x,Ea.SSAO,xe.R8UNORM);return n.bindFramebuffer(w.fbo),n.setViewport(0,0,p,v),n.setClearColor(1,1,1,0),n.clear(Ra.COLOR),this._drawParameters.colorTexture=b.getTexture(),Oa(this._drawParameters.blurSize,2/p,0),n.bindTechnique(i,l,this._passParameters,this._drawParameters),n.setViewport(0,0,g,x),n.screen.draw(),n.setViewport4fv(c.fullViewport),b.release(),u<1&&this.requestRender(De.UPDATE),w}};ba([Ca()],So.prototype,"consumes",void 0),ba([Ca()],So.prototype,"produces",void 0),ba([Ca({constructOnly:!0})],So.prototype,"isEnabled",void 0),So=ba([ya("esri.views.3d.webgl-engine.effects.ssao.SSAO")],So);const Co=.5;function yo(e,a){a.receiveAmbientOcclusion?(e.uniforms.add(new Y("ssaoTex",(e=>e.ssao?.getTexture()))),e.constants.add("blurSizePixelsInverse","float",.5),e.code.add(pe`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):e.code.add(pe`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}function Oo(e,o){const t=e.fragment,r=void 0!==o.lightingSphericalHarmonicsOrder?o.lightingSphericalHarmonicsOrder:2;0===r?(t.uniforms.add(new E("lightingAmbientSH0",(({lighting:e})=>a(Eo,e.sh.r[0],e.sh.g[0],e.sh.b[0])))),t.code.add(pe`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===r?(t.uniforms.add(new J("lightingAmbientSH_R",(({lighting:e})=>Ha(No,e.sh.r[0],e.sh.r[1],e.sh.r[2],e.sh.r[3]))),new J("lightingAmbientSH_G",(({lighting:e})=>Ha(No,e.sh.g[0],e.sh.g[1],e.sh.g[2],e.sh.g[3]))),new J("lightingAmbientSH_B",(({lighting:e})=>Ha(No,e.sh.b[0],e.sh.b[1],e.sh.b[2],e.sh.b[3])))),t.code.add(pe`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===r&&(t.uniforms.add(new E("lightingAmbientSH0",(({lighting:e})=>a(Eo,e.sh.r[0],e.sh.g[0],e.sh.b[0]))),new J("lightingAmbientSH_R1",(({lighting:e})=>Ha(No,e.sh.r[1],e.sh.r[2],e.sh.r[3],e.sh.r[4]))),new J("lightingAmbientSH_G1",(({lighting:e})=>Ha(No,e.sh.g[1],e.sh.g[2],e.sh.g[3],e.sh.g[4]))),new J("lightingAmbientSH_B1",(({lighting:e})=>Ha(No,e.sh.b[1],e.sh.b[2],e.sh.b[3],e.sh.b[4]))),new J("lightingAmbientSH_R2",(({lighting:e})=>Ha(No,e.sh.r[5],e.sh.r[6],e.sh.r[7],e.sh.r[8]))),new J("lightingAmbientSH_G2",(({lighting:e})=>Ha(No,e.sh.g[5],e.sh.g[6],e.sh.g[7],e.sh.g[8]))),new J("lightingAmbientSH_B2",(({lighting:e})=>Ha(No,e.sh.b[5],e.sh.b[6],e.sh.b[7],e.sh.b[8])))),t.code.add(pe`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),o.pbrMode!==Me.Normal&&o.pbrMode!==Me.Schematic||t.code.add(pe`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const Eo=m(),No=oa();function zo(e){e.code.add(pe`float mapChannel(float x, vec2 p) {
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),e.code.add(pe`vec3 blackLevelSoftCompression(vec3 color, float averageAmbientRadiance) {
vec2 p = vec2(0.02, 0.0075) * averageAmbientRadiance;
return vec3(mapChannel(color.x, p), mapChannel(color.y, p), mapChannel(color.z, p));
}`)}function jo(e){e.constants.add("ambientBoostFactor","float",Ee)}function Lo(e){e.uniforms.add(new Le("lightingGlobalFactor",(e=>e.lighting.globalFactor)))}function Io(e,a){const o=e.fragment,{pbrMode:t,spherical:r,hasColorTexture:i}=a;o.include(yo,a),t!==Me.Disabled&&o.include(Te,a),e.include(Oo,a),o.include(Z),o.include(Se,a);const n=!(t===Me.Schematic&&!i);switch(n&&o.include(zo),o.code.add(pe`
    const float GAMMA_SRGB = ${pe.float(Ua)};
    const float INV_GAMMA_SRGB = 0.4761904;
    ${ve(t!==Me.Disabled,"const float GROUND_REFLECTANCE = 0.2;")}
  `),jo(o),Lo(o),Ce(o),o.code.add(pe`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${r?pe`normalize(vPosWorld)`:pe`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),ye(o),o.code.add(pe`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t){case Me.Disabled:case Me.WaterOnIntegratedMesh:case Me.Water:e.include(Oe),o.code.add(pe`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {
vec3 mainLighting = applyShading(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case Me.Normal:case Me.Schematic:o.code.add(pe`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
vec3 viewDir, vec3 groundNormal, vec3 mrr, vec4 _emission,
float additionalAmbientIrradiance) {
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotNG = clamp(dot(normal, groundNormal), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, groundNormal), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),o.code.add(pe`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),a.useFillLights?o.uniforms.add(new ga("hasFillLights",(e=>e.enableFillLights))):o.constants.add("hasFillLights","bool",!1),o.code.add(pe`vec3 ambientDir = vec3(5.0 * groundNormal[1] - groundNormal[0] * groundNormal[2], - 5.0 * groundNormal[0] - groundNormal[2] * groundNormal[1], groundNormal[1] * groundNormal[1] + groundNormal[0] * groundNormal[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
float NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
vec3 mainLightIrradianceComponent = NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),o.uniforms.add(new Le("lightingSpecularStrength",(e=>e.lighting.mainLight.specularStrength)),new Le("lightingEnvironmentStrength",(e=>e.lighting.mainLight.environmentStrength))).code.add(pe`vec3 horizonRingDir = inputs.RdotNG * groundNormal - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
float NdotH = clamp(dot(normal, h), 0.0, 1.0);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE);`),o.code.add(pe`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission.rgb == vec3(0.0) ? _emission.rgb : tonemapACES(pow(_emission.rgb, vec3(GAMMA_SRGB)));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${n?pe`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:pe`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case Me.Simplified:case Me.TerrainWithWater:Ce(o),ye(o),o.code.add(pe`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);default:case Me.COUNT:}}class Po extends Ie{constructor(e,a,o){super(e,"mat4",xa.Draw,((o,t,r,i)=>o.setUniformMatrix4fv(e,a(t,r,i))),o)}}function Ao(e){e.fragment.uniforms.add(new Wa("shadowMapMatrix",((e,a)=>a.shadowMap.getShadowMapMatrices(e.origin)),4)),Do(e)}function Go(e){e.fragment.uniforms.add(new Po("shadowMapMatrix",((e,a)=>a.shadowMap.getShadowMapMatrices(e.origin)),4)),Do(e)}function Do(e){const{fragment:a}=e;a.uniforms.add(new J("cascadeDistances",(e=>e.shadowMap.cascadeDistances)),new k("numCascades",(e=>e.shadowMap.numCascades))),a.code.add(pe`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}function Fo(e){e.fragment.code.add(pe`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)}class Ro extends Ie{constructor(e,a){super(e,"sampler2DShadow",xa.Bind,((o,t)=>o.bindTexture(e,a(t))))}}class Bo extends Pa{constructor(){super(...arguments),this.origin=m()}}function _o(e,a){a.receiveShadows&&(e.include(Ao),Uo(e))}function Vo(e,a){a.receiveShadows&&(e.include(Go),Uo(e))}function Uo(e){e.include(Fo);const{fragment:a}=e;a.uniforms.add(new Ro("shadowMap",(e=>e.shadowMap.depthTexture))),a.code.add(pe`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}function Ho(e,a){a.hasColorTextureTransform?(e.varyings.add("colorUV","vec2"),e.vertex.uniforms.add(new ze("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??na))).code.add(pe`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(pe`void forwardColorUV(){}`)}function Wo(e,a){a.hasNormalTextureTransform&&a.textureCoordinateType!==_.None?(e.varyings.add("normalUV","vec2"),e.vertex.uniforms.add(new ze("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??na))).code.add(pe`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(pe`void forwardNormalUV(){}`)}function qo(e,a){a.hasEmissionTextureTransform&&a.textureCoordinateType!==_.None?(e.varyings.add("emissiveUV","vec2"),e.vertex.uniforms.add(new ze("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??na))).code.add(pe`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(pe`void forwardEmissiveUV(){}`)}function Yo(e,a){a.hasOcclusionTextureTransform&&a.textureCoordinateType!==_.None?(e.varyings.add("occlusionUV","vec2"),e.vertex.uniforms.add(new ze("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??na))).code.add(pe`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(pe`void forwardOcclusionUV(){}`)}function Jo(e,a){a.hasMetallicRoughnessTextureTransform&&a.textureCoordinateType!==_.None?(e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.uniforms.add(new ze("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??na))).code.add(pe`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(pe`void forwardMetallicRoughnessUV(){}`)}function Zo(e){e.include($),e.code.add(pe`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${pe.int(y.Multiply)}) {
        return allMixed;
      }
      if (mode == ${pe.int(y.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${pe.int(y.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${pe.int(y.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${pe.int(y.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}function ko(e,a){a.snowCover&&(e.code.add(pe`float getSnow(vec3 normal, vec3 normalGround) {
return smoothstep(0.5, 0.55, dot(normal, normalGround));
}`),e.code.add(pe`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}
vec4 snowCoverForEmissions(vec4 emission, float snow) {
return mix(emission, vec4(0.0), snow);
}`))}const $o=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const a=new za,{attributes:o,vertex:t,fragment:r,varyings:i}=a,{output:n,normalType:s,offsetBackfaces:l,instancedColor:c,spherical:d,receiveShadows:m,snowCover:u,pbrMode:h,textureAlphaPremultiplied:p,instancedDoublePrecision:v,hasVertexColors:f,hasVertexTangents:x,hasColorTexture:b,hasNormalTexture:w,hasNormalTextureTransform:M,hasColorTextureTransform:C,hasBloom:y}=e;if(P(t,e),o.add(ea.POSITION,"vec3"),i.add("vpos","vec3",{invariant:!0}),a.include(G,e),a.include(to,e),a.include(Be,e),a.include(Ho,e),!g(n))return a.include(mo,e),a;a.include(Wo,e),a.include(qo,e),a.include(Yo,e),a.include(Jo,e),X(t,e),a.include(S,e),a.include(Ze,e);const O=s===T.Attribute||s===T.Compressed;return O&&l&&a.include(ao),a.include(uo,e),a.include(Ka,e),c&&a.attributes.add(ea.INSTANCECOLOR,"vec4"),i.add("vPositionLocal","vec3"),a.include(A,e),a.include($e,e),a.include(io,e),a.include(Xe,e),t.uniforms.add(new K("externalColor",(e=>"ignore"===e.colorMixMode?ta:e.externalColor))),i.add("vcolorExt","vec4"),a.include(Q,e),t.main.add(pe`
    forwardNormalizedVertexColor();
    vcolorExt = externalColor;
    ${ve(c,"vcolorExt *= instanceColor * 0.003921568627451;")}
    vcolorExt *= vvColor();
    vcolorExt *= getSymbolColor();
    forwardColorMixMode();

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${ve(O,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${ve(x,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${ve(O&&l,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardLinearDepth();
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (vcolorExt.a < ${pe.float(ma)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
  `),a.include(Io,e),r.include(yo,e),a.include(so,e),a.include(v?_o:Vo,e),r.include(F,e),a.include(ee,e),X(r,e),r.uniforms.add(t.uniforms.get("localOrigin"),new Pe("ambient",(e=>e.ambient)),new Pe("diffuse",(e=>e.diffuse)),new L("opacity",(e=>e.opacity)),new L("layerOpacity",(e=>e.layerOpacity))),b&&r.uniforms.add(new D("tex",(e=>e.texture))),a.include(Ne,e),r.include(Te,e),r.include(Zo),a.include($a,e),r.include(ko,e),jo(r),Lo(r),ye(r),r.main.add(pe`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${b?pe`
            vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
            ${ve(p,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:pe`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${s===T.ScreenDerivative?pe`vec3 normal = screenDerivativeNormal(vPositionLocal);`:pe`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

      float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
      float shadow = ${m?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":ve(d,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${ve(f,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
    float opacity_ = layerOpacity * mixExternalOpacity(${ve(f,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, int(colorMixMode));
    ${w?`mat3 tangentSpace = computeTangentSpace(${x?"normal":"normal, vpos, vuv0"});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${M?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${d?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${ve(u,pe`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${h===Me.Normal||h===Me.Schematic?pe`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            vec4 emission = ${y?"vec4(0.0)":"getEmissions(albedo)"};
            ${ve(u,"mrr = applySnowToMRR(mrr, snow);\n                 emission = snowCoverForEmissions(emission, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:pe`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos, albedo ${ve(u,", snow")});
  `),a}},Symbol.toStringTag,{value:"Module"}));class Xo extends Qa{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=Ja,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=Fe.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveStrength=0,this.emissiveSource=h.Color,this.emissiveBaseColor=d,this.instancedDoublePrecision=!1,this.normalType=T.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.ambient=c(.2,.2,.2),this.diffuse=c(.8,.8,.8),this.externalColor=ra(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=m(),this.hasSlicePlane=!1,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.drivenOpacity=!1,this.writeDepth=!0,this.customDepthTest=Re.Less,this.textureAlphaMode=Ge.Blend,this.textureAlphaCutoff=ma,this.textureAlphaPremultiplied=!1,this.renderOccluded=Ue.Occlude,this.isDecoration=!1}}class Ko extends eo{constructor(){super(...arguments),this.origin=m(),this.slicePlaneLocalOrigin=this.origin}}class Qo extends H{constructor(e,a,o=new W($o,(()=>Promise.resolve().then((()=>$o))))){super(e,a,o),this.type="DefaultMaterialTechnique"}_makePipeline(e,a){const{oitPass:o,output:t,transparent:r,cullFace:i,customDepthTest:n,hasOccludees:s}=e;return ja({blending:g(t)&&r?ne(o):null,culling:(l=e,l.cullFace===Fe.None&&(l.hasSlicePlane||l.transparent||l.doubleSidedMode)?null:Ia(i)),depthTest:{func:ie(o,(c=n,c===Re.Lequal?Ba.LEQUAL:Ba.LESS))},depthWrite:re(e),drawBuffers:oe(t,te(o,t)),colorWrite:La,stencilWrite:s?ce:null,stencilTest:s?a?se:le:null,polygonOffset:ae(e)});var l,c}initializePipeline(e){return this._occludeePipelineState=this._makePipeline(e,!0),this._makePipeline(e,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}class et extends He{constructor(e){super(),this.spherical=e,this.alphaDiscardMode=Ge.Opaque,this.doubleSidedMode=Xa.None,this.pbrMode=Me.Disabled,this.cullFace=Fe.None,this.normalType=T.Attribute,this.customDepthTest=Re.Less,this.emissionSource=de.None,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.instancedDoublePrecision=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.snowCover=!1,this.hasBloom=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1,this.occlusionPass=!1,this.hasVvInstancing=!0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!0,this.draped=!1}get textureCoordinateType(){return this.hasColorTexture||this.hasMetallicRoughnessTexture||this.emissionSource===de.Texture||this.hasOcclusionTexture||this.hasNormalTexture?_.Default:_.None}get objectAndLayerIdColorInstanced(){return this.instanced}get discardInvisibleFragments(){return this.transparent}}ba([Aa({count:Ge.COUNT})],et.prototype,"alphaDiscardMode",void 0),ba([Aa({count:Xa.COUNT})],et.prototype,"doubleSidedMode",void 0),ba([Aa({count:Me.COUNT})],et.prototype,"pbrMode",void 0),ba([Aa({count:Fe.COUNT})],et.prototype,"cullFace",void 0),ba([Aa({count:T.COUNT})],et.prototype,"normalType",void 0),ba([Aa({count:Re.COUNT})],et.prototype,"customDepthTest",void 0),ba([Aa({count:de.COUNT})],et.prototype,"emissionSource",void 0),ba([Aa()],et.prototype,"hasVertexColors",void 0),ba([Aa()],et.prototype,"hasSymbolColors",void 0),ba([Aa()],et.prototype,"hasVerticalOffset",void 0),ba([Aa()],et.prototype,"hasColorTexture",void 0),ba([Aa()],et.prototype,"hasMetallicRoughnessTexture",void 0),ba([Aa()],et.prototype,"hasOcclusionTexture",void 0),ba([Aa()],et.prototype,"hasNormalTexture",void 0),ba([Aa()],et.prototype,"hasScreenSizePerspective",void 0),ba([Aa()],et.prototype,"hasVertexTangents",void 0),ba([Aa()],et.prototype,"hasOccludees",void 0),ba([Aa()],et.prototype,"instancedDoublePrecision",void 0),ba([Aa()],et.prototype,"hasModelTransformation",void 0),ba([Aa()],et.prototype,"offsetBackfaces",void 0),ba([Aa()],et.prototype,"vvSize",void 0),ba([Aa()],et.prototype,"vvColor",void 0),ba([Aa()],et.prototype,"receiveShadows",void 0),ba([Aa()],et.prototype,"receiveAmbientOcclusion",void 0),ba([Aa()],et.prototype,"textureAlphaPremultiplied",void 0),ba([Aa()],et.prototype,"instanced",void 0),ba([Aa()],et.prototype,"instancedColor",void 0),ba([Aa()],et.prototype,"writeDepth",void 0),ba([Aa()],et.prototype,"transparent",void 0),ba([Aa()],et.prototype,"enableOffset",void 0),ba([Aa()],et.prototype,"terrainDepthTest",void 0),ba([Aa()],et.prototype,"cullAboveTerrain",void 0),ba([Aa()],et.prototype,"snowCover",void 0),ba([Aa()],et.prototype,"hasBloom",void 0),ba([Aa()],et.prototype,"hasColorTextureTransform",void 0),ba([Aa()],et.prototype,"hasEmissionTextureTransform",void 0),ba([Aa()],et.prototype,"hasNormalTextureTransform",void 0),ba([Aa()],et.prototype,"hasOcclusionTextureTransform",void 0),ba([Aa()],et.prototype,"hasMetallicRoughnessTextureTransform",void 0);const at=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const a=new za,{attributes:o,vertex:t,fragment:r,varyings:i}=a,{output:n,offsetBackfaces:s,instancedColor:l,pbrMode:c,snowCover:d,spherical:m,hasBloom:u}=e,h=c===Me.Normal||c===Me.Schematic;if(P(t,e),o.add(ea.POSITION,"vec3"),i.add("vpos","vec3",{invariant:!0}),a.include(G,e),a.include(to,e),a.include(Be,e),a.include(Q,e),g(n)&&(X(a.vertex,e),a.include(S,e),a.include(Ze,e),s&&a.include(ao),l&&a.attributes.add(ea.INSTANCECOLOR,"vec4"),i.add("vNormalWorld","vec3"),i.add("localvpos","vec3",{invariant:!0}),a.include(A,e),a.include($e,e),a.include(io,e),a.include(Xe,e),t.uniforms.add(new K("externalColor",(e=>e.externalColor))),i.add("vcolorExt","vec4"),t.main.add(pe`
      forwardNormalizedVertexColor();
      vcolorExt = externalColor;
      ${ve(l,"vcolorExt *= instanceColor * 0.003921568627451;")}
      vcolorExt *= vvColor();
      vcolorExt *= getSymbolColor();
      forwardColorMixMode();

      bool alphaCut = vcolorExt.a < ${pe.float(ma)};
      vpos = getVertexInLocalOriginSpace();
      localvpos = vpos - view[3].xyz;
      vpos = subtractOrigin(vpos);
      vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
      vpos = addVerticalOffset(vpos, localOrigin);
      vec4 basePosition = transformPosition(proj, view, vpos);

      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      forwardLinearDepth();
      forwardTextureCoordinates();

      gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
      ${ve(s,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
    `)),g(n)){const{hasColorTexture:o,hasColorTextureTransform:i,receiveShadows:n}=e;a.include(Io,e),r.include(yo,e),a.include(so,e),a.include(e.instancedDoublePrecision?_o:Vo,e),r.include(F,e),a.include(ee,e),X(r,e),Ce(r),jo(r),Lo(r),r.uniforms.add(t.uniforms.get("localOrigin"),t.uniforms.get("view"),new Pe("ambient",(e=>e.ambient)),new Pe("diffuse",(e=>e.diffuse)),new L("opacity",(e=>e.opacity)),new L("layerOpacity",(e=>e.layerOpacity))),o&&r.uniforms.add(new D("tex",(e=>e.texture))),a.include(Ne,e),r.include(Te,e),r.include(Zo),ye(r),r.main.add(pe`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${o?`texture(tex, ${i?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${ve(o,`${ve(e.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = ${n?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":m?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?pe`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:pe`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
      ${ve(d,"albedo = mix(albedo, vec3(1), 0.9);")}
      ${pe`vec3 shadingNormal = normalize(vNormalWorld);
             albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}
      ${ve(h,`vec3 normalGround = ${m?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};`)}
      ${h?pe`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                 ${ve(d,pe`mrr = applySnowToMRR(mrr, 1.0)`)}
            vec4 emission = ${d||u?"vec4(0.0)":"getEmissions(albedo)"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:pe`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos, albedo ${ve(d,", 1.0")});`)}return a.include(mo,e),a}},Symbol.toStringTag,{value:"Module"}));class ot extends Qo{constructor(e,a){super(e,a,new W(at,(()=>Promise.resolve().then((()=>at))))),this.type="RealisticTreeTechnique"}}class tt extends We{constructor(e,a){super(e,it),this.materialType="default",this.supportsEdges=!0,this.intersectDraped=void 0,this.produces=new Map([[me.OPAQUE_MATERIAL,e=>(x(e)||b(e))&&!this.transparent],[me.TRANSPARENT_MATERIAL,e=>(x(e)||b(e))&&this.transparent&&this.parameters.writeDepth],[me.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,e=>(w(e)||b(e))&&this.transparent&&!this.parameters.writeDepth]]),this._vertexBufferLayout=function(e){const a=v().vec3f(ea.POSITION);return e.normalType===T.Compressed?a.vec2i16(ea.NORMALCOMPRESSED,{glNormalized:!0}):a.vec3f(ea.NORMAL),e.hasVertexTangents&&a.vec4f(ea.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&a.vec2f16(ea.UV0),e.hasVertexColors&&a.vec4u8(ea.COLOR),e.hasSymbolColors&&a.vec4u8(ea.SYMBOLCOLOR),Ae()&&a.vec4u8(ea.OLIDCOLOR),a}(this.parameters),this._configuration=new et(a.spherical)}isVisibleForOutput(e){return e!==f.Shadow&&e!==f.ShadowExcludeHighlight&&e!==f.ShadowHighlight||this.parameters.castShadows}get visible(){const{layerOpacity:e,colorMixMode:a,opacity:o,externalColor:t}=this.parameters;return e*("replace"===a?1:o)*("ignore"===a?1:t[3])>=ma}get _hasEmissiveBase(){return!!this.parameters.emissiveTextureId||!e(this.parameters.emissiveBaseColor,d)}get hasEmissions(){return this.parameters.emissiveStrength>0&&(this.parameters.emissiveSource===h.Emissive&&this._hasEmissiveBase||this.parameters.emissiveSource===h.Color)}getConfiguration(e,a){const{parameters:o,_configuration:t}=this,{treeRendering:r,doubleSided:i,doubleSidedType:n}=o;return super.getConfiguration(e,a,this._configuration),t.hasNormalTexture=!r&&!!o.normalTextureId,t.hasColorTexture=!!o.textureId,t.hasVertexTangents=!r&&o.hasVertexTangents,t.instanced=o.isInstanced,t.instancedDoublePrecision=o.instancedDoublePrecision,t.vvSize=!!o.vvSize,t.hasVerticalOffset=null!=o.verticalOffset,t.hasScreenSizePerspective=null!=o.screenSizePerspective,t.hasSlicePlane=o.hasSlicePlane,t.alphaDiscardMode=o.textureAlphaMode,t.normalType=r?T.Attribute:o.normalType,t.transparent=this.transparent,t.writeDepth=o.writeDepth,t.customDepthTest=o.customDepthTest??Re.Less,t.hasOccludees=a.hasOccludees,t.cullFace=o.hasSlicePlane?Fe.None:o.cullFace,t.cullAboveTerrain=a.cullAboveTerrain,t.hasModelTransformation=!r&&null!=o.modelTransformation,t.hasVertexColors=o.hasVertexColors,t.hasSymbolColors=o.hasSymbolColors,t.doubleSidedMode=r?Xa.WindingOrder:i&&"normal"===n?Xa.View:i&&"winding-order"===n?Xa.WindingOrder:Xa.None,t.instancedColor=o.hasInstancedColor,g(e)?(t.terrainDepthTest=a.terrainDepthTest,t.receiveShadows=o.receiveShadows,t.receiveAmbientOcclusion=o.receiveAmbientOcclusion&&null!=a.ssao):(t.terrainDepthTest=!1,t.receiveShadows=t.receiveAmbientOcclusion=!1),t.vvColor=!!o.vvColor,t.textureAlphaPremultiplied=!!o.textureAlphaPremultiplied,t.pbrMode=o.usePBR?o.isSchematic?Me.Schematic:Me.Normal:Me.Disabled,t.hasMetallicRoughnessTexture=!r&&!!o.metallicRoughnessTextureId,t.emissionSource=r?de.None:null!=o.emissiveTextureId&&o.emissiveSource===h.Emissive?de.Texture:o.usePBR?o.emissiveSource===h.Emissive?de.EmissiveColor:de.SymbolColor:de.None,t.hasOcclusionTexture=!r&&!!o.occlusionTextureId,t.offsetBackfaces=!(!this.transparent||!o.offsetTransparentBackfaces),t.oitPass=a.oitPass,t.enableOffset=a.camera.relativeElevation<ue,t.snowCover=a.snowCover,t.hasBloom=M(e),t.hasColorTextureTransform=!!o.colorTextureTransformMatrix,t.hasNormalTextureTransform=!!o.normalTextureTransformMatrix,t.hasEmissionTextureTransform=!!o.emissiveTextureTransformMatrix,t.hasOcclusionTextureTransform=!!o.occlusionTextureTransformMatrix,t.hasMetallicRoughnessTextureTransform=!!o.metallicRoughnessTextureTransformMatrix,t}intersect(e,c,d,m,u,h){if(null!=this.parameters.verticalOffset){const e=d.camera;a(ut,c[12],c[13],c[14]);let h=null;switch(d.viewingMode){case p.Global:h=t(dt,ut);break;case p.Local:h=o(dt,ct)}let v=0;const f=r(ht,ut,e.eye),g=i(f),x=n(f,f,1/g);let b=null;this.parameters.screenSizePerspective&&(b=s(h,x)),v+=qe(e,g,this.parameters.verticalOffset,b??0,this.parameters.screenSizePerspective),n(h,h,v),l(mt,h,d.transform.inverseRotation),m=r(st,m,mt),u=r(lt,u,mt)}Ke(e,d,m,u,aa(d.verticalOffset),h)}createGLMaterial(e){return new rt(e)}createBufferWriter(){return new Qe(this._vertexBufferLayout)}get transparent(){return nt(this.parameters)}}class rt extends _e{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){this._material.setParameters({receiveShadows:e.shadowMap.enabled});const o=this._material.parameters;this.updateTexture(o.textureId);const t=e.camera.viewInverseTransposeMatrix;return a(o.origin,t[3],t[7],t[11]),this._material.setParameters(this.textureBindParameters),this.getTechnique(o.treeRendering?ot:Qo,e)}}class it extends Xo{constructor(){super(...arguments),this.treeRendering=!1,this.hasVertexTangents=!1}}function nt(e){const{drivenOpacity:a,opacity:o,externalColor:[t,r,i,n],layerOpacity:s,texture:l,textureId:c,textureAlphaMode:d,colorMixMode:m}=e;return a||o<1&&"replace"!==m||n<1&&"ignore"!==m||s<1||(null!=l||null!=c)&&d!==Ge.Opaque&&d!==Ge.Mask&&"replace"!==m}const st=m(),lt=m(),ct=u(0,0,1),dt=m(),mt=m(),ut=m(),ht=m();export{uo as C,tt as D,Io as E,Zo as M,$a as N,no as O,Vo as R,ko as S,Ro as T,eo as V,Ja as a,Ko as b,Ya as c,it as d,ka as e,yo as f,jo as g,Lo as h,nt as i,Xa as j,Oo as k,Bo as l,Ka as m,lo as n,_o as o,Ao as p,Fo as q,Qa as r,Za as s,So as t,qa as u};
