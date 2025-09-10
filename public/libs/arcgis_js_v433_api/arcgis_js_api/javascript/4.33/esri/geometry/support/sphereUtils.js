// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/mathUtils","../../chunks/vec32"],(function(t,e,n){"use strict";t.cartesianToSpherical=function(t,a){const s=n.length(t),c=e.asinClamped(t[2]/s),i=Math.atan2(t[1]/s,t[0]/s);return n.set(a,s,c,i),a},t.sphericalToCartesian=function(t,e){const a=t[0],s=t[1],c=t[2],i=Math.cos(s);n.set(e,a*i*Math.cos(c),a*i*Math.sin(c),a*Math.sin(s))},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));