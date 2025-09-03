/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{i as s}from"./editableLayers.js";import{b as a,f as r,h as e}from"./layerUtils.js";function n(s,a,r){if(!a||!s?.map)return;const{map:e}=s;e.layers.find((s=>s===a))||e.add(a,r)}function t(s,a){const r="subtype-sublayer"===a?.type?a.parent:a;return s.allLayerViews.find((s=>{const a=s.layer;return a===r||"sublayers"in a&&null!=a.sublayers&&a.sublayers.includes(r)}))}function i(n){return s(n)||a(n)||r(n)||e(n)}export{n as a,t as f,i};
