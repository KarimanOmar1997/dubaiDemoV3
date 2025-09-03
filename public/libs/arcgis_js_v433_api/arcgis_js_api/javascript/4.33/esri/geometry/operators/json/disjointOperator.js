// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/ProjectionTransformation","../support/jsonConverter"],(function(e,t,o){"use strict";const r=new t.OperatorDisjoint;e.execute=function(e,t){const n=o.fromGeometry(e);return r.execute(n.getGeometry(),o.fromGeometryToGXGeometry(t),n.getSpatialReference())},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));