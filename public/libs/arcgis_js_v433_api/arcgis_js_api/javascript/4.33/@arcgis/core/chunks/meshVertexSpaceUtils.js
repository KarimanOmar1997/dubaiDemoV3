/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{e}from"./vec3.js";import r from"../geometry/Point.js";import n from"../geometry/support/MeshGeoreferencedVertexSpace.js";import o from"../geometry/support/MeshLocalVertexSpace.js";function i(e){return null==e.origin}function t(e){return null!=e.origin}function c(e){return t(e.vertexSpace)}function s(e,n){if(!t(e))return null;const[o,i,c]=e.origin;return new r({x:o,y:i,z:c,spatialReference:n})}function u(e,r){const{x:i,y:t,z:c,spatialReference:s}=e,u=[i,t,c??0],a=r?.vertexSpace??function(e){return e.isGeographic||e.isWebMercator?"local":"georeferenced"}(s);return"local"===a?new o({origin:u}):new n({origin:u})}function a(r,n){return r.type===n.type&&(r.origin===n.origin||null!=r.origin&&null!=n.origin&&e(r.origin,n.origin))}export{c as a,a as b,i as c,t as i,u as s,s as v};
