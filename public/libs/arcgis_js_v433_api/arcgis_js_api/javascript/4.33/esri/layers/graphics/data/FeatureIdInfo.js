// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.getFeatureIdInfoFieldNames=function*(e){switch(e.type){case"object-id":case"unique-id-simple":return void(yield e.fieldName);case"unique-id-composite":return void(yield*e.fieldNames)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));