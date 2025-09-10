// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../OptimizedFeature"],(function(e,t){"use strict";const r={getObjectId:e=>e.objectId,getAttributes:e=>e.attributes,getAttribute:(e,t)=>e.attributes[t],cloneWithGeometry:(e,r)=>new t.OptimizedFeature(r,e.attributes,null,e.objectId),getGeometry:e=>e.geometry,getCentroid:(e,t)=>e.ensureCentroid(t)};e.optimizedFeatureQueryEngineAdapter=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));