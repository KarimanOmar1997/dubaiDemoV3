// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.RenderPluginInput=class{constructor(){this._inputs=new Map}set(t,e){this._inputs.set(t,e)}get(t){return this._inputs.get(t)}has(t){return this._inputs.has(t)}release(t){this._inputs.get(t)?.release()&&this._inputs.delete(t)}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));