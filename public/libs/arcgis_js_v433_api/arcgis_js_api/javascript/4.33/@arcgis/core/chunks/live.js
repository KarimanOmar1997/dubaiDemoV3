/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{e,d as t,t as r,T as i,E as n}from"./componentsUtils.js";import{f as s,m as o}from"./directive-helpers.js";const T=e(class extends t{constructor(e){if(super(e),e.type!==r.PROPERTY&&e.type!==r.ATTRIBUTE&&e.type!==r.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!s(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===i||t===n)return t;const s=e.element,T=e.name;if(e.type===r.PROPERTY){if(t===s[T])return i}else if(e.type===r.BOOLEAN_ATTRIBUTE){if(!!t===s.hasAttribute(T))return i}else if(e.type===r.ATTRIBUTE&&s.getAttribute(T)===t+"")return i;return o(e),t}});export{T as l};
