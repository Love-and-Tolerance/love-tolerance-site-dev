import{y as u,z as h,A as y,n as b}from"./chunks/web.5a107bf2.js";var w=r=>(o,s,n,{client:a})=>{if(window._$HY||(window._$HY={events:[],completed:new WeakSet,r:{}}),!r.hasAttribute("ssr"))return;const d=a==="only"?h:y;let t={};if(Object.keys(n).length>0)if(u.context)r.querySelectorAll("astro-slot").forEach(e=>{t[e.getAttribute("name")||"default"]=e.cloneNode(!0)});else for(const[e,f]of Object.entries(n))t[e]=document.createElement("astro-slot"),e!=="default"&&t[e].setAttribute("name",e),t[e].innerHTML=f;const{default:l,...i}=t,c=r.dataset.solidRenderId;d(()=>b(o,{...s,...i,children:l}),r,{renderId:c})};export{w as default};