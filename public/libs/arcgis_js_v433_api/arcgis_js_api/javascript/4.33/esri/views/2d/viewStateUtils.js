// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";const n=Math.PI/180;t.getBBox=function(t,n,e,o){const[r,a]=n,[i,s]=o,u=.5*e;return t[0]=r-u*i,t[1]=a-u*s,t[2]=r+u*i,t[3]=a+u*s,t},t.getOuterSize=function(t,e){const o=e.rotation*n,r=Math.abs(Math.cos(o)),a=Math.abs(Math.sin(o)),[i,s]=e.size;return t[0]=Math.round(s*a+i*r),t[1]=Math.round(s*r+i*a),t},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));