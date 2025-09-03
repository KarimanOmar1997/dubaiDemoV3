// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/OperatorTouches","../support/jsonConverter"],(function(e,t,o){"use strict";const r=new t.OperatorTouches;e.execute=function(e,t){const n=o.fromGeometry(e);return r.execute(n.getGeometry(),o.fromGeometryToGXGeometry(t),n.getSpatialReference(),null)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));