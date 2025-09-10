// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../utils","./operations/queryAttachments","../support/AttachmentQuery"],(function(t,e,r,n){"use strict";t.executeAttachmentQuery=async function(t,u,c){const o=e.parseUrl(t);return r.executeAttachmentQuery(o,n.from(u),{...c}).then((t=>r.processAttachmentQueryResult(o,t)))},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));