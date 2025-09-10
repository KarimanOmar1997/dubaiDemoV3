// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["require","exports","../../assets"],(function(e,t,n){"use strict";let u=null;t.loadParquetModule=async function(){return u||(u=async function(){const t=await new Promise(((t,n)=>e(["../../chunks/bundle"],t,n)));return await t.default({module_or_path:n.getAssetUrl("esri/libs/parquet/pkg/bundle_bg.wasm")}),t}()),u},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));