// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/maybe"],(function(t,e){"use strict";t.WebGLDriverTestModule=class{constructor(){this._result=!1}dispose(){this._program=e.disposeMaybe(this._program)}get result(){return null!=this._program&&(this._result=this._test(this._program),this.dispose()),this._result}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));