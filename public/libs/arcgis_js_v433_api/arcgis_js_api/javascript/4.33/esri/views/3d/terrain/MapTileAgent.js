// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./TerrainConst","./TileAgent"],(function(e,t,n){"use strict";class r extends n.TileAgent{constructor(){super(),this.type="map",this._scaleRangeEnabled=!0}get _desiredMinLevelDelta(){return 0}get _progressiveLevelModulo(){return t.progressiveLoadingModulo}}e.MapTileAgent=r,e.isMapTileAgent=function(e){return"map"===e.type},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));