/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{c as t}from"./maybe.js";import{isPromiseLike as e}from"../core/promiseUtils.js";class s{constructor(s,i){this._textures=s,this.loadPromise=null,this._disposed=!1;const r=this._textures.acquire(i);e(r)?(r.then((e=>{this._disposed?t(e):this._textureRef=e})),this.loadPromise=r):this._textureRef=r}dispose(){this._textureRef=t(this._textureRef),this._disposed=!0}get glTexture(){return null!=this._textureRef?this._textureRef.glTexture:null}}export{s as R};
