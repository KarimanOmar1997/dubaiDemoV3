/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import e from"../core/Error.js";import{g as r}from"./capabilities2.js";function s(s){const t=r();return t.available?"3d"===s&&t.majorPerformanceCaveat?new e("webgl:major-performance-caveat-detected",`Your WebGL implementation (${t.unmaskedRenderer}) doesn't seem to support hardware accelerated rendering. Check your browser settings or if your GPU is in a blocklist.`):t.supportsHighPrecisionFragment?t.supportsVertexShaderSamplers?null:new e("webgl:vertex-shader-samplers-required","WebGL support for vertex shader samplers is required but not supported."):new e("webgl:high-precision-fragment-required","WebGL support for high precision fragment shaders is required but not supported."):new e("webgl:required","WebGL2 is required but not supported.",(new Error).stack)}export{s as c};
