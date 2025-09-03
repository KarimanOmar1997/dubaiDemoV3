// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,r,n){"use strict";class t extends n.Uniform{constructor(e,n){super(e,"sampler2D",r.BindType.Draw,((r,t,i)=>r.bindTexture(e,n(t,i))))}}e.Texture2DDrawUniform=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));