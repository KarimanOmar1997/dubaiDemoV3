// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./dom"],(function(n,o){"use strict";function e(n){return n[n.openProp||"open"]}n.onToggleOpenCloseComponent=function(n){requestAnimationFrame((()=>{n.transitionEl&&o.whenTransitionDone(n.transitionEl,n.transitionProp,(()=>{e(n)?n.onBeforeOpen():n.onBeforeClose()}),(()=>{e(n)?n.onOpen():n.onClose()}))}))}}));