// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/Error"],(function(r,e){"use strict";r.checkWasmError=function(r,o,c){if(0!==r.error_code)throw new e(o,c,{errorCode:r.error_code,errorMessage:r.error_message})},r.wasmErrorToEsriError=function(r){return r?.error_code?new e("knowledgeGraphService:server-or-decoding-error",r.error_message,{errorCode:r.error_code}):void 0},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));