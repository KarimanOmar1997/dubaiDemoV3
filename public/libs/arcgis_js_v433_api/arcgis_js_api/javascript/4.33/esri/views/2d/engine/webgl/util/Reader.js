// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define((function(){"use strict";return class{constructor(t){this._pos=0,this._buffer=t,this._i32View=new Int32Array(this._buffer),this._f32View=new Float32Array(this._buffer)}readInt32(){return this._i32View[this._pos++]}readF32(){return this._f32View[this._pos++]}}}));