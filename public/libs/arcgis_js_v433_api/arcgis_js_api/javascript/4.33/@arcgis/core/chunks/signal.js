/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{equalsShallow as t}from"../core/lang.js";import{t as e}from"./tracking.js";import{S as s}from"./SimpleObservable.js";class i{constructor(t,e){this._observable=new s,this._value=t,this._equalityFunction=e}get value(){return e(this._observable),this._value}set value(t){this._equalityFunction(t,this._value)||(this._value=t,this._observable.notify())}mutate(t){t(this._value),this._observable.notify()}}function a(e,s=t){return new i(e,s)}export{a as s};
