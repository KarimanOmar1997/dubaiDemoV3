// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./Background","./ColorBackground"],(function(e,r,t){"use strict";const o={base:r,key:"type",typeMap:{color:t}},n={types:o,json:{read:(a=o,(e,r,t)=>{if(!e)return e;for(const r in a.typeMap)if(e.type===r){const o=new a.typeMap[r];return o.read(e,t),o}}),write:{overridePolicy:(e,r,t)=>({enabled:!t?.isPresentation})}}};var a;e.backgroundProperty=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));