// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../geometry/ellipsoidUtils","../../geometry/spatialReferenceEllipsoidUtils","../../geometry/support/spatialReferenceUtils"],(function(e,t,i,r){"use strict";e.computeEuclideanMeasurementSR=function(e){return r.isEarth(e)?r.isWGS84(e)||r.isWebMercator(e)||r.isCGCS2000(e)||t.isSphericalECEF(e)?i.WGS84ECEFSpatialReference:e:i.getSphericalPCPF(e)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));