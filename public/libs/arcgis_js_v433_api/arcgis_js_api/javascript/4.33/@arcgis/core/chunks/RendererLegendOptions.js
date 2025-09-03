/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import e from"../core/Clonable.js";import{s as o}from"./jsonMap.js";import s from"../core/JSONSupport.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import{e as n}from"./ensureType.js";import"../core/lang.js";import{e as p}from"./enumeration.js";import{subclass as i}from"../core/accessorSupport/decorators/subclass.js";var a;const c=o()({ascendingValues:"ascending-values",descendingValues:"descending-values"});let l=a=class extends(e.ClonableMixin(s)){static from(r){return n(a,r)}constructor(r){super(r),this.title=null,this.order=null}};r([t({type:String,json:{write:!0}})],l.prototype,"title",void 0),r([p(c)],l.prototype,"order",void 0),l=a=r([i("esri.renderers.support.RendererLegendOptions")],l);const m=l;export{m as R};
