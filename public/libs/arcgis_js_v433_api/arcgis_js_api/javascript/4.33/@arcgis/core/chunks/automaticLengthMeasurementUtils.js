/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as e}from"./vec3f64.js";import{l as t,e as s,a,b as n}from"./geodesicLengthMeasurementUtils.js";async function o(){return e=await t(),{autoLength2D:t=>e.geodesicLength(t)??n(t),autoDistanceBetweenPoints2D:(t,s)=>e.geodesicDistanceBetweenPoints(t,s)??a(t,s),autoDistance2D:(t,a,n)=>(i[0]=t[0],i[1]=t[1],i[2]=3===t.length?t[2]:0,c[0]=a[0],c[1]=a[1],c[2]=3===a.length?a[2]:0,e.geodesicDistance(i,c,n)??s(i,c,n))};var e}const i=e(),c=e();export{o as l};
