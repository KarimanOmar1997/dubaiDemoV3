// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(o){"use strict";o.mirror=function(o,t,e,r,f){const n=Math.floor(r/2);for(let r=0;r<n;r++)for(let n=0;n<t;n++)o[r*t+n]=o[(f-1-r)*t+n],o[(e-1-r)*t+n]=o[(e-f+r)*t+n];const l=Math.floor(f/2);for(let r=0;r<e;r++){const e=r*t;for(let r=0;r<l;r++)o[e+r]=o[e+f-1-r],o[e+t-r-1]=o[e+t+r-f]}},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));