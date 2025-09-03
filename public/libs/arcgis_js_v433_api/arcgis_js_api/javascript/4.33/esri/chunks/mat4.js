// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";function t(e,t,o){const r=e.typedBuffer,f=e.typedBufferStride,n=t.typedBuffer,c=t.typedBufferStride,d=o?o.count:t.count;let u=(o?.dstIndex??0)*f,p=(o?.srcIndex??0)*c;for(let e=0;e<d;++e){for(let e=0;e<16;++e)r[u+e]=n[p+e];u+=f,p+=c}}const o=Object.freeze(Object.defineProperty({__proto__:null,copy:t},Symbol.toStringTag,{value:"Module"}));e.copy=t,e.mat4=o}));