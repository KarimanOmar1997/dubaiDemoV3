// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,t,r){"use strict";class i extends r.Uniform{constructor(e,r){super(e,"mat4",t.BindType.Pass,((t,i,n)=>t.setUniformMatrix4fv(e,r(i,n))))}}e.Matrix4PassUniform=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));