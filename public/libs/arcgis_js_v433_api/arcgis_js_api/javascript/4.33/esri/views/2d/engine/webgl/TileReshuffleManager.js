// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.TileReshuffleManager=class{constructor(){this._candidateTiles=[]}schedule(e){this._candidateTiles.includes(e)||this._candidateTiles.push(e)}reshuffle(e){const s=[];for(const i of this._candidateTiles)e>0?(i.reshuffle(),e--):s.push(i);this._candidateTiles=s}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));