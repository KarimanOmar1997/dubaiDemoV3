// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../graph/glsl","./BaseRasterProcessorShader","./MultiRasterMixin"],(function(e,s,t,r){"use strict";class a extends(r.MultiRasterMixin(t.BaseRasterProcessorShader)){constructor(){super(...arguments),this.type="CompositeBandShader"}_process(e){const{a:t,b:r,c:a,alpha:o}=this._getRasterValues(e);return new s.Vec4(t,r,a,o)}}e.CompositeBandShader=a,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));