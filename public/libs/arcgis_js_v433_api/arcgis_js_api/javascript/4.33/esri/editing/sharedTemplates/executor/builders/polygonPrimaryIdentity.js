// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./support/builderUtils","../support/executorUtils"],(function(e,t,o){"use strict";e.execute=function({templatePart:e,shape:s,edits:i,relationships:r,mode:a}){o.isPolygon(s)&&t.makeFeatureFromGroupPart({templatePart:e,shape:s.clone(),edits:i,relationships:r,mode:a})},e.isAsync=!1,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));