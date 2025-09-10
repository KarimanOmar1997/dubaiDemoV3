// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,r,n){"use strict";class s extends n.Uniform{constructor(e,n){super(e,"sampler2D",r.BindType.Pass,((r,s,t)=>r.bindTexture(e,n(s,t))))}}e.Texture2DPassUniform=s,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));