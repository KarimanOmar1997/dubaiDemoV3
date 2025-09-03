/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{n as t}from"./ref.js";import{i as o}from"./keyed.js";import{s as n,E as e,x as s}from"./componentsUtils.js";import{g as a}from"./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1 */const c={button:"x-button",buttonRound:"x-button--round"},i=({disabled:i,focusable:b,key:l,label:u,onClick:r,ref:d,round:m=!0,scale:$,title:p})=>o(l,s`<button .ariaLabel=${u} class=${n({[(t=>`x-button--${t}`)($)]:!0,[c.button]:!0,[c.buttonRound]:m})} .disabled=${i} @click=${r} .tabIndex=${b?0:-1} title=${p??e} type=button ${t(d)}><calcite-icon icon=x .scale=${a($)}></calcite-icon></button>`);export{c as C,i as X};
