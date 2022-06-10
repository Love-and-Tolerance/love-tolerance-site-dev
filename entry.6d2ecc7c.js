import{S as z,i as F,s as K,e as k,P as T,d as y,f as H,Q as U,h as v,j as E,V as M,l as N,m as A,R as q,p as x,w as it,y as at,I as ct,J as ut,K as ft,t as L,r as J,L as dt,b as G,g as R,O as tt,E as ht,F as mt,T as gt,N as _t,W as bt,C as wt}from"./chunks/chunk.04e4fa0f.js";import{c as At}from"./chunks/chunk.a8af5ea4.js";/* empty css                     */function It(e){return e!=null}function $(e){return e===void 0||e===""}function jt(e){if(e.startsWith("https://github.com/"))return e.replace("https://github.com/","");if(e.startsWith("git@github.com:"))return e.replace("git@github.com:","");throw new Error(`Unsupported URL. Only SSH- and HTTPS-like GitHub URLs are supported (${e})`)}function Dt(e,t){return $(t)?e.replace(/\.git$/,""):e}function pt(e){const[t,n,s]=jt(e).split("/");if($(t)||$(n))throw new Error(`GitHub URL must contain repo's owner and name (${e})`);return{owner:t,name:Dt(n,s)}}function vt(e,t,n){return t??="HEAD",`https://raw.githubusercontent.com/${e.owner}/${e.name}/${t}/${n}`}function Vt(e,t,n,s){let i=`https://github.com/${e.owner}/${e.name}/`;return It(n)&&(t??="tree",i+=`${t}/${n}/`,s!==void 0&&(i+=s)),i}function Et(e){let t,n,s,i;return{c(){t=k("div"),n=T(e[1]),this.h()},l(r){t=y(r,"DIV",{class:!0});var u=H(t);n=U(u,e[1]),u.forEach(v),this.h()},h(){E(t,"class","variant svelte-krdepm"),M(t,"selected",e[0])},m(r,u){N(r,t,u),A(t,n),s||(i=q(t,"click",e[2]),s=!0)},p(r,[u]){u&1&&M(t,"selected",r[0])},i:x,o:x,d(r){r&&v(t),s=!1,i()}}}function St(e,t,n){let{json:s}=t,{currentVariantID:i}=t;const r=s.getPrimitive("name").getAsString(),u=s.getPrimitive("id").getAsString(),d=(()=>{const a=s.get("branch");return a===null?null:a.getAsString()})();let g=!1,h=null,b=null,w=null,I=null;const S=it();function V(){S("click",{id:u,url:h,description:w,image:I})}return at(async()=>{const a=s.get("url");if(a!==null){b=pt(a.getAsString());const f=await fetch(`https://api.github.com/repos/${b.owner}/${b.name}`,{headers:{Accept:"application/vnd.github.v3+json"}});n(5,h=Vt(b,"tree",d)),n(7,I=vt(b,d,"pack.png"));const P=await f.json();n(6,w=P.description)}g&&S("info",{id:u,url:h,description:w,image:I})}),e.$$set=a=>{"json"in a&&n(3,s=a.json),"currentVariantID"in a&&n(4,i=a.currentVariantID)},e.$$.update=()=>{e.$$.dirty&240&&(n(0,g=i===u),S("info",{id:u,url:h,description:w,image:I}))},[g,r,V,s,i,h,w,I]}class kt extends z{constructor(t){super(),F(this,t,St,Et,K,{json:3,currentVariantID:4})}}function et(e,t,n){const s=e.slice();return s[17]=t[n],s}function nt(e){let t,n;return t=new kt({props:{currentVariantID:e[1],json:e[17].getAsObject()}}),t.$on("click",e[7]),t.$on("info",e[8]),{c(){ct(t.$$.fragment)},l(s){ut(t.$$.fragment,s)},m(s,i){ft(t,s,i),n=!0},p(s,i){const r={};i&2&&(r.currentVariantID=s[1]),t.$set(r)},i(s){n||(L(t.$$.fragment,s),n=!0)},o(s){J(t.$$.fragment,s),n=!1},d(s){dt(t,s)}}}function st(e){let t,n,s,i;return{c(){t=T("("),n=k("a"),s=T("GitHub"),i=T(")"),this.h()},l(r){t=U(r,"("),n=y(r,"A",{href:!0});var u=H(n);s=U(u,"GitHub"),u.forEach(v),i=U(r,")"),this.h()},h(){E(n,"href",e[4])},m(r,u){N(r,t,u),N(r,n,u),A(n,s),N(r,i,u)},p(r,u){u&16&&E(n,"href",r[4])},d(r){r&&v(t),r&&v(n),r&&v(i)}}}function yt(e){let t,n,s,i,r,u,d,g,h,b,w,I,S,V,a=e[6],f=[];for(let c=0;c<a.length;c+=1)f[c]=nt(et(e,a,c));const P=c=>J(f[c],1,1,()=>{f[c]=null});let m=e[4]!==null&&st(e);return{c(){t=k("div"),n=k("img"),i=G(),r=k("div"),u=k("h5"),d=T(e[5]),g=G(),h=k("div");for(let c=0;c<f.length;c+=1)f[c].c();b=G(),w=k("div"),I=T(e[2]),S=G(),m&&m.c(),this.h()},l(c){t=y(c,"DIV",{class:!0});var l=H(t);n=y(l,"IMG",{class:!0,src:!0,alt:!0}),i=R(l),r=y(l,"DIV",{class:!0});var _=H(r);u=y(_,"H5",{class:!0});var O=H(u);d=U(O,e[5]),O.forEach(v),g=R(_),h=y(_,"DIV",{class:!0});var p=H(h);for(let o=0;o<f.length;o+=1)f[o].l(p);p.forEach(v),b=R(_),w=y(_,"DIV",{class:!0});var B=H(w);I=U(B,e[2]),S=R(B),m&&m.l(B),B.forEach(v),_.forEach(v),l.forEach(v),this.h()},h(){E(n,"class","addon__image svelte-wtrwh8"),tt(n.src,s=e[3])||E(n,"src",s),E(n,"alt","Addon icon"),M(n,"default",e[3]===e[0]),E(u,"class","addon__name"),E(h,"class","addon__variants svelte-wtrwh8"),E(w,"class","addon__description"),E(r,"class","addon__content svelte-wtrwh8"),E(t,"class","addon svelte-wtrwh8")},m(c,l){N(c,t,l),A(t,n),A(t,i),A(t,r),A(r,u),A(u,d),A(r,g),A(r,h);for(let _=0;_<f.length;_+=1)f[_].m(h,null);A(r,b),A(r,w),A(w,I),A(w,S),m&&m.m(w,null),V=!0},p(c,[l]){if((!V||l&8&&!tt(n.src,s=c[3]))&&E(n,"src",s),l&9&&M(n,"default",c[3]===c[0]),l&450){a=c[6];let _;for(_=0;_<a.length;_+=1){const O=et(c,a,_);f[_]?(f[_].p(O,l),L(f[_],1)):(f[_]=nt(O),f[_].c(),L(f[_],1),f[_].m(h,null))}for(ht(),_=a.length;_<f.length;_+=1)P(_);mt()}(!V||l&4)&&gt(I,c[2]),c[4]!==null?m?m.p(c,l):(m=st(c),m.c(),m.m(w,null)):m&&(m.d(1),m=null)},i(c){if(!V){for(let l=0;l<a.length;l+=1)L(f[l]);V=!0}},o(c){f=f.filter(Boolean);for(let l=0;l<f.length;l+=1)J(f[l]);V=!1},d(c){c&&v(t),_t(f,c),m&&m.d()}}}const rt="No description";function Ht(e,t,n){let{defaultImage:s}=t,{json:i}=t;const r=it(),u=i.getPrimitive("default").getAsString(),d=i.getPrimitive("name").getAsString(),g=i.getPrimitive("id_pos").getAsInteger()-1,h=Array.from(i.getArray("variants").iterator());let b=u,w=rt,I=s,S=null;function V(l){n(1,b=l),r("variant",{pos:g,variant:b})}function a(l){n(4,S=l.url),n(2,w=l.description??rt),n(3,I=l.image??s)}function f(l){a(l.detail),V(l.detail.id)}function P(l){b===l.detail.id&&(a(l.detail),V(l.detail.id))}function m(){V("x")}function c(){V(u)}return e.$$set=l=>{"defaultImage"in l&&n(0,s=l.defaultImage),"json"in l&&n(9,i=l.json)},[s,b,w,I,S,d,h,f,P,i,m,c]}class Pt extends z{constructor(t){super(),F(this,t,Ht,yt,K,{defaultImage:0,json:9,reset:10,resetDefault:11})}get reset(){return this.$$.ctx[10]}get resetDefault(){return this.$$.ctx[11]}}function lt(e,t,n){const s=e.slice();return s[12]=t[n],s[13]=t,s[14]=n,s}function ot(e){let t,n=e[14],s;const i=()=>e[11](t,n),r=()=>e[11](null,n);let u={defaultImage:e[0],json:e[12].getAsObject()};return t=new Pt({props:u}),i(),t.$on("variant",e[5]),{c(){ct(t.$$.fragment)},l(d){ut(t.$$.fragment,d)},m(d,g){ft(t,d,g),s=!0},p(d,g){n!==d[14]&&(r(),n=d[14],i());const h={};g&1&&(h.defaultImage=d[0]),g&4&&(h.json=d[12].getAsObject()),t.$set(h)},i(d){s||(L(t.$$.fragment,d),s=!0)},o(d){J(t.$$.fragment,d),s=!1},d(d){r(),dt(t,d)}}}function Ot(e){let t,n,s,i,r,u,d,g,h,b,w,I,S,V,a,f,P,m,c,l,_,O=e[2],p=[];for(let o=0;o<O.length;o+=1)p[o]=ot(lt(e,O,o));const B=o=>J(p[o],1,1,()=>{p[o]=null});return{c(){t=k("h2"),n=T("Custom downloads"),s=G(),i=k("h3"),r=T("Minecraft version: "),u=T(e[1]),d=G(),g=k("div"),h=k("button"),b=T("Reset"),w=G(),I=k("button"),S=T("Select defaults"),V=G(),a=k("a"),f=T("Download"),P=G(),m=k("div");for(let o=0;o<p.length;o+=1)p[o].c();this.h()},l(o){t=y(o,"H2",{});var j=H(t);n=U(j,"Custom downloads"),j.forEach(v),s=R(o),i=y(o,"H3",{});var D=H(i);r=U(D,"Minecraft version: "),u=U(D,e[1]),D.forEach(v),d=R(o),g=y(o,"DIV",{class:!0});var C=H(g);h=y(C,"BUTTON",{class:!0});var Q=H(h);b=U(Q,"Reset"),Q.forEach(v),w=R(C),I=y(C,"BUTTON",{class:!0});var X=H(I);S=U(X,"Select defaults"),X.forEach(v),V=R(C),a=y(C,"A",{class:!0,href:!0});var Y=H(a);f=U(Y,"Download"),Y.forEach(v),C.forEach(v),P=R(o),m=y(o,"DIV",{class:!0});var Z=H(m);for(let W=0;W<p.length;W+=1)p[W].l(Z);Z.forEach(v),this.h()},h(){E(h,"class","control svelte-yxuri1"),E(I,"class","control svelte-yxuri1"),E(a,"class","control svelte-yxuri1"),E(a,"href",e[4]),E(g,"class","controls svelte-yxuri1"),E(m,"class","addons svelte-yxuri1")},m(o,j){N(o,t,j),A(t,n),N(o,s,j),N(o,i,j),A(i,r),A(i,u),N(o,d,j),N(o,g,j),A(g,h),A(h,b),A(g,w),A(g,I),A(I,S),A(g,V),A(g,a),A(a,f),N(o,P,j),N(o,m,j);for(let D=0;D<p.length;D+=1)p[D].m(m,null);c=!0,l||(_=[q(h,"click",e[6]),q(I,"click",e[7])],l=!0)},p(o,[j]){if((!c||j&2)&&gt(u,o[1]),(!c||j&16)&&E(a,"href",o[4]),j&45){O=o[2];let D;for(D=0;D<O.length;D+=1){const C=lt(o,O,D);p[D]?(p[D].p(C,j),L(p[D],1)):(p[D]=ot(C),p[D].c(),L(p[D],1),p[D].m(m,null))}for(ht(),D=O.length;D<p.length;D+=1)B(D);mt()}},i(o){if(!c){for(let j=0;j<O.length;j+=1)L(p[j]);c=!0}},o(o){p=p.filter(Boolean);for(let j=0;j<p.length;j+=1)J(p[j]);c=!1},d(o){o&&v(t),o&&v(s),o&&v(i),o&&v(d),o&&v(g),o&&v(P),o&&v(m),_t(p,o),l=!1,bt(_)}}}const Nt="https://raw.githubusercontent.com/VelvetRemedy/pack-release-builder/mane/assets.json";function Tt(e,t,n){let s,i="",r="",u="N/A",d="N/A",g=[],h=[];const b=[];at(async()=>{const a=await fetch(Nt),P=At(await a.json()).getAsObject().getObject("repos"),m=P.getObject("base"),c=P.getArray("addons"),l=pt(m.getPrimitive("url").getAsString());n(0,i=vt(l,null,"pack.png")),n(8,r=m.getPrimitive("filename").getAsString()),n(1,u=m.getPrimitive("mc_versions").getAsString()),n(9,d=m.getPrimitive("version").getAsString()),n(8,r=`https://github.com/${l.owner}/${l.name}/releases/download/${d}/${r}`),n(2,g=Array.from(c.iterator()))});function w(a){n(10,h[a.detail.pos]=a.detail.variant,h)}function I(){for(const a of b)a.reset()}function S(){for(const a of b)a.resetDefault()}function V(a,f){wt[a?"unshift":"push"](()=>{b[f]=a,n(3,b)})}return e.$$.update=()=>{e.$$.dirty&1792&&n(4,s=r.replace("{version}",d).replace("{ids}",h.join("")))},[i,u,g,b,s,w,I,S,r,d,h,V]}class Rt extends z{constructor(t){super(),F(this,t,Tt,Ot,K,{})}}export{Rt as default};
