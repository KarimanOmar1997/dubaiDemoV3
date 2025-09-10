// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.EventMatch=class{constructor(e,t=[]){this.eventType=e,this.keyModifiers=t}matches(e){if(e.type!==this.eventType)return!1;if(0===this.keyModifiers.length)return!0;const t=e.modifiers;for(const e of this.keyModifiers)if(!t.has(e))return!1;return!0}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));