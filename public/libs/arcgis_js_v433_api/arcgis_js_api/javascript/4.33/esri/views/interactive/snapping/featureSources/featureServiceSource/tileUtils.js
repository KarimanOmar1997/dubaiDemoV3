// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../chunks/vec32","../../../../../core/libs/gl-matrix-2/factories/vec3f64","../../../../../chunks/boundedPlane"],(function(e,t,n,c){"use strict";const o=c.create(),i=n.create();e.distanceToTile=function(e,n){return c.fromAABoundingRect(n.extent,o),c.distance(o,t.set(i,e.x,e.y,0))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));