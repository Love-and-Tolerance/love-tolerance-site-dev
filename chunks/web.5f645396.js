const c={};function F(e){c.context=e}function je(){return{...c.context,id:`${c.context.id}${c.context.count++}-`,count:0}}const qe=(e,t)=>e===t,oe=Symbol("solid-proxy"),De=Symbol("solid-track"),W={equals:qe};let j=null,be=Ce;const v=1,Q=2,xe={owned:null,cleanups:null,context:null,owner:null},ne={};var d=null;let O=null,m=null,A=null,$=null,le=0;function _(e,t){const n=m,s=d,i=e.length===0,r=i?xe:{owned:null,cleanups:null,context:null,owner:t||s},o=i?e:()=>e(()=>C(()=>ce(r)));d=r,m=null;try{return D(o,!0)}finally{m=n,d=s}}function q(e,t){t=t?Object.assign({},W,t):W;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),ke(n,i));return[Ee.bind(n),s]}function ue(e,t,n){const s=z(e,t,!0,v);R(s)}function H(e,t,n){const s=z(e,t,!1,v);R(s)}function Fe(e,t,n){be=Ue;const s=z(e,t,!1,v),i=V&&K(d,V.id);i&&(s.suspense=i),s.user=!0,$?$.push(s):R(s)}function k(e,t,n){n=n?Object.assign({},W,n):W;const s=z(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,R(s),Ee.bind(s)}function St(e,t,n){let s,i,r;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,i=e,r=t||{}):(s=e,i=t,r=n||{});let o=null,l=ne,a=null,u=!1,f=!1,w="initialValue"in r,h=typeof s=="function"&&k(s);const g=new Set,[b,N]=(r.storage||q)(r.initialValue),[L,T]=q(void 0),[p,E]=q(void 0,{equals:!1}),[P,M]=q(w?"ready":"unresolved");if(c.context){a=`${c.context.id}${c.context.count++}`;let y;r.ssrLoadFrom==="initial"?l=r.initialValue:c.load&&(y=c.load(a))&&(l=y[0])}function I(y,S,x,U){return o===y&&(o=null,w=!0,(y===l||S===l)&&r.onHydrated&&queueMicrotask(()=>r.onHydrated(U,{value:S})),l=ne,ve(S,x)),S}function ve(y,S){D(()=>{S||N(()=>y),M(S?"errored":"ready"),T(S);for(const x of g.keys())x.decrement();g.clear()},!1)}function ee(){const y=V&&K(d,V.id),S=b(),x=L();if(x&&!o)throw x;return m&&!m.user&&y&&ue(()=>{p(),o&&(y.resolved&&O&&u?O.promises.add(o):g.has(y)||(y.increment(),g.add(y)))}),S}function te(y=!0){if(y!==!1&&f)return;f=!1;const S=h?h():s;if(u=O,S==null||S===!1){I(o,C(b));return}const x=l!==ne?l:C(()=>i(S,{value:b(),refetching:y}));return typeof x!="object"||!(x&&"then"in x)?(I(o,x),x):(o=x,f=!0,queueMicrotask(()=>f=!1),D(()=>{M(w?"refreshing":"pending"),E()},!1),x.then(U=>I(x,U,void 0,S),U=>I(x,void 0,Le(U))))}return Object.defineProperties(ee,{state:{get:()=>P()},error:{get:()=>L()},loading:{get(){const y=P();return y==="pending"||y==="refreshing"}},latest:{get(){if(!w)return ee();const y=L();if(y&&!o)throw y;return b()}}}),h?ue(()=>te(!1)):te(!1),[ee,{refetch:te,mutate:N}]}function Et(e){return D(e,!1)}function C(e){const t=m;m=null;try{return e()}finally{m=t}}function kt(e){Fe(()=>C(e))}function fe(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function ae(e){j||(j=Symbol("error")),d===null||(d.context===null?d.context={[j]:[e]}:d.context[j]?d.context[j].push(e):d.context[j]=[e])}function Ct(){return m}function He(){return d}function Ie(e){$.push.apply($,e),e.length=0}function Ae(e,t){const n=Symbol("context");return{id:n,Provider:_e(n),defaultValue:e}}function Be(e){let t;return(t=K(d,e.id))!==void 0?t:e.defaultValue}function Se(e){const t=k(e),n=k(()=>ie(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let V;function Ve(){return V||(V=Ae({}))}function Ee(){const e=O;if(this.sources&&(this.state||e))if(this.state===v||e)R(this);else{const t=A;A=null,D(()=>Z(this),!1),A=t}if(m){const t=this.observers?this.observers.length:0;m.sources?(m.sources.push(this),m.sourceSlots.push(t)):(m.sources=[this],m.sourceSlots=[t]),this.observers?(this.observers.push(m),this.observerSlots.push(m.sources.length-1)):(this.observers=[m],this.observerSlots=[m.sources.length-1])}return this.value}function ke(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&D(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=O&&O.running;o&&O.disposed.has(r),(o&&!r.tState||!o&&!r.state)&&(r.pure?A.push(r):$.push(r),r.observers&&Ne(r)),o||(r.state=v)}if(A.length>1e6)throw A=[],new Error},!1)),t}function R(e){if(!e.fn)return;ce(e);const t=d,n=m,s=le;m=d=e,Ge(e,e.value,s),m=n,d=t}function Ge(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=v),Pe(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ke(e,s):e.value=s,e.updatedAt=n)}function z(e,t,n,s=v,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:null,pure:n};return d===null||d!==xe&&(d.owned?d.owned.push(r):d.owned=[r]),r}function J(e){const t=O;if(e.state===0||t)return;if(e.state===Q||t)return Z(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<le);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===v||t)R(e);else if(e.state===Q||t){const i=A;A=null,D(()=>Z(e,n[0]),!1),A=i}}function D(e,t){if(A)return e();let n=!1;t||(A=[]),$?n=!0:$=[],le++;try{const s=e();return Re(n),s}catch(s){A||($=null),Pe(s)}}function Re(e){if(A&&(Ce(A),A=null),e)return;const t=$;$=null,t.length&&D(()=>be(t),!1)}function Ce(e){for(let t=0;t<e.length;t++)J(e[t])}function Ue(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:J(s)}for(c.context&&F(),t=0;t<n;t++)J(e[t])}function Z(e,t){const n=O;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===v||n?i!==t&&J(i):(i.state===Q||n)&&Z(i,t))}}function Ne(e){const t=O;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=Q,s.pure?A.push(s):$.push(s),s.observers&&Ne(s))}}function ce(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),o=n.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)ce(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Le(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Pe(e){e=Le(e);const t=j&&K(d,j);if(!t)throw e;for(const n of t)n(e)}function K(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:K(e.owner,t):void 0}function ie(e){if(typeof e=="function"&&!e.length)return ie(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=ie(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function _e(e,t){return function(s){let i;return H(()=>i=C(()=>(d.context={[e]:s.value},Se(()=>s.children))),void 0),i}}const Ke=Symbol("fallback");function de(e){for(let t=0;t<e.length;t++)e[t]()}function Ye(e,t,n={}){let s=[],i=[],r=[],o=0,l=t.length>1?[]:null;return fe(()=>de(r)),()=>{let a=e()||[],u,f;return a[De],C(()=>{let h=a.length,g,b,N,L,T,p,E,P,M;if(h===0)o!==0&&(de(r),r=[],s=[],i=[],o=0,l&&(l=[])),n.fallback&&(s=[Ke],i[0]=_(I=>(r[0]=I,n.fallback())),o=1);else if(o===0){for(i=new Array(h),f=0;f<h;f++)s[f]=a[f],i[f]=_(w);o=h}else{for(N=new Array(h),L=new Array(h),l&&(T=new Array(h)),p=0,E=Math.min(o,h);p<E&&s[p]===a[p];p++);for(E=o-1,P=h-1;E>=p&&P>=p&&s[E]===a[P];E--,P--)N[P]=i[E],L[P]=r[E],l&&(T[P]=l[E]);for(g=new Map,b=new Array(P+1),f=P;f>=p;f--)M=a[f],u=g.get(M),b[f]=u===void 0?-1:u,g.set(M,f);for(u=p;u<=E;u++)M=s[u],f=g.get(M),f!==void 0&&f!==-1?(N[f]=i[u],L[f]=r[u],l&&(T[f]=l[u]),f=b[f],g.set(M,f)):r[u]();for(f=p;f<h;f++)f in N?(i[f]=N[f],r[f]=L[f],l&&(l[f]=T[f],l[f](f))):i[f]=_(w);i=i.slice(0,o=h),s=a.slice(0)}return i});function w(h){if(r[f]=h,l){const[g,b]=q(f);return l[f]=b,t(a[f],g)}return t(a[f])}}}let Te=!1;function Xe(){Te=!0}function We(e,t){if(Te&&c.context){const n=c.context;F(je());const s=C(()=>e(t||{}));return F(n),s}return C(()=>e(t||{}))}function Y(){return!0}const $e={get(e,t,n){return t===oe?n:e.get(t)},has(e,t){return e.has(t)},set:Y,deleteProperty:Y,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Y,deleteProperty:Y}},ownKeys(e){return e.keys()}};function se(e){return(e=typeof e=="function"?e():e)?e:{}}function Nt(...e){if(e.some(n=>n&&(oe in n||typeof n=="function")))return new Proxy({get(n){for(let s=e.length-1;s>=0;s--){const i=se(e[s])[n];if(i!==void 0)return i}},has(n){for(let s=e.length-1;s>=0;s--)if(n in se(e[s]))return!0;return!1},keys(){const n=[];for(let s=0;s<e.length;s++)n.push(...Object.keys(se(e[s])));return[...new Set(n)]}},$e);const t={};for(let n=e.length-1;n>=0;n--)if(e[n]){const s=Object.getOwnPropertyDescriptors(e[n]);for(const i in s)i in t||Object.defineProperty(t,i,{enumerable:!0,get(){for(let r=e.length-1;r>=0;r--){const o=(e[r]||{})[i];if(o!==void 0)return o}}})}return t}function Qe(e,...t){const n=new Set(t.flat()),s=Object.getOwnPropertyDescriptors(e),i=oe in e;i||t.push(Object.keys(s).filter(o=>!n.has(o)));const r=t.map(o=>{const l={};for(let a=0;a<o.length;a++){const u=o[a];!i&&!(u in e)||Object.defineProperty(l,u,s[u]?s[u]:{get(){return e[u]},set(){return!0},enumerable:!0})}return l});return i&&r.push(new Proxy({get(o){return n.has(o)?void 0:e[o]},has(o){return n.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!n.has(o))}},$e)),r}function Lt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return k(Ye(()=>e.each,e.children,t||void 0))}function Pt(e){let t=!1;const n=e.keyed,s=k(()=>e.when,void 0,{equals:(i,r)=>t?i===r:!i==!r});return k(()=>{const i=s();if(i){const r=e.children,o=typeof r=="function"&&r.length>0;return t=n||o,o?C(()=>r(i)):r}return e.fallback})}function Tt(e){let t=!1,n=!1;const s=Se(()=>e.children),i=k(()=>{let r=s();Array.isArray(r)||(r=[r]);for(let o=0;o<r.length;o++){const l=r[o].when;if(l)return n=!!r[o].keyed,[o,l,r[o]]}return[-1]},void 0,{equals:(r,o)=>r[0]===o[0]&&(t?r[1]===o[1]:!r[1]==!o[1])&&r[2]===o[2]});return k(()=>{const[r,o,l]=i();if(r<0)return e.fallback;const a=l.children,u=typeof a=="function"&&a.length>0;return t=n||u,u?C(()=>a(o)):a})}function $t(e){return e}let X;function Ot(e){let t,n;c.context&&c.load&&(n=c.load(c.context.id+c.context.count))&&(t=n[0]);const[s,i]=q(t);return X||(X=new Set),X.add(i),fe(()=>X.delete(i)),k(()=>{let r;if(r=s()){const o=e.fallback,l=typeof o=="function"&&o.length?C(()=>o(r,()=>i())):o;return ae(i),l}return ae(i),e.children})}const Je=Ae();function Mt(e){let t=0,n,s,i,r,o;const[l,a]=q(!1),u=Ve(),f={increment:()=>{++t===1&&a(!0)},decrement:()=>{--t===0&&a(!1)},inFallback:l,effects:[],resolved:!1},w=He();if(c.context&&c.load){const b=c.context.id+c.context.count;let N=c.load(b);if(N&&(i=N[0])&&i!=="$$f"){(typeof i!="object"||!("then"in i))&&(i=Promise.resolve(i));const[L,T]=q(void 0,{equals:!1});r=L,i.then(p=>{if(p||c.done)return p&&(o=p),T();c.gather(b),F(s),T(),F()})}}const h=Be(Je);h&&(n=h.register(f.inFallback));let g;return fe(()=>g&&g()),We(u.Provider,{value:f,get children(){return k(()=>{if(o)throw o;if(s=c.context,r)return r(),r=void 0;s&&i==="$$f"&&F();const b=k(()=>e.children);return k(N=>{const L=f.inFallback(),{showContent:T=!0,showFallback:p=!0}=n?n():{};if((!L||i&&i!=="$$f")&&T)return f.resolved=!0,g&&g(),g=s=i=void 0,Ie(f.effects),b();if(!!p)return g?N:_(E=>(g=E,s&&(F({id:s.id+"f",count:0}),s=void 0),e.fallback),w)})})}})}const Ze=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],ze=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Ze]),et=new Set(["innerHTML","textContent","innerText","children"]),tt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),he=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),nt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),st=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),it={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function rt(e,t,n){let s=n.length,i=t.length,r=s,o=0,l=0,a=t[i-1].nextSibling,u=null;for(;o<i||l<r;){if(t[o]===n[l]){o++,l++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===o){const f=r<s?l?n[l-1].nextSibling:n[r-l]:a;for(;l<r;)e.insertBefore(n[l++],f)}else if(r===l)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[l]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--r],f),t[i]=n[r]}else{if(!u){u=new Map;let w=l;for(;w<r;)u.set(n[w],w++)}const f=u.get(t[o]);if(f!=null)if(l<f&&f<r){let w=o,h=1,g;for(;++w<i&&w<r&&!((g=u.get(t[w]))==null||g!==f+h);)h++;if(h>f-l){const b=t[o];for(;l<f;)e.insertBefore(n[l++],b)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const ge="_$DX_DELEGATE";function ot(e,t,n,s={}){let i;return _(r=>{i=r,t===document?e():gt(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function vt(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function lt(e,t=window.document){const n=t[ge]||(t[ge]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,Me))}}function Oe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function ft(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function ct(e,t){t==null?e.removeAttribute("class"):e.className=t}function ut(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=r=>i.call(e,n[1],r))}else e.addEventListener(t,n)}function at(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let r,o;for(r=0,o=i.length;r<o;r++){const l=i[r];!l||l==="undefined"||t[l]||(ye(e,l,!1),delete n[l])}for(r=0,o=s.length;r<o;r++){const l=s[r],a=!!t[l];!l||l==="undefined"||n[l]===a||!a||(ye(e,l,!0),n[l]=a)}return n}function dt(e,t,n){if(!t)return n?Oe(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,r;for(r in n)t[r]==null&&s.removeProperty(r),delete n[r];for(r in t)i=t[r],i!==n[r]&&(s.setProperty(r,i),n[r]=i);return n}function ht(e,t={},n,s){const i={};return s||H(()=>i.children=G(e,t.children,i.children)),H(()=>t.ref&&t.ref(e)),H(()=>yt(e,t,n,!0,i,!0)),i}function jt(e,t){!c.context&&(e.innerHTML=t)}function qt(e,t,n){return C(()=>e(t,n))}function gt(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return G(e,t,s,n);H(i=>G(e,t(),i,n),s)}function yt(e,t,n,s,i={},r=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=me(e,o,null,i[o],n,r)}for(const o in t){if(o==="children"){s||G(e,t.children);continue}const l=t[o];i[o]=me(e,o,l,i[o],n,r)}}function mt(e,t,n={}){c.completed=globalThis._$HY.completed,c.events=globalThis._$HY.events,c.load=globalThis._$HY.load,c.gather=i=>pe(t,i),c.registry=new Map,c.context={id:n.renderId||"",count:0},pe(t,n.renderId);const s=ot(e,t,[...t.childNodes],n);return c.context=null,s}function wt(e){let t,n;return!c.context||!(t=c.registry.get(n=bt()))?e.cloneNode(!0):(c.completed&&c.completed.add(t),c.registry.delete(n),t)}function Dt(e){let t=e,n=0,s=[];if(c.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="#")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function Ft(){c.events&&!c.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=c;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;Me(s),t.shift()}}),c.events.queued=!0)}function pt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function ye(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,r=s.length;i<r;i++)e.classList.toggle(s[i],n)}function me(e,t,n,s,i,r){let o,l,a;if(t==="style")return dt(e,n,s);if(t==="classList")return at(e,n,s);if(n===s)return s;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:"){const u=t.slice(3);s&&e.removeEventListener(u,s),n&&e.addEventListener(u,n)}else if(t.slice(0,10)==="oncapture:"){const u=t.slice(10);s&&e.removeEventListener(u,s,!0),n&&e.addEventListener(u,n,!0)}else if(t.slice(0,2)==="on"){const u=t.slice(2).toLowerCase(),f=nt.has(u);if(!f&&s){const w=Array.isArray(s)?s[0]:s;e.removeEventListener(u,w)}(f||n)&&(ut(e,u,n,f),f&&lt([u]))}else if((a=et.has(t))||!i&&(he[t]||(l=ze.has(t)))||(o=e.nodeName.includes("-")))t==="class"||t==="className"?ct(e,n):o&&!l&&!a?e[pt(t)]=n:e[he[t]||t]=n;else{const u=i&&t.indexOf(":")>-1&&it[t.split(":")[0]];u?ft(e,u,t,n):Oe(e,tt[t]||t,n)}return n}function Me(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),c.registry&&!c.done&&(c.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n!==null;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function G(e,t,n,s,i){for(c.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(c.context)return n;if(r==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=B(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(c.context)return n;n=B(e,n,s)}else{if(r==="function")return H(()=>{let l=t();for(;typeof l=="function";)l=l();n=G(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],a=n&&Array.isArray(n);if(re(l,t,n,i))return H(()=>n=G(e,l,n,s,!0)),()=>n;if(c.context){if(!l.length)return n;for(let u=0;u<l.length;u++)if(l[u].parentNode)return n=l}if(l.length===0){if(n=B(e,n,s),o)return n}else a?n.length===0?we(e,l,s):rt(e,n,l):(n&&B(e),we(e,l));n=l}else if(t instanceof Node){if(c.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=B(e,n,s,t);B(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function re(e,t,n,s){let i=!1;for(let r=0,o=t.length;r<o;r++){let l=t[r],a=n&&n[r];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=re(e,l,a)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=re(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||i}else e.push(l),i=!0;else{const u=String(l);a&&a.nodeType===3&&a.data===u?e.push(a):e.push(document.createTextNode(u))}}return i}function we(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function B(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(i!==l){const a=l.parentNode===e;!r&&!o?a?e.replaceChild(i,l):e.insertBefore(i,n):a&&l.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function pe(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],r=i.getAttribute("data-hk");(!t||r.startsWith(t))&&!c.registry.has(r)&&c.registry.set(r,i)}}function bt(){const e=c.context;return`${e.id}${e.count++}`}const xt="http://www.w3.org/2000/svg";function At(e,t=!1){return t?document.createElementNS(xt,e):document.createElement(e)}const Ht=(...e)=>(Xe(),mt(...e));function It(e){const[t,n]=Qe(e,["component"]),s=k(()=>t.component);return k(()=>{const i=s();switch(typeof i){case"function":return C(()=>i(n));case"string":const r=st.has(i),o=c.context?wt():At(i,r);return ht(o,n,r),o}})}export{oe as $,St as A,Mt as B,ut as C,It as D,Ot as E,Lt as F,c as G,ot as H,Ht as I,$t as M,Pt as S,fe as a,H as b,q as c,lt as d,Ae as e,Se as f,wt as g,Qe as h,gt as i,k as j,Fe as k,ht as l,Nt as m,We as n,kt as o,Dt as p,De as q,Ft as r,Oe as s,vt as t,qt as u,Ct as v,Et as w,jt as x,Tt as y,ct as z};
