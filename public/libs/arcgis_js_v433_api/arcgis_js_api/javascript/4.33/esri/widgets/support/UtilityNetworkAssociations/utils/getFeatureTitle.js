// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(t){"use strict";t.getFeatureTitle=function(t){const{attributes:e,sourceLayer:n}=t;if(!e||!n)return"";const l="displayField"in n?n.displayField:null,i=null!=l?e[l]:null,r=null!=i?i.toString():null,u=t.getObjectId()?.toString();return r||u||""},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));