// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./apiConverter"],(function(e,t){"use strict";e.toProximityResult=function(e,i,n=!1){const o=t.toPoint(e.m_coordinate,t.getSpatialReference(i)),r=e.m_distance,d=e.isEmpty(),c=e.m_bRightSide;return{coordinate:o,distance:r,isEmpty:d,...n&&{isRightSide:c},vertexIndex:e.m_vertexIndex}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));