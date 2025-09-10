// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";let e=0;function n(t=0){e=t}let r=0;function o(t=0){r=t}let i=0;function u(t=0){i=t}t.nextBloomId=function(){return i++},t.nextLinearGradientId=function(){return r++},t.nextPatternId=function(){return e++},t.resetBloomId=u,t.resetLinearGradientId=o,t.resetPatternId=n,t.resetSVGGlobalState=function(){n(),o(),u()},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));