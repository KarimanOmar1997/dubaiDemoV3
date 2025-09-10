/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{b as t}from"./vec3f64.js";import{a as e,I as s,i as r}from"./IntersectorResult.js";class i{constructor(t,e,s){this.object=t,this.geometryId=e,this.primitiveIndex=s}}class o extends e{constructor(){super(...arguments),this.intersector=s.HUD}}class c extends i{constructor(e,s){super(e.object,e.geometryId,e.primitiveIndex),this.center=t(s)}}function n(t){return r(t)&&t.intersector===s.HUD&&!!t.target&&"center"in t.target}export{c as H,o as a,n as i};
