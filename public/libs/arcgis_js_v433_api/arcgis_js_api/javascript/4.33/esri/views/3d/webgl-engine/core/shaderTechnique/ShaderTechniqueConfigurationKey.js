// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../core/arrayUtils"],(function(t,e){"use strict";t.ShaderTechniqueConfigurationKey=class{constructor(t){this._bits=[...t]}equals(t){return e.equals(this._bits,t.bits)}get code(){return this._code??=String.fromCharCode(...this._bits),this._code}get bits(){return this._bits}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));