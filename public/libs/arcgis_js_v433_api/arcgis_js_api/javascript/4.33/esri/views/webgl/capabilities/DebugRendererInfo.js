// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";class n{constructor(e){this.getUnmaskedRenderer=e}}e.RendererInfo=n,e.loadRendererInfo=function(e){const r=e.getExtension("WEBGL_debug_renderer_info");return r?new n((()=>e.getParameter(r.UNMASKED_RENDERER_WEBGL))):null},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));