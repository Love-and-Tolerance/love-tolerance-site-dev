import{j as m,A as B,g as h,i as _,n as o,B as F,b as M,s as $,t as f,S as D,p as b,F as H,E as J}from"./chunks/web.5f645396.js";import{p as L,g as U,f as q,h as G,a as I}from"./chunks/zod.3fc7bf4a.js";import{m as e}from"./chunks/index.cf4744a4.js";const O=f('<div class="hcard"><div class="hcard-body"><div class="hcard-image"><img></div><div class="hcard-content"><div class="hcard-title"><div class="hcard-title__left"><h5></h5><a class="icon-link"><i class="fab fa-github"></i></a></div><div class="hcard-title__right"><a class="btn btn--primary"><span>Download</span><i class="fas fa-arrow-up-right-from-square"></i></a></div></div><p></p></div></div></div>'),C=t=>{const c=m(()=>L(t.data.url)),s=m(()=>{const[n,r]=c();return U(n,r,"HEAD","pack_icon.png")}),a=m(()=>t.data.filename.replace("{version}",t.assets.repos.base.version)),d=m(()=>t.assets.templates.asset_url.replace("{tag}",t.assets.repos.base.tag).replace("{filename}",a())),[l]=B(c,async n=>{const{description:r}=await q(...n);return r});return(()=>{const n=h(O),r=n.firstChild,u=r.firstChild,g=u.firstChild,v=u.nextSibling,p=v.firstChild,S=p.firstChild,k=S.firstChild,E=k.nextSibling,y=S.nextSibling,R=y.firstChild,N=p.nextSibling;return _(k,()=>t.data.name),_(N,o(F,{fallback:"Loading ...",get children(){return l()??"No description"}})),M(i=>{const w=s(),x=`"${t.data.name}" add-on image`,j=t.data.url,A=d();return w!==i._v$&&$(g,"src",i._v$=w),x!==i._v$2&&$(g,"alt",i._v$2=x),j!==i._v$3&&$(E,"href",i._v$3=j),A!==i._v$4&&$(R,"href",i._v$4=A),i},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),n})()},T=e.object({mc_versions:e.string(),pack_format:e.string(),tag:e.string(),version:e.string(),filename:e.string(),url:e.string()}),z=e.object({name:e.string(),filename:e.string(),url:e.string()}),K=e.object({templates:e.object({asset_url:e.string()}),repos:e.object({base:T,addons:z.array()})}),P=f("<h2>Bedrock downloads</h2>"),Q=f("<h2>Loading...</h2>"),V=f("<h4>Minecraft Bedrock versions: <!#><!/></h4>"),W=f('<div class="hcards"><!#><!/><!#><!/></div>'),X=`${I}/assets/bedrock.json`;async function Y(){const t=await fetch(X,{headers:{Accept:"application/json"}});if(t.status!==200)throw new Error(`Failed to fetch assets json: ${t.status}`);const c=await t.json();return K.parse(c)}const se=()=>{const[t]=B(Y);function c(s){return{name:"Base resourcepack",filename:s.filename,url:s.url}}return[h(P),o(J,{fallback:G,get children(){return o(D,{get when(){return t()},keyed:!0,get fallback(){return h(Q)},children:s=>[(()=>{const a=h(V),d=a.firstChild,l=d.nextSibling,[n,r]=b(l.nextSibling);return _(a,()=>s.repos.base.mc_versions,n,r),a})(),(()=>{const a=h(W),d=a.firstChild,[l,n]=b(d.nextSibling),r=l.nextSibling,[u,g]=b(r.nextSibling);return _(a,o(C,{assets:s,get data(){return c(s.repos.base)}}),l,n),_(a,o(H,{get each(){return s.repos.addons},children:v=>o(C,{assets:s,data:v})}),u,g),a})()]})}})]};export{se as Addons};