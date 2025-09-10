/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{o as e}from"./events.js";function r(r,t){return new Promise(((a,n)=>{r.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?a():(t(e(r,"canplay",a)),t(e(r,"error",n)))}))}export{r as w};
