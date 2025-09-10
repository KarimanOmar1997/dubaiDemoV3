/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{w as o}from"./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */function n(o){return o[o.openProp||"open"]}function e(e){requestAnimationFrame((()=>{e.transitionEl&&o(e.transitionEl,e.transitionProp,(()=>{n(e)?e.onBeforeOpen():e.onBeforeClose()}),(()=>{n(e)?e.onOpen():e.onClose()}))}))}export{e as o};
