/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import"./Logger.js";import"../core/lang.js";import"../core/Error.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{W as e,F as t}from"./enums4.js";import{A as i}from"./AGraphicContainer.js";import{r as o}from"./util.js";let a=class extends i{get hasHighlight(){return this.children.some((r=>r.hasData))}renderChildren(r){this.attributeView.update(),r.drawPhase===e.HIGHLIGHT&&this.children.some((r=>r.hasData))&&(super.renderChildren(r),r.context.setColorMask(!0,!0,!0,!0),o(r,!1,(r=>{this._renderChildren(r,t.Highlight)})))}};a=r([s("esri.views.2d.layers.graphics.HighlightGraphicContainer")],a);export{a as H};
