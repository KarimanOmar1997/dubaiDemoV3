// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec4f64","../geometry/support/Ellipsoid","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/AlignPixel.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUD.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUDOcclusionPass.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUDVisibility.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ScreenSizePerspective.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4DrawUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/lib/OITPass","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],(function(e,o,l,i,r,t,a,s,n,c,d,u,g,f,p,v,b,h,m,x,C,w,P,S,z,y,A,O,F,U,$){"use strict";function I(e){const l=new U.ShaderBuilder,{signedDistanceFieldEnabled:I,occlusionTestEnabled:B,horizonCullingEnabled:E,pixelSnappingEnabled:L,hasScreenSizePerspective:H,debugDrawLabelBorder:M,vvSize:R,vvColor:_,hasRotation:q,occludedFragmentFade:k,sampleSignedDistanceFieldTexelCenter:Z}=e;l.include(c.HUD,e),l.vertex.include(a.RejectBySlice,e);const{occlusionPass:G,output:N,oitPass:J}=e;if(G)return l.include(d.HUDOcclusionPass,e),l;const{vertex:K,fragment:Q}=l;l.include(b.ScreenSizePerspective),l.include(f.VisualVariables,e),l.include(s.ObjectAndLayerIdColor,e),B&&l.include(u.HUDVisibility),Q.include(v.RgbaFloatEncoding),Q.include(p.ColorConversion),l.varyings.add("vcolor","vec4"),l.varyings.add("vtc","vec2"),l.varyings.add("vsize","vec2");const W=N===t.ShaderOutput.Highlight,X=W&&B;X&&l.varyings.add("voccluded","float"),K.uniforms.add(new x.Float4BindUniform("viewport",(e=>e.camera.fullViewport)),new m.Float2PassUniform("screenOffset",((e,l)=>o.set(j,2*e.screenOffset[0]*l.camera.pixelRatio,2*e.screenOffset[1]*l.camera.pixelRatio))),new m.Float2PassUniform("anchorPosition",(e=>T(e))),new w.Float4PassUniform("materialColor",(e=>e.color)),new S.FloatPassUniform("materialRotation",(e=>e.rotation)),new A.Texture2DPassUniform("tex",(e=>e.texture))),h.addPixelRatio(K),I&&(K.uniforms.add(new w.Float4PassUniform("outlineColor",(e=>e.outlineColor))),Q.uniforms.add(new w.Float4PassUniform("outlineColor",(e=>D(e)?e.outlineColor:i.ZEROS)),new S.FloatPassUniform("outlineSize",(e=>D(e)?e.outlineSize:0)))),E&&K.uniforms.add(new C.Float4DrawUniform("pointDistanceSphere",((e,o)=>{const l=o.camera.eye,t=e.origin;return i.fromValues(t[0]-l[0],t[1]-l[1],t[2]-l[2],r.earth.radius)}))),L&&K.include(n.AlignPixel),H&&(b.addScreenSizePerspective(K),b.addScreenSizePerspectiveAlignment(K)),M&&l.varyings.add("debugBorderCoords","vec4"),l.attributes.add(F.VertexAttribute.UVI,"vec2"),l.attributes.add(F.VertexAttribute.COLOR,"vec4"),l.attributes.add(F.VertexAttribute.SIZE,"vec2"),l.attributes.add(F.VertexAttribute.ROTATION,"float"),(R||_)&&l.attributes.add(F.VertexAttribute.FEATUREATTRIBUTE,"vec4"),K.code.add(E?z.glsl`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:z.glsl`bool behindHorizon(vec3 posModel) { return false; }`),K.main.add(z.glsl`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${z.If(H,z.glsl`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,z.glsl`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${z.If(R,z.glsl`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${z.If(B,z.glsl`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${z.If(M,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${z.If(X,z.glsl`voccluded = visible ? 0.0 : 1.0;`)}
  `);const Y=z.glsl`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${V} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${V} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${z.If(q,z.glsl`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,ee=L?I?z.glsl`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:z.glsl`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:z.glsl`posProj += quadOffset;`;K.main.add(z.glsl`
    ${Y}
    ${_?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${z.If(N===t.ShaderOutput.ObjectAndLayerIdColor,z.glsl`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${z.glsl.float($.alphaCutoff)};
    ${z.If(I,`alphaDiscard = alphaDiscard && outlineColor.a < ${z.glsl.float($.alphaCutoff)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${ee}
      gl_Position = posProj;
    }

    vtc = uv;

    ${z.If(M,z.glsl`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),Q.uniforms.add(new A.Texture2DPassUniform("tex",(e=>e.texture))),k&&!W&&Q.uniforms.add(new y.Texture2DBindUniform("depthMap",(e=>e.mainDepth)),new P.FloatBindUniform("occludedOpacity",(e=>e.hudOccludedFragmentOpacity)));const oe=M?z.glsl`(isBorder > 0.0 ? 0.0 : ${z.glsl.float($.alphaCutoff)})`:z.glsl.float($.alphaCutoff),le=z.glsl`
    ${z.If(M,z.glsl`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${z.If(Z,z.glsl`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${I?z.glsl`
      vec4 fillPixelColor = vcolor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgbaTofloat(texture(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${oe} ||
          fillPixelColor.a + outlinePixelColor.a < ${z.glsl.float($.alphaCutoff)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${z.If(!W,z.glsl`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${oe}) {
          discard;
        }

        ${z.If(!W,z.glsl`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:z.glsl`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${oe}) {
            discard;
          }
          ${z.If(!W,z.glsl`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${z.If(k&&!W,z.glsl`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${z.If(!W&&M,z.glsl`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(N){case t.ShaderOutput.Color:case t.ShaderOutput.ColorEmission:l.outputs.add("fragColor","vec4",0),N===t.ShaderOutput.ColorEmission&&l.outputs.add("fragEmission","vec4",1),J===O.OITPass.ColorAlpha&&l.outputs.add("fragAlpha","float",N===t.ShaderOutput.ColorEmission?2:1),Q.main.add(z.glsl`
        ${le}
        ${z.If(J===O.OITPass.FrontFace,z.glsl`fragColor.rgb /= fragColor.a;`)}
        ${z.If(N===t.ShaderOutput.ColorEmission,z.glsl`fragEmission = vec4(0.0);`)}
        ${z.If(J===O.OITPass.ColorAlpha,z.glsl`fragAlpha = fragColor.a;`)}`);break;case t.ShaderOutput.ObjectAndLayerIdColor:Q.main.add(z.glsl`
        ${le}
        outputObjectAndLayerIdColor();`);break;case t.ShaderOutput.Highlight:l.include(g.OutputHighlight,e),Q.main.add(z.glsl`
        ${le}
        outputHighlight(${z.If(X,z.glsl`voccluded == 1.0`,z.glsl`false`)});`)}return l}function D(e){return e.outlineColor[3]>0&&e.outlineSize>0}function T(e){var l,i,r;return e.textureIsSignedDistanceField?(l=e.anchorPosition,i=e.distanceFieldBoundingBox,r=j,o.set(r,l[0]*(i[2]-i[0])+i[0],l[1]*(i[3]-i[1])+i[1])):o.copy(j,e.anchorPosition),j}const j=l.create(),B=32e3,V=z.glsl.float(B),E=Object.freeze(Object.defineProperty({__proto__:null,build:I,calculateAnchorPosition:T,fullUV:B},Symbol.toStringTag,{value:"Module"}));e.HUDMaterial=E,e.build=I,e.calculateAnchorPosition=T,e.fullUV=B}));