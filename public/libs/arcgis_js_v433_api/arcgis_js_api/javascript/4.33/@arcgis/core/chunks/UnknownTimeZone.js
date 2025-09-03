/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{I as n,Z as t}from"./datetime.js";class s{static{this.instance=new n("Etc/UTC")}}function a(n){return n instanceof t?n===s.instance:"unknown"===n?.toString().toLowerCase()}function e(n){return a(n)?s.instance:n}export{s as U,a as i,e as s};
