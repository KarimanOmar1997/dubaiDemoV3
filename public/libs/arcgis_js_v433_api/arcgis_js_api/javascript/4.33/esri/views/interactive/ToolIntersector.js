// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../3d/webgl-engine/lib/Intersector","../3d/webgl-engine/lib/IntersectorInterfaces"],(function(e,t,n){"use strict";e.newToolIntersector=function(e){const o=new t.Intersector(e);return o.options.store=n.StoreResults.MIN,o.options.excludeLabels=!0,o},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));