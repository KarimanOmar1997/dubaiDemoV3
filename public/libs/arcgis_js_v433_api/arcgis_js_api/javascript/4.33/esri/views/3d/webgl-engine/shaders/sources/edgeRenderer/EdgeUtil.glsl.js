// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../collections/Component/Material/shader/ComponentData.glsl","../../../core/shaderLibrary/attributes/NormalAttribute.glsl","../../../core/shaderLibrary/util/DoublePrecision.glsl","../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl","../../../core/shaderModules/Float3DrawUniform","../../../core/shaderModules/Float3PassUniform","../../../core/shaderModules/glsl","../../../core/shaderModules/Matrix3DrawUniform","../../../core/shaderModules/Matrix3PassUniform","../../../core/shaderModules/Matrix4BindUniform","../../../core/shaderModules/Texture2DDrawUniform","../../../lib/VertexAttribute"],(function(o,e,r,t,l,a,n,d,i,s,m,c,f){"use strict";var u,v;o.EdgeType=void 0,(u=o.EdgeType||(o.EdgeType={}))[u.Solid=0]="Solid",u[u.Sketch=1]="Sketch",u[u.Mixed=2]="Mixed",u[u.COUNT=3]="COUNT",o.EdgeSilhouette=void 0,(v=o.EdgeSilhouette||(o.EdgeSilhouette={}))[v.REGULAR=0]="REGULAR",v[v.SILHOUETTE=1]="SILHOUETTE",o.EdgeUtil=function(o,u){const{vertex:v}=o;v.include(l.RgbaFloatEncoding),o.include(r.NormalAttribute,u);const{silhouette:x,legacy:w,spherical:g}=u;v.uniforms.add(new c.Texture2DDrawUniform("componentDataTex",(o=>o.componentDataTexture))),o.attributes.add(f.VertexAttribute.COMPONENTINDEX,"float"),v.constants.add("lineWidthFractionFactor","float",8),v.constants.add("extensionLengthOffset","float",128),v.code.add(d.glsl`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = ${d.glsl.float(3)}  * componentIndex + fieldOffset;
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
      vec2 colorIndex = _componentTextureCoords(componentIndex, ${d.glsl.float(0)});
      vec2 otherIndex = _componentTextureCoords(componentIndex, ${d.glsl.float(1)});
      vec2 verticalOffsetIndex = _componentTextureCoords(float(componentIndex), ${d.glsl.float(2)} );
      vec3 normal = normalModel();
      vec3 normal2 = ${x?d.glsl`decompressNormal(normal2Compressed)`:d.glsl`normal`};

      vec4 colorValue = texelFetch(componentDataTex, ivec2(colorIndex), 0);
      vec4 otherValue = texelFetch(componentDataTex, ivec2(otherIndex), 0);
      float verticalOffset = uninterpolatedRGBAToFloat(texelFetch(componentDataTex, ivec2(verticalOffsetIndex), 0)) * ${d.glsl.float(e.maxElevationOffset)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        normal, normal2,
        otherValue.x * (255.0 / ${d.glsl.float(8)} ),
        otherValue.y * 255.0 - ${d.glsl.float(128)},
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),w?v.code.add(d.glsl`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(v.uniforms.add(new i.Matrix3DrawUniform("transformNormalGlobalFromModel",(o=>o.transformNormalGlobalFromModel))),v.code.add(d.glsl`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),x?(o.attributes.add(f.VertexAttribute.NORMAL2COMPRESSED,"vec2"),v.code.add(d.glsl`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):v.code.add(d.glsl`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),w?v.code.add(d.glsl`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(v.include(t.DoublePrecision,u),v.uniforms.add(new s.Matrix3PassUniform("transformViewFromCameraRelativeRS",(o=>o.transformViewFromCameraRelativeRS)),new i.Matrix3DrawUniform("transformWorldFromModelRS",(o=>o.transformWorldFromModelRS)),new a.Float3DrawUniform("transformWorldFromModelTL",(o=>o.transformWorldFromModelTL)),new a.Float3DrawUniform("transformWorldFromModelTH",(o=>o.transformWorldFromModelTH)),new n.Float3PassUniform("transformWorldFromViewTL",(o=>o.transformWorldFromViewTL)),new n.Float3PassUniform("transformWorldFromViewTH",(o=>o.transformWorldFromViewTH))),v.code.add(d.glsl`
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
          vec3 vUp = ${g?"normalize(transformWorldFromModelTL + rotatedModelPosition);":"vec3(0.0, 0.0, 1.0);"}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),v.uniforms.add(new m.Matrix4BindUniform("transformProjFromView",(o=>o.camera.projectionMatrix))).code.add(d.glsl`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),v.code.add(d.glsl`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)},o.usesSketchLogic=function(e){return e===o.EdgeType.Sketch||e===o.EdgeType.Mixed},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));