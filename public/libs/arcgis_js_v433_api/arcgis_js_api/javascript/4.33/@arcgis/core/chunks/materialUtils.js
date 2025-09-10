/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import r from"../Color.js";import{t as e}from"./screenUtils.js";import{I as o}from"./ensureType.js";import{o as s,t}from"./opacityUtils.js";function n(e,o){const s=null!=o.transparency?t(o.transparency):1,n=o.color;return n&&Array.isArray(n)?new r([n[0]||0,n[1]||0,n[2]||0,s]):null}function a(r,e){e.color=r.toJSON().slice(0,3);const o=s(r.a);0!==o&&(e.transparency=o)}function i(e){return{type:r,nonNullable:e?.nonNullable,json:{type:[o],default:null,read:{source:["color","transparency"],reader:n},write:{target:{color:{type:[o],isRequired:e?.colorRequiredOnWrite},transparency:{type:o}},writer:a}}}}const l={type:Number,cast:e,json:{write:!0}};var c;function u(r){return"emissive"===r?c.Emissive:c.Color}!function(r){r[r.Emissive=0]="Emissive",r[r.Color=1]="Color"}(c||(c={}));export{c as E,i as c,u as g,l as s};
