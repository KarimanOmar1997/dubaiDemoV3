// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./PropertyOrigin"],(function(e,t){"use strict";e.setupConstructedDefaults=function(e,n,r){n.keys().forEach((e=>{r.set(e,n.get(e),t.OriginId.DEFAULTS)}));const i=e.metadata;Object.keys(i).forEach((n=>{e.internalGet(n)&&r.set(n,e.internalGet(n),t.OriginId.DEFAULTS)}))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));