// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./executionError"],(function(e,r){"use strict";const t=Object.freeze({aborted:!1});e.neverAbortedSignal=t,e.toSymbolId=function(e){if("string"==typeof e)return e.toLowerCase();if("name"in e)return e.name.toLowerCase();if("string"!=typeof e.value)throw new r.ArcadeExecutionError(null,r.ExecutionErrorCodes.InvalidIdentifier,null);return e.value.toLowerCase()},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));