// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.arrayBufferToBase64=function(e){const r=new Uint8Array(e);let t="";for(let e=0;e<r.length;e++)t+=String.fromCharCode(r[e]);return btoa(t)},e.base64ToArrayBuffer=function(e){const r=atob(e),t=new Uint8Array(r.length);for(let e=0;e<r.length;e++)t[e]=r.charCodeAt(e);return t.buffer},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));