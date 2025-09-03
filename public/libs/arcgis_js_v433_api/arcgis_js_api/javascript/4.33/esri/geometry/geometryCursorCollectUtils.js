// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.collectMultipath=function(t){const e=[];for(t.reset();t.nextPath();){const n=[];for(;t.nextPoint();)n.push([t.x,t.y]);e.push(n)}return t.reset(),e},t.collectPath=function(t){const e=[];for(;t.nextPoint();)e.push([t.x,t.y]);return t.seekPathStart(),e},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));