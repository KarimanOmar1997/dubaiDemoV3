/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
const n={remove:()=>{}};function e(e){return e?{remove(){e&&(e(),e=void 0)}}:n}function o(n){n.forEach((n=>n?.remove()))}function r(n){o(n),n.length=0}function t(n){return e((()=>o(n)))}function u(n){return e((()=>n()?.remove()))}function c(n){return e((()=>n?.abort()))}function f(n){return e(null!=n?()=>n.destroy():void 0)}function i(n){(function(n){return"object"==typeof n&&!!n&&"remove"in n&&"function"==typeof n.remove})(n)&&n.remove()}function s(n){return{[Symbol.dispose](){n.remove()}}}export{c as a,r as b,s as c,f as d,o as e,u as f,t as h,e as m,i as r};
