// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/shaderLibrary/ShaderOutput","../core/shaderLibrary/output/Emissions.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderLibrary/util/ColorConversion.glsl","../core/shaderModules/glsl","../lib/OITPass","../../../../webscene/support/AlphaCutoff"],(function(o,l,i,r,s,a,t,e){"use strict";o.outputColorHighlightOID=function(o,n){o.include(r.OutputHighlight,n),o.include(i.Emissions,n),o.fragment.include(s.ColorConversion);const{output:u,oitPass:f,discardInvisibleFragments:d,snowCover:C}=n,c=u===l.ShaderOutput.ObjectAndLayerIdColor,g=l.isColorEmission(u),p=l.isColorOrColorEmission(u)&&f===t.OITPass.ColorAlpha,h=l.isColorOrColorEmission(u)&&f!==t.OITPass.ColorAlpha;let m=0;(h||g||p)&&o.outputs.add("fragColor","vec4",m++),g&&o.outputs.add("fragEmission","vec4",m++),p&&o.outputs.add("fragAlpha","float",m++),o.fragment.code.add(a.glsl`
    void outputColorHighlightOID(vec4 finalColor, const in vec3 vWorldPosition, vec3 emissiveBaseColor ${a.If(C,", float snow")}) {
      ${a.If(c,"finalColor.a = 1.0;")}

      ${a.If(d,`if (finalColor.a < ${a.glsl.float(e.alphaCutoff)}) { discard; }`)}

      finalColor = applySlice(finalColor, vWorldPosition);
      ${a.If(p,a.glsl`fragColor = premultiplyAlpha(finalColor);
             fragAlpha = finalColor.a;`)}
      ${a.If(h,"fragColor = finalColor;")}
      ${a.If(g,`fragEmission = ${a.If(C,"mix(finalColor.a * getEmissions(emissiveBaseColor), vec4(0.0), snow);","finalColor.a * getEmissions(emissiveBaseColor);")}`)}
      calculateOcclusionAndOutputHighlight();
      ${a.If(c,"outputObjectAndLayerIdColor();")}
    }
  `)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));