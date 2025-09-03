// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./Collection"],(function(e,r){"use strict";e.castForReferenceSetter=function(e){return e},e.referenceSetter=function(e,t,n=r){return t||(t=new n),t===e||(t.removeAll(),function(e){return e&&(Array.isArray(e)||"items"in e&&Array.isArray(e.items))}(e)?t.addMany(e):e&&t.add(e)),t},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));