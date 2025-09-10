// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["require","exports","../../assets"],(function(e,t,n){"use strict";function i(e){return n.getAssetUrl(`esri/libs/i3s/${e}`)}let s;t.get=function(){return s||(s=new Promise((t=>new Promise(((t,n)=>e(["../../chunks/i3s"],t,n))).then((e=>e.i3s)).then((({default:e})=>{const n=e({locateFile:i,onRuntimeInitialized:()=>t(n)});delete n.then})))).catch((e=>{throw e}))),s},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));