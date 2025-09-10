// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.deserializeList=function(e,t,i){const n=e.readInt32(),r=new Array(n);for(let n=0;n<r.length;n++)r[n]=t.deserialize(e,i);return r},e.serializeList=function(e,t){if(null!==t){e.push(t.length);for(const i of t)i.serialize(e);return e}e.push(0)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));