// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../components/TooltipEditableField","../../../../widgets/support/jsxFactory"],(function(e,t,i){"use strict";e.Fields=function(e){const o=e.fields.filter((e=>!0===e?.visible));return 0===o.length?null:i.tsx(i.tsxFragment,null,o.map((o=>i.tsx(t.TooltipEditableField,{context:e.context,field:o,key:o.id,mode:e.mode}))))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));