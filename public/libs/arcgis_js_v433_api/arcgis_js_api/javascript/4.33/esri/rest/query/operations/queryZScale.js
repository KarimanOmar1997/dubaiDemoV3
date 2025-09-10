// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../geometry/support/zscale"],(function(e,t){"use strict";e.applyFeatureSetZUnitScaling=function(e,r,o){if(!o?.features||!o.hasZ)return;const n=t.getGeometryZScaler(o.geometryType,r,e.outSpatialReference);if(null!=n)for(const e of o.features)n(e.geometry)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));