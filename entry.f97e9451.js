import{S as P,i as F,s as K,e as A,P as H,d as S,f as y,Q as J,h as p,j,V as O,l as N,m as D,R as q,p as R,w as ae,y as oe,I as ie,J as ce,K as fe,t as T,r as B,L as ue,b as M,g as U,O as $,E as Q,F as W,T as Z,N as de,M as x,C as me,W as pe}from"./chunks/chunk.04e4fa0f.js";import{p as he,s as ve,r as _e,J as ge,f as be}from"./chunks/chunk.f4791d34.js";/* empty css                     */import"./chunks/chunk.7da70b4d.js";function ke(r){let e,n,s,a;return{c(){e=A("div"),n=H(r[1]),this.h()},l(t){e=S(t,"DIV",{class:!0});var i=y(e);n=J(i,r[1]),i.forEach(p),this.h()},h(){j(e,"class","variant svelte-krdepm"),O(e,"selected",r[0])},m(t,i){N(t,e,i),D(e,n),s||(a=q(e,"click",r[2]),s=!0)},p(t,[i]){i&1&&O(e,"selected",t[0])},i:R,o:R,d(t){t&&p(e),s=!1,a()}}}function Ie(r,e,n){let{json:s}=e,{currentVariantID:a}=e;const{name:t,id:i,branch:_}=s;let b=!1,d,V,o=s.description,h=s["pack.png"];const w=ae();function E(){w("click",{id:i,url:d,description:o,image:h})}return oe(async()=>{if(s.url!==void 0&&(V=he(s.url),n(5,d=ve(V,"tree",_)),h===void 0&&n(7,h=_e(V,_,"pack.png")),o===void 0)){const c=await(await fetch(`https://api.github.com/repos/${V.owner}/${V.name}`,{headers:{Accept:"application/vnd.github.v3+json"}})).json();n(6,o=c.description)}b&&w("info",{id:i,url:d,description:o,image:h})}),r.$$set=g=>{"json"in g&&n(3,s=g.json),"currentVariantID"in g&&n(4,a=g.currentVariantID)},r.$$.update=()=>{r.$$.dirty&240&&(n(0,b=a===i),w("info",{id:i,url:d,description:o,image:h}))},[b,t,E,s,a,d,o,h]}class De extends P{constructor(e){super(),F(this,e,Ie,ke,K,{json:3,currentVariantID:4})}}function ee(r,e,n){const s=r.slice();return s[17]=e[n],s}function te(r){let e,n;return e=new De({props:{currentVariantID:r[1],json:r[17]}}),e.$on("click",r[7]),e.$on("info",r[8]),{c(){ie(e.$$.fragment)},l(s){ce(e.$$.fragment,s)},m(s,a){fe(e,s,a),n=!0},p(s,a){const t={};a&2&&(t.currentVariantID=s[1]),e.$set(t)},i(s){n||(T(e.$$.fragment,s),n=!0)},o(s){B(e.$$.fragment,s),n=!1},d(s){ue(e,s)}}}function ne(r){let e,n,s,a;return{c(){e=H("("),n=A("a"),s=H("GitHub"),a=H(")"),this.h()},l(t){e=J(t,"("),n=S(t,"A",{href:!0});var i=y(n);s=J(i,"GitHub"),i.forEach(p),a=J(t,")"),this.h()},h(){j(n,"href",r[4])},m(t,i){N(t,e,i),N(t,n,i),D(n,s),N(t,a,i)},p(t,i){i&16&&j(n,"href",t[4])},d(t){t&&p(e),t&&p(n),t&&p(a)}}}function Ve(r){let e,n,s,a,t,i,_,b,d,V,o,h,w,E,g=r[6],c=[];for(let f=0;f<g.length;f+=1)c[f]=te(ee(r,g,f));const C=f=>B(c[f],1,1,()=>{c[f]=null});let k=r[4]!==void 0&&ne(r);return{c(){e=A("div"),n=A("img"),a=M(),t=A("div"),i=A("h5"),_=H(r[5]),b=M(),d=A("div");for(let f=0;f<c.length;f+=1)c[f].c();V=M(),o=A("div"),h=H(r[2]),w=M(),k&&k.c(),this.h()},l(f){e=S(f,"DIV",{class:!0});var l=y(e);n=S(l,"IMG",{class:!0,src:!0,alt:!0}),a=U(l),t=S(l,"DIV",{class:!0});var v=y(t);i=S(v,"H5",{class:!0});var u=y(i);_=J(u,r[5]),u.forEach(p),b=U(v),d=S(v,"DIV",{class:!0});var I=y(d);for(let G=0;G<c.length;G+=1)c[G].l(I);I.forEach(p),V=U(v),o=S(v,"DIV",{class:!0});var m=y(o);h=J(m,r[2]),w=U(m),k&&k.l(m),m.forEach(p),v.forEach(p),l.forEach(p),this.h()},h(){j(n,"class","addon__image svelte-wtrwh8"),$(n.src,s=r[3])||j(n,"src",s),j(n,"alt","Addon icon"),O(n,"default",r[3]===r[0]),j(i,"class","addon__name"),j(d,"class","addon__variants svelte-wtrwh8"),j(o,"class","addon__description"),j(t,"class","addon__content svelte-wtrwh8"),j(e,"class","addon svelte-wtrwh8")},m(f,l){N(f,e,l),D(e,n),D(e,a),D(e,t),D(t,i),D(i,_),D(t,b),D(t,d);for(let v=0;v<c.length;v+=1)c[v].m(d,null);D(t,V),D(t,o),D(o,h),D(o,w),k&&k.m(o,null),E=!0},p(f,[l]){if((!E||l&8&&!$(n.src,s=f[3]))&&j(n,"src",s),l&9&&O(n,"default",f[3]===f[0]),l&450){g=f[6];let v;for(v=0;v<g.length;v+=1){const u=ee(f,g,v);c[v]?(c[v].p(u,l),T(c[v],1)):(c[v]=te(u),c[v].c(),T(c[v],1),c[v].m(d,null))}for(Q(),v=g.length;v<c.length;v+=1)C(v);W()}(!E||l&4)&&Z(h,f[2]),f[4]!==void 0?k?k.p(f,l):(k=ne(f),k.c(),k.m(o,null)):k&&(k.d(1),k=null)},i(f){if(!E){for(let l=0;l<g.length;l+=1)T(c[l]);E=!0}},o(f){c=c.filter(Boolean);for(let l=0;l<c.length;l+=1)B(c[l]);E=!1},d(f){f&&p(e),de(c,f),k&&k.d()}}}const se="No description";function we(r,e,n){let{defaultImage:s}=e,{json:a}=e;const t=ae(),{name:i,variants:_}=a,b=a.default,d=a.id_pos-1;let V=b,o=se,h=s,w;function E(l){n(1,V=l),t("variant",{pos:d,variant:V})}function g(l){n(4,w=l.url),n(2,o=l.description??se),n(3,h=l.image??s)}function c(l){g(l.detail),E(l.detail.id)}function C(l){V===l.detail.id&&(g(l.detail),E(l.detail.id))}function k(){E("x")}function f(){E(b)}return r.$$set=l=>{"defaultImage"in l&&n(0,s=l.defaultImage),"json"in l&&n(9,a=l.json)},[s,V,o,h,w,i,_,c,C,a,k,f]}class Ee extends P{constructor(e){super(),F(this,e,we,Ve,K,{defaultImage:0,json:9,reset:10,resetDefault:11})}get reset(){return this.$$.ctx[10]}get resetDefault(){return this.$$.ctx[11]}}function le(r,e,n){const s=r.slice();return s[13]=e[n],s[14]=e,s[15]=n,s}function je(r){let e,n,s,a,t,i,_,b,d,V,o,h,w,E,g,c,C,k,f=r[2],l=[];for(let u=0;u<f.length;u+=1)l[u]=re(le(r,f,u));const v=u=>B(l[u],1,1,()=>{l[u]=null});return{c(){e=A("h3"),n=H("Minecraft version: "),s=H(r[1]),a=M(),t=A("div"),i=A("button"),_=H("Reset"),b=M(),d=A("button"),V=H("Select defaults"),o=M(),h=A("a"),w=H("Download"),E=M(),g=A("div");for(let u=0;u<l.length;u+=1)l[u].c();this.h()},l(u){e=S(u,"H3",{});var I=y(e);n=J(I,"Minecraft version: "),s=J(I,r[1]),I.forEach(p),a=U(u),t=S(u,"DIV",{class:!0});var m=y(t);i=S(m,"BUTTON",{class:!0});var G=y(i);_=J(G,"Reset"),G.forEach(p),b=U(m),d=S(m,"BUTTON",{class:!0});var z=y(d);V=J(z,"Select defaults"),z.forEach(p),o=U(m),h=S(m,"A",{class:!0,href:!0});var X=y(h);w=J(X,"Download"),X.forEach(p),m.forEach(p),E=U(u),g=S(u,"DIV",{class:!0});var Y=y(g);for(let L=0;L<l.length;L+=1)l[L].l(Y);Y.forEach(p),this.h()},h(){j(i,"class","control svelte-yxuri1"),j(d,"class","control svelte-yxuri1"),j(h,"class","control svelte-yxuri1"),j(h,"href",r[5]),j(t,"class","controls svelte-yxuri1"),j(g,"class","addons svelte-yxuri1")},m(u,I){N(u,e,I),D(e,n),D(e,s),N(u,a,I),N(u,t,I),D(t,i),D(i,_),D(t,b),D(t,d),D(d,V),D(t,o),D(t,h),D(h,w),N(u,E,I),N(u,g,I);for(let m=0;m<l.length;m+=1)l[m].m(g,null);c=!0,C||(k=[q(i,"click",r[7]),q(d,"click",r[8])],C=!0)},p(u,I){if((!c||I&2)&&Z(s,u[1]),(!c||I&32)&&j(h,"href",u[5]),I&85){f=u[2];let m;for(m=0;m<f.length;m+=1){const G=le(u,f,m);l[m]?(l[m].p(G,I),T(l[m],1)):(l[m]=re(G),l[m].c(),T(l[m],1),l[m].m(g,null))}for(Q(),m=f.length;m<l.length;m+=1)v(m);W()}},i(u){if(!c){for(let I=0;I<f.length;I+=1)T(l[I]);c=!0}},o(u){l=l.filter(Boolean);for(let I=0;I<l.length;I+=1)B(l[I]);c=!1},d(u){u&&p(e),u&&p(a),u&&p(t),u&&p(E),u&&p(g),de(l,u),C=!1,pe(k)}}}function Ae(r){let e,n=r[3].message+"",s;return{c(){e=A("div"),s=H(n),this.h()},l(a){e=S(a,"DIV",{class:!0});var t=y(e);s=J(t,n),t.forEach(p),this.h()},h(){j(e,"class","error")},m(a,t){N(a,e,t),D(e,s)},p(a,t){t&8&&n!==(n=a[3].message+"")&&Z(s,n)},i:R,o:R,d(a){a&&p(e)}}}function re(r){let e,n=r[15],s;const a=()=>r[12](e,n),t=()=>r[12](null,n);let i={defaultImage:r[0],json:r[13]};return e=new Ee({props:i}),a(),e.$on("variant",r[6]),{c(){ie(e.$$.fragment)},l(_){ce(e.$$.fragment,_)},m(_,b){fe(e,_,b),s=!0},p(_,b){n!==_[15]&&(t(),n=_[15],a());const d={};b&1&&(d.defaultImage=_[0]),b&4&&(d.json=_[13]),e.$set(d)},i(_){s||(T(e.$$.fragment,_),s=!0)},o(_){B(e.$$.fragment,_),s=!1},d(_){t(),ue(e,_)}}}function Se(r){let e,n,s,a,t,i,_;const b=[Ae,je],d=[];function V(o,h){return o[3]!==void 0?0:1}return a=V(r),t=d[a]=b[a](r),{c(){e=A("h2"),n=H("Custom Java downloads"),s=M(),t.c(),i=x()},l(o){e=S(o,"H2",{});var h=y(e);n=J(h,"Custom Java downloads"),h.forEach(p),s=U(o),t.l(o),i=x()},m(o,h){N(o,e,h),D(e,n),N(o,s,h),d[a].m(o,h),N(o,i,h),_=!0},p(o,[h]){let w=a;a=V(o),a===w?d[a].p(o,h):(Q(),B(d[w],1,1,()=>{d[w]=null}),W(),t=d[a],t?t.p(o,h):(t=d[a]=b[a](o),t.c()),T(t,1),t.m(i.parentNode,i))},i(o){_||(T(t),_=!0)},o(o){B(t),_=!1},d(o){o&&p(e),o&&p(s),d[a].d(o),o&&p(i)}}}const ye="https://raw.githubusercontent.com/Love-and-Tolerance/pack-release-builder/mane/assets/java.json";function Ne(r,e,n){let s,a="",t="",i="N/A",_="N/A",b=[],d=[],V;const o=[];oe(async()=>{const c=await fetch(ye),C=ge.safeParse(await c.json());if(!C.success){n(3,V=be(C.error));return}const k=C.data.repos,f=k.base,l=he(k.base.url);n(0,a=_e(l,void 0,"pack.png")),n(1,i=f.mc_versions),n(10,_=f.version),n(9,t=f.release_url.replace("{tag}",f.tag).replace("{filename}",f.filename)),n(2,b=k.addons)});function h(c){n(11,d[c.detail.pos]=c.detail.variant,d)}function w(){for(const c of o)c.reset()}function E(){for(const c of o)c.resetDefault()}function g(c,C){me[c?"unshift":"push"](()=>{o[C]=c,n(4,o)})}return r.$$.update=()=>{r.$$.dirty&3584&&n(5,s=t.replace("{version}",_).replace("{ids}",d.join("")))},[a,i,b,V,o,s,h,w,E,t,_,d,g]}class Ge extends P{constructor(e){super(),F(this,e,Ne,Se,K,{})}}export{Ge as default};
