import{s as B}from"./CnZ4QZMm.js";import{d as x,a0 as C,j as f,r as m,S as E,t as l,v as u,L as y,M as h,a1 as I,Y as g,x as S,y as L,a2 as N,o as V,f as $,z as j,K as M}from"./DMPyjocP.js";const W={style:{display:"flex","align-items":"center"}},q={name:"scroll-number"},c=x({...q,props:{number:{type:[Number,String],required:!0},h:{type:Number,default:24},color:{type:[String],default:"#606cee"},customStyle:{type:Object,default:()=>({})}},setup(r){const e=r,n=C(),t=f(()=>({...n})),a=[0,1,2,3,4,5,6,7,8,9,".","-",":"," "],i=["."," ","-",":"],s=m([]);E(()=>e.number,o=>{s.value=o.toString().split("")},{immediate:!0,deep:!0});const d=f(()=>({...e.customStyle,height:`${e.h}px`,fontSize:`${e.h}px`})),w=o=>({transform:`translate(0,-${(o.trim().length===0?9999:a.findIndex(p=>o==p))*e.h}px)`});return(o,p)=>(l(),u("div",W,[(l(!0),u(y,null,h(s.value,(v,z)=>(l(),u("div",{key:z,class:I(["number",{sign:i.includes(v)}]),style:g(d.value)},[S("div",N({class:"scroll-container",style:{...w(v)}},t.value),[(l(),u(y,null,h(a,(_,k)=>S("div",{key:k,class:"scroll-single",style:g({color:r.color})},L(_),5)),64))],16)],6))),128))]))}});c.install=r=>{r.component(c.name,c)};const b=30,F=x({__name:"HoverChart",props:{color:{},count:{}},setup(r){let e;const n=r,t=m(n.count?n.count-8:0);t.value>100&&(t.value=n.count-80),t.value<0&&(t.value=n.count);const a=m(0),i=s=>{a.value=s.currentTarget.innerWidth/1920*b};return V(()=>{a.value=window.innerWidth/1920*b,window.addEventListener("resize",i),e=B(()=>{t.value<n.count?t.value++:clearInterval(e)},10)}),$(()=>{window.removeEventListener("resize",i),clearInterval(e)}),(s,d)=>(l(),u("div",null,[j(M(c),{color:s.color,h:a.value,number:t.value},null,8,["color","h","number"])]))}});export{F as _};
