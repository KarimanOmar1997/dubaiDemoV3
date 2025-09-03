// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.RenderSceneResult=class{constructor(e,o){this.screen=e,this.olid=o}},e.removeLoadedShaderModules=function(){const e=globalThis.require?.modules;if(e){const o=Object.keys(e);for(const s of o)s.includes(".glsl")&&delete e[s]}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));