// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../core/unitUtils","../portal/Portal"],(function(t,e,r){"use strict";t.getDefaultUnitForView=function(t){const n="metric";if(null==t)return n;const i=t.map,l=(i&&"portalItem"in i?i.portalItem?.portal:null)??r.getDefault();switch(l.user?.units??l.units){case n:return n;case"english":return"imperial"}return e.getDefaultUnitSystem(t.spatialReference)??n},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));