// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/mathUtils","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","./vec32","../core/libs/gl-matrix-2/factories/vec3f64","../geometry/support/aaBoundingBox","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl","../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float3DrawUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/core/shaderModules/Matrix4DrawUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,i,t,r,a,o,n,s,l,c,d,p,g,m,u,x,f,S,w,v,h,z){"use strict";class b extends h.NoParameters{constructor(){super(...arguments),this.clipBox=l.create(l.positiveInfinity),this.useFixedSizes=!1,this.useRealWorldSymbolSizes=!1,this.scaleFactor=1,this.minSizePx=0,this.size=0,this.sizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}}class M extends d.SlicePlaneParameters{constructor(e,i,t){super(e),this.origin=e,this.isLeaf=i,this.splatSize=t}}function P(e){const r=new z.ShaderBuilder,o=c.isColorOrColorEmission(e.output),{vertex:s,fragment:l}=r;return r.vertex.include(d.RejectBySlice,e),r.attributes.add(v.VertexAttribute.POSITION,"vec3"),r.attributes.add(v.VertexAttribute.COLOR,"vec3"),s.uniforms.add(new w.Matrix4DrawUniform("modelView",((e,i)=>t.multiply(F,i.camera.viewMatrix,t.fromTranslation(F,e.origin)))),new S.Matrix4BindUniform("proj",(e=>e.camera.projectionMatrix)),new m.Float2DrawUniform("screenMinMaxSize",((e,i,t)=>a.set(R,t.useFixedSizes?0:t.minSizePx*i.camera.pixelRatio,y(e.isLeaf)*i.camera.pixelRatio))),e.useFixedSizes?new u.Float2PassUniform("pointScale",((e,i)=>a.set(R,e.fixedSize*i.camera.pixelRatio,i.camera.fullHeight))):new m.Float2DrawUniform("pointScale",((e,i,t)=>a.set(R,e.splatSize*t.scaleFactor*i.camera.pixelRatio,i.camera.fullHeight/i.camera.pixelRatio)))),e.clippingEnabled?s.uniforms.add(new x.Float3DrawUniform("clipMin",((e,i,t)=>n.set(O,t.clipBox[0]-e.origin[0],t.clipBox[1]-e.origin[1],t.clipBox[2]-e.origin[2]))),new x.Float3DrawUniform("clipMax",((e,i,t)=>n.set(O,t.clipBox[3]-e.origin[0],t.clipBox[4]-e.origin[1],t.clipBox[5]-e.origin[2])))):(s.constants.add("clipMin","vec3",[-i.numberMaxFloat32,-i.numberMaxFloat32,-i.numberMaxFloat32]),s.constants.add("clipMax","vec3",[i.numberMaxFloat32,i.numberMaxFloat32,i.numberMaxFloat32])),o&&r.varyings.add("vColor","vec3"),s.main.add(f.glsl`
    // Move clipped points outside of clipspace
    if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
      position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    if (rejectBySlice(position)) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    // Position in camera space
    vec4 camera = modelView * vec4(position, 1.0);

    float pointSize = pointScale.x;
    vec4 position = proj * camera;
    ${e.drawScreenSize?f.glsl`float clampedScreenSize = pointSize;`:f.glsl`float pointRadius = 0.5 * pointSize;
           vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
           vec4 positionOffset = proj * cameraOffset;
           float radius = abs(positionOffset.y - position.y);
           float viewHeight = pointScale.y;
           // screen diameter = (2 * r / w) * (h / 2)
           float screenPointSize = (radius / position.w) * viewHeight;
           float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
           // Shift towards camera, to move rendered point out of terrain i.e. to
           // the camera-facing end of the virtual point when considering it as a
           // 3D sphere.
           camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
           position = proj * camera;`}

    gl_PointSize = clampedScreenSize;
    gl_Position = position;
    ${o?f.glsl`vColor = color;`:""}`),l.include(g.RgbaFloatEncoding,e),r.include(p.OutputHighlight,e),l.main.add(f.glsl`
    vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
    float r2 = dot(vOffset, vOffset);

    if (r2 > 0.25) {
      discard;
    }
    calculateOcclusionAndOutputHighlight();
    ${o?f.glsl`fragColor = vec4(vColor, 1.0);`:""}`),r}function y(e){return e?256:64}const F=r.create(),O=s.create(),R=o.create(),B=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:M,PointRendererPassParameters:b,build:P,getMaxPointSizeScreenspace:y},Symbol.toStringTag,{value:"Module"}));e.PointRenderer=B,e.PointRendererDrawParameters=M,e.PointRendererPassParameters=b,e.build=P,e.getMaxPointSizeScreenspace=y}));