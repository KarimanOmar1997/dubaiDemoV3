// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../ForwardLinearDepth.glsl","../ShaderOutput","../Slice.glsl","../Transform.glsl","../attributes/NormalAttribute.glsl","../attributes/ObjectAndLayerIdColor.glsl","../attributes/TextureCoordinateAttribute.glsl","../attributes/VertexNormal.glsl","../output/OutputDepth.glsl","../output/OutputHighlight.glsl","../shading/VisualVariables.glsl","../util/DiscardOrAdjustAlpha.glsl","../util/View.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform","../../../lib/basicInterfaces"],(function(e,r,t,a,i,l,o,s,d,u,n,c,p,g,v,h,O){"use strict";e.DefaultMaterialAuxiliaryPasses=function(e,m){const{vertex:x,fragment:f,varyings:A}=e,{hasColorTexture:w,alphaDiscardMode:b}=m,V=w&&b!==O.AlphaDiscardMode.Opaque,{output:S,normalType:T,hasColorTextureTransform:C}=m;switch(S){case t.ShaderOutput.Depth:g.addProjViewLocalOrigin(x,m),e.include(i.Transform,m),f.include(a.SliceDraw,m),e.include(s.TextureCoordinateAttribute,m),V&&f.uniforms.add(new h.Texture2DPassUniform("tex",(e=>e.texture))),x.main.add(v.glsl`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(p.DiscardOrAdjustAlphaPass,m),f.main.add(v.glsl`
        discardBySlice(vpos);
        ${v.If(V,v.glsl`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case t.ShaderOutput.Shadow:case t.ShaderOutput.ShadowHighlight:case t.ShaderOutput.ShadowExcludeHighlight:case t.ShaderOutput.ViewshedShadow:case t.ShaderOutput.ObjectAndLayerIdColor:g.addProjViewLocalOrigin(x,m),e.include(i.Transform,m),e.include(s.TextureCoordinateAttribute,m),e.include(c.VisualVariables,m),e.include(u.OutputDepth,m),f.include(a.SliceDraw,m),e.include(o.ObjectAndLayerIdColor,m),r.addNearFar(e),A.add("depth","float",{invariant:!0}),V&&f.uniforms.add(new h.Texture2DPassUniform("tex",(e=>e.texture))),x.main.add(v.glsl`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(p.DiscardOrAdjustAlphaPass,m),f.main.add(v.glsl`
        discardBySlice(vpos);
        ${v.If(V,v.glsl`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        ${S===t.ShaderOutput.ObjectAndLayerIdColor?v.glsl`outputObjectAndLayerIdColor();`:v.glsl`outputDepth(depth);`}`);break;case t.ShaderOutput.Normal:{g.addProjViewLocalOrigin(x,m),e.include(i.Transform,m),e.include(l.NormalAttribute,m),e.include(d.VertexNormal,m),e.include(s.TextureCoordinateAttribute,m),e.include(c.VisualVariables,m),V&&f.uniforms.add(new h.Texture2DPassUniform("tex",(e=>e.texture))),T===l.NormalType.ScreenDerivative&&A.add("vPositionView","vec3",{invariant:!0});const r=T===l.NormalType.Attribute||T===l.NormalType.Compressed;x.main.add(v.glsl`
        vpos = getVertexInLocalOriginSpace();
        ${r?v.glsl`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:v.glsl`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),f.include(a.SliceDraw,m),e.include(p.DiscardOrAdjustAlphaPass,m),f.main.add(v.glsl`
        discardBySlice(vpos);
        ${v.If(V,v.glsl`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${T===l.NormalType.ScreenDerivative?v.glsl`vec3 normal = screenDerivativeNormal(vPositionView);`:v.glsl`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case t.ShaderOutput.Highlight:g.addProjViewLocalOrigin(x,m),e.include(i.Transform,m),e.include(s.TextureCoordinateAttribute,m),e.include(c.VisualVariables,m),V&&f.uniforms.add(new h.Texture2DPassUniform("tex",(e=>e.texture))),x.main.add(v.glsl`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),f.include(a.SliceDraw,m),e.include(p.DiscardOrAdjustAlphaPass,m),e.include(n.OutputHighlight,m),f.main.add(v.glsl`
        discardBySlice(vpos);
        ${v.If(V,v.glsl`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));