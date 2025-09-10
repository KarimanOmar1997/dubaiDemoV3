/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{Z as e}from"./componentsUtils.js";const{I:t}=e,n=e=>void 0===e.strings,o=()=>document.createComment(""),i=(e,n,i)=>{const A=e._$AA.parentNode,s=void 0===n?e._$AB:n._$AA;if(void 0===i){const n=A.insertBefore(o(),s),$=A.insertBefore(o(),s);i=new t(n,$,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,o=n!==e;if(o){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==s||o){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;A.insertBefore(e,s),e=t}}}return i},A=(e,t,n=e)=>(e._$AI(t,n),e),s={},$=(e,t=s)=>e._$AH=t,_=e=>e._$AH,r=e=>{e._$AP?.(!1,!0);let t=e._$AA;const n=e._$AB.nextSibling;for(;t!==n;){const e=t.nextSibling;t.remove(),t=e}};export{r as M,n as f,$ as m,_ as p,i as r,A as v};
