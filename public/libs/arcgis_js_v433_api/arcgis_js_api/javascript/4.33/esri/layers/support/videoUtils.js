// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/events"],(function(e,n){"use strict";e.whenVideoPlayable=function(e,t){return new Promise(((o,r)=>{e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?o():(t(n.once(e,"canplay",o)),t(n.once(e,"error",r)))}))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));