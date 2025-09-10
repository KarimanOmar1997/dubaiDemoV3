/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{s as e,x as t}from"./componentsUtils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */function n(){const{disabled:e}=this;e||HTMLElement.prototype.click.call(this)}function i(e){e.target.disabled&&e.preventDefault()}const o=["mousedown","mouseup","click"];function a(e){e.target.disabled&&(e.stopImmediatePropagation(),e.preventDefault())}const r={capture:!0};function c(e){if(e.disabled)return e.el.setAttribute("aria-disabled","true"),e.el.contains(document.activeElement)&&document.activeElement.blur(),void function(e){var t;e.el.click=n,(t=e.el).addEventListener("pointerdown",i,r),o.forEach((e=>t.addEventListener(e,a,r)))}(e);!function(e){var t;delete e.el.click,(t=e.el).removeEventListener("pointerdown",i,r),o.forEach((e=>t.removeEventListener(e,a,r)))}(e),e.el.removeAttribute("aria-disabled")}const s=({children:n,disabled:i})=>t`<div class=${e("interaction-container")} .inert=${i}>${n}</div>`;export{s as I,c as u};
