// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.MatcherContext=class{constructor(t,e,s,r,i){this.storage=t,this.proxy=e,this.viewParams=s,this.registry=r,this.fieldsMap=i}async createMeshWriters(t){const e=t.map((t=>this.registry.createMeshWriter(this.storage,this.proxy,this.viewParams,t,this.fieldsMap)));return Promise.all(e)}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));