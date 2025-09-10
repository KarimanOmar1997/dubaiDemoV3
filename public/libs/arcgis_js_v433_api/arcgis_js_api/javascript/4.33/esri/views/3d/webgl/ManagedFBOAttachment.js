// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./ManagedFBOResource"],(function(e,t){"use strict";class s extends t.ManagedFBOResource{constructor(e,t,s){super(e,s),this.attachment=t,this.name=""}dispose(){this.attachment.dispose()}get cachedMemory(){return this.attachment.usedMemory}}e.ManagedFBOAttachment=s,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));