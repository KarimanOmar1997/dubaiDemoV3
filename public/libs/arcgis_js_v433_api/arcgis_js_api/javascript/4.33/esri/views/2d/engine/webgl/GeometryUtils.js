// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";const n=128/Math.PI,e=256/360,o=1/Math.LN2;function r(t,n){return(t%=n)>=0?t:t+n}t.between=function(t,n,e){return t>=n&&t<=e||t>=e&&t<=n},t.degToByte=function(t){return r(t*e,256)},t.interpolate=function(t,n,e){return t*(1-e)+n*e},t.log2=function(t){return Math.log(t)*o},t.positiveMod=r,t.radToByte=function(t){return r(t*n,256)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));