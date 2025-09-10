// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./AlignPixel.glsl","../shading/TerrainDepthTest.glsl","../../shaderModules/glsl"],(function(e,o,r,i){"use strict";e.HUDOcclusionPass=function(e,t){const{vertex:s,fragment:n}=e;e.include(r.terrainDepthTest,t),s.include(o.AlignPixel),s.main.add(i.glsl`vec4 posProjCenter;
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
gl_PointSize = 1.0;`),n.main.add(i.glsl`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));