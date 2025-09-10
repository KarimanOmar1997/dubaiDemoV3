/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
function e(e,n,r,t){const a=3*e,u=3*(r-e)-a,s=1-a-u,i=3*n,f=3*(t-n)-i,o=1-i-f;function c(e){return((s*e+u)*e+a)*e}return function(e,n=1e-6){return r=function(e,n){let r,t,i,f,o,b;for(i=e,b=0;b<8;b++){if(f=c(i)-e,Math.abs(f)<n)return i;if(o=(3*s*(h=i)+2*u)*h+a,Math.abs(o)<1e-6)break;i-=f/o}var h;if(r=0,t=1,i=e,i<r)return r;if(i>t)return t;for(;r<t;){if(f=c(i),Math.abs(f-e)<n)return i;e>f?r=i:t=i,i=.5*(t-r)+r}return i}(e,n),((o*r+f)*r+i)*r;var r}}const n={};n.ease=e(.25,.1,.25,1),n.linear=e(0,0,1,1),n.easeIn=n["ease-in"]=e(.42,0,1,1),n.easeOut=n["ease-out"]=e(0,0,.58,1),n.easeInOut=n["ease-in-out"]=e(.42,0,.58,1);export{n as e,e as u};
