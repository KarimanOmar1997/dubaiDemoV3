// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/has","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../output/BlendOptions","./BackgroundGrid.glsl","./BaseOpacityMode","./BlendLayersOutput","./PremultipliedAlphaSource","../util/BlendModes.glsl","../../shaderModules/Float3PassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform","../../../../../webgl/NoParameters"],(function(e,o,r,a,l,s,t,c,u,d,n,i,g,p){"use strict";class b extends p.NoParameters{constructor(){super(...arguments),this.baseOpacity=1,this.backgroundColor=r.ZEROS,this.fboTexture=null}}e.TileBackground=function(e,o){const{output:r,blendMode:p,baseOpacityMode:b,premultipliedSource:y}=o,m=e.fragment,B=b===s.BaseOpacityMode.Required;B&&m.uniforms.add(new n.FloatPassUniform("baseOpacity",(e=>e.baseOpacity)));const C=p!==a.LayerBlendMode.Normal,f=y===c.PremultipliedAlphaSource.On,O=r===t.BlendLayersOutput.Composite,L=r===t.BlendLayersOutput.GroupBackgroundComposite,v=!C&&!f&&(O&&!B||L);m.include(u.BlendModes,o);let k="";switch(r){case t.BlendLayersOutput.GroupBackgroundComposite:case t.BlendLayersOutput.Draw:k=i.glsl`vec4(0.0)`;break;case t.BlendLayersOutput.ColorComposite:m.uniforms.add(new d.Float3PassUniform("backgroundColor",(e=>e.backgroundColor))),k=i.glsl`vec4(backgroundColor, 1.0)`;break;case t.BlendLayersOutput.GridComposite:m.include(l.BackgroundGrid),k=i.glsl`vec4(gridColor(uv), 1.0)`;break;case t.BlendLayersOutput.Composite:m.uniforms.add(new g.Texture2DPassUniform("fboColor",(e=>e.fboTexture))),k=i.glsl`texelFetch(fboColor, ivec2(gl_FragCoord.xy), 0)`;case t.BlendLayersOutput.COUNT:}m.code.add(i.glsl`
    vec4 getBackground(vec2 uv) {
      return ${i.If(B,i.glsl`baseOpacity *`)} ${k};
    }

    vec4 blendLayers(vec2 bgUV, vec4 colorLayer, float opacity) {
      ${C?i.glsl`
          vec3 cl = colorLayer.a == 0.0 ? colorLayer.rgb : colorLayer.rgb / colorLayer.a;
          vec4 bgColor = getBackground(bgUV);
          vec3 cb = bgColor.a == 0.0 ? bgColor.rgb : bgColor.rgb / bgColor.a;
          return applyBlendMode(clamp(cl, vec3(0.0), vec3(1.0)), colorLayer.a * opacity, cb, bgColor.a);`:i.glsl`
          float composeAlpha = colorLayer.a * opacity;
          ${v?i.glsl`return colorLayer * opacity;`:i.glsl`
            vec4 bgColor = getBackground(bgUV);
            return bgColor * (1.0 - composeAlpha) + colorLayer * opacity;`}`}
    }`)},e.TileBackgroundPassParameters=b,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));