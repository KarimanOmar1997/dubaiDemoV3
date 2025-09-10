/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{n as t}from"./ref.js";import{i}from"./keyed.js";import{s as o,E as e,f as r,x as s}from"./componentsUtils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */const $={width:12,height:6,strokeWidth:1},a=({floatingLayout:a,key:h,ref:n})=>{const{width:d,height:l,strokeWidth:c}=$,f=d/2,g="vertical"===a,k=`M0,0 H${d} L${d-f},${l} Q${f},${l} ${f},${l} Z`;return i(h,s`<svg aria-hidden=true class=${o("calcite-floating-ui-arrow")} height=${d} viewBox=${`0 0 ${d} ${d+(g?0:c)}`} width=${d+(g?c:0)} ${t(n)}>${r`${r`<path class=${o("calcite-floating-ui-arrow__stroke")} d=${k??e} fill=none stroke-width=${c+1} />`||""}<path d=${k??e} stroke=none />`}</svg>`)};export{a as F};
