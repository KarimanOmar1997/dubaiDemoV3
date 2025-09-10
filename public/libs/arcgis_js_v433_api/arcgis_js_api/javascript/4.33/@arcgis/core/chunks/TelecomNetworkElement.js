/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{_ as t}from"./tslib.es6.js";import{property as o}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import"./Logger.js";import{subclass as r}from"../core/accessorSupport/decorators/subclass.js";import e from"../rest/networks/support/NetworkElement.js";let s=class extends e{constructor(t){super(t),this.type="telecomNetworkElement",this.firstUnit=null,this.numUnits=null}};t([o({json:{write:!1}})],s.prototype,"type",void 0),t([o({json:{write:!0}})],s.prototype,"firstUnit",void 0),t([o({json:{write:!0}})],s.prototype,"numUnits",void 0),s=t([r("esri.rest.networks.support.TelecomNetworkElement")],s);export{s as T};
