// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,t,r){"use strict";class s extends r.Uniform{constructor(e,r,s){super(e,"mat4",t.BindType.Pass,((t,s,i)=>t.setUniformMatrix4fv(e,r(s,i))),s)}}e.Matrix4sPassUniform=s,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));