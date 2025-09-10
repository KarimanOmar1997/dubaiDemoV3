// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder"],(function(e,t,i,r,a,o){"use strict";function s(e){const s=new o.ShaderBuilder,{vertex:l,fragment:d,attributes:u,varyings:n}=s;t.addProjViewLocalOrigin(l,e);const{isAttributeDriven:c,usesHalfFloat:f}=e;return u.add(a.VertexAttribute.POSITION,"vec3"),u.add(a.VertexAttribute.UV0,"vec2"),c&&(u.add(a.VertexAttribute.FEATUREATTRIBUTE,"float"),n.add("attributeValue","float")),f&&d.constants.add("compressionFactor","float",.25),n.add("unitCirclePos","vec2"),l.uniforms.add(new i.FloatPassUniform("radius",(({resolutionForScale:e,searchRadius:t},{camera:i,screenToWorldRatio:r,overlayStretch:a})=>2*t*(0===e?1:e/r)*i.pixelRatio/i.fullViewport[2]/a))),l.main.add(r.glsl`
    unitCirclePos = uv0;

    vec4 posProj = proj * (view * vec4(${a.VertexAttribute.POSITION}, 1.0));
    vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

    ${c?r.glsl`attributeValue = ${a.VertexAttribute.FEATUREATTRIBUTE};`:""}
    gl_Position = posProj + quadOffset;
  `),d.main.add(r.glsl`
    float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
    if (radiusRatioSquared > 1.0) {
      fragColor = vec4(0.0);
    }
    else {
      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${c?r.glsl` * attributeValue`:""} ${f?r.glsl` * compressionFactor`:""};
      fragColor = vec4(density);
    }
  `),s}const l=Object.freeze(Object.defineProperty({__proto__:null,build:s},Symbol.toStringTag,{value:"Module"}));e.HeatmapDensity=l,e.build=s}));