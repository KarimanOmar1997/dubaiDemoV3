// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../core/Error","../CIMSymbol","../cim/CIMSymbolHelper"],(function(o,e,t,n){"use strict";o.convertToCIMSymbol=function(o){const r=n.symbolToCIM(o);if(!r)throw new e("cimConversionUtils.convertToCIMSymbol","Unable to convert this symbol to CIM");return new t({data:r})},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));