// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./debounce"],(function(n,i){"use strict";n.throttle=function(n,e,t){var r=!0,o=!0;if("function"!=typeof n)throw new TypeError("Expected a function");return i.isObject(t)&&(r="leading"in t?!!t.leading:r,o="trailing"in t?!!t.trailing:o),i.debounce(n,e,{leading:r,maxWait:e,trailing:o})}}));