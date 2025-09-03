// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/arrayUtils","./gx/operatorLinesToPolygons","./support/apiConverter"],(function(e,o,t,r){"use strict";const n=t.supportsCurves();e.executeMany=function(e){const n=e.map(r.fromGeometry),s=r.getSpatialReference(e);return t.executeMany(n,r.fromSpatialReference(s)).map((e=>r.toPolygon(e,s))).filter(o.isSome)},e.supportsCurves=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));