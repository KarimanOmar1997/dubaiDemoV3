// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.disableVideoZoomAndPan=function(e){if(!e)throw new Error("Missing View");return e.ui.remove("zoom"),e.on(["key-down","mouse-wheel","double-click","drag"],(e=>{e.stopPropagation()}))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));