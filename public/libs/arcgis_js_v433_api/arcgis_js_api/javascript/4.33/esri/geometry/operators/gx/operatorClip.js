// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/SimpleGeometryCursor","../../../chunks/OperatorClip"],(function(e,r,t){"use strict";const n=new t.OperatorClip;e.execute=function(e,r,t){return n.execute(e,r,t,null)},e.executeMany=function(e,t,u){const o=n.executeMany(new r.SimpleGeometryCursor(e),t,u,null);return Array.from(o)},e.supportsCurves=function(){return n.supportsCurves()},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));