// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./support/builderUtils","../support/executorUtils"],(function(e,t,i){"use strict";e.execute=function({templatePart:e,shape:o,edits:s,relationships:r,mode:a}){i.isPoint(o)&&t.makeFeatureFromGroupPart({templatePart:e,shape:o.clone(),edits:s,relationships:r,mode:a},"IDP1")},e.isAsync=!1,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));