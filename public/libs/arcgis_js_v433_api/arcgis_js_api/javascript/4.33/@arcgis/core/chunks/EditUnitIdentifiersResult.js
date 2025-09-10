/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{_ as e}from"./tslib.es6.js";import r from"../core/JSONSupport.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import"./Logger.js";import{r as o}from"./reader.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{h as i}from"./utils34.js";let p=class extends r{constructor(e){super(e),this.moment=null,this.exceededTransferLimit=!1,this.serviceEdits=null}readServiceEdits(e,r){return i(e)}};e([t({type:Date})],p.prototype,"moment",void 0),e([t({type:Boolean})],p.prototype,"exceededTransferLimit",void 0),e([t({type:[Object]})],p.prototype,"serviceEdits",void 0),e([o("serviceEdits")],p.prototype,"readServiceEdits",null),p=e([s("esri.rest.networks.unitIdentifiers.support.EditUnitIdentifiersResult")],p);export{p as E};
