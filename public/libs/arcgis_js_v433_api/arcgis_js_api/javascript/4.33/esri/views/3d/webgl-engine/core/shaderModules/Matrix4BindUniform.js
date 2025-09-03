// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,i,n){"use strict";class t extends n.Uniform{constructor(e,n){super(e,"mat4",i.BindType.Bind,((i,t)=>i.setUniformMatrix4fv(e,n(t))))}}e.Matrix4BindUniform=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));