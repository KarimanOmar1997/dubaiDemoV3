/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{x as t}from"./componentsUtils.js";const e=Symbol.for(""),r=t=>{if(t?.r===e)return t?._$litStatic$},i=t=>({_$litStatic$:t,r:e}),o=(t,...r)=>({_$litStatic$:r.reduce(((e,r,i)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+t[i+1]),t[0]),r:e}),s=new Map,a=(l=t,(t,...e)=>{const i=e.length;let o,a;const n=[],u=[];let c,$=0,p=!1;for(;$<i;){for(c=t[$];$<i&&void 0!==(a=e[$],o=r(a));)c+=o+t[++$],p=!0;$!==i&&u.push(a),n.push(c),$++}if($===i&&n.push(t[i]),p){const r=n.join("$$lit$$");void 0===(t=s.get(r))&&(n.raw=n,s.set(r,t=n)),e=u}return l(t,...e)});var l;export{o as i,i as s,a as u};
