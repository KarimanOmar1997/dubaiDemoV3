/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{s as t,x as r}from"./componentsUtils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */function s(t){return t.charAt(0).toUpperCase()+t.slice(1)}function e({text:s,pattern:e}){if(!e||!s)return s;const n=s.split(e);return n.length>1&&(n[1]=r`<mark class=${t("text-match")}>${n[1]}</mark>`),n}export{s as c,e as h};
