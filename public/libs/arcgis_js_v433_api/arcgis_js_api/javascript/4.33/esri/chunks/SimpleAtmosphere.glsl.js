// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/environment/SimpleAtmosphereTechniqueConfiguration","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/lib/VertexAttribute","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],(function(e,i,o,r,t,n,s,a,l,d,c,m,g,f,u,h){"use strict";class p extends u.NoParameters{constructor(){super(...arguments),this.texV=i.create(),this.altitudeFade=0,this.innerScale=0,this.undergroundFadeAlpha=0,this.silhouette=new v}}class v{constructor(){this.center=o.create(),this.v1=o.create(),this.v2=o.create()}}function w(e){const i=new h.ShaderBuilder,{vertex:o,fragment:u}=i;if(n.addMainLightDirection(o),e.geometry===r.SimpleAtmosphereGeometry.Underground)i.attributes.add(f.VertexAttribute.POSITION,"vec2"),i.varyings.add("color","vec4"),o.uniforms.add(new a.Float3BindUniform("cameraPosition",(e=>e.camera.eye)),new d.FloatPassUniform("undergroundFadeAlpha",(e=>e.undergroundFadeAlpha))),o.main.add(c.glsl`float ndotl = dot(normalize(cameraPosition), mainLightDirection);
float lighting = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));
color = vec4(vec3(lighting), undergroundFadeAlpha);
gl_Position = vec4(position.xy, 1.0, 1.0);`),u.main.add(c.glsl`fragColor = color;`);else{i.include(t.Transform,e),i.attributes.add(f.VertexAttribute.POSITION,"vec3"),i.varyings.add("vtc","vec2"),i.varyings.add("falloff","float");const n=e.geometry===r.SimpleAtmosphereGeometry.Cylinder;o.uniforms.add(new m.Matrix4BindUniform("proj",(e=>e.camera.projectionMatrix)),new m.Matrix4BindUniform("view",(e=>e.camera.viewMatrix))),n||(i.varyings.add("innerFactor","float"),o.uniforms.add(new l.Float3PassUniform("silCircleCenter",(e=>e.silhouette.center))),o.uniforms.add(new l.Float3PassUniform("silCircleV1",(e=>e.silhouette.v1))),o.uniforms.add(new l.Float3PassUniform("silCircleV2",(e=>e.silhouette.v2))),o.uniforms.add(new s.Float2PassUniform("texV",(e=>e.texV))),o.uniforms.add(new d.FloatPassUniform("innerScale",(e=>e.innerScale))));const a=6.2831853,h=1/128;o.main.add(c.glsl`
      ${n?c.glsl`
      vec3 pos = position;
      float ndotl = mainLightDirection.z;
      vtc = vec2(0.0, position.z + 0.05);`:c.glsl`
      innerFactor = clamp(-position.z, 0.0, 1.0);
      float scale = position.y * (1.0 + innerFactor * innerScale);
      float phi = position.x * ${c.glsl.float(a*h)} + 1.0;
      vec3 pos =  (silCircleCenter + sin(phi) * silCircleV1 + cos(phi) * silCircleV2) * scale;
      float ndotl = dot(normalize(position.y > 0.0 ? pos: silCircleCenter), mainLightDirection);
      vtc.x = position.x  * ${c.glsl.float(h)};
      vtc.y = texV.x * (1.0 - position.z) + texV.y * position.z;
      `}
      falloff = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));

		  gl_Position = transformPosition(proj, view, pos);
		  gl_Position.z = gl_Position.w; // project atmosphere onto the far plane
	  `),u.uniforms.add(new g.Texture2DPassUniform("tex",(e=>e.texture))),n||u.uniforms.add(new d.FloatPassUniform("altitudeFade",(e=>e.altitudeFade))),u.main.add(c.glsl`
			vec4 atmosphereColor = texture(tex, vtc) * falloff;
      ${n?c.glsl`fragColor = atmosphereColor;`:c.glsl`
			vec4 innerColor = vec4(atmosphereColor.rgb, 1.0 - altitudeFade);
			fragColor = mix(atmosphereColor, innerColor, smoothstep(0.0, 1.0, innerFactor));`}`)}return i}const x=Object.freeze(Object.defineProperty({__proto__:null,SilhouetteCircle:v,SimpleAtmospherePassParameters:p,build:w},Symbol.toStringTag,{value:"Module"}));e.SilhouetteCircle=v,e.SimpleAtmosphere=x,e.SimpleAtmospherePassParameters=p,e.build=w}));