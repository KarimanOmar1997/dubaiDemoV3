// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../SpatialReference","../spatialReferenceEllipsoidUtils","./spatialReferenceUtils","./SupportedGCSWkids"],(function(e,i,t,r,s){"use strict";e.getGCSForPlanet=function(e){return r.equals(e,t.SphericalPCPFMars)||r.isMars(e)?{wkid:s.SupportedGCSWkids.GCSMARS2000}:r.equals(e,t.SphericalPCPFMoon)||r.isMoon(e)?{wkid:s.SupportedGCSWkids.GCSMOON2000}:i.WGS84},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));