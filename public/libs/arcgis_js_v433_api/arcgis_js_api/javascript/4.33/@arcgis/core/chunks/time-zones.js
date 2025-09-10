/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
import{g as e,a as r}from"./index-p4VH55K1.js";const s={CET:"Europe/Brussels",CST6CDT:"America/Chicago",EET:"Europe/Athens",EST:"America/Panama",EST5EDT:"America/New_York",HST:"Pacific/Honolulu",MET:"Europe/Brussels",MST:"America/Phoenix",MST7MDT:"America/Denver",PST8PDT:"America/Los_Angeles",WET:"Europe/Lisbon"},o=(()=>{const e=Object.keys(s);return Object.keys(r()).filter((r=>!e.includes(r)))})();function i(r){const o=s[r];if(o)return o;const i=e(r);return i?.aliasOf??r}export{i as normalize,o as timeZones};
