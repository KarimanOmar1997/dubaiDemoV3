// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/workers/WorkerHandle"],(function(e,r){"use strict";class o extends r.WorkerHandle{constructor(e){super("SceneLayerWorker","dracoDecompressPointCloudData",{dracoDecompressPointCloudData:e=>[e.geometryBuffer]},e,{hasInitialize:!0})}}e.I3SPointsWorkerHandle=o,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));