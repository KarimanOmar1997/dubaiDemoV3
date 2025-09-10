// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./GPOptions","./utils","../support/JobInfo"],(function(t,o,e,n){"use strict";t.submitJob=async function(t,r,u,s){return u=o.from(u||{}),e.constructRequest(t,"submitJob",u,r??{},s).then((({data:o})=>{const e=n.fromJSON(o);return e.sourceUrl=t,e}))},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));