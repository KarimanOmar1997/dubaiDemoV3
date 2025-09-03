// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,n,r){"use strict";class t extends r.Uniform{constructor(e,r){super(e,"usampler2D",n.BindType.Pass,((n,t,s)=>n.bindTexture(e,r(t,s))))}}e.Texture2DUintPassUniform=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));