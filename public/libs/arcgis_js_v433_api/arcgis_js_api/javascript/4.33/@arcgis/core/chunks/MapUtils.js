/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
function n(n,t){for(const r of n.values())if(t(r))return!0;return!1}function t(n,t){if(null==n&&null==t)return!0;if(null==n||null==t||n.size!==t.size)return!1;for(const[r,e]of n)if(!t.has(r)||e!==t.get(r))return!1;return!0}function r(n,t){for(const r of n.values())if(t(r))return r;return null}function e(n,t,r){const e=n.get(t);if(void 0!==e)return e;const u=r();return n.set(t,u),u}function u(n){const t=new Map;return r=>(t.has(r)||t.set(r,n(r)),t.get(r))}export{t as e,r as f,e as g,u as m,n as s};
