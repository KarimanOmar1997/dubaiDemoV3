// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./support/builderUtils","../support/executorUtils"],(function(e,t,o){"use strict";e.execute=function({templatePart:e,shape:r,edits:i,relationships:s,mode:n}){if(!o.isPolygon(r))return;const{centroid:a}=r;a&&t.makeFeatureFromGroupPart({templatePart:e,shape:a,edits:i,relationships:s,mode:n})},e.isAsync=!1,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));