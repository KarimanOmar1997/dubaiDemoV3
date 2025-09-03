// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./StaticBitSet"],(function(t,e){"use strict";t.FeatureSetCache=class{constructor(t){this._valid=e.StaticBitSet.create(t),this._data=new Array(t)}has(t){return this._valid.has(t)}set(t,e){this._valid.set(t),this._data[t]=e}get(t){return this._data[t]}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));