// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/SetUtils","../../support/forms/formUtils"],(function(e,t,r){"use strict";e.attributesAreEquivalent=function(e,n){const o=e??{},s=n??{},i=new Set(Object.keys(o));t.addMany(i,Object.keys(s));for(const e of i){const t=o[e],n=s[e];if(!r.valuesAreEquivalent(t,n))return!1}return!0},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));