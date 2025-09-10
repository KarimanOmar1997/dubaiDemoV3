/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{M as t}from"./MemCache.js";class s{constructor(s,e){this.removeFunc=e,this._storage=new t,this.id="",this.name="",this.size=0,this._storage.maxSize=s,this._storage.register(this)}destroy(){this._storage.deregister(this),this._storage.destroy()}put(t,s,e=1){this._storage.put(this,t,s,e,1)}pop(t){return this._storage.pop(this,t)}get(t){return this._storage.get(this,t)}clear(){this._storage.clearAll()}get maxSize(){return this._storage.maxSize}set maxSize(t){this._storage.maxSize=t}resetHitRate(){}}export{s as L};
