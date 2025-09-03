// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.throttle=function(e,t,o,l){let n=null,r=1e3;"number"==typeof t?(r=t,l=o):(n=t??null,r=o);let u,i=0;const a=()=>{i=0,e.apply(l,u)},p=(...e)=>{n&&n.apply(l,e),u=e,r?i||(i=setTimeout(a,r)):a()};return p.remove=()=>{i&&(clearTimeout(i),i=0)},p.forceUpdate=()=>{i&&(clearTimeout(i),a())},p.hasPendingUpdates=()=>!!i,p},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));