import{s as k}from"./BsAJPsV6.js";import{d as x,Z as B,j as f,r as m,Q as C,t as l,v as u,J as y,K as h,$ as E,W as g,x as b,y as N,a0 as $,o as L,f as V,z as W,I as j}from"./B9ziC9Bb.js";const q={style:{display:"flex","align-items":"center"}},A={name:"scroll-number"},c=x({...A,props:{number:{type:[Number,String],required:!0},h:{type:Number,default:24},color:{type:[String],default:"#606cee"},customStyle:{type:Object,default:()=>({})}},setup(r){const e=r,n=B(),t=f(()=>({...n})),s=[0,1,2,3,4,5,6,7,8,9,".","-",":"," "],i=["."," ","-",":"],o=m([]);C(()=>e.number,a=>{o.value=a.toString().split("")},{immediate:!0,deep:!0});const d=f(()=>({...e.customStyle,height:`${e.h}px`,fontSize:`${e.h}px`})),w=a=>({transform:`translate(0,-${(a.trim().length===0?9999:s.findIndex(p=>a==p))*e.h}px)`});return(a,p)=>(l(),u("div",q,[(l(!0),u(y,null,h(o.value,(v,z)=>(l(),u("div",{key:z,class:E(["number",{sign:i.includes(v)}]),style:g(d.value)},[b("div",$({class:"scroll-container",style:{...w(v)}},t.value),[(l(),u(y,null,h(s,(_,I)=>b("div",{key:I,class:"scroll-single",style:g({color:r.color})},N(_),5)),64))],16)],6))),128))]))}});c.install=r=>{r.component(c.name,c)};const S=30,H=x({__name:"HoverChart",props:{color:{},count:{}},setup(r){let e;const n=r,t=m(n.count?n.count-8:0);t.value>100&&(t.value=n.count-80),t.value<0&&(t.value=n.count);const s=m(0),i=o=>{s.value=o.currentTarget.innerWidth/1920*S};return L(()=>{s.value=window.innerWidth/1920*S,window.addEventListener("resize",i),e=k(()=>{t.value<n.count?t.value++:clearInterval(e)},10)}),V(()=>{window.removeEventListener("resize",i),clearInterval(e)}),(o,d)=>(l(),u("div",null,[W(j(c),{color:o.color,h:s.value,number:t.value},null,8,["color","h","number"])]))}});export{H as _};
