// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,n,o){"use strict";class s extends o.Uniform{constructor(e,o){super(e,"vec3",n.BindType.Pass,((n,s,t)=>n.setUniform3fv(e,o(s,t))))}}e.Float3PassUniform=s,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));