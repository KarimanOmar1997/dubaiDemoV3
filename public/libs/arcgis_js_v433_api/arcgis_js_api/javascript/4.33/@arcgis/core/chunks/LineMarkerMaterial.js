/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{s as e,A as t,t as r}from"./vec3.js";import{c as i}from"./vec3f64.js";import{R as a}from"./BufferView.js";import{n as s}from"./InterleavedLayout.js";import{i as n,a as o,b as c,c as l,S as p}from"./ShaderOutput.js";import{t as d,b as h,k as v,F as m,e as u,g as f,S,o as T,C as g,j as P,l as A,O as E,m as _,R as O,s as w,p as R,q as y,r as x,u as L,v as z,w as C,x as D,y as I,z as b,A as M,B as U,D as N,E as k,V as W,i as j,H as B}from"./Matrix4PassUniform.js";import{M as F,R as $}from"./Material.js";import{V}from"./VertexAttribute.js";import{L as H,a as G,M as Z,b as q,m as Y,c as Q,d as J,e as K,C as X}from"./RibbonLineMaterial.js";import{R as ee}from"./Float4DrawUniform.js";import{M as te,F as re}from"./Matrix4BindUniform.js";import{g as ie,I as ae}from"./glsl.js";import{S as se}from"./ShaderBuilder.js";import{m as ne,d as oe,u as ce}from"./renderState.js";import{a as le}from"./AlphaCutoff.js";const pe=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new se,{space:r,anchor:i,hasTip:a}=e,s=r===H.World;t.include(G,e),t.include(Z,e),t.include(d,e);const{vertex:n,fragment:o,varyings:c}=t;o.include(ee),h(n,e),t.attributes.add(V.POSITION,"vec3"),t.attributes.add(V.PREVIOUSDELTA,"vec4"),t.attributes.add(V.UV0,"vec2"),c.add("vColor","vec4"),c.add("vpos","vec3",{invariant:!0}),c.add("vUV","vec2"),c.add("vSize","float"),a&&c.add("vLineWidth","float"),n.uniforms.add(new v("nearFar",(({camera:e})=>e.nearFar)),new m("viewport",(({camera:e})=>e.fullViewport))).code.add(ie`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),n.code.add(ie`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),s?(t.attributes.add(V.NORMAL,"vec3"),u(n),n.constants.add("tiltThreshold","float",.7),n.code.add(ie`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):n.code.add(ie`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const l=s?"vec3":"vec2";return n.code.add(ie`
      ${l} normalizedSegment(${l} pos, ${l} prev) {
        ${l} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${s?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${l} displace(${l} pos, ${l} prev, float displacementLen) {
        ${l} segment = normalizedSegment(pos, prev);

        ${l} displacementDirU = perpendicular(segment);
        ${l} displacementDirV = segment;

        ${i===q.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),r===H.Screen&&(n.uniforms.add(new te("inverseProjectionMatrix",(({camera:e})=>e.inverseProjectionMatrix))),n.code.add(ie`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),n.code.add(ie`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),n.uniforms.add(new re("perScreenPixelRatio",(({camera:e})=>e.perScreenPixelRatio))),n.code.add(ie`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${ae(e.hasCap,"if(prev.z > posLeft.z) {\n                vec2 diff = posLeft.xy - posRight.xy;\n                planeOrigin.xy += perpendicular(diff) / 2.0;\n             }")};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),f(n),n.main.add(ie`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      float lineWidth = getLineWidth();
      float screenMarkerSize = getScreenMarkerSize();

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);
      clip(pos, prev);

      ${s?ie`${ae(e.hideOnShortSegments,ie`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:ie`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${ae(r===H.Screen,ie`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${ae(!s,"vUV *= displacedPosScreen.w;")}
      ${ae(a,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),o.include(S,e),t.include(T,e),o.include(g),o.uniforms.add(new P("intrinsicColor",(({color:e})=>e)),new A("tex",(({markerTexture:e})=>e))).constants.add("texelSize","float",1/Y).code.add(ie`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),a&&o.constants.add("relativeMarkerSize","float",Q/Y).constants.add("relativeTipLineWidth","float",J).code.add(ie`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${ae(s,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),t.include(E,e),o.main.add(ie`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${ae(!s,"* gl_FragCoord.w")};
    finalColor.a *= ${a?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t}},Symbol.toStringTag,{value:"Module"}));class de extends _{constructor(e,t){super(e,t,new O(pe,(()=>Promise.resolve().then((()=>pe)))),he)}_makePipelineState(e,t){const{output:r,oitPass:i,space:a,hasOccludees:s}=e;return ne({blending:n(r)?C(i):null,depthTest:a===H.Draped?null:{func:z(i)},depthWrite:L(e),drawBuffers:x(r,D(i,r)),colorWrite:oe,stencilWrite:s?y:null,stencilTest:s?t?w:R:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=ne({blending:ce,depthTest:b,depthWrite:null,colorWrite:oe,stencilWrite:null,stencilTest:I}),this._occluderPipelineOpaque=ne({blending:ce,depthTest:b,depthWrite:null,colorWrite:oe,stencilWrite:U,stencilTest:M}),this._occluderPipelineMaskWrite=ne({blending:null,depthTest:N,depthWrite:null,colorWrite:null,stencilWrite:y,stencilTest:w})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:t===k.TRANSPARENT_OCCLUDER_MATERIAL?this._occluderPipelineTransparent??super.getPipeline():t===k.OCCLUDER_MATERIAL?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}const he=new Map([[V.POSITION,0],[V.PREVIOUSDELTA,1],[V.UV0,2],[V.COLOR,3],[V.COLORFEATUREATTRIBUTE,3],[V.OPACITYFEATUREATTRIBUTE,4],[V.SIZE,5],[V.SIZEFEATUREATTRIBUTE,5],[V.NORMAL,6]]);class ve extends F{constructor(e){super(e,ue),this._configuration=new K,this.vertexAttributeLocations=he,this.produces=new Map([[k.OPAQUE_MATERIAL,e=>e===p.Highlight||o(e)&&this.parameters.renderOccluded===$.OccludeAndTransparentStencil],[k.OPAQUE_MATERIAL_WITHOUT_NORMALS,e=>c(e)],[k.OCCLUDER_MATERIAL,e=>l(e)&&this.parameters.renderOccluded===$.OccludeAndTransparentStencil],[k.TRANSPARENT_OCCLUDER_MATERIAL,e=>l(e)&&this.parameters.renderOccluded===$.OccludeAndTransparentStencil],[k.TRANSPARENT_MATERIAL,e=>o(e)&&this.parameters.writeDepth],[k.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,e=>o(e)&&!this.parameters.writeDepth],[k.DRAPED_MATERIAL,e=>n(e)||e===p.Highlight]]),this.intersectDraped=void 0,this._layout=this.createLayout()}getConfiguration(e,t){return super.getConfiguration(e,t,this._configuration),this._configuration.space=t.slot===k.DRAPED_MATERIAL?H.Draped:this.parameters.worldSpace?H.World:H.Screen,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=this.parameters.cap!==X.BUTT,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.occluder=this.parameters.renderOccluded===$.OccludeAndTransparentStencil,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&n(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}get visible(){return this.parameters.color[3]>=le}intersect(){}createLayout(){const e=s().vec3f(V.POSITION).vec4f16(V.PREVIOUSDELTA).vec2f16(V.UV0);return this.parameters.vvColor?e.f32(V.COLORFEATUREATTRIBUTE):e.vec4u8(V.COLOR,{glNormalized:!0}),this.parameters.vvOpacity&&e.f32(V.OPACITYFEATUREATTRIBUTE),this.parameters.vvSize?e.f32(V.SIZEFEATUREATTRIBUTE):e.f16(V.SIZE),this.parameters.worldSpace&&e.vec3f16(V.NORMAL),e}createBufferWriter(){return new fe(this._layout,this.parameters)}createGLMaterial(e){return new me(e)}}class me extends j{dispose(){super.dispose(),this._markerTextures.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this.getTechnique(de,e)}}class ue extends W{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=X.BUTT,this.anchor=q.Center,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.markerTexture=null}}class fe{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t}elementCount(){return"begin-end"===this._parameters.placement?12:6}write(i,s,n,o,c,l){const p=n.get(V.POSITION).data,d=p.length/3;let h=[1,0,0];const v=n.get(V.NORMAL);this._parameters.worldSpace&&null!=v&&(h=v.data);let m=1,u=0;this._parameters.vvSize?u=n.get(V.SIZEFEATUREATTRIBUTE).data[0]:n.has(V.SIZE)&&(m=n.get(V.SIZE).data[0]);let f=[1,1,1,1],S=0;this._parameters.vvColor?S=n.get(V.COLORFEATUREATTRIBUTE).data[0]:n.has(V.COLOR)&&(f=n.get(V.COLOR).data);let T=0;this._parameters.vvOpacity&&(T=n.get(V.OPACITYFEATUREATTRIBUTE).data[0]);const g=new Float32Array(c.buffer),P=a(c.buffer),A=new Uint8Array(c.buffer);let E=l*(this.vertexBufferLayout.stride/4);const _=g.BYTES_PER_ELEMENT/P.BYTES_PER_ELEMENT,O=4/_,w=(e,t,r,i)=>{g[E++]=e[0],g[E++]=e[1],g[E++]=e[2],B(t,e,P,E*_),E+=O;let a=E*_;if(P[a++]=r[0],P[a++]=r[1],E=Math.ceil(a/_),this._parameters.vvColor)g[E++]=S;else{const e=Math.min(4*i,f.length-4),t=4*E++;A[t]=255*f[e],A[t+1]=255*f[e+1],A[t+2]=255*f[e+2],A[t+3]=255*f[e+3]}this._parameters.vvOpacity&&(g[E++]=T),a=E*_,this._parameters.vvSize?(g[E++]=u,a+=2):P[a++]=m,this._parameters.worldSpace&&(P[a++]=h[0],P[a++]=h[1],P[a++]=h[2]),E=Math.ceil(a/_)};let R;!function(e){e[e.ASCENDING=1]="ASCENDING",e[e.DESCENDING=-1]="DESCENDING"}(R||(R={}));const y=(a,s)=>{const n=e(Se,p[3*a],p[3*a+1],p[3*a+2]),o=Te;let c=a+s;do{e(o,p[3*c],p[3*c+1],p[3*c+2]),c+=s}while(t(n,o)&&c>=0&&c<d);i&&(r(n,n,i),r(o,o,i)),w(n,o,[-1,-1],a),w(n,o,[1,-1],a),w(n,o,[1,1],a),w(n,o,[-1,-1],a),w(n,o,[1,1],a),w(n,o,[-1,1],a)},x=this._parameters.placement;return"begin"!==x&&"begin-end"!==x||y(0,R.ASCENDING),"end"!==x&&"begin-end"!==x||y(d-1,R.DESCENDING),null}}const Se=i(),Te=i();export{ve as L};
