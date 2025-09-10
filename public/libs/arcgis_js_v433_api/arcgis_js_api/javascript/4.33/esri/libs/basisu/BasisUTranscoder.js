// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["require","exports","../../assets"],(function(e,s,t){"use strict";let i;s.getBasisTranscoder=function(){return i??=(async()=>{const s=await new Promise(((s,t)=>e(["../../chunks/basis_transcoder"],s,t))),i=await s.default({locateFile:e=>t.getAssetUrl(`esri/libs/basisu/${e}`)});return i.initializeBasis(),i})(),i},Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})}));