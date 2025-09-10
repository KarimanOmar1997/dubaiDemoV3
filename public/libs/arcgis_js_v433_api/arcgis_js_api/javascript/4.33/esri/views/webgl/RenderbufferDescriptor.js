// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./Util"],(function(t,e){"use strict";t.RenderbufferDescriptor=class{constructor(t,e=0,i=e){this.internalFormat=t,this.width=e,this.height=i,this.multisampled=!1,this.samples=1}},t.estimateMemory=function(t){return t.width<=0||t.height<=0||null==t.internalFormat?0:t.width*t.height*e.getBytesPerElementFormat(t.internalFormat)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));