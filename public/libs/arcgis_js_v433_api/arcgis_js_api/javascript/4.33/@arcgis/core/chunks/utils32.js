/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import"./componentsUtils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */const t="calcite-list",e="calcite-list-item-group",s="calcite-list-item";function n(t){const e=t.parentElement?.closest(s);e&&(e.open=!0,n(e))}function i(n){const i=n.assignedElements({flatten:!0}),a=i.filter((t=>t?.matches(e))).map((t=>Array.from(t.querySelectorAll(s)))).flat(),c=i.filter((t=>t?.matches(s)));return{lists:i.filter((e=>e?.matches(t))),items:a.concat(c)}}function a(t){const e=t.assignedElements({flatten:!0}).filter((t=>t.matches(s))),n=e.filter((t=>!t.filterHidden));e.forEach((t=>{const e=n.indexOf(t);t.setPosition=-1===e?void 0:e+1,t.setSize=-1===e?void 0:n.length}))}function c(t,e=!1){const s=e?"ancestor::calcite-list-item | ancestor::calcite-list-item-group":"ancestor::calcite-list-item";return document.evaluate(s,t,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}function l(t){return"CALCITE-LIST-ITEM"===t.tagName}export{i as a,s as b,e as c,n as e,c as g,l as i,t as l,a as u};
