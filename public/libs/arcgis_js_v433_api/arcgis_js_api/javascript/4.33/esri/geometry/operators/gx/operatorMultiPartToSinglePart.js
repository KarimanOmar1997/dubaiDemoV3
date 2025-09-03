// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/SimpleGeometryCursor","../../../chunks/OperatorMultiPartToSinglePart"],(function(e,r,t){"use strict";const n=new t.OperatorMultiPartToSinglePart;e.executeMany=function(e,t,o){const u=n.executeMany(new r.SimpleGeometryCursor(e),t,null,o);return Array.from(u)},e.supportsCurves=function(){return n.supportsCurves()},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));