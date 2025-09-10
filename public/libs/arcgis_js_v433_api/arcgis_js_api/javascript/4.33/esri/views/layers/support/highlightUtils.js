// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/arrayUtils","../../../core/Collection","../../../support/guards"],(function(r,e,t,i){"use strict";r.getHighlightGraphics=function(r){if(!r)return[];let o=i.isGraphic(r)?[r]:t.isCollection(r)?r.toArray():Array.isArray(r)?r:[];return o=o?.filter(e.isSome),0===(o?.length??0)?[]:o},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));