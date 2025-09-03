// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.makeScheduleFunction=function(e){return r=>{if(e.immediate)return e.immediate.schedule(r);const t="No immediate scheduler";throw console.error(t),new Error(t)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));