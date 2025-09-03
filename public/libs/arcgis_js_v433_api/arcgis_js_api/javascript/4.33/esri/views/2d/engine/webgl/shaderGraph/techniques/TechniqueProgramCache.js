// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.TechniqueProgramCache=class{constructor(){this._programCache=new Map}destroy(){for(const e of this._programCache.values())e.destroy();this._programCache.clear()}getProgram(e,r,t,o,a){const s=e.getShaderKey(r,t,o,a);let c=this._programCache.get(s);return c||(c=e.getProgram(r,t,o,a),this._programCache.set(s,c)),c}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));