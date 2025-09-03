/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
function n(n,r){for(const t of n.values())if(r(t))return!0;return!1}function r(n,r){if(!r)return n;for(const t of r)null!=t&&n.add(t);return n}function t(n,r){return null!=r&&n.add(r),n}function u(n,t){const u=new Set;return r(u,n),r(u,t),u}function o(n,r){const t=new Set;for(const u of r)n.has(u)&&t.add(u);return t}function e(n,r){if(!n||!r)return!1;if(n===r)return!0;for(const t of n)if(!r.has(t))return!1;return!0}function f(n,r){if(null==n&&null==r)return!0;if(null==n||null==r||n.size!==r.size)return!1;for(const t of n)if(!r.has(t))return!1;return!0}function s(n,r){const t=new Set(n);for(const n of r)t.delete(n);return t}function i(n,r){return s(u(n,r),o(n,r))}function c(n){let r;for(r of n);return r}export{t as a,r as b,n as c,s as d,f as e,e as f,o as i,c as l,i as s,u};
