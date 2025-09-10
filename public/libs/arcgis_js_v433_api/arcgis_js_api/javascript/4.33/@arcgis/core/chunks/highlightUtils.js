/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{i as r}from"../core/lang.js";import o from"../core/Collection.js";import{c as t}from"./guards.js";function i(i){if(!i)return[];let e=t(i)?[i]:o.isCollection(i)?i.toArray():Array.isArray(i)?i:[];return e=e?.filter(r),0===(e?.length??0)?[]:e}export{i as g};
