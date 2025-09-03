// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../geometry/support/Indices"],(function(t,e){"use strict";t.inputAttributesToAttributesMap=function(t){const n=new Map;for(const[i,o]of t)n.set(i,{...o,indices:e.compactIndices(o.indices)});return n},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));