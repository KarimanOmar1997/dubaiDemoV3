// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define((function(){"use strict";return class{constructor(){this.name=this.constructor.name||"UnnamedBrush",this.brushEffect=null}prepareState(t,r){}draw(t,r,s){}drawMany(t,r,s){for(const n of r)n.visible&&this.draw(t,n,s)}}}));