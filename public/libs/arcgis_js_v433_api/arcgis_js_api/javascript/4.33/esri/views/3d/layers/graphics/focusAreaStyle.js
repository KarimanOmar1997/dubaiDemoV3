// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";const t=.42,r=.32;e.focusAreaHUDColor=function(e,o){if(e)switch(o){case"bright":{const t=(e[0]+e[1]+e[2])/3;return[t*r+(1-r),t*r+(1-r),t*r+(1-r),e[3]*r]}case"dark":return[e[0]*t,e[1]*t,e[2]*t,e[3]*t]}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));