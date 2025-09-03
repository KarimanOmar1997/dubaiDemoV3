/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{b as e}from"./componentsUtils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */const r=new Set,n={trace:0,debug:1,info:2,warn:4,error:8,off:10};function o(r,...o){(function(r){return n[r]>=n[e]})(r)&&console[r].call(this,"%ccalcite","background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;",...o)}let t;const a={debug:e=>o("debug",e),info:e=>o("info",e),warn:e=>o("warn",e),error:e=>o("error",e),trace:e=>o("trace",e),deprecated:function(e,{component:n,name:a,suggested:s,removalVersion:c}){const i=`${e}:${"component"===e?"":n}${a}`;if(r.has(i))return;r.add(i);const d=Array.isArray(s);d&&!t&&(t=new Intl.ListFormat("en",{style:"long",type:"disjunction"})),o("warn",`[${a}] ${e} is deprecated and will be removed in ${"future"===c?"a future version":`v${c}`}.${s?` Use ${d?t.format(s.map((e=>`"${e}"`))):`"${s}"`} instead.`:""}`)}};export{a as l};
