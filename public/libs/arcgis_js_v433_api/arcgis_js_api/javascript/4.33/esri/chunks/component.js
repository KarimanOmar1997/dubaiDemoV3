// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./logger"],(function(n,e){"use strict";n.componentFocusable=async function(n){await n.componentOnReady(),await n.updateComplete},n.getIconScale=function(n){return"l"===n?"m":"s"},n.isHidden=function(n){return n.hidden||n.itemHidden},n.warnIfMissingRequiredProp=function(n,t,i){n[t]||n[i]||e.logger.warn(`[${n.el.localName}] "${t.toString()}" or "${i.toString()}" is required.`)}}));