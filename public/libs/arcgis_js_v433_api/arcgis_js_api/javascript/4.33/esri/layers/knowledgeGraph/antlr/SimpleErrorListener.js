// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["../../../chunks/antlr4.web"],(function(r){"use strict";class s extends r.ErrorListener{constructor(){super(...arguments),this.errors=null}syntaxError(r,s,e,t,n,o){this.errors||(this.errors=[]),this.errors.push({line:e,column:t,msg:n,e:o})}}return s}));