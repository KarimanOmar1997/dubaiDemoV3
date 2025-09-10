// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../chunks/vec32","../../../../../chunks/sphere"],(function(e,n,t){"use strict";e.boundsFromEdge=function(e,d,c){const o=t.create(),r=t.getCenter(o);return n.scaleAndAdd(r,r,e,.5),n.scaleAndAdd(r,r,d,.5),o[3]=n.distance(r,e),n.add(r,r,c),o},e.maxCandidateCount=1e3,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));