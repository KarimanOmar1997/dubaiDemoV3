// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.PerOriginData=class{constructor(e){this.origin=e,this.buffers=new Array}dispose(){this.buffers.forEach((e=>e.vao.dispose())),this.buffers.length=0}findBuffer(e){return this.buffers.find((s=>s.instances.has(e)))}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));