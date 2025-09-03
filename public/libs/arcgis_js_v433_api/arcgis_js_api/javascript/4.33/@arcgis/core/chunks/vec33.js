/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.33/esri/copyright.txt for details.
*/
function t(t,e,n=3,f=n){const o=e.length/f;let c=0,r=0;for(let u=0;u<o;++u)t[c]=e[r],t[c+1]=e[r+1],t[c+2]=e[r+2],c+=n,r+=f}function e(t,e,n,f,o){const c=t.typedBuffer,r=t.typedBufferStride,u=o?.count??t.count;let d=(o?.dstIndex??0)*r;for(let t=0;t<u;++t)c[d]=e,c[d+1]=n,c[d+2]=f,d+=r}export{t as c,e as f};
