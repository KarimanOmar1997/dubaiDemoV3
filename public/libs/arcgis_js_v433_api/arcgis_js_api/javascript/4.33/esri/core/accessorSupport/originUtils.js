// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../multiOriginJSONSupportUtils"],(function(i,t){"use strict";i.updateOrigins=function(i){i?.writtenProperties&&i.writtenProperties.forEach((({target:i,propName:e,newOrigin:r})=>{t.isMultiOriginJSONMixin(i)&&r&&i.originOf(e)!==r&&i.updateOrigin(e,r)}))},Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})}));