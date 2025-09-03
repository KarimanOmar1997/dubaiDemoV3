/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{F as n,e as i}from"./unitUtils.js";function s(n,i,s){if(null==n.hasM||n.hasZ)for(const n of i)for(const i of n)i.length>2&&(i[2]*=s)}function e(i,s,e){if(!i&&!s||!e)return;const f=n(e);t(i,e,f),t(s,e,f)}function t(n,i,s){if(n)for(const e of n)f(e.geometry,i,s)}function f(e,t,f){if(!e?.spatialReference||i(e.spatialReference,t))return;const o=n(e.spatialReference)/f;if(1!==o)if("x"in e)null!=e.z&&(e.z*=o);else if("rings"in e)s(e,e.rings,o);else if("paths"in e)s(e,e.paths,o);else if("points"in e&&(null==e.hasM||e.hasZ))for(const n of e.points)n.length>2&&(n[2]*=o)}export{e as u};
