// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["../constants"],(function(t){"use strict";return class{constructor(e,s,r){this.layerExtent=t.tileCoordSize,this._features=[],this.layer=e,this.zoom=s,this._spriteInfo=r,this._filter=e.getFeatureFilter()}pushFeature(t){this._filter&&!this._filter.filter(t,this.zoom)||this._features.push(t)}hasFeatures(){return this._features.length>0}getResources(t,e,s){}}}));