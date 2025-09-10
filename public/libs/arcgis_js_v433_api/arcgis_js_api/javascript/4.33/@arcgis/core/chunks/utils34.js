/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import e from"../geometry/SpatialReference.js";import{d as r}from"./applyEditsUtils.js";function t(t){return t.map((t=>{const a=t.editedFeatures,i=e.fromJSON(a?.spatialReference);return a?{layerId:t.id,editedFeatures:r(a,i)}:null})).filter((e=>null!==e))}export{t as h};
