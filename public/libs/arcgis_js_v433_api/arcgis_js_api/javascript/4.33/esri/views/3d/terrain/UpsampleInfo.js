// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/libs/gl-matrix-2/factories/vec2f64"],(function(t,s){"use strict";t.UpsampleInfo=class{constructor(){this._offset=s.create(),this.scale=0}get offset(){return this._offset}init(t,s,e,i){this.tile=t,this._offset[0]=s,this._offset[1]=e,this.scale=i}dispose(){this.tile=null,this._offset[0]=0,this._offset[1]=0,this.scale=0}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));