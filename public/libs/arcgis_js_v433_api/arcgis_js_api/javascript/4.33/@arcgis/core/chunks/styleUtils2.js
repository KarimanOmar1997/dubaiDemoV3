/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{r as e}from"./asyncUtils.js";import{throwIfAborted as r}from"../core/promiseUtils.js";import{W as s}from"./Warning.js";async function t(t,i,n){const o=t&&t.getAtOrigin&&t.getAtOrigin("renderer",i.origin);if(o&&"unique-value"===o.type&&o.styleOrigin){const a=await e(o.populateFromStyle());if(r(n),!1===a.ok){const e=a.error;i?.messages&&i.messages.push(new s("renderer:style-reference",`Failed to create unique value renderer from style reference: ${e.message}`,{error:e,context:i})),t.clear("renderer",i?.origin)}}}export{t as l};
