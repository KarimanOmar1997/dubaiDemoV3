// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./ManagedDepthAttachment","../../webgl/FBOAttachmentType"],(function(t,e,n){"use strict";class a extends e.ManagedDepthAttachment{constructor(t,e,n){super(t,e,n),this.attachment=e}}t.ManagedDepthTexture=a,t.isManagedDepthTexture=function(t){return t?.attachment.type===n.FBOAttachmentType.Texture},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));