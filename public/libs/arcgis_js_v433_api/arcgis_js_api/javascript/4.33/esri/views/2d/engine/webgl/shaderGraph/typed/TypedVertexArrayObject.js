// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../webgl/VertexArrayObject"],(function(t,e){"use strict";t.TypedVertexArrayObject=class{constructor(...t){this.layout=null,this._vao=new e.VertexArrayObject(...t),this._context=t[0]}destroy(){this._vao.dispose()}bind(){this._context.bindVAO(this._vao)}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));