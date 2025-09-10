// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.ReloadableShaderModule=class{constructor(e,t){this._module=e,this._load=t}get(){return this._module}async reload(){return this._module=await this._load(),this._module}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));