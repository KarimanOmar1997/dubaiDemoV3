/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{i as s,I as t}from"./IntersectorResult.js";class r{constructor(s){this.layerViewUid=s}}class e extends r{constructor(s,t){super(s),this.graphicUid=t}}class i extends e{constructor(s,t,r,e,i){super(s,t),this.layerViewUid=s,this.graphicUid=t,this.triangleNr=r,this.baseBoundingSphere=e,this.numLodLevels=i}}function a(r){return s(r)&&r.intersector===t.LOD&&!!r.target}export{e as G,i as L,r as a,a as i};
