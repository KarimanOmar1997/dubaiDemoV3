// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.FeatureTileSubscription=class{constructor(t,r){this.tile=t,this.version=r,this._abortController=new AbortController}get key(){return this.tile.key}get signal(){return this._abortController.signal}abort(){this._abortController.abort()}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));