// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,r,n){"use strict";class i extends n.Uniform{constructor(e,n){super(e,"sampler2DArray",r.BindType.Bind,((r,i)=>r.bindTexture(e,n(i))))}}e.Texture2DArrayBindUniform=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));