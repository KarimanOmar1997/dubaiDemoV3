/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
function e(e,n){return"freehandPolygon"===n||"freehandPolyline"===n?"freehand":e??("rectangle"===n||"circle"===n?"hybrid":"click")}function n(e){switch(e){case"freehandPolygon":return"polygon";case"freehandPolyline":return"polyline";default:return e}}function r(e){return!!e&&("draw-2d"===e.type||"draw-3d"===e.type)}var a;!function(e){e[e.ForceCollapse=-1]="ForceCollapse",e[e.Low=0]="Low",e[e.Medium=10]="Medium",e[e.High=100]="High",e[e.Max=1e3]="Max"}(a||(a={}));export{a as L,n as a,e as g,r as i};
