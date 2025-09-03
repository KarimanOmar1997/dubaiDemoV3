/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{W as e,F as r}from"./enums4.js";import{A as s}from"./AGraphicContainer.js";import{r as i}from"./util.js";class t extends s{renderChildren(s){for(const e of this.children)e.setTransform(s.state);if(super.renderChildren(s),this._updateAttributeView(),this.children.some((e=>e.hasData))){switch(s.drawPhase){case e.MAP:this._renderChildren(s,r.All);break;case e.HIGHLIGHT:this.hasHighlight&&this._renderHighlight(s)}this._boundsRenderer&&this._boundsRenderer.doRender(s)}}_renderHighlight(e){i(e,!1,(e=>{this._renderChildren(e,r.Highlight)}))}}export{t as G};
