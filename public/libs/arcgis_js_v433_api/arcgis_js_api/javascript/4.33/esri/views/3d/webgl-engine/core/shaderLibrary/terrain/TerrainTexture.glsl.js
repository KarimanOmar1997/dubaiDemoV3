// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../shading/ReadShadowMap.glsl","./BackgroundGrid.glsl","./TileBlendInput","../../shaderModules/glsl","../../../../../webgl/Uniform"],(function(e,t,r,o,n,c){"use strict";class s extends t.ReadShadowMapPassParameters{constructor(){super(...arguments),this.overlayOpacity=1}}class a extends c.Uniform{constructor(e){super(e,"float")}}class d extends c.Uniform{constructor(e){super(e,"vec3")}}class l extends c.Uniform{constructor(e){super(e,"vec4")}}class i extends c.Uniform{constructor(e){super(e,"sampler2D")}}e.Float3Uniform=d,e.OverlayTerrainPassParameters=s,e.TerrainTexture=function(e,t){const{vertex:c,fragment:s,varyings:u}=e;u.add("vtc","vec2"),c.uniforms.add(new l("texOffsetAndScale")),s.uniforms.add(new i("tex")),s.uniforms.add(new d("textureOpacities"));const x=t.textureFadingEnabled&&!t.renderOccluded;x&&(c.uniforms.add(new l("nextTexOffsetAndScale")),u.add("nvtc","vec2"),s.uniforms.add(new i("texNext")),s.uniforms.add(new d("nextTexOpacities")),s.uniforms.add(new a("fadeFactor")));const f=t.tileBlendInput===o.TileBlendInput.ColorComposite,v=t.tileBlendInput===o.TileBlendInput.GridComposite;v&&s.include(r.BackgroundGrid),f&&s.uniforms.add(new d("backgroundColor")),c.code.add(n.glsl`
  void forwardTextureCoordinatesWithTransform(in vec2 uv) {
    vtc = texOffsetAndScale.xy + uv * texOffsetAndScale.zw;
    ${n.If(x,"nvtc = nextTexOffsetAndScale.xy + uv * nextTexOffsetAndScale.zw;")}
  }`),s.code.add(n.glsl`
    vec4 getColor(vec4 color, vec2 uv, vec3 opacities) {
      ${n.If(v||f,n.glsl`if (opacities.y <= 0.0) {
           return color * opacities.z * opacities.x;
         }
         vec4 bg = vec4(${f?n.glsl`backgroundColor`:n.glsl`gridColor(uv)`} * opacities.y, opacities.y);
         vec4 layer = color * opacities.z;
         return (bg * (1.0 - layer.a) + layer) * opacities.x;`,"return color;")}
    }`),x?s.code.add(n.glsl`vec4 getTileColor() {
vec4 color = getColor(texture(tex, vtc), vtc, textureOpacities);
if (fadeFactor >= 1.0) {
return color;
}
vec4 nextColor = getColor(texture(texNext, nvtc), nvtc, nextTexOpacities);
return mix(nextColor, color, fadeFactor);
}`):s.code.add(n.glsl`vec4 getTileColor() {
return getColor(texture(tex, vtc), vtc, textureOpacities);
}`)},e.Texture2DUniform=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));