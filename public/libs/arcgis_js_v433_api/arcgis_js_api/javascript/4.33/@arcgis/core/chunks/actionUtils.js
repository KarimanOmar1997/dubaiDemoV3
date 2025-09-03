/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import"../intl.js";import{l as t}from"./componentsUtils.js";import"./widgetUtils.js";import{t as i}from"./jsxFactory.js";import{s as a}from"./substitute.js";const o=()=>t({action:()=>import("./index5.js")});function n(t,a,o){const{title:n,textEnabled:s}=a,{type:c,active:r,uid:d,disabled:l,indicator:u}=t;return t.visible?i("calcite-action",{...a,active:"toggle"===c&&t.value,appearance:"solid","data-action-id":t.id,"data-action-uid":d,disabled:l,icon:e(t),indicator:u,loading:r,scale:"s",text:n??"",title:s?void 0:n},o):null}function e(t){return t.icon?t.icon:"image"in t&&t.image||t.className?void 0:"question"}function s(t){return t?{backgroundImage:`url(${t})`}:{}}function c({action:t,feature:i}){const o=i?.attributes,n="image"in t?t.image:void 0;return n&&o?a(n,o):n??""}export{s as a,e as g,o as l,n as r,c as s};
