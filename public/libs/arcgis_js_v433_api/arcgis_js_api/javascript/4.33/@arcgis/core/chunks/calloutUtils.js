/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import t from"../symbols/callouts/Callout3D.js";import n from"../symbols/callouts/LineCallout3D.js";function e(t){if(!t)return!1;const n=t.verticalOffset;return!(!n||n.screenLength<=0||null!=n.maxWorldLength&&n.maxWorldLength<=0)}function o(t){if(!t||!t.supportsCallout||!t.supportsCallout())return!1;const n=t.callout;return!!n?.visible&&!!e(t)}function l(t){return"point-3d"===t.type||"label-3d"===t.type}function r(t){return"center"===t.horizontalAlignment}const s={types:{key:"type",base:t,typeMap:{line:n}},json:{write:!0}};export{e as a,l as b,s as c,o as h,r as t};
