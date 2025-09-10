// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../shaderModules/glsl"],(function(e,l){"use strict";e.HighlightReadBitmap=function(e){const{fragment:t}=e;t.code.add(l.glsl`uint readChannelBits(uint channel, int highlightLevel) {
int llc = (highlightLevel & 3) << 1;
return (channel >> llc) & 3u;
}
uint readChannel(uvec2 texel, int highlightLevel) {
int lic = (highlightLevel >> 2) & 1;
return texel[lic];
}
uint readLevelBits(uvec2 texel, int highlightLevel) {
return readChannelBits(readChannel(texel, highlightLevel), highlightLevel);
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));