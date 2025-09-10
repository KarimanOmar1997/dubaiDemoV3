// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/quantityUtils"],(function(t,e){"use strict";t.autoSize2D=function({topLeft:t,topRight:n,bottomRight:o,bottomLeft:i,spatialReference:u,automaticLengthMeasurementUtils:{autoDistance2D:l}}){const a=e.max(l(i,o,u),l(t,n,u));if(null==a)return null;const r=e.max(l(o,n,u),l(i,t,u));return null==r?null:{xSize:a,ySize:r}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));