// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/arrayUtils","./gx/operatorAutoComplete","./support/apiConverter"],(function(e,o,t,r){"use strict";const n=t.supportsCurves();e.execute=function(e,n){const p=r.getSpatialReference(e);return t.execute(e.map(r.fromPolygon),n.map(r.fromPolyline),r.fromSpatialReference(p)).map((e=>r.toPolygon(e,p))).filter(o.isSome)},e.supportsCurves=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));