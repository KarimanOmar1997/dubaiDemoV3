/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{l as n}from"./logger2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */function t(n){return"l"===n?"m":"s"}function e(t,e,a){t[e]||t[a]||n.warn(`[${t.el.localName}] "${e.toString()}" or "${a.toString()}" is required.`)}function a(n){return n.hidden||n.itemHidden}async function i(n){await n.componentOnReady(),await n.updateComplete}export{i as c,t as g,a as i,e as w};
