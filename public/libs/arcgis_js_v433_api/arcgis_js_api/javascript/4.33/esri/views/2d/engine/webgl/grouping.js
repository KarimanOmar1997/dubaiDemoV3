// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/string"],(function(e,t){"use strict";function r(e,r){let n;if("string"==typeof e)n=t.numericHash(e+`-seed(${r})`);else{let t=12;n=e^r;do{n=107*(n>>8^n)+t|0}while(0!==--t)}return(1+n/(1<<31))/2}e.getRandomValue=r,e.getStartGroup=function(e){return Math.floor(10*r(e,53290320))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));