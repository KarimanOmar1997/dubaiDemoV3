/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import r from"../request.js";import{r as e}from"./asyncUtils.js";import a from"../core/Error.js";import{throwIfAborted as s,throwIfAbortError as t}from"../core/promiseUtils.js";import{isDataProtocol as o,dataToArrayBuffer as i}from"../core/urlUtils.js";class n{constructor(r){this._streamDataRequester=r}async loadJSON(r,e){return this._load("json",r,e)}async loadBinary(r,e){return o(r)?(s(e),i(r)):this._load("binary",r,e)}async loadImage(r,e){return this._load("image",r,e)}async _load(s,o,i){if(null==this._streamDataRequester)return(await r(o,{responseType:m[s]})).data;const n=await e(this._streamDataRequester.request(o,s,i));if(!0===n.ok)return n.value;throw t(n.error),new a("glt-loader-request-error",`Request for resource failed: ${n.error}`)}}const m={image:"image",binary:"array-buffer",json:"json","image+type":void 0};export{n as D};
