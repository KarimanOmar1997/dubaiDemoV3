/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{i as a,a as e,b as s,c as r,d as t,e as l,f as c,g as n,h as o,A as d,j as i}from"./languageUtils.js";import{a as m}from"./guards.js";function u(a){f=a}let f;function p(u){return null===u?null:a(u)?u.clone():e(u)?u:s(u)?u.clone():r(u)?u.toArray().map((a=>p(a))):m(u)?u.map((a=>p(a))):t(u)?f.createFromArcadeFeature(u):l(u)||c(u)?u:n(u)||"esri.arcade.Attachment"===u?.declaredClass?u.deepClone():("esri.arcade.Portal"===u?.declaredClass||o(u)||u instanceof d||i(u),u)}export{u as c,p as d};
