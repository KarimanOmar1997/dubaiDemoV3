// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/screenUtils","./vec42","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderModules/BooleanPassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,r,a,t,n,o,i,s,l,u,d){"use strict";class c extends u.NoParameters{constructor(){super(...arguments),this.mask=null,this.overlay=null,this.input=null,this.size=0}}function f(){const e=new d.ShaderBuilder;return e.attributes.add(l.VertexAttribute.POSITION,"vec2"),e.vertex.uniforms.add(new o.Float4PassUniform("drawPosition",((e,t)=>function(e,t){const n=t.camera.pixelRatio,o=e.magnifier.offset.x*n,i=e.magnifier.offset.y*n;r.screenPointObjectToArray(e.magnifier.position,v);const s=t.camera.screenToRender(v,m),l=Math.ceil(n*e.magnifier.size),{fullWidth:u,fullHeight:d}=t.camera;return a.set(g,(s[0]+o)/u*2-1,(s[1]-i)/d*2-1,l/u*2,l/d*2)}(e,t)))),e.varyings.add("vUV","vec2"),e.vertex.main.add(i.glsl`vUV = position;
gl_Position = vec4(drawPosition.xy + vec2(position - 0.5) * drawPosition.zw, 0.0, 1.0);`),e.fragment.uniforms.add(new s.Texture2DPassUniform("textureInput",(e=>e.input))),e.fragment.uniforms.add(new s.Texture2DPassUniform("textureMask",(e=>e.mask))),e.fragment.uniforms.add(new s.Texture2DPassUniform("textureOverlay",(e=>e.overlay))),e.fragment.uniforms.add(new n.BooleanPassUniform("maskEnabled",(e=>e.magnifier.maskEnabled))),e.fragment.uniforms.add(new n.BooleanPassUniform("overlayEnabled",(e=>e.magnifier.overlayEnabled))),e.fragment.code.add(i.glsl`const float barrelFactor = 1.1;
vec2 barrel(vec2 uv) {
vec2 uvn = uv * 2.0 - 1.0;
if (uvn.x == 0.0 && uvn.y == 0.0) {
return vec2(0.5, 0.5);
}
float theta = atan(uvn.y, uvn.x);
float r = pow(length(uvn), barrelFactor);
return r * vec2(cos(theta), sin(theta)) * 0.5 + 0.5;
}`),e.fragment.main.add(i.glsl`float mask = maskEnabled ? texture(textureMask, vUV).a : 1.0;
vec4 inputColor = texture(textureInput, barrel(vUV)) * mask;
vec4 overlayColor = overlayEnabled ? texture(textureOverlay, vUV) : vec4(0);
fragColor = overlayColor + (1.0 - overlayColor.a) * inputColor;`),e}const v=r.createScreenPointArray(),m=r.createRenderScreenPointArray(),g=t.create(),b=Object.freeze(Object.defineProperty({__proto__:null,MagnifierPassParameters:c,build:f},Symbol.toStringTag,{value:"Module"}));e.Magnifier=b,e.MagnifierPassParameters=c,e.build=f}));