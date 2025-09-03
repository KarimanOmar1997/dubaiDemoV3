// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","./index","./asset","./scene","./node"],(function(e,n,t,o,i){"use strict";e.toBinaryGLTF=async function(e,d){const r=new t.Asset,s=new o.Scene;return r.addScene(s),s.addNode(new i.Node(e)),await n.exportGLB(r,{origin:e.origin,...d})},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));