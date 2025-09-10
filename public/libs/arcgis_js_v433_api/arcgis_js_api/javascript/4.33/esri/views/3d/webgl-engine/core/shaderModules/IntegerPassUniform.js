// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/BindType","../../../../webgl/Uniform"],(function(e,n,t){"use strict";class i extends t.Uniform{constructor(e,t){super(e,"int",n.BindType.Pass,((n,i,r)=>n.setUniform1i(e,t(i,r))))}}e.IntegerPassUniform=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));