// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports"],(function(e){"use strict";e.FilteredValue=class{constructor(e){this._gain=e}update(e){void 0!==this.filteredValue?this.filteredValue=(1-this._gain)*this.filteredValue+this._gain*e:this.filteredValue=e}reset(){this.filteredValue=void 0}get hasFilteredValue(){return void 0!==this.filteredValue}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));