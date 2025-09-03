// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../ObservableBase"],(function(e,s){"use strict";class t extends s.ObservableBase{notify(){const e=this._observers;if(e&&e.length>0){const s=e.slice();for(const e of s)e.onInvalidated(),e.onCommitted()}}}e.SimpleObservable=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));