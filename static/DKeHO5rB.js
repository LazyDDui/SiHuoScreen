import{d as r,j as _,t as l,v as i,x as s,y as e,L as m,M as u,_ as h}from"./DMPyjocP.js";const v={class:"f-b delivery"},p={class:"title",style:{display:"flex"}},f={class:"bg"},g=["src"],y={style:{display:"flex","flex-direction":"column"}},b={class:"tw"},I={class:"tc shine"},U={style:{width:"70%"}},k={class:"desc"},B={class:"count"},w={class:"imgItem"},D=["src"],L={class:"shine total"},M=r({__name:"index",props:{url:{},smallUrl:{},title:{},desc:{},count:{},noUrl:{},total:{}},setup(a){const o=a,c=_(()=>Math.floor(o.count*10/o.total));return(t,j)=>(l(),i("div",v,[s("div",p,[s("div",f,[s("img",{class:"bigImg",alt:"url",src:t.url},null,8,g)]),s("div",y,[s("div",b,e(t.title),1),s("div",I,e(t.count),1)])]),s("div",U,[s("div",k,e(t.desc),1),s("div",B,[s("div",w,[(l(),i(m,null,u(10,(n,d)=>s("img",{key:n,class:"smallImg",alt:"imgItem",src:d<c.value?t.smallUrl:t.noUrl},null,8,D)),64))]),s("div",L,e(t.count)+"/"+e(t.total),1)])])]))}}),E=h(M,[["__scopeId","data-v-b478b938"]]);export{E as default};
