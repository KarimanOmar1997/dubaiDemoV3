/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
class t{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get outerSize(){return this._outer.size}get(t,e){return this._outer.get(t)?.get(e)}getInner(t){return this._outer.get(t)}set(t,e,r){const s=this._outer.get(t);s?s.set(e,r):this._outer.set(t,new Map([[e,r]]))}delete(t,e){const r=this._outer.get(t);r&&(r.delete(e),0===r.size&&this._outer.delete(t))}forEach(t){this._outer.forEach(((e,r)=>t(e,r)))}forAll(t){this._outer.forEach(((e,r)=>e.forEach(((e,s)=>t(e,r,s)))))}}export{t as N};
