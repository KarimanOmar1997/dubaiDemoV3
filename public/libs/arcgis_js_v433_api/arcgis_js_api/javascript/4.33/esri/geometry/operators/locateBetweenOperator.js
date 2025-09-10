// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../chunks/Point2D","./gx/operatorLocateBetween","./support/apiConverter"],(function(e,t,o,r){"use strict";const n=o.supportsCurves();e.executeMany=function(e,n,p){const u=e.map(r.fromGeometry),s=r.getSpatialReference(e);return o.executeMany(u,new t.Envelope1D(n,p)).map((e=>r.toGeometry(e,s)))},e.supportsCurves=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));