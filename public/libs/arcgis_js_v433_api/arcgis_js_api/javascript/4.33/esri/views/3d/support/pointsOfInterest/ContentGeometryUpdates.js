// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/Evented","../../../../core/mapCollectionUtils"],(function(e,t,o){"use strict";e.ContentGeometryUpdates=class{constructor(e){this.events=new t,this._handles=o.mapCollection((()=>e),(e=>e.on("visible-geometry-changed",(e=>this.events.emit("request-update",e)))))}destroy(){this._handles.destroy()}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));