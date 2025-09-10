// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/glsl"],(function(e,l){"use strict";e.IsNaN=function(e){const o=l.glsl`bool isNaN( float val )
{
return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true;
}`;e.code.add(o)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));