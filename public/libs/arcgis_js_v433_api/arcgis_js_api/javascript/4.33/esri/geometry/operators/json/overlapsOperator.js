// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/OperatorOverlaps","../support/jsonConverter"],(function(e,t,r){"use strict";const o=new t.OperatorOverlaps;e.execute=function(e,t){const n=r.fromGeometry(e);return o.execute(n.getGeometry(),r.fromGeometryToGXGeometry(t),n.getSpatialReference(),null)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));