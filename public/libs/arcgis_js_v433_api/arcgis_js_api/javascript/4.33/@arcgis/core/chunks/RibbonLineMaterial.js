/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{t as e,b as t}from"../core/lang.js";import{g as i}from"./watch.js";import{m as r,c as a,D as s}from"./mat4.js";import{c as o,I as n}from"./mat4f64.js";import{m as l,t as c,x as d,s as p,i as h,e as m,c as f,k as u,d as v,j as g,l as S}from"./vec3.js";import{c as T,f as _}from"./vec3f64.js";import{g as y,c as b}from"./sphere.js";import{m as A}from"./mathUtils2.js";import{O}from"./basicInterfaces.js";import{ag as E,ah as R,I as x,M as D,N as C,d as L,ai as P,J as w,c as I,g as j,l as N,j as z,ac as F,K as U,t as M,b as W,k as V,F as B,S as k,o as H,C as J,m as G,R as $,aa as Y,s as Z,p as X,q,r as Q,u as K,v as ee,w as te,x as ie,y as re,z as ae,A as se,B as oe,D as ne,E as le,V as ce,i as de,H as pe}from"./Matrix4PassUniform.js";import{A as he,S as me,R as fe}from"./BufferView.js";import{a as ue,V as ve}from"./VertexAttribute.js";import ge from"../core/Evented.js";import Se from"../core/Handles.js";import{d as Te}from"./maybe.js";import{O as _e}from"./Octree.js";import{L as ye}from"./Logger.js";import{c as be}from"./mathUtils.js";import{g as Ae}from"./screenUtils.js";import{c as Oe}from"./vec2.js";import{Z as Ee,c as Re,O as xe}from"./vec4f64.js";import{e as De}from"./frustum.js";import{c as Ce,d as Le,f as Pe,i as we}from"./lineSegment.js";import{c as Ie,l as je,o as Ne,g as ze}from"./plane.js";import{n as Fe}from"./InterleavedLayout.js";import{S as Ue,i as Me,f as We,b as Ve,j as Be,e as ke}from"./ShaderOutput.js";import{a as He,F as Je,M as Ge,o as $e}from"./Matrix4BindUniform.js";import{D as Ye,O as Ze,M as Xe,R as qe}from"./Material.js";import{_ as Qe}from"./tslib.es6.js";import{p as Ke}from"./ShaderTechniqueConfiguration.js";import{g as et,I as tt}from"./glsl.js";import{R as it}from"./Float4DrawUniform.js";import{p as rt}from"./floatRGBA.js";import{c as at,T as st,e as ot}from"./enums.js";import{a as nt,T as lt}from"./Texture.js";import{s as ct}from"./vec4.js";import{s as dt}from"./GeometryUtil.js";import{S as pt}from"./ShaderBuilder.js";import{a as ht}from"./AlphaCutoff.js";import{m as mt,d as ft,u as ut}from"./renderState.js";function vt(e,t){return null==e&&(e=[]),e.push(t),e}function gt(e,t){if(null==e)return null;const i=e.filter((e=>e!==t));return 0===i.length?null:i}function St(e,t,i,r,a){Tt[0]=e.get(t,0),Tt[1]=e.get(t,1),Tt[2]=e.get(t,2),E(Tt,_t,3),i.set(a,0,_t[0]),r.set(a,0,_t[1]),i.set(a,1,_t[2]),r.set(a,1,_t[3]),i.set(a,2,_t[4]),r.set(a,2,_t[5])}const Tt=T(),_t=new Float32Array(6);class yt{constructor(e={}){this.id=i(),this._highlightIds=new Set,this._shaderTransformation=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerViewUid=e.layerViewUid,e.isElevationSource&&(this.lastValidElevationBB=new bt),this._geometries=e.geometries?Array.from(e.geometries):new Array}dispose(){this._geometries.length=0}get layer(){return this._layer}set layer(e){he(null==this._layer||null==e,"Object3D can only be added to a single Layer"),this._layer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e);for(const t of this._highlightIds)e.addHighlight(t);this._emit("geometryAdded",{object:this,geometry:e}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}removeGeometry(e){const t=this._geometries.splice(e,1)[0];if(t){for(const e of this._highlightIds)t.removeHighlight(e);this._emit("geometryRemoved",{object:this,geometry:t}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t,i=!1){this._emit("attributesChanged",{object:this,geometry:e,attribute:t,sync:i}),ue(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(const e of this._geometries)e.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const e=new R;for(const t of this._geometries)t.occludees=vt(t.occludees,e);return this._emit("occlusionChanged",this),e}removeOcclude(e){for(const t of this._geometries)t.occludees=gt(t.occludees,e);this._emit("occlusionChanged",this)}highlight(e){const t=new x(e);for(const e of this._geometries)e.addHighlight(t);return this._emit("highlightChanged",this),this._highlightIds.add(t),t}removeHighlight(e){this._highlightIds.delete(e);for(const t of this._geometries)t.removeHighlight(e);this._emit("highlightChanged",this)}removeStateID(e){e.channel===O.Highlight?this.removeHighlight(e):this.removeOcclude(e)}getCombinedStaticTransformation(e,t){return r(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e,t=o()){return r(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new At,this._validateBoundingVolume(this._bvWorldSpace,Ct.WorldSpace)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new At,this._validateBoundingVolume(this._bvObjectSpace,Ct.ObjectSpace)),this._bvObjectSpace}_validateBoundingVolume(e,t){const i=t===Ct.ObjectSpace;for(const t of this._geometries){const r=t.boundingInfo;r&&Ot(r,e,i?t.transformation:this.getCombinedShaderTransformation(t))}l(y(e.bounds),e.min,e.max,.5);for(const t of this._geometries){const r=t.boundingInfo;if(null==r)continue;const a=i?t.transformation:this.getCombinedShaderTransformation(t),s=A(a);c(Dt,r.center,a);const o=d(Dt,y(e.bounds)),n=r.radius*s;e.bounds[3]=Math.max(e.bounds[3],o+n)}}_invalidateBoundingVolume(){const e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this.layer&&e&&this.layer.notifyObjectBBChanged(this,e)}_emit(e,t){this.layer?.events.emit(e,t)}get geometries(){return this._geometries}get transformation(){return this._transformation??n}set transformation(e){this._transformation=a(this._transformation??o(),e),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?a(this._shaderTransformation??o(),e):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}get test(){}}class bt{constructor(){this.min=_(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this.max=_(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE)}isEmpty(){return this.max[0]<this.min[0]&&this.max[1]<this.min[1]&&this.max[2]<this.min[2]}}class At extends bt{constructor(){super(...arguments),this.bounds=b()}}function Ot(e,t,i){const r=e.bbMin,a=e.bbMax;if(s(i)){const e=p(Et,i[12],i[13],i[14]);h(Rt,r,e),h(xt,a,e);for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],Rt[e]),t.max[e]=Math.max(t.max[e],xt[e])}else if(c(Rt,r,i),m(r,a))for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],Rt[e]),t.max[e]=Math.max(t.max[e],Rt[e]);else{c(xt,a,i);for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],Rt[e],xt[e]),t.max[e]=Math.max(t.max[e],Rt[e],xt[e]);for(let e=0;e<3;++e){f(Rt,r),f(xt,a),Rt[e]=a[e],xt[e]=r[e],c(Rt,Rt,i),c(xt,xt,i);for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],Rt[e],xt[e]),t.max[e]=Math.max(t.max[e],Rt[e],xt[e])}}}const Et=T(),Rt=T(),xt=T(),Dt=T();var Ct,Lt;!function(e){e[e.WorldSpace=0]="WorldSpace",e[e.ObjectSpace=1]="ObjectSpace"}(Ct||(Ct={})),function(e){e[e.ASYNC=0]="ASYNC",e[e.SYNC=1]="SYNC"}(Lt||(Lt={}));const Pt=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];class wt{constructor(e,t,r=""){this.stage=e,this.apiLayerViewUid=r,this.id=i(),this.events=new ge,this.visible=!0,this.sliceable=!1,this._objectsAdded=new Array,this._handles=new Se,this._objects=new Map,this._pickable=!0,this.visible=t?.visible??!0,this._pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??Lt.ASYNC,e.addLayer(this);for(const t of Pt)this._handles.add(this.events.on(t,(i=>e.handleEvent(t,i))))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.removeLayer(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}getObject(t){return e(this._objects.get(t))}set pickable(e){this._pickable=e}get pickable(){return this._pickable&&this.visible}add(e){this._objects.set(e.id,e),e.layer=this,this.events.emit("layerObjectAdded",e),null!=this._octree&&this._objectsAdded.push(e)}remove(e){this._objects.delete(e.id)&&(this.events.emit("layerObjectRemoved",e),e.layer=null,null!=this._octree&&(t(this._objectsAdded,e)||this._octree.remove([e])))}addMany(e){for(const t of e)this._objects.set(t.id,t),t.layer=this;this.events.emit("layerObjectsAdded",e),null!=this._octree&&this._objectsAdded.push(...e)}removeMany(e){const i=new Array;for(const t of e)this._objects.delete(t.id)&&i.push(t);if(0!==i.length&&(this.events.emit("layerObjectsRemoved",i),i.forEach((e=>e.layer=null)),null!=this._octree)){for(let e=0;e<i.length;)t(this._objectsAdded,i[e])?(i[e]=i[i.length-1],i.length-=1):++e;this._octree.remove(i)}}sync(){this.updatePolicy!==Lt.SYNC&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){null==this._octree||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return null==this._octree&&this._objects.size>50?(this._octree=new _e((e=>e.boundingVolumeWorldSpace.bounds)),this._octree.add(this._objects.values())):null!=this._octree&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded),this._objectsAdded.length=0),this._octree}invalidateSpatialQueryAccelerator(){this._octree=Te(this._octree),this._objectsAdded.length=0}get test(){}}var It,jt;!function(e){e[e.Draped=0]="Draped",e[e.Screen=1]="Screen",e[e.World=2]="World",e[e.COUNT=3]="COUNT"}(It||(It={})),function(e){e[e.Center=0]="Center",e[e.Tip=1]="Tip",e[e.COUNT=2]="COUNT"}(jt||(jt={}));class Nt extends Ye{constructor(){super(...arguments),this.space=It.Screen,this.anchor=jt.Center,this.occluder=!1,this.writeDepth=!1,this.hideOnShortSegments=!1,this.hasCap=!1,this.hasTip=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.hasOccludees=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.textureCoordinateType=D.None,this.emissionSource=C.None,this.discardInvisibleFragments=!0,this.occlusionPass=!1,this.hasVvInstancing=!0,this.hasSliceTranslatedView=!0,this.objectAndLayerIdColorInstanced=!1,this.overlayEnabled=!1,this.snowCover=!1}get draped(){return this.space===It.Draped}}function zt(e,t){const{vertex:i,attributes:r}=e;i.uniforms.add(new L("intrinsicWidth",(e=>e.width))),t.vvSize?(r.add(ve.SIZEFEATUREATTRIBUTE,"float"),i.uniforms.add(new He("vvSizeMinSize",(e=>e.vvSize.minSize)),new He("vvSizeMaxSize",(e=>e.vvSize.maxSize)),new He("vvSizeOffset",(e=>e.vvSize.offset)),new He("vvSizeFactor",(e=>e.vvSize.factor)),new He("vvSizeFallback",(e=>e.vvSize.fallback))),i.code.add(et`float getSize() {
if (isnan(sizeFeatureAttribute)) {
return vvSizeFallback.x;
}
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(r.add(ve.SIZE,"float"),i.code.add(et`float getSize(){
return intrinsicWidth * size;
}`)),t.vvOpacity?(r.add(ve.OPACITYFEATUREATTRIBUTE,"float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new P("vvOpacityValues",(e=>e.vvOpacity.values),8),new P("vvOpacityOpacities",(e=>e.vvOpacity.opacityValues),8),new L("vvOpacityFallback",(e=>e.vvOpacity.fallback))),i.code.add(et`float interpolateOpacity(float value){
if (isnan(value)) {
return vvOpacityFallback;
}
if (value <= vvOpacityValues[0]) {
return vvOpacityOpacities[0];
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
}
}
return vvOpacityOpacities[vvOpacityNumber - 1];
}
vec4 applyOpacity( vec4 color ){
return vec4(color.xyz, interpolateOpacity(opacityFeatureAttribute));
}`)):i.code.add(et`vec4 applyOpacity( vec4 color ){
return color;
}`),t.vvColor?(e.include(w,t),r.add(ve.COLORFEATUREATTRIBUTE,"float"),i.code.add(et`vec4 getColor(){
return applyOpacity(interpolateVVColor(colorFeatureAttribute));
}`)):(r.add(ve.COLOR,"vec4"),i.code.add(et`vec4 getColor(){
return applyOpacity(color);
}`))}Qe([Ke({count:It.COUNT})],Nt.prototype,"space",void 0),Qe([Ke({count:jt.COUNT})],Nt.prototype,"anchor",void 0),Qe([Ke()],Nt.prototype,"occluder",void 0),Qe([Ke()],Nt.prototype,"writeDepth",void 0),Qe([Ke()],Nt.prototype,"hideOnShortSegments",void 0),Qe([Ke()],Nt.prototype,"hasCap",void 0),Qe([Ke()],Nt.prototype,"hasTip",void 0),Qe([Ke()],Nt.prototype,"vvSize",void 0),Qe([Ke()],Nt.prototype,"vvColor",void 0),Qe([Ke()],Nt.prototype,"vvOpacity",void 0),Qe([Ke()],Nt.prototype,"hasOccludees",void 0),Qe([Ke()],Nt.prototype,"terrainDepthTest",void 0),Qe([Ke()],Nt.prototype,"cullAboveTerrain",void 0);class Ft{constructor(e,t,r){this._createTexture=e,this._parametersKey=t,this._repository=new Map,this._orphanCache=r.newCache(`procedural-texture-repository:${i()}`,(e=>e.dispose()))}destroy(){for(const{texture:e}of this._repository.values())e.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(e,t=null){const i=this._acquire(e);return this.release(t),i}release(e){if(null==e)return;const t=this._parametersKey(e),i=this._repository.get(t);if(i&&(i.refCount--,0===i.refCount)){this._repository.delete(t);const{texture:e}=i;this._orphanCache.put(t,e)}}_acquire(e){if(null==e)return null;const t=this._parametersKey(e),i=this._repository.get(t);if(i)return i.refCount++,i.texture;const r=this._orphanCache.pop(t)??this._createTexture(e),a=new Ut(r);return this._repository.set(t,a),r}}class Ut{constructor(e){this.texture=e,this.refCount=1}}function Mt(e,t){return new Ft((t=>{const{encodedData:i,textureSize:r}=function(e){const t=Wt(e),i=1/e.pixelRatio,r=Vt(e),a=Bt(e),s=(Math.floor(.5*(a-1))+.5)*i,o=[];let n=1;for(const e of t){for(let t=0;t<e;t++){const r=n*(Math.min(t,e-1-t)+.5)*i/s*.5+.5;o.push(r)}n=-n}const l=Math.round(t[0]/2),c=[...o.slice(l),...o.slice(0,l)],d=new Uint8Array(4*r);let p=0;for(const e of c)rt(e,d,p),p+=4;return{encodedData:d,textureSize:r}}(t),a=new nt;return a.internalFormat=at.RGBA,a.width=r,a.height=1,a.wrapMode=st.REPEAT,new lt(e,a,i)}),(e=>`${e.pattern.join(",")}-r${e.pixelRatio}`),t)}function Wt(e){return e.pattern.map((t=>Math.round(t*e.pixelRatio)))}function Vt(e){if(null==e)return 1;const t=Wt(e);return Math.floor(t.reduce(((e,t)=>e+t)))}function Bt(e){return Wt(e).reduce(((e,t)=>Math.max(e,t)))}const kt=Re();function Ht(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(et`float getStippleAlpha() { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const i=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:a}=e;a.include(it),t.draped||(I(r,t),r.uniforms.add(new Je("worldToScreenPerDistanceRatio",(({camera:e})=>1/e.perScreenPixelRatio))).code.add(et`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),r.code.add(et`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${et.float(Gt)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),r.code.add(et`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),r.code.add(et`
    if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
  `),j(r),r.code.add(et`float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
float segmentLengthScreenRounded = flooredRepetitions * patternLength;
float stretch = repetitions / flooredRepetitions;
vStipplePatternStretch = max(0.75, stretch);
return vec2(0.0, segmentLengthScreenRounded);
}
return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
}`),a.uniforms.add(new N("stipplePatternTexture",(e=>e.stippleTexture)),new L("stipplePatternSDFNormalizer",(e=>{return(t=e.stipplePattern)?(Math.floor(.5*(Bt(t)-1))+.5)/t.pixelRatio:1;var t})),new L("stipplePatternPixelSizeInv",(e=>1/Jt(e)))),t.stippleOffColorEnabled&&a.uniforms.add(new z("stippleOffColor",(e=>{return null==(t=e.stippleOffColor)?Ee:4===t.length?t:ct(kt,t[0],t[1],t[2],1);var t}))),a.code.add(et`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv * vLineSizeInv;
u = fract(u);
float encodedSDF = rgbaTofloat(texture(stipplePatternTexture, vec2(u, 0.5)));
float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha() {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),a.code.add(et`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${tt(!t.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function Jt(e){const t=e.stipplePattern;return t?Vt(e.stipplePattern)/t.pixelRatio:1}const Gt=.4,$t=64,Yt=32,Zt=10,Xt=.25;function qt(e,t){const i=dt(e,64,32,6.4),r=new nt;return r.internalFormat=at.RGBA,r.width=64,r.height=64,r.wrapMode=st.CLAMP_TO_EDGE,new lt(t,r,i)}function Qt(e,t){const i=e.vertex;j(i),null==i.uniforms.get("markerScale")&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",10).code.add(et`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),t.space===It.World&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new Je("perRenderPixelRatio",(e=>e.camera.perRenderPixelRatio))),i.code.add(et`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}
float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}`))}var Kt;!function(e){e[e.BUTT=0]="BUTT",e[e.SQUARE=1]="SQUARE",e[e.ROUND=2]="ROUND",e[e.COUNT=3]="COUNT"}(Kt||(Kt={}));class ei extends Ye{constructor(){super(...arguments),this.capType=Kt.BUTT,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.objectAndLayerIdColorInstanced=!1,this.textureCoordinateType=D.None,this.emissionSource=C.None,this.occlusionPass=!1,this.hasVvInstancing=!0,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}}Qe([Ke({count:Kt.COUNT})],ei.prototype,"capType",void 0),Qe([Ke()],ei.prototype,"hasPolygonOffset",void 0),Qe([Ke()],ei.prototype,"writeDepth",void 0),Qe([Ke()],ei.prototype,"draped",void 0),Qe([Ke()],ei.prototype,"stippleEnabled",void 0),Qe([Ke()],ei.prototype,"stippleOffColorEnabled",void 0),Qe([Ke()],ei.prototype,"stipplePreferContinuous",void 0),Qe([Ke()],ei.prototype,"roundJoins",void 0),Qe([Ke()],ei.prototype,"applyMarkerOffset",void 0),Qe([Ke()],ei.prototype,"vvSize",void 0),Qe([Ke()],ei.prototype,"vvColor",void 0),Qe([Ke()],ei.prototype,"vvOpacity",void 0),Qe([Ke()],ei.prototype,"falloffEnabled",void 0),Qe([Ke()],ei.prototype,"innerColorEnabled",void 0),Qe([Ke()],ei.prototype,"hasOccludees",void 0),Qe([Ke()],ei.prototype,"occluder",void 0),Qe([Ke()],ei.prototype,"terrainDepthTest",void 0),Qe([Ke()],ei.prototype,"cullAboveTerrain",void 0),Qe([Ke()],ei.prototype,"wireframe",void 0),Qe([Ke()],ei.prototype,"discardInvisibleFragments",void 0),Qe([Ke()],ei.prototype,"objectAndLayerIdColorInstanced",void 0);const ti=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new pt,{attributes:i,varyings:r,vertex:a,fragment:s}=t,{applyMarkerOffset:o,draped:n,output:l,capType:c,stippleEnabled:d,falloffEnabled:p,roundJoins:h,wireframe:m,innerColorEnabled:f}=e;s.include(F),t.include(zt,e),t.include(Ht,e),t.include(U,e),t.include(M,e);const u=o&&!n;u&&(a.uniforms.add(new L("markerScale",(e=>e.markerScale))),t.include(Qt,{space:It.World})),W(a,e),a.uniforms.add(new Ge("inverseProjectionMatrix",(e=>e.camera.inverseProjectionMatrix)),new V("nearFar",(e=>e.camera.nearFar)),new L("miterLimit",(e=>"miter"!==e.join?0:e.miterLimit)),new B("viewport",(e=>e.camera.fullViewport))),a.constants.add("LARGE_HALF_FLOAT","float",65500),i.add(ve.POSITION,"vec3"),i.add(ve.PREVIOUSDELTA,"vec4"),i.add(ve.NEXTDELTA,"vec4"),i.add(ve.LINEPARAMETERS,"vec2"),i.add(ve.U0,"float"),r.add("vColor","vec4"),r.add("vpos","vec3",{invariant:!0}),r.add("vLineDistance","float"),r.add("vLineWidth","float");const v=d;v&&r.add("vLineSizeInv","float");const g=c===Kt.ROUND,S=d&&g,T=p||S;T&&r.add("vLineDistanceNorm","float"),g&&(r.add("vSegmentSDF","float"),r.add("vReverseSegmentSDF","float")),a.code.add(et`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),a.code.add(et`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),a.code.add(et`void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
float vnp = nearFar[0] * 0.99;
if(pos.z > -nearFar[0]) {
if (!isStartVertex) {
if(prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if(next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
forwardViewPosDepth(pos.xyz);
pos = projectAndScale(pos);
next = projectAndScale(next);
prev = projectAndScale(prev);
}`),j(a),a.constants.add("aaWidth","float",d?0:1).main.add(et`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y)-3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(lineParameters.y) < 3.0;
      float lineSize = getSize();

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = lineWidth;
      ${v?et`vLineSizeInv = 1.0 / lineSize;`:""}

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);
  `),u&&a.main.add(et`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),a.main.add(et`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),(d||g)&&a.main.add(et`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${g?et`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),a.main.add(et`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),h?a.main.add(et`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${d?et`min(1.0, subdivisionFactor * ${et.float(1.5)})`:et`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):a.main.add(et`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const _=c!==Kt.BUTT;return a.main.add(et`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${_?et`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),a.main.add(et`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = sign(lineParameters.y) * pos.w;

    vLineDistance =  lineWidth * lineDistNorm;
    ${T?et`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),g&&a.main.add(et`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),d&&(n?a.uniforms.add(new Je("worldToScreenRatio",(e=>1/e.screenToPCSRatio))):a.main.add(et`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),a.main.add(et`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),n?a.main.add(et`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):a.main.add(et`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),a.uniforms.add(new L("stipplePatternPixelSize",(e=>Jt(e)))),a.main.add(et`float patternLength = lineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits *= pos.w;
vStippleDistance *= pos.w;
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),a.main.add(et`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${m&&!n?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(k,e),t.include(H,e),s.include(J),s.main.add(et`discardBySlice(vpos);
discardByTerrainDepth();`),m?s.main.add(et`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(g&&s.main.add(et`
        float sdf = min(vSegmentSDF, vReverseSegmentSDF);
        vec2 fragmentPosition = vec2(
          min(sdf, 0.0),
          vLineDistance
        ) * gl_FragCoord.w;

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${et.float(ht)}) {
          discard;
        }
      `),S?s.main.add(et`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${et.float(ht)}, stippleCoverage);
      `):s.main.add(et`float stippleAlpha = getStippleAlpha();`),l!==Ue.ObjectAndLayerIdColor&&s.main.add(et`discardByStippleAlpha(stippleAlpha, ${et.float(ht)});`),s.uniforms.add(new z("intrinsicColor",(e=>e.color))),s.main.add(et`vec4 color = intrinsicColor * vColor;`),f&&(s.uniforms.add(new z("innerColor",(e=>e.innerColor??e.color)),new L("innerWidth",((e,t)=>e.innerWidth*t.camera.pixelRatio))),s.main.add(et`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),s.main.add(et`vec4 finalColor = blendStipple(color, stippleAlpha);`),p&&(s.uniforms.add(new L("falloff",(e=>e.falloff))),s.main.add(et`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`)),d||s.main.add(et`float featherStartDistance = max(vLineWidth - 2.0, 0.0);
float value = abs(vLineDistance) * gl_FragCoord.w;
float feather = (value - featherStartDistance) / (vLineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`)),s.main.add(et`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t},ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:"Module"}));class ii extends G{constructor(e,t){super(e,t,new $(ti,(()=>Promise.resolve().then((()=>ti)))),ai),this.primitiveType=t.wireframe?ot.LINES:ot.TRIANGLE_STRIP}_makePipelineState(e,t){const{oitPass:i,output:r,hasOccludees:a,hasPolygonOffset:s}=e,o=i===Ze.NONE,n=i===Ze.FrontFace;return mt({blending:Me(r)?te(i):null,depthTest:{func:ee(i)},depthWrite:K(e),drawBuffers:Q(r,ie(i,r)),colorWrite:ft,stencilWrite:a?q:null,stencilTest:a?t?Z:X:null,polygonOffset:o||n?s?ri:null:Y})}initializePipeline(e){if(e.occluder){const t=e.hasPolygonOffset?ri:null,{output:i,hasOccludees:r}=e;this._occluderPipelineTransparent=mt({blending:ut,polygonOffset:t,depthTest:ae,depthWrite:null,colorWrite:ft,stencilWrite:null,stencilTest:r?re:null,drawBuffers:Q(i)}),this._occluderPipelineOpaque=mt({blending:ut,polygonOffset:t,depthTest:r?ae:ne,depthWrite:null,colorWrite:ft,stencilWrite:r?oe:null,stencilTest:r?se:null,drawBuffers:Q(i)}),this._occluderPipelineMaskWrite=mt({blending:null,polygonOffset:t,depthTest:ne,depthWrite:null,colorWrite:null,stencilWrite:r?q:null,stencilTest:r?Z:null,drawBuffers:Q(i)})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){if(e)return this._occludeePipeline;switch(t){case le.TRANSPARENT_OCCLUDER_MATERIAL:return this._occluderPipelineTransparent??super.getPipeline();case le.OCCLUDER_MATERIAL:return this._occluderPipelineOpaque??super.getPipeline();default:return this._occluderPipelineMaskWrite??super.getPipeline()}}}const ri={factor:0,units:-4},ai=new Map([[ve.POSITION,0],[ve.PREVIOUSDELTA,1],[ve.NEXTDELTA,2],[ve.U0,3],[ve.LINEPARAMETERS,4],[ve.COLOR,5],[ve.COLORFEATUREATTRIBUTE,5],[ve.SIZE,6],[ve.SIZEFEATUREATTRIBUTE,6],[ve.OPACITYFEATUREATTRIBUTE,7],[ve.OLIDCOLOR,8]]);var si;!function(e){e[e.LEFT_JOIN_START=-2]="LEFT_JOIN_START",e[e.LEFT_JOIN_END=-1]="LEFT_JOIN_END",e[e.LEFT_CAP_START=-4]="LEFT_CAP_START",e[e.LEFT_CAP_END=-5]="LEFT_CAP_END",e[e.RIGHT_JOIN_START=2]="RIGHT_JOIN_START",e[e.RIGHT_JOIN_END=1]="RIGHT_JOIN_END",e[e.RIGHT_CAP_START=4]="RIGHT_CAP_START",e[e.RIGHT_CAP_END=5]="RIGHT_CAP_END"}(si||(si={}));class oi extends Xe{constructor(e){super(e,li),this._configuration=new ei,this.vertexAttributeLocations=ai,this.produces=new Map([[le.OPAQUE_MATERIAL,e=>We(e)||Me(e)&&this.parameters.renderOccluded===qe.OccludeAndTransparentStencil],[le.OPAQUE_MATERIAL_WITHOUT_NORMALS,e=>Ve(e)],[le.OCCLUDER_MATERIAL,e=>Be(e)&&this.parameters.renderOccluded===qe.OccludeAndTransparentStencil],[le.TRANSPARENT_OCCLUDER_MATERIAL,e=>Be(e)&&this.parameters.renderOccluded===qe.OccludeAndTransparentStencil],[le.TRANSPARENT_MATERIAL,e=>Me(e)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==qe.OccludeAndTransparentStencil],[le.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,e=>Me(e)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==qe.OccludeAndTransparentStencil],[le.DRAPED_MATERIAL,e=>ke(e)]])}getConfiguration(e,t){super.getConfiguration(e,t,this._configuration),this._configuration.oitPass=t.oitPass,this._configuration.draped=t.slot===le.DRAPED_MATERIAL;const i=null!=this.parameters.stipplePattern&&e!==Ue.Highlight;var r;return this._configuration.stippleEnabled=i,this._configuration.stippleOffColorEnabled=i&&null!=this.parameters.stippleOffColor,this._configuration.stipplePreferContinuous=i&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins="round"===this.parameters.join,this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=null!=this.parameters.markerParameters&&(r=this.parameters.markerParameters).anchor===jt.Tip&&r.hideOnShortSegments&&"begin-end"===r.placement&&r.worldSpace,this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&null!=this.parameters.innerColor,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=t.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===qe.OccludeAndTransparentStencil,this._configuration.terrainDepthTest=t.terrainDepthTest&&Me(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration}get visible(){return this.parameters.color[3]>=ht||null!=this.parameters.stipplePattern&&(this.parameters.stippleOffColor?.[3]??0)>ht}intersectDraped({attributes:e,screenToWorldRatio:t},i,r,a,s){if(!i.options.selectionMode)return;const o=e.get(ve.SIZE);let n=this.parameters.width;if(this.parameters.vvSize){const t=e.get(ve.SIZEFEATUREATTRIBUTE).data[0];Number.isNaN(t)?n*=this.parameters.vvSize.fallback[0]:n*=be(this.parameters.vvSize.offset[0]+t*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else o&&(n*=o.data[0]);const l=r[0],c=r[1],d=(n/2+4)*t;let p=Number.MAX_VALUE,h=0;const m=e.get(ve.POSITION).data,f=pi(this.parameters,e)?m.length-2:m.length-5;for(let e=0;e<f;e+=3){const t=m[e],i=m[e+1],r=(e+3)%m.length,a=l-t,s=c-i,o=m[r]-t,n=m[r+1]-i,d=be((o*a+n*s)/(o*o+n*n),0,1),f=o*d-a,u=n*d-s,v=f*f+u*u;v<p&&(p=v,h=e/3)}p<d*d&&a(s.distance,s.normal,h)}intersect(e,t,i,r,a,s){const{options:o,camera:n,rayBegin:l,rayEnd:c}=i;if(!o.selectionMode||!e.visible||!n)return;if(!me(t))return void ye.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const m=e.attributes,T=m.get(ve.POSITION).data;let _=this.parameters.width;if(this.parameters.vvSize){const e=m.get(ve.SIZEFEATUREATTRIBUTE).data[0];Number.isNaN(e)||(_*=be(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else m.has(ve.SIZE)&&(_*=m.get(ve.SIZE).data[0]);const y=vi;Oe(y,i.point);const b=_*n.pixelRatio/2+4*n.pixelRatio;p(Ri[0],y[0]-b,y[1]+b,0),p(Ri[1],y[0]+b,y[1]+b,0),p(Ri[2],y[0]+b,y[1]-b,0),p(Ri[3],y[0]-b,y[1]-b,0);for(let e=0;e<4;e++)if(!n.unprojectFromRenderScreen(Ri[e],xi[e]))return;je(n.eye,xi[0],xi[1],Di),je(n.eye,xi[1],xi[2],Ci),je(n.eye,xi[2],xi[3],Li),je(n.eye,xi[3],xi[0],Pi);let A=Number.MAX_VALUE,O=0;const E=pi(this.parameters,m)?T.length-2:T.length-5;for(let e=0;e<E;e+=3){hi[0]=T[e]+t[12],hi[1]=T[e+1]+t[13],hi[2]=T[e+2]+t[14];const i=(e+3)%T.length;if(mi[0]=T[i]+t[12],mi[1]=T[i+1]+t[13],mi[2]=T[i+2]+t[14],Ne(Di,hi)<0&&Ne(Di,mi)<0||Ne(Ci,hi)<0&&Ne(Ci,mi)<0||Ne(Li,hi)<0&&Ne(Li,mi)<0||Ne(Pi,hi)<0&&Ne(Pi,mi)<0)continue;if(n.projectToRenderScreen(hi,gi),n.projectToRenderScreen(mi,Si),gi[2]<0&&Si[2]>0){u(fi,hi,mi);const e=n.frustum,t=-Ne(e[De.NEAR],hi)/v(fi,ze(e[De.NEAR]));g(fi,fi,t),h(hi,hi,fi),n.projectToRenderScreen(hi,gi)}else if(gi[2]>0&&Si[2]<0){u(fi,mi,hi);const e=n.frustum,t=-Ne(e[De.NEAR],mi)/v(fi,ze(e[De.NEAR]));g(fi,fi,t),h(mi,mi,fi),n.projectToRenderScreen(mi,Si)}else if(gi[2]<0&&Si[2]<0)continue;gi[2]=0,Si[2]=0;const r=Le(Pe(gi,Si,yi),y);r<A&&(A=r,f(Ti,hi),f(_i,mi),O=e/3)}if(A<b*b){let e=Number.MAX_VALUE;if(we(Pe(Ti,_i,yi),Pe(l,c,bi),ui)){u(ui,ui,l);const t=S(ui);g(ui,ui,1/t),e=t/d(l,c)}s(e,ui,O)}}get _layout(){const e=Fe().vec3f(ve.POSITION).vec4f16(ve.PREVIOUSDELTA).vec4f16(ve.NEXTDELTA).f32(ve.U0).vec2f16(ve.LINEPARAMETERS);return this.parameters.vvColor?e.f32(ve.COLORFEATUREATTRIBUTE):e.vec4u8(ve.COLOR,{glNormalized:!0}),this.parameters.vvSize?e.f32(ve.SIZEFEATUREATTRIBUTE):e.f32(ve.SIZE),this.parameters.vvOpacity&&e.f32(ve.OPACITYFEATUREATTRIBUTE),$e()&&e.vec4u8(ve.OLIDCOLOR),e}createBufferWriter(){return new ci(this._layout,this.parameters)}createGLMaterial(e){return new ni(e)}validateParameters(e){"miter"!==e.join&&(e.miterLimit=0),null!=e.markerParameters&&(e.markerScale=e.markerParameters.width/e.width)}}class ni extends de{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){const t=this._material.parameters.stipplePattern;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(ii,e)}}class li extends ce{constructor(){super(...arguments),this.width=0,this.color=xe,this.join="miter",this.cap=Kt.BUTT,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1}get transparent(){return this.color[3]<1||null!=this.stipplePattern&&(this.stippleOffColor?.[3]??0)<1}}class ci{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t;const i=t.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=i;break;case"round":this.numJoinSubdivisions=1+i}}_isClosed(e){return pi(this._parameters,e)}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){const t=e.get(ve.POSITION).indices.length/2+1,i=this._isClosed(e);let r=i?2:4;return r+=((i?t:t-1)-(i?0:1))*(2*this.numJoinSubdivisions+4),r+=2,this._parameters.wireframe&&(r=2+4*(r-2)),r}write(e,t,i,r,a,s){const o=i.get(ve.POSITION),n=o.indices,l=o.data.length/3,h=i.get(ve.DISTANCETOSTART)?.data;n&&n.length!==2*(l-1)&&console.warn("RibbonLineMaterial does not support indices");const m=(this.vertexBufferLayout.fields.has(ve.SIZEFEATUREATTRIBUTE)?i.get(ve.SIZEFEATUREATTRIBUTE)?.data[0]:i.get(ve.SIZE)?.data[0])??1;let u=[1,1,1,1],v=0;const g=this.vertexBufferLayout.fields.has(ve.COLORFEATUREATTRIBUTE);g?v=i.get(ve.COLORFEATUREATTRIBUTE).data[0]:i.has(ve.COLOR)&&(u=i.get(ve.COLOR).data);const S=this.vertexBufferLayout.fields.has(ve.OPACITYFEATUREATTRIBUTE),T=S?i.get(ve.OPACITYFEATUREATTRIBUTE).data[0]:0,_=new Float32Array(a.buffer),y=fe(a.buffer),b=new Uint8Array(a.buffer),A=this.vertexBufferLayout.stride/4;let O=s*A;const E=O;let R=0;const x=h?(e,t,i)=>R=h[i]:(e,t,i)=>R+=d(e,t),D=_.BYTES_PER_ELEMENT/y.BYTES_PER_ELEMENT,C=4/D,L=(e,t,i,a,s,o,n)=>{_[O++]=t[0],_[O++]=t[1],_[O++]=t[2],pe(e,t,y,O*D),O+=C,pe(i,t,y,O*D),O+=C,_[O++]=n;let l=O*D;if(y[l++]=a,y[l++]=s,O=Math.ceil(l/D),g)_[O]=v;else{const e=Math.min(4*o,u.length-4),t=4*O;b[t]=255*u[e],b[t+1]=255*u[e+1],b[t+2]=255*u[e+2],b[t+3]=255*u[e+3]}if(O++,_[O++]=m,S&&(_[O++]=T),$e()){let e=4*O;r?(b[e++]=r[0],b[e++]=r[1],b[e++]=r[2],b[e++]=r[3]):(b[e++]=0,b[e++]=0,b[e++]=0,b[e++]=0),O=Math.ceil(.25*e)}};O+=A,p(Oi,o.data[0],o.data[1],o.data[2]),e&&c(Oi,Oi,e);const P=this._isClosed(i);if(P){const t=o.data.length-3;p(Ai,o.data[t],o.data[t+1],o.data[t+2]),e&&c(Ai,Ai,e)}else p(Ei,o.data[3],o.data[4],o.data[5]),e&&c(Ei,Ei,e),L(Oi,Oi,Ei,1,si.LEFT_CAP_START,0,0),L(Oi,Oi,Ei,1,si.RIGHT_CAP_START,0,0),f(Ai,Oi),f(Oi,Ei);const w=P?0:1,I=P?l:l-1;for(let t=w;t<I;t++){const i=(t+1)%l*3;p(Ei,o.data[i],o.data[i+1],o.data[i+2]),e&&c(Ei,Ei,e),x(Ai,Oi,t),L(Ai,Oi,Ei,0,si.LEFT_JOIN_END,t,R),L(Ai,Oi,Ei,0,si.RIGHT_JOIN_END,t,R);const r=this.numJoinSubdivisions;for(let e=0;e<r;++e){const i=(e+1)/(r+1);L(Ai,Oi,Ei,i,si.LEFT_JOIN_END,t,R),L(Ai,Oi,Ei,i,si.RIGHT_JOIN_END,t,R)}L(Ai,Oi,Ei,1,si.LEFT_JOIN_START,t,R),L(Ai,Oi,Ei,1,si.RIGHT_JOIN_START,t,R),f(Ai,Oi),f(Oi,Ei)}return P?(p(Ei,o.data[3],o.data[4],o.data[5]),e&&c(Ei,Ei,e),R=x(Ai,Oi,I),L(Ai,Oi,Ei,0,si.LEFT_JOIN_END,w,R),L(Ai,Oi,Ei,0,si.RIGHT_JOIN_END,w,R)):(R=x(Ai,Oi,I),L(Ai,Oi,Oi,0,si.LEFT_CAP_END,I,R),L(Ai,Oi,Oi,0,si.RIGHT_CAP_END,I,R)),di(_,E+A,_,E,A),O=di(_,O-A,_,O,A),this._parameters.wireframe&&this._addWireframeVertices(a,E,O,A),null}_addWireframeVertices(e,t,i,r){const a=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),s=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,i-t);let o=0;const n=e=>o=di(s,e,a,o,r);for(let e=0;e<s.length-1;e+=2*r)n(e),n(e+2*r),n(e+1*r),n(e+2*r),n(e+1*r),n(e+3*r)}}function di(e,t,i,r,a){for(let s=0;s<a;s++)i[r++]=e[t++];return r}function pi(e,t){return!!e.isClosed&&t.get(ve.POSITION).indices.length>2}const hi=T(),mi=T(),fi=T(),ui=T(),vi=T(),gi=Ae(),Si=Ae(),Ti=T(),_i=T(),yi=Ce(),bi=Ce(),Ai=T(),Oi=T(),Ei=T(),Ri=[Ae(),Ae(),Ae(),Ae()],xi=[T(),T(),T(),T()],Di=Ie(),Ci=Ie(),Li=Ie(),Pi=Ie();export{At as B,Kt as C,It as L,Qt as M,yt as O,Ft as P,oi as R,Lt as U,wt as W,zt as a,jt as b,Yt as c,Xt as d,Nt as e,St as f,Zt as g,qt as h,Mt as i,$t as m};
