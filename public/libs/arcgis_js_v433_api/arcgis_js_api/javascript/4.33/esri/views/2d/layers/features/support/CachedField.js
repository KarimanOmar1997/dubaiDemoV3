// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./AComputedField"],(function(e,t){"use strict";class r extends t.AComputedField{constructor(e){super(),this._field=e}resize(e){throw new Error("Method not implemented.")}read(e,t){return e.readAttribute(this._field)}readWithDefault(e,t){return e.readAttribute(this._field)}hasArcadeDependency(e){return!1}}e.CachedField=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));