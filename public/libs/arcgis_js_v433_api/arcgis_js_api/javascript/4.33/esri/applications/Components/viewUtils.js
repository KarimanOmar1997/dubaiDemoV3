// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../views/support/waitForResources"],(function(e,t){"use strict";e.waitUpdated=async function(e){await t(e);const n="3d"===e.type?e.resourceController?.scheduler?.test?.getRunning()??null:null;if(null!=n)throw new Error(`View is not updating, but scheduler is running:${n} at ${(new Error).stack}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));