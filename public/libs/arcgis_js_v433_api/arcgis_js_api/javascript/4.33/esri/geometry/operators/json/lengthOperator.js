// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/unitUtils","../support/jsonConverter"],(function(e,t,n){"use strict";e.execute=function(e,o={}){const{unit:r}=o;let c=n.fromGeometryToGXGeometry(e).calculateLength2D();const i=n.getSpatialReference(e);return c&&r&&i&&(c=t.convertFromSpatialReferenceUnit(c,i,r)),c},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));