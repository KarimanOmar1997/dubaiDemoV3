/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as e}from"./maybe.js";import{isPromiseLike as t}from"../core/promiseUtils.js";import{a as r}from"./basicInterfaces.js";import{i as s,c as i,j as a}from"./Matrix4PassUniform.js";import{N as c}from"./ShaderTechniqueConfiguration.js";import{s as o}from"./vec4.js";import{c as l}from"./vec4f64.js";import{s as n}from"./vec3.js";import{c as u}from"./vec3f64.js";import{a as f}from"./Matrix4BindUniform.js";import{g as d}from"./glsl.js";class m extends s{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textures=e.textures,this.updateTexture(e.textureId),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){super.dispose(),this._texture=e(this._texture),this._textureNormal=e(this._textureNormal),this._textureEmissive=e(this._textureEmissive),this._textureOcclusion=e(this._textureOcclusion),this._textureMetallicRoughness=e(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?r.LOADED:r.LOADING}get textureBindParameters(){return new p(this._texture?.glTexture??null,this._textureNormal?.glTexture??null,this._textureEmissive?.glTexture??null,this._textureOcclusion?.glTexture??null,this._textureMetallicRoughness?.glTexture??null)}updateTexture(t){null!=this._texture&&t===this._texture.id||(this._texture=e(this._texture),this._acquire(t,(e=>this._texture=e)))}_acquire(r,s){if(null==r)return void s(null);const i=this._textures.acquire(r);if(t(i))return++this._numLoading,void i.then((t=>{if(this._disposed)return e(t),void s(null);s(t)})).finally((()=>--this._numLoading));s(i)}}class v extends c{constructor(e=null){super(),this.textureEmissive=e}}class p extends v{constructor(e,t,r,s,i,a,c){super(r),this.texture=e,this.textureNormal=t,this.textureOcclusion=s,this.textureMetallicRoughness=i,this.scale=a,this.normalTextureTransformMatrix=c}}function x(e){e.vertex.code.add(d`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(d`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(d`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(d`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(d`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(d`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function h(e){e.uniforms.add(new f("screenSizePerspective",(e=>S(e.screenSizePerspective))))}function g(e){e.uniforms.add(new f("screenSizePerspectiveAlignment",(e=>S(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))}function S(e){return n(_,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}const _=u();function z(e,t){const r=e.vertex;t.hasVerticalOffset?(O(r),t.hasScreenSizePerspective&&(e.include(x),g(r),i(e.vertex,t)),r.code.add(d`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?d`vec3 worldNormal = normalize(worldPos + localOrigin);`:d`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?d`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:d`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):r.code.add(d`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const P=l();function O(e){e.uniforms.add(new a("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:s,screenLength:i}=e.verticalOffset,a=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),c=t.camera.pixelRatio||1;return o(P,i*c,a,r,s)})))}export{p as G,x as S,z as V,O as a,g as b,h as c,m as d};
