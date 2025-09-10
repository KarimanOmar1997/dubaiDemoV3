// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/signal"],(function(e,s){"use strict";e.TextureCompressionTracker=class{constructor(){this._pendingCompressionTasks=s.signal(0)}get compressing(){return!!this._pendingCompressionTasks.value}increment(){this._pendingCompressionTasks.value++}decrement(){this._pendingCompressionTasks.value--}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));