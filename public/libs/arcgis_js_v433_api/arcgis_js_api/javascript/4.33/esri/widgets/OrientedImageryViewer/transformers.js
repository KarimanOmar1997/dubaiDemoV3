// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define((function(){"use strict";return{point:n=>"point"===n.type?n:"polygon"===n.type||"polyline"===n.type?n.extent?.center??null:null,polygon:n=>"polygon"===n.type?n:null,polyline:n=>"polyline"===n.type?n:null}}));