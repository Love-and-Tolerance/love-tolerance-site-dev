function k(){}function H(t,e){for(const n in e)t[n]=e[n];return t}function D(t){return t()}function M(){return Object.create(null)}function y(t){t.forEach(D)}function q(t){return typeof t=="function"}function lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let x;function st(t,e){return x||(x=document.createElement("a")),x.href=e,t===x.href}function I(t){return Object.keys(t).length===0}function ut(t,e,n,i){if(t){const r=B(t,e,n,i);return t[0](r)}}function B(t,e,n,i){return t[1]&&i?H(n.ctx.slice(),t[1](i(e))):n.ctx}function ft(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(e.dirty.length,r.length);for(let l=0;l<c;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function at(t,e,n,i,r,u){if(r){const c=B(e,n,i,u);t.p(c,r)}}function _t(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function dt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ht(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}let E=!1;function G(){E=!0}function J(){E=!1}function K(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let s=0;s<e.length;s++){const a=e[s];a.claim_order!==void 0&&o.push(a)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const s=e[o].claim_order,a=(r>0&&e[n[r]].claim_order<=s?r+1:K(1,r,g=>e[n[g]].claim_order,s))-1;i[o]=n[a]+1;const f=a+1;n[f]=o,r=Math.max(f,r)}const u=[],c=[];let l=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(u.push(e[o-1]);l>=o;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);u.reverse(),c.sort((o,s)=>o.claim_order-s.claim_order);for(let o=0,s=0;o<c.length;o++){for(;s<u.length&&c[o].claim_order>=u[s].claim_order;)s++;const a=s<u.length?u[s]:null;t.insertBefore(c[o],a)}}function R(t,e){if(E){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function mt(t,e,n){E&&!n?R(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function U(t){t.parentNode.removeChild(t)}function pt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function W(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function yt(){return C(" ")}function gt(){return C("")}function xt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function V(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $t(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:V(t,i,e[i])}function X(t){return Array.from(t.childNodes)}function Y(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function L(t,e,n,i,r=!1){Y(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const o=n(l);return o===void 0?t.splice(c,1):t[c]=o,r||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const o=n(l);return o===void 0?t.splice(c,1):t[c]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function Z(t,e,n,i){return L(t,r=>r.nodeName===e,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const l=r.attributes[c];n[l.name]||u.push(l.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(e))}function bt(t,e,n){return Z(t,e,n,W)}function tt(t,e){return L(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>C(e),!0)}function vt(t){return tt(t," ")}function Et(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function et(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}let p;function m(t){p=t}function d(){if(!p)throw new Error("Function called outside component initialization");return p}function wt(t){d().$$.before_update.push(t)}function kt(t){d().$$.on_mount.push(t)}function Nt(t){d().$$.after_update.push(t)}function At(t){d().$$.on_destroy.push(t)}function Ct(){const t=d();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const u=et(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,u)}),!u.defaultPrevented}return!0}}function St(t,e){return d().$$.context.set(t,e),e}function jt(t){return d().$$.context.get(t)}const h=[],O=[],b=[],T=[],P=Promise.resolve();let N=!1;function z(){N||(N=!0,P.then(F))}function Mt(){return z(),P}function A(t){b.push(t)}const w=new Set;let $=0;function F(){const t=p;do{for(;$<h.length;){const e=h[$];$++,m(e),nt(e.$$)}for(m(null),h.length=0,$=0;O.length;)O.pop()();for(let e=0;e<b.length;e+=1){const n=b[e];w.has(n)||(w.add(n),n())}b.length=0}while(h.length);for(;T.length;)T.pop()();N=!1,w.clear(),m(t)}function nt(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const v=new Set;let _;function Ot(){_={r:0,c:[],p:_}}function Tt(){_.r||y(_.c),_=_.p}function it(t,e){t&&t.i&&(v.delete(t),t.i(e))}function Dt(t,e,n,i){if(t&&t.o){if(v.has(t))return;v.add(t),_.c.push(()=>{v.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function qt(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const c=t[u],l=e[u];if(l){for(const o in c)o in l||(i[o]=1);for(const o in l)r[o]||(n[o]=l[o],r[o]=1);t[u]=l}else for(const o in c)r[o]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Bt(t){t&&t.c()}function Lt(t,e){t&&t.l(e)}function rt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||A(()=>{const c=t.$$.on_mount.map(D).filter(q);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),u.forEach(A)}function ct(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ot(t,e){t.$$.dirty[0]===-1&&(h.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Pt(t,e,n,i,r,u,c,l=[-1]){const o=p;m(t);const s=t.$$={fragment:null,ctx:[],props:u,update:k,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:M(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};c&&c(s.root);let a=!1;if(s.ctx=n?n(t,e.props||{},(f,g,...S)=>{const j=S.length?S[0]:g;return s.ctx&&r(s.ctx[f],s.ctx[f]=j)&&(!s.skip_bound&&s.bound[f]&&s.bound[f](j),a&&ot(t,f)),g}):[],s.update(),a=!0,y(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){G();const f=X(e.target);s.fragment&&s.fragment.l(f),f.forEach(U)}else s.fragment&&s.fragment.c();e.intro&&it(t.$$.fragment),rt(t,e.target,e.anchor,e.customElement),J(),F()}m(o)}class zt{$destroy(){ct(this,1),this.$destroy=k}$on(e,n){if(!q(n))return k;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!I(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ht as A,Ct as B,St as C,Nt as D,At as E,dt as F,O as G,Mt as H,Ot as I,Tt as J,jt as K,wt as L,Bt as M,Lt as N,rt as O,ct as P,gt as Q,pt as R,zt as S,st as T,yt as a,X as b,bt as c,tt as d,W as e,U as f,vt as g,V as h,Pt as i,mt as j,R as k,xt as l,Et as m,k as n,kt as o,ut as p,H as q,$t as r,lt as s,C as t,at as u,_t as v,ft as w,qt as x,it as y,Dt as z};
