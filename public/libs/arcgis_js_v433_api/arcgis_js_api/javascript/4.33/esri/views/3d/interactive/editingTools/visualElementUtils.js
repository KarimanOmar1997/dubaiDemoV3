// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./lineObjectVisualElementUtils","./manipulatedObjectUtils","./originGeometryVisualElementUtils"],(function(e,t,l,n){"use strict";e.createVisualElements=function(e){switch(l.manipulatedObjectGeometry(e.object)?.type){case"point":case"mesh":return n.createVisualElements(e);case"polygon":case"polyline":return t.createVisualElements(e);default:return null}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));