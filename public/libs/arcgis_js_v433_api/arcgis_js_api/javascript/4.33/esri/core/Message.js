// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["./object"],(function(e){"use strict";return class{constructor(t,s,i=void 0){var r;this.name=t,this.details=i,this.message=(s&&(r=i,s.replaceAll(/\$\{([^\s:}]*)(?::([^\s:}]+))?\}/g,((t,s)=>""===s?"$":(e.getDeepValue(s,r)??"").toString()))))??""}toString(){return"["+this.name+"]: "+this.message}}}));