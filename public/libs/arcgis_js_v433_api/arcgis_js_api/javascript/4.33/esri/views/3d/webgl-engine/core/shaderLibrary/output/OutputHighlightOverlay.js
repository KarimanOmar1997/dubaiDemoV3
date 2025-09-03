// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../ShaderOutput","./OutputHighlight.glsl","../../shaderModules/glsl"],(function(t,i,l,e){"use strict";t.OutputHighlightOverlay=function(t,u){u.output===i.ShaderOutput.Highlight&&(t.include(l.OutputHighlight,u),t.fragment.code.add(e.glsl`
    void calculateOcclusionAndOutputHighlight(uvec2 highlightToAdd) {
      uint levelBits = readLevelBits(highlightToAdd, highlightLevel);
      if ((levelBits & 1u) == 0u) discard;
      outputHighlight(isHighlightOccluded());
    }
  `))},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));