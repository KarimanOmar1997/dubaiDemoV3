// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../gx/operatorUnion","../support/jsonConverter"],(function(e,t,o){"use strict";e.execute=function(e,r){const n=o.fromGeometry(e),u=n.getSpatialReference();return o.toGeometry(t.execute(n.getGeometry(),o.fromGeometryToGXGeometry(r),u),u)},e.executeMany=function(e){const[r,n]=o.fromGeometries(e);return o.toGeometry(t.executeMany(r,n),n)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));