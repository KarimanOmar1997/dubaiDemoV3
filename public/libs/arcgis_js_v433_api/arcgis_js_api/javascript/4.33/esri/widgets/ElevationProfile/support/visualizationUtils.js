// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../views/draw/support/createUtils"],(function(e,t){"use strict";e.createLineGeometry=function(e,n){const l=e.samples??[],r=l.length-1,o=[];let s=[];for(let e=0;e<=r;e++){const{x:t,y:n,z:u}=l[e];null!=u&&s.push([t,n,u]),e!==r&&null!=u||!s.length||(o.push(s),s=[])}return t.createPolyline(o,n,!0)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));