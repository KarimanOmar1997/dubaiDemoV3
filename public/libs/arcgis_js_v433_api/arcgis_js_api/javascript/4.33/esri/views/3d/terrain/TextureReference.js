// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/libs/gl-matrix-2/factories/vec3f64"],(function(e,t){"use strict";e.TextureReference=class{constructor(e,r,s,i,o,c){this.texture=e,this.type=r,this.offsetAndScale=s,e.retain(),this.opacities=t.fromValues(i,o,c)}destroy(){this.texture.release()}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));