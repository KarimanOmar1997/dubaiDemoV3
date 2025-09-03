// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../shaderGraph/techniques/blend/BlendTechnique"],(function(e,n){"use strict";e.BlendEffect=class{constructor(){this._blendTechnique=new n.BlendTechnique}dispose(e){this._blendTechnique?.shutdown()}draw(e,n,d,i,t){this._blendTechnique.render(e,{colorTexture:n,config:{opacity:t,samplingMode:d},blendMode:i})}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));