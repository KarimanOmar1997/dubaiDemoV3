// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,n,r){"use strict";class i extends r.Uniform{constructor(e,r){super(e,"sampler2D",n.BindType.Bind,((n,i)=>n.bindTexture(e,r(i))))}}e.Texture2DBindUniform=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));