// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,r,t){"use strict";class i extends t.Uniform{constructor(e,t){super(e,"mat3",r.BindType.Draw,((r,i,n)=>r.setUniformMatrix3fv(e,t(i,n))))}}e.Matrix3DrawUniform=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));