/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import o from"../Color.js";import{l as e}from"../core/lang.js";import{p as t}from"./screenUtils.js";import{f as r,b as n}from"./vec4f64.js";import{p as a}from"./floatRGBA.js";import{D as l,a as d}from"./NormalAttribute.glsl.js";import{S as c}from"./ShaderOutput.js";import{F as i,R as s}from"./Float4DrawUniform.js";import{g as m,I as f}from"./glsl.js";import{B as x}from"./BindType.js";import{U as u,T as v,o as p,b as C,c as w,a as T,M}from"./Matrix4BindUniform.js";import{V as h}from"./VertexAttribute.js";import{M as O,D as F}from"./Matrix3DrawUniform.js";var g,E;!function(o){o[o.TRANSPARENT=0]="TRANSPARENT",o[o.OPAQUE=1]="OPAQUE"}(g||(g={}));class I extends u{constructor(o,e){super(o,"int",x.Draw,((t,r,n)=>t.setUniform1i(o,e(r,n))))}}!function(o){o[o.Uniform=0]="Uniform",o[o.Varying=1]="Varying",o[o.COUNT=2]="COUNT"}(E||(E={}));const y=429496.7296;function S(o,e){a(o/y*.5+.5,e)}function P(o,t){switch(t.componentData){case E.Varying:return function(o,e){const{vertex:t,fragment:r}=o;t.include(s),t.uniforms.add(new v("componentColorTex",(o=>o.componentParameters.texture.texture))),o.attributes.add(h.COMPONENTINDEX,"float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");const n=e.output===c.ObjectAndLayerIdColor;n&&o.varyings.add("vObjectAndLayerIdColor","vec4"),o.include(l),t.constants.add("stride","float",p()?3:2),t.code.add(m`vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
float index = componentIndex * stride + typeOffset;
float texSize = float(textureSize(componentColorTex, 0).x);
float coordX = mod(index, texSize);
float coordY = floor(index / texSize);
return vec2(coordX, coordY) + 0.5;
}`),t.code.add(m`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);
    return texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
   }

  float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);
    vec4 encodedElevation = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
    return uninterpolatedRGBAToFloat(encodedElevation) * ${m.float(y)};
  }

  ${n?m`
          void forwardObjectAndLayerIdColor() {
            vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);
            vObjectAndLayerIdColor = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
          }`:m`void forwardObjectAndLayerIdColor() {}`}

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
`),r.code.add(m`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${n?m`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}(o,t);case E.Uniform:return function(o,e){const{vertex:t,fragment:r}=o;o.varyings.add("vExternalColor","vec4"),t.uniforms.add(new i("externalColor",(o=>o.componentParameters.externalColor))).code.add(m`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);const n=e.output===c.ObjectAndLayerIdColor;r.uniforms.add(new I("externalColorMixMode",(o=>o.componentParameters.externalColorMixMode))).code.add(m`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${f(n,"fragColor = vec4(0, 0, 0, 0);")}
    }
  `)}(o,t);case E.COUNT:return;default:e(t.componentData)}}function L(o,e){const{vertex:t}=o;t.include(s),o.include(d,e);const{silhouette:r,legacy:n,spherical:a}=e;t.uniforms.add(new v("componentDataTex",(o=>o.componentDataTexture))),o.attributes.add(h.COMPONENTINDEX,"float"),t.constants.add("lineWidthFractionFactor","float",8),t.constants.add("extensionLengthOffset","float",128),t.code.add(m`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = ${m.float(3)}  * componentIndex + fieldOffset;
      float texSize = float(textureSize(componentDataTex, 0).x);
      float colIndex = mod(fieldIndex, texSize);
      float rowIndex = floor(fieldIndex / texSize);

      return vec2(colIndex, rowIndex) + 0.5;
    }

    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec2 colorIndex = _componentTextureCoords(componentIndex, ${m.float(0)});
      vec2 otherIndex = _componentTextureCoords(componentIndex, ${m.float(1)});
      vec2 verticalOffsetIndex = _componentTextureCoords(float(componentIndex), ${m.float(2)} );
      vec3 normal = normalModel();
      vec3 normal2 = ${r?m`decompressNormal(normal2Compressed)`:m`normal`};

      vec4 colorValue = texelFetch(componentDataTex, ivec2(colorIndex), 0);
      vec4 otherValue = texelFetch(componentDataTex, ivec2(otherIndex), 0);
      float verticalOffset = uninterpolatedRGBAToFloat(texelFetch(componentDataTex, ivec2(verticalOffsetIndex), 0)) * ${m.float(y)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        normal, normal2,
        otherValue.x * (255.0 / ${m.float(8)} ),
        otherValue.y * 255.0 - ${m.float(128)},
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),n?t.code.add(m`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(t.uniforms.add(new O("transformNormalGlobalFromModel",(o=>o.transformNormalGlobalFromModel))),t.code.add(m`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),r?(o.attributes.add(h.NORMAL2COMPRESSED,"vec2"),t.code.add(m`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):t.code.add(m`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),n?t.code.add(m`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(t.include(F,e),t.uniforms.add(new C("transformViewFromCameraRelativeRS",(o=>o.transformViewFromCameraRelativeRS)),new O("transformWorldFromModelRS",(o=>o.transformWorldFromModelRS)),new w("transformWorldFromModelTL",(o=>o.transformWorldFromModelTL)),new w("transformWorldFromModelTH",(o=>o.transformWorldFromModelTH)),new T("transformWorldFromViewTL",(o=>o.transformWorldFromViewTL)),new T("transformWorldFromViewTH",(o=>o.transformWorldFromViewTH))),t.code.add(m`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${a?"normalize(transformWorldFromModelTL + rotatedModelPosition);":"vec3(0.0, 0.0, 1.0);"}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),t.uniforms.add(new M("transformProjFromView",(o=>o.camera.projectionMatrix))).code.add(m`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),t.code.add(m`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function b(o){return o===V.Sketch||o===V.Mixed}var V,A;function j(o){return o&&o.enabled&&(function(o){return"extrude"===o.type}(o)||function(o){return"fill"===o.type}(o))&&null!=o.edges}function N(o,e){return R(function(o){return o&&o.enabled&&o.edges||null}(o),e)}function R(e,a){if(null==e)return null;const l=null!=e.color?n(o.toUnitRGBA(e.color)):r(0,0,0,0),d=t(e.size),c=t(e.extensionLength);switch(e.type){case"solid":return U({color:l,size:d,extensionLength:c,...a});case"sketch":return function(o){return{...W,...o,type:V.Sketch}}({color:l,size:d,extensionLength:c,...a});default:return}}function U(o){return{...D,...o,type:V.Solid}}!function(o){o[o.Solid=0]="Solid",o[o.Sketch=1]="Sketch",o[o.Mixed=2]="Mixed",o[o.COUNT=3]="COUNT"}(V||(V={})),function(o){o[o.REGULAR=0]="REGULAR",o[o.SILHOUETTE=1]="SILHOUETTE"}(A||(A={}));const D={color:r(0,0,0,.2),size:1,extensionLength:0,opacity:1,objectTransparency:g.OPAQUE,hasSlicePlane:!1},W={color:r(0,0,0,.2),size:1,extensionLength:0,opacity:1,objectTransparency:g.OPAQUE,hasSlicePlane:!1};export{E as C,V as E,g as T,R as a,N as b,U as c,L as d,A as e,S as f,P as g,j as h,b as u};
