// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../../core/compilerUtils","../../../../../../../core/floatRGBA","./DecodeSymbolColor.glsl","../../../../core/shaderLibrary/ShaderOutput","../../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl","../../../../core/shaderModules/Float4DrawUniform","../../../../core/shaderModules/glsl","../../../../core/shaderModules/IntegerDrawUniform","../../../../core/shaderModules/Texture2DDrawUniform","../../../../effects/geometry/olidUtils","../../../../lib/VertexAttribute"],(function(o,e,t,r,n,a,l,d,c,i,C,s){"use strict";var x;o.ComponentDataType=void 0,(x=o.ComponentDataType||(o.ComponentDataType={}))[x.Uniform=0]="Uniform",x[x.Varying=1]="Varying",x[x.COUNT=2]="COUNT";const u=429496.7296;o.ComponentData=function(t,x){switch(x.componentData){case o.ComponentDataType.Varying:return function(o,e){const{vertex:t,fragment:l}=o;t.include(a.RgbaFloatEncoding),t.uniforms.add(new i.Texture2DDrawUniform("componentColorTex",(o=>o.componentParameters.texture.texture))),o.attributes.add(s.VertexAttribute.COMPONENTINDEX,"float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");const c=e.output===n.ShaderOutput.ObjectAndLayerIdColor;c&&o.varyings.add("vObjectAndLayerIdColor","vec4"),o.include(r.DecodeSymbolColor),t.constants.add("stride","float",C.olidEnabled()?3:2),t.code.add(d.glsl`vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
float index = componentIndex * stride + typeOffset;
float texSize = float(textureSize(componentColorTex, 0).x);
float coordX = mod(index, texSize);
float coordY = floor(index / texSize);
return vec2(coordX, coordY) + 0.5;
}`),t.code.add(d.glsl`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);
    return texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
   }

  float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);
    vec4 encodedElevation = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
    return uninterpolatedRGBAToFloat(encodedElevation) * ${d.glsl.float(u)};
  }

  ${c?d.glsl`
          void forwardObjectAndLayerIdColor() {
            vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);
            vObjectAndLayerIdColor = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
          }`:d.glsl`void forwardObjectAndLayerIdColor() {}`}

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor = _readComponentColor() * 255.0;

    float shadowFlag = mod(componentColor.b * 255.0, 2.0);
    componentColor.b -= shadowFlag;
    castShadows = shadowFlag >= 1.0;

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),l.code.add(d.glsl`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${c?d.glsl`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}(t,x);case o.ComponentDataType.Uniform:return function(o,e){const{vertex:t,fragment:r}=o;o.varyings.add("vExternalColor","vec4"),t.uniforms.add(new l.Float4DrawUniform("externalColor",(o=>o.componentParameters.externalColor))).code.add(d.glsl`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);const a=e.output===n.ShaderOutput.ObjectAndLayerIdColor;r.uniforms.add(new c.IntegerDrawUniform("externalColorMixMode",(o=>o.componentParameters.externalColorMixMode))).code.add(d.glsl`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${d.If(a,"fragColor = vec4(0, 0, 0, 0);")}
    }
  `)}(t,x);case o.ComponentDataType.COUNT:return;default:e.neverReached(x.componentData)}},o.encodeElevationOffset=function(o,e){t.packFloatRGBA(o/u*.5+.5,e)},o.maxElevationOffset=u,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));