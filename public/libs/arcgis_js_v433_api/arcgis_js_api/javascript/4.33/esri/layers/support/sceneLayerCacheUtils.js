// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.cacheIsOutOfSync=function({associatedLayer:e,serviceUpdateTimeStamp:t}){const n=e?.editingInfo?.lastEditDate,r=e?.serverGens,i=null!=n,s=null!=t,a=i&&s&&t.lastUpdate!==n.getTime();return i&&(a||!s&&r?.minServerGen!==r?.serverGen)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));