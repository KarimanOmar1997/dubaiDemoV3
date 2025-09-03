/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
const t="calcite-mode-",e="dark",s=/\W/g,a="--esri-calcite-mode-name";function c(){return getComputedStyle(document.body).getPropertyValue(a).replaceAll(s,"").toLowerCase()}function r(){return c()===e}function n(){const s=c();switch(s){case e:case"light":return`${t}${s}`;default:return null}}function o(e){const s=n();s&&(function(e){Array.from(e.classList).forEach((s=>{s.startsWith(t)&&e.classList.remove(s)}))}(e),e.classList.add(s))}export{n as g,r as i,a as m,o as s};
