// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./InterleavedLayout"],(function(e,t){"use strict";e.packInterleavedBuffer=function(e,u){return u.push(e.buffer),{buffer:e.buffer,layout:new t.PackedLayout(e.layout)}},e.unpackInterleavedBuffer=function(e){return new t.InterleavedLayout(e.layout).createView(e.buffer)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));