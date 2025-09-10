/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{L as s,h as e,s as t,x as i,i as o,a as r}from"./componentsUtils.js";import{g as l}from"./guid.js";import"./assets.js";import"../config.js";import"../core/lang.js";import"../request.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./Logger.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */const a="container",n="selected",c=o`:host{display:flex}.container{display:none;inline-size:var(--calcite-container-size-content-fluid)}:host([selected]) .container{display:block}:host([hidden]){display:none}[hidden]{display:none}`;class p extends s{constructor(){super(...arguments),this.guid=`calcite-carousel-item-${l()}`,this.selected=!1}static{this.properties={label:1,selected:[7,{},{reflect:!0,type:Boolean}]}}static{this.styles=c}render(){const s=this.el.id||this.guid;return e(this.el,"id",s),i`<div .ariaLabel=${this.label} class=${t({[a]:!0,[n]:this.selected})} role=tabpanel><slot></slot></div>`}}r("calcite-carousel-item",p);export{p as CarouselItem};
