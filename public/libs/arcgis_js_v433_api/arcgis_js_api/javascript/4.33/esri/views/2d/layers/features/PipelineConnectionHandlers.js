// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/workers/utils"],(function(e,t){"use strict";e.PipelineConnectionHandlers=class{constructor(e){this._client=e,this.layerView=this._client.createInvokeProxy(""),this.container=this._client.createInvokeProxy("container"),this._eventLog=this._client.createInvokeProxy("eventLog")}onEvent(e){t.ignoreConnectionErrors(this._eventLog.onEvent(e))}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));