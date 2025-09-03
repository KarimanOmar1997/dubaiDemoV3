// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/colorUtils","../../../../core/libs/gl-matrix-2/factories/vec4f64"],(function(o,t,e){"use strict";const r=e.fromValues(0,0,0,.04);o.getGridColor=function({accentColor:o}){return t.multiplyOpacityToUnitRGBA(o,.5)},o.getOutlineColor=function({accentColor:o}){return t.multiplyOpacityToUnitRGBA(o,.7)},o.planeColor=r,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));