import{x,g as d,p as f,s as p,i as _,n as o,z as C,b as y,t as b,S as E,F as B,E as N}from"./chunks/web.a5032f89.js";import{G as R,B as F,h as G}from"./chunks/schemas.544b4dd5.js";import{m as a}from"./chunks/index.cf4744a4.js";const L=b('<div class="card card--row"><div class="card__image"><img class="img--pixelated" alt="Addon icon"></div><div class="card__body flex flex--xsmall"><h5 class="card__title"></h5><div class="card__content"><!#><!/> (<a>GitHub</a>)</div><a class="btn btn--primary"><span class="btn-label">Download</span><span class="btn-icon btn-icon--right"><i class="fas fa-arrow-up-right-from-square"></i></span></a></div></div>'),S=e=>{const r=R.fromUrl(e.raw.url),t=r.rawContentUrl("pack_icon.png"),n=e.raw.filename.replace("{version}",e.base.version),c=e.base.release_url.replace("{tag}",e.base.tag).replace("{filename}",n),[i]=x(async()=>(await r.fetchInfo()).description);return(()=>{const s=d(L),l=s.firstChild,m=l.firstChild,h=l.nextSibling,g=h.firstChild,u=g.nextSibling,w=u.firstChild,[$,v]=f(w.nextSibling),k=$.nextSibling,A=k.nextSibling,j=u.nextSibling;return p(m,"src",t),_(g,()=>e.raw.name),_(u,o(C,{fallback:"Loading ...",get children(){return i()??"No description"}}),$,v),p(j,"href",c),y(()=>p(A,"href",r.getUrl())),s})()},U=a.object({name:a.string(),filename:a.string(),url:a.string()}),H=a.object({repos:a.object({base:F,addons:a.array(U)})}),J=b("<h2>Bedrock downloads</h2>"),M=b("<h2>Loading...</h2>"),T=b("<h3>Minecraft Bedrock versions: <!#><!/></h3>"),q=b('<div class="grid grid--col-2"><!#><!/><!#><!/></div>'),z="https://raw.githubusercontent.com/Love-and-Tolerance/pack-dev-tools/mane/assets/bedrock.json";async function D(){const e=await fetch(z,{headers:{Accept:"application/json"}});if(e.status!==200)throw new Error(`Failed to fetch assets json: ${e.status}`);const r=await e.json();return H.parse(r)}const P=()=>{const[e]=x(D);function r(t){return{name:"Base resourcepack",filename:t.filename,url:t.url}}return[d(J),o(N,{fallback:G,get children(){return o(E,{get when(){return e()},keyed:!0,get fallback(){return d(M)},children:t=>[(()=>{const n=d(T),c=n.firstChild,i=c.nextSibling,[s,l]=f(i.nextSibling);return _(n,()=>t.repos.base.mc_versions,s,l),n})(),(()=>{const n=d(q),c=n.firstChild,[i,s]=f(c.nextSibling),l=i.nextSibling,[m,h]=f(l.nextSibling);return _(n,o(S,{get base(){return t.repos.base},get raw(){return r(t.repos.base)}}),i,s),_(n,o(B,{get each(){return t.repos.addons},children:g=>o(S,{get base(){return t.repos.base},raw:g})}),m,h),n})()]})}})]};export{P as Addons};
