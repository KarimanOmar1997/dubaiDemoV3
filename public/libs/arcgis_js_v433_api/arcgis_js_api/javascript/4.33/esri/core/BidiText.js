// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./BidiEngine"],(function(e,t){"use strict";const i=new t;e.bidiText=function(e){if(null==e)return["",!1];if(!i.hasBidiChar(e))return[e,!1];let t;return t="rtl"===i.checkContextual(e)?"IDNNN":"ICNNN",[i.bidiTransform(e,t,"VLYSN"),!0]},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));