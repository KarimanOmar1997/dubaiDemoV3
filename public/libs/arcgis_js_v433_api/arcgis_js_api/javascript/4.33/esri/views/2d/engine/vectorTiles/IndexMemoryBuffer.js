// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./MemoryBuffer"],(function(e,r){"use strict";e.PointElementMemoryBuffer=class extends r{constructor(){super(4)}add(e){this.array.push(e)}},e.TriangleIndexBuffer=class extends r{constructor(){super(12)}add(e,r,s){const t=this.array;t.push(e),t.push(r),t.push(s)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));