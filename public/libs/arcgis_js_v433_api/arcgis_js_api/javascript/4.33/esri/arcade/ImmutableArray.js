// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define((function(){"use strict";return class{constructor(t=[]){this._elements=t}length(){return this._elements.length}get(t){return this._elements[t]}toArray(){return this.slice()}slice(t=0,e=this.length()){const s=[];for(let n=t;n<e;n++)s.push(this.get(n));return s}}}));