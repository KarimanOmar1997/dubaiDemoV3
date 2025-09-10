// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["require","exports","../../assets"],(function(e,t,r){"use strict";let n;t.getDXTEncoder=function(){return n??=(async()=>{const t=await new Promise(((t,r)=>e(["../../chunks/dxt_encoder"],t,r)));return await t.default({locateFile:e=>r.getAssetUrl(`esri/libs/dxtEncoder/${e}`)})})(),n},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));