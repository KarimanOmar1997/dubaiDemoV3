/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as e,e as t}from"./mathUtils.js";import{f as o}from"./mat3.js";import{c as i}from"./mat3f64.js";import{i as s}from"./mat4.js";import{c as a}from"./mat4f64.js";import{c as r,s as n,r as l}from"./vec2.js";import{c,f as d}from"./vec2f64.js";import{s as u,t as p,n as f,k as h,j as m,c as g,l as v,x as S,i as x,a as C,q as O,d as b}from"./vec3.js";import{c as A,f as P}from"./vec3f64.js";import{Z as T,f as y,b as z,c as E,d as F}from"./vec4f64.js";import{c as j}from"./aaBoundingRect.js";import{A as R,n as I,d as w,p as D,a as _,g as L}from"./BufferView.js";import{t as N,a0 as U,J as B,K as M,C as V,F as $,j as H,d as q,l as G,g as W,h as X,O as Z,m as k,R as Y,x as Q,Q as J,M as K,N as ee,E as te,a1 as oe,a2 as ie,a3 as se,a4 as ae,U as re,a5 as ne,a6 as le,a7 as ce}from"./Matrix4PassUniform.js";import{d as de}from"./debugFlags2.js";import{n as ue}from"./InterleavedLayout.js";import{S as pe,i as fe,g as he}from"./ShaderOutput.js";import{A as me,H as ge,a as ve,b as Se}from"./HUDVisibility.glsl.js";import{F as xe,o as Ce}from"./Matrix4BindUniform.js";import{S as Oe,c as be,b as Ae,G as Pe,d as Te}from"./VerticalOffset.glsl.js";import{O as ye,D as ze,M as Ee,b as Fe,c as je,R as Re,v as Ie,p as we}from"./Material.js";import{V as De}from"./VertexAttribute.js";import{j as _e}from"./unitUtils.js";import{g as Le,I as Ne}from"./glsl.js";import{R as Ue,F as Be}from"./Float4DrawUniform.js";import{F as Me}from"./BooleanBindUniform.js";import{S as Ve}from"./ShaderBuilder.js";import{a as $e}from"./AlphaCutoff.js";import{e as He,r as qe}from"./enums.js";import{m as Ge,p as We,d as Xe,a as Ze}from"./renderState.js";import{_ as ke}from"./tslib.es6.js";import{p as Ye}from"./ShaderTechniqueConfiguration.js";class Qe{constructor(){this.factor=new Je,this.factorAlignment=new Je}}class Je{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function Ke(e,t){const{vertex:o,fragment:i}=e;e.include(N,t),o.include(me),o.main.add(Le`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),i.main.add(Le`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function et(e){return e.outlineColor[3]>0&&e.outlineSize>0}function tt(e){var t,o;return e.textureIsSignedDistanceField?(t=e.anchorPosition,o=e.distanceFieldBoundingBox,n(ot,t[0]*(o[2]-o[0])+o[0],t[1]*(o[3]-o[1])+o[1])):r(ot,e.anchorPosition),ot}const ot=c(),it=Le.float(32e3),st=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new Ve,{signedDistanceFieldEnabled:o,occlusionTestEnabled:i,horizonCullingEnabled:s,pixelSnappingEnabled:a,hasScreenSizePerspective:r,debugDrawLabelBorder:l,vvSize:c,vvColor:d,hasRotation:u,occludedFragmentFade:p,sampleSignedDistanceFieldTexelCenter:f}=e;t.include(ge,e),t.vertex.include(U,e);const{occlusionPass:h,output:m,oitPass:g}=e;if(h)return t.include(Ke,e),t;const{vertex:v,fragment:S}=t;t.include(Oe),t.include(B,e),t.include(M,e),i&&t.include(ve),S.include(Ue),S.include(V),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");const x=m===pe.Highlight,C=x&&i;C&&t.varyings.add("voccluded","float"),v.uniforms.add(new $("viewport",(e=>e.camera.fullViewport)),new Me("screenOffset",((e,t)=>n(ot,2*e.screenOffset[0]*t.camera.pixelRatio,2*e.screenOffset[1]*t.camera.pixelRatio))),new Me("anchorPosition",(e=>tt(e))),new H("materialColor",(e=>e.color)),new q("materialRotation",(e=>e.rotation)),new G("tex",(e=>e.texture))),W(v),o&&(v.uniforms.add(new H("outlineColor",(e=>e.outlineColor))),S.uniforms.add(new H("outlineColor",(e=>et(e)?e.outlineColor:T)),new q("outlineSize",(e=>et(e)?e.outlineSize:0)))),s&&v.uniforms.add(new Be("pointDistanceSphere",((e,t)=>{const o=t.camera.eye,i=e.origin;return y(i[0]-o[0],i[1]-o[1],i[2]-o[2],_e.radius)}))),a&&v.include(me),r&&(be(v),Ae(v)),l&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add(De.UVI,"vec2"),t.attributes.add(De.COLOR,"vec4"),t.attributes.add(De.SIZE,"vec2"),t.attributes.add(De.ROTATION,"float"),(c||d)&&t.attributes.add(De.FEATUREATTRIBUTE,"vec4"),v.code.add(s?Le`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:Le`bool behindHorizon(vec3 posModel) { return false; }`),v.main.add(Le`
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
    ${Ne(r,Le`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,Le`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${Ne(c,Le`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${Ne(i,Le`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${Ne(l,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${Ne(C,Le`voccluded = visible ? 0.0 : 1.0;`)}
  `);const O=Le`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${it} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${it} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${Ne(u,Le`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,b=a?o?Le`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:Le`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:Le`posProj += quadOffset;`;v.main.add(Le`
    ${O}
    ${d?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${Ne(m===pe.ObjectAndLayerIdColor,Le`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${Le.float($e)};
    ${Ne(o,`alphaDiscard = alphaDiscard && outlineColor.a < ${Le.float($e)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${b}
      gl_Position = posProj;
    }

    vtc = uv;

    ${Ne(l,Le`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),S.uniforms.add(new G("tex",(e=>e.texture))),p&&!x&&S.uniforms.add(new X("depthMap",(e=>e.mainDepth)),new xe("occludedOpacity",(e=>e.hudOccludedFragmentOpacity)));const A=l?Le`(isBorder > 0.0 ? 0.0 : ${Le.float($e)})`:Le.float($e),P=Le`
    ${Ne(l,Le`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${Ne(f,Le`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${o?Le`
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
          outlineAlphaFactor + fillAlphaFactor < ${A} ||
          fillPixelColor.a + outlinePixelColor.a < ${Le.float($e)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${Ne(!x,Le`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${A}) {
          discard;
        }

        ${Ne(!x,Le`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:Le`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${A}) {
            discard;
          }
          ${Ne(!x,Le`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${Ne(p&&!x,Le`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${Ne(!x&&l,Le`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(m){case pe.Color:case pe.ColorEmission:t.outputs.add("fragColor","vec4",0),m===pe.ColorEmission&&t.outputs.add("fragEmission","vec4",1),g===ye.ColorAlpha&&t.outputs.add("fragAlpha","float",m===pe.ColorEmission?2:1),S.main.add(Le`
        ${P}
        ${Ne(g===ye.FrontFace,Le`fragColor.rgb /= fragColor.a;`)}
        ${Ne(m===pe.ColorEmission,Le`fragEmission = vec4(0.0);`)}
        ${Ne(g===ye.ColorAlpha,Le`fragAlpha = fragColor.a;`)}`);break;case pe.ObjectAndLayerIdColor:S.main.add(Le`
        ${P}
        outputObjectAndLayerIdColor();`);break;case pe.Highlight:t.include(Z,e),S.main.add(Le`
        ${P}
        outputHighlight(${Ne(C,Le`voccluded == 1.0`,Le`false`)});`)}return t},calculateAnchorPosition:tt,fullUV:32e3},Symbol.toStringTag,{value:"Module"}));class at extends k{constructor(e,t){super(e,t,new Y(st,(()=>Promise.resolve().then((()=>st))))),this.primitiveType=t.occlusionPass?He.POINTS:He.TRIANGLES}initializePipeline(e){const{oitPass:t,hasPolygonOffset:o,draped:i,output:s,depthTestEnabled:a,occlusionPass:r}=e,n=t===ye.NONE,l=t===ye.ColorAlpha,c=s===pe.Highlight,d=a&&!i&&!l&&!r&&!c;return Ge({blending:fe(s)?n?We:J(t):null,depthTest:a&&!i?{func:qe.LEQUAL}:null,depthWrite:d?Ze:null,drawBuffers:Q(t,s),colorWrite:Xe,polygonOffset:o?rt:null})}}const rt={factor:0,units:-4};class nt extends ze{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.vvSize=!1,this.vvColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.objectAndLayerIdColorInstanced=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.textureCoordinateType=K.None,this.emissionSource=ee.None,this.discardInvisibleFragments=!0,this.hasVvInstancing=!1,this.snowCover=!1}}ke([Ye()],nt.prototype,"screenCenterOffsetUnitsEnabled",void 0),ke([Ye()],nt.prototype,"occlusionTestEnabled",void 0),ke([Ye()],nt.prototype,"signedDistanceFieldEnabled",void 0),ke([Ye()],nt.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),ke([Ye()],nt.prototype,"vvSize",void 0),ke([Ye()],nt.prototype,"vvColor",void 0),ke([Ye()],nt.prototype,"hasVerticalOffset",void 0),ke([Ye()],nt.prototype,"hasScreenSizePerspective",void 0),ke([Ye()],nt.prototype,"hasRotation",void 0),ke([Ye()],nt.prototype,"debugDrawLabelBorder",void 0),ke([Ye()],nt.prototype,"hasPolygonOffset",void 0),ke([Ye()],nt.prototype,"depthTestEnabled",void 0),ke([Ye()],nt.prototype,"pixelSnappingEnabled",void 0),ke([Ye()],nt.prototype,"draped",void 0),ke([Ye()],nt.prototype,"terrainDepthTest",void 0),ke([Ye()],nt.prototype,"cullAboveTerrain",void 0),ke([Ye()],nt.prototype,"occlusionPass",void 0),ke([Ye()],nt.prototype,"occludedFragmentFade",void 0),ke([Ye()],nt.prototype,"objectAndLayerIdColorInstanced",void 0),ke([Ye()],nt.prototype,"horizonCullingEnabled",void 0),ke([Ye()],nt.prototype,"isFocused",void 0);class lt extends Ee{constructor(e,t){super(e,It),this.produces=new Map([[te.HUD_MATERIAL,e=>he(e)&&!this.parameters.drawAsLabel],[te.LABEL_MATERIAL,e=>he(e)&&this.parameters.drawAsLabel],[te.OCCLUSION_PIXELS,()=>this.parameters.occlusionTest],[te.DRAPED_MATERIAL,e=>this.parameters.draped&&he(e)]]),this._visible=!0,this._configuration=new nt(t)}getConfiguration(e,t){const o=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled="screen"===this.parameters.centerOffsetUnits,this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=o,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===te.OCCLUSION_PIXELS,this._configuration.occludedFragmentFade=!o&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||t.slot===te.OCCLUSION_PIXELS,fe(e)&&(this._configuration.debugDrawLabelBorder=!!de.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,i,a,r,n){const{options:{selectionMode:l,hud:c,excludeLabels:d},point:x,camera:C}=i,{parameters:O}=this;if(!l||!c||d&&O.isLabel||!e.visible||!x||!C)return;const b=e.attributes.get(De.FEATUREATTRIBUTE),P=null==b?null:z(b.data,yt),{scaleX:T,scaleY:y}=Lt(P,O,C.pixelRatio);o(Ct,t),e.attributes.has(De.FEATUREATTRIBUTE)&&function(e){const t=e[0],o=e[1],i=e[2],s=e[3],a=e[4],r=e[5],n=e[6],l=e[7],c=e[8],d=1/Math.sqrt(t*t+o*o+i*i),u=1/Math.sqrt(s*s+a*a+r*r),p=1/Math.sqrt(n*n+l*l+c*c);e[0]=t*d,e[1]=o*d,e[2]=i*d,e[3]=s*u,e[4]=a*u,e[5]=r*u,e[6]=n*p,e[7]=l*p,e[8]=c*p}(Ct);const E=e.attributes.get(De.POSITION),F=e.attributes.get(De.SIZE),j=e.attributes.get(De.NORMAL),I=e.attributes.get(De.ROTATION),w=e.attributes.get(De.CENTEROFFSETANDDISTANCE);R(E.size>=3);const D=tt(O),_="screen"===this.parameters.centerOffsetUnits;for(let e=0;e<E.data.length/E.size;e++){const o=e*E.size;u(ft,E.data[o],E.data[o+1],E.data[o+2]),p(ft,ft,t),p(ft,ft,C.viewMatrix);const a=e*w.size;if(u(Pt,w.data[a],w.data[a+1],w.data[a+2]),!_&&(ft[0]+=Pt[0],ft[1]+=Pt[1],0!==Pt[2])){const e=Pt[2];f(Pt,ft),h(ft,ft,m(Pt,Pt,e))}const r=e*j.size;if(u(ht,j.data[r],j.data[r+1],j.data[r+2]),dt(ht,Ct,C,zt),Nt(this.parameters,ft,zt,C,pt),C.applyProjection(ft,mt),mt[0]>-1){_&&(Pt[0]||Pt[1])&&(mt[0]+=Pt[0]*C.pixelRatio,0!==Pt[1]&&(mt[1]+=Fe(Pt[1],pt.factorAlignment)*C.pixelRatio),C.unapplyProjection(mt,ft)),mt[0]+=this.parameters.screenOffset[0]*C.pixelRatio,mt[1]+=this.parameters.screenOffset[1]*C.pixelRatio,mt[0]=Math.floor(mt[0]),mt[1]=Math.floor(mt[1]);const t=e*F.size;jt[0]=F.data[t],jt[1]=F.data[t+1],je(jt,pt.factor,jt);const o=Et*C.pixelRatio;let a=0;O.textureIsSignedDistanceField&&(a=Math.min(O.outlineSize,.5*jt[0])*C.pixelRatio/2),jt[0]*=T,jt[1]*=y;const r=e*I.size,l=O.rotation+I.data[r];if(ut(x,mt[0],mt[1],jt,o,a,l,O,D)){const e=i.ray;if(p(vt,ft,s(bt,C.viewMatrix)),mt[0]=x[0],mt[1]=x[1],C.unprojectFromRenderScreen(mt,ft)){const t=A();g(t,e.direction);const o=1/v(t);m(t,t,o),n(S(e.origin,ft)*o,t,-1,vt)}}}}}intersectDraped(e,t,o,i,s){const a=e.attributes.get(De.POSITION),r=e.attributes.get(De.SIZE),n=e.attributes.get(De.ROTATION),l=this.parameters,c=tt(l),d=e.attributes.get(De.FEATUREATTRIBUTE),u=null==d?null:z(d.data,yt),{scaleX:p,scaleY:f}=Lt(u,l,e.screenToWorldRatio),h=Ft*e.screenToWorldRatio;for(let t=0;t<a.data.length/a.size;t++){const d=t*a.size,u=a.data[d],m=a.data[d+1],g=t*r.size;jt[0]=r.data[g],jt[1]=r.data[g+1];let v=0;l.textureIsSignedDistanceField&&(v=Math.min(l.outlineSize,.5*jt[0])*e.screenToWorldRatio/2),jt[0]*=p,jt[1]*=f;const S=t*n.size,x=l.rotation+n.data[S];ut(o,u,m,jt,h,v,x,l,c)&&i(s.distance,s.normal,-1)}}createBufferWriter(){return new _t}applyShaderOffsetsView(e,t,o,i,s,a,r){const n=dt(t,o,s,zt);return this._applyVerticalGroundOffsetView(e,n,s,r),Nt(this.parameters,r,n,s,a),this._applyPolygonOffsetView(r,n,i[3],s,r),this._applyCenterOffsetView(r,i,r),r}applyShaderOffsetsNDC(e,t,o,i,s){return this._applyCenterOffsetNDC(e,t,o,i),null!=s&&g(s,i),this._applyPolygonOffsetNDC(i,t,o,i),i}_applyPolygonOffsetView(t,o,i,s,a){const r=s.aboveGround?1:-1;let n=Math.sign(i);0===n&&(n=r);const l=r*n;if(this.parameters.shaderPolygonOffset<=0)return g(a,t);const c=e(Math.abs(o.cosAngle),.01,1),d=1-Math.sqrt(1-c*c)/c/s.viewport[2];return m(a,t,l>0?d:1/d),a}_applyVerticalGroundOffsetView(e,t,o,i){const s=v(e),a=o.aboveGround?1:-1,r=o.computeRenderPixelSizeAtDist(s)*Se,n=m(ft,t.normal,a*r);return x(i,e,n),i}_applyCenterOffsetView(e,t,o){const i="screen"!==this.parameters.centerOffsetUnits;return o!==e&&g(o,e),i&&(o[0]+=t[0],o[1]+=t[1],t[2]&&(f(ht,o),C(o,o,m(ht,ht,t[2])))),o}_applyCenterOffsetNDC(e,t,o,i){const s="screen"!==this.parameters.centerOffsetUnits;return i!==e&&g(i,e),s||(i[0]+=t[0]/o.fullWidth*2,i[1]+=t[1]/o.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,o,i){const s=this.parameters.shaderPolygonOffset;if(e!==i&&g(i,e),s){const e=o.aboveGround?1:-1,a=e*Math.sign(t[3]);i[2]-=(a||e)*s}return i}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:o}=this.parameters,i=e[3]>=$e||t>=$e&&o[3]>=$e;return this._visible&&i}createGLMaterial(e){return new ct(e)}calculateRelativeScreenBounds(e,t,o=j()){return function(e,t,o,i){i[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*o,i[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*o}(this.parameters,e,t,o),o[2]=o[0]+e[0],o[3]=o[1]+e[1],o}}class ct extends Te{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(at,e)}}function dt(e,t,i,s){return(function(e){return e instanceof Float32Array&&e.length>=16}(a=t)||function(e){return Array.isArray(e)&&e.length>=16}(a))&&(t=o(Ot,t)),O(s.normal,e,t),p(s.normal,s.normal,i.viewInverseTransposeMatrix),s.cosAngle=b(gt,Rt),s;var a}function ut(e,o,i,s,a,r,c,d,u){let p=o-a-s[0]*u[0],f=p+s[0]+2*a,h=i-a-s[1]*u[1],m=h+s[1]+2*a;const g=d.distanceFieldBoundingBox;return d.textureIsSignedDistanceField&&null!=g&&(p+=s[0]*g[0],h+=s[1]*g[1],f-=s[0]*(1-g[2]),m-=s[1]*(1-g[3]),p-=r,f+=r,h-=r,m+=r),n(xt,o,i),l(St,e,xt,t(c)),St[0]>p&&St[0]<f&&St[1]>h&&St[1]<m}const pt=new Qe,ft=A(),ht=A(),mt=E(),gt=A(),vt=A(),St=c(),xt=c(),Ct=i(),Ot=i(),bt=a(),At=E(),Pt=A(),Tt=A(),yt=E(),zt={normal:gt,cosAngle:0},Et=1,Ft=2,jt=d(0,0),Rt=P(0,0,1);class It extends Pe{constructor(){super(...arguments),this.renderOccluded=Re.Occlude,this.isDecoration=!1,this.color=F(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=d(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=F(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=E(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}}const wt=ue().vec3f(De.POSITION).vec3f(De.NORMAL).vec2i16(De.UVI).vec4u8(De.COLOR).vec2f(De.SIZE).f32(De.ROTATION).vec4f(De.CENTEROFFSETANDDISTANCE).vec4f(De.FEATUREATTRIBUTE),Dt=wt.clone().vec4u8(De.OLIDCOLOR);class _t{constructor(){this.vertexBufferLayout=Ce()?Dt:wt}elementCount(e){return 6*e.get(De.POSITION).indices.length}write(e,t,o,i,s,a){const{position:r,normal:n,uvi:l,color:c,size:d,rotation:u,centerOffsetAndDistance:p,featureAttribute:f}=s;ie(o.get(De.POSITION),e,r,a,6),se(o.get(De.NORMAL),t,n,a,6);const h=o.get(De.UVI)?.data;let m=0,g=0,v=-32001,S=-32001;h&&h.length>=4&&(m=h[0],g=h[1],v=-1-h[2],S=-1-h[3]);let x=o.get(De.POSITION).indices.length,C=a;for(let e=0;e<x;++e)l.set(C,0,m),l.set(C,1,g),C++,l.set(C,0,v),l.set(C,1,g),C++,l.set(C,0,v),l.set(C,1,S),C++,l.set(C,0,v),l.set(C,1,S),C++,l.set(C,0,m),l.set(C,1,S),C++,l.set(C,0,m),l.set(C,1,g),C++;ae(o.get(De.COLOR),4,c,a,6);const{data:O,indices:b}=o.get(De.SIZE);x=b.length,C=a;for(let e=0;e<x;++e){const t=O[2*b[e]],o=O[2*b[e]+1];for(let e=0;e<6;++e)d.set(C,0,t),d.set(C,1,o),C++}if(re(o.get(De.ROTATION),u,a,6),o.get(De.CENTEROFFSETANDDISTANCE)?ne(o.get(De.CENTEROFFSETANDDISTANCE),p,a,6):le(p,a,6*x),o.get(De.FEATUREATTRIBUTE)?ne(o.get(De.FEATUREATTRIBUTE),f,a,6):le(f,a,6*x),null!=i){const e=o.get(De.POSITION)?.indices;if(e){const t=e.length,o=s.getField(De.OLIDCOLOR,I);ce(i,o,t,a,6)}}return{numVerticesPerItem:6,numItems:x}}intersect(e,t,o,i,a,r,n){const{options:{selectionMode:l,hud:c,excludeLabels:d},point:C,camera:O}=i;if(!l||!c||d&&t.isLabel||!C)return;const b=this.vertexBufferLayout.createView(e),P=b.getField(De.POSITION,w),T=b.getField(De.NORMAL,w),y=b.getField(De.ROTATION,D),z=b.getField(De.SIZE,_),E=b.getField(De.FEATUREATTRIBUTE,L),F=b.getField(De.CENTEROFFSETANDDISTANCE,L),j="screen"===t.centerOffsetUnits,R=tt(t);if(null==P||null==T||null==y||null==z||null==F||null==O)return;const I=null==E?null:E.getVec(0,yt),{scaleX:N,scaleY:U}=Lt(I,t,O.pixelRatio),B=P.count/6;for(let e=0;e<B;e++){const a=6*e;if(P.getVec(a,ft),null!=o&&x(ft,ft,o),p(ft,ft,O.viewMatrix),F.getVec(a,At),u(Pt,At[0],At[1],At[2]),!j&&(ft[0]+=Pt[0],ft[1]+=Pt[1],0!==Pt[2])){const e=Pt[2];f(Pt,ft),h(ft,ft,m(Pt,Pt,e))}if(T.getVec(a,ht),dt(ht,Ct,O,zt),Nt(t,ft,zt,O,pt),O.applyProjection(ft,mt),mt[0]>-1){j&&(Pt[0]||Pt[1])&&(mt[0]+=Pt[0]*O.pixelRatio,0!==Pt[1]&&(mt[1]+=Fe(Pt[1],pt.factorAlignment)*O.pixelRatio),O.unapplyProjection(mt,ft)),mt[0]+=t.screenOffset[0]*O.pixelRatio,mt[1]+=t.screenOffset[1]*O.pixelRatio,mt[0]=Math.floor(mt[0]),mt[1]=Math.floor(mt[1]),z.getVec(a,jt),je(jt,pt.factor,jt);const o=Et*O.pixelRatio;let r=0;t.textureIsSignedDistanceField&&(r=Math.min(t.outlineSize,.5*jt[0])*O.pixelRatio/2),jt[0]*=N,jt[1]*=U;const l=y.get(a),c=t.rotation+l;if(ut(C,mt[0],mt[1],jt,o,r,c,t,R)){const t=i.ray;if(p(vt,ft,s(bt,O.viewMatrix)),mt[0]=C[0],mt[1]=C[1],O.unprojectFromRenderScreen(mt,ft)){const o=A();g(o,t.direction);const i=1/v(o);m(o,o,i),n(S(t.origin,ft)*i,o,e,vt)}}}}}}function Lt(e,t,o){return null==e||null==t.vvSize?{scaleX:o,scaleY:o}:(oe(Tt,t,e),{scaleX:Tt[0]*o,scaleY:Tt[1]*o})}function Nt(e,t,o,i,s){if(!e.verticalOffset?.screenLength)return e.screenSizePerspective||e.screenSizePerspectiveAlignment?Ut(e,s,v(t),o.cosAngle):(s.factor.scale=1,s.factorAlignment.scale=1),t;const a=v(t),r=e.screenSizePerspectiveAlignment??e.screenSizePerspective,n=Ie(i,a,e.verticalOffset,o.cosAngle,r);return Ut(e,s,a,o.cosAngle),m(o.normal,o.normal,n),x(t,t,o.normal)}function Ut(e,t,o,i){null!=e.screenSizePerspective?we(i,o,e.screenSizePerspective,t.factor):(t.factor.scale=1,t.factor.factor=0,t.factor.minScaleFactor=0),null!=e.screenSizePerspectiveAlignment?we(i,o,e.screenSizePerspectiveAlignment,t.factorAlignment):(t.factorAlignment.factor=t.factor.factor,t.factorAlignment.scale=t.factor.scale,t.factorAlignment.minScaleFactor=t.factor.minScaleFactor)}export{lt as H,Qe as S};
