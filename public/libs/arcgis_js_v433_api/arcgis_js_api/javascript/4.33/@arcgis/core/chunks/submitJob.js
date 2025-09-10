/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import o from"../rest/geoprocessor/GPOptions.js";import r,{c as s}from"../rest/support/JobInfo.js";async function t(t,e,n,m){return n=o.from(n||{}),s(t,"submitJob",n,e??{},m).then((({data:o})=>{const s=r.fromJSON(o);return s.sourceUrl=t,s}))}export{t as s};
