// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";const n=Symbol("ImageElementInstance"),t=Symbol("VideoElementInstance");function o(e){return null!=e&&"object"==typeof e&&n in e}function l(e){return null!=e&&"object"==typeof e&&t in e}e.ImageElementSymbol=n,e.VideoElementSymbol=t,e.isImageElement=o,e.isMediaElement=function(e){return o(e)||l(e)},e.isVideoElement=l,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));