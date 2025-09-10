// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.LevelSelector=class{constructor(e,t){this._worldSpaceRadius=e,this._minScreenSpaceRadii=t}selectLevel(e,t,i){const c=i.computeScreenPixelSizeAt(e),r=this._worldSpaceRadius*t/c;let n=0;for(let e=1;e<this._minScreenSpaceRadii.length;++e)r>=this._minScreenSpaceRadii[e]&&(n=e);return n}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));