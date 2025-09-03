// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["../../../../chunks/boundedPlane"],(function(e){"use strict";const t=e.create();return class{constructor(){this._plane=e.create(),this._isDecoration=!0}get plane(){return this._plane}get isDecoration(){return this._isDecoration}update({plane:n,isDecoration:i}){let s=!1;return this._isDecoration!==i&&(this._isDecoration=i,s=!0),n??=t,e.equals(n,this._plane)?s:(e.copy(n,this._plane),!0)}}}));