// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,s,n){"use strict";class o extends n.Uniform{constructor(e,n,o){super(e,"vec4",s.BindType.Pass,((s,o,t)=>s.setUniform4fv(e,n(o,t))),o)}}e.Float4sPassUniform=o,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));