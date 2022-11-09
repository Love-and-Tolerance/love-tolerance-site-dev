import{S as at,i as ut,s as st,e as R,t as U,a as X,c as N,b as M,d as Y,f as P,g as q,h as j,j as ct,k as A,l as ft,m as B,n as Q,o as lt}from"./chunks/index.78737147.js";import{m as k}from"./chunks/index.cf4744a4.js";/* empty css                              */var dt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},W={exports:{}};/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */(function(x,S){(function(b,g){x.exports=g()})(dt,function(){return function(){var m={686:function(s,f,t){t.d(f,{default:function(){return it}});var i=t(279),r=t.n(i),c=t(370),v=t.n(c),h=t(817),_=t.n(h);function l(u){try{return document.execCommand(u)}catch{return!1}}var y=function(n){var e=_()(n);return l("cut"),e},p=y;function T(u){var n=document.documentElement.getAttribute("dir")==="rtl",e=document.createElement("textarea");e.style.fontSize="12pt",e.style.border="0",e.style.padding="0",e.style.margin="0",e.style.position="absolute",e.style[n?"right":"left"]="-9999px";var o=window.pageYOffset||document.documentElement.scrollTop;return e.style.top="".concat(o,"px"),e.setAttribute("readonly",""),e.value=u,e}var D=function(n,e){var o=T(n);e.container.appendChild(o);var a=_()(o);return l("copy"),o.remove(),a},w=function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body},o="";return typeof n=="string"?o=D(n,e):n instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(n?.type)?o=D(n.value,e):(o=_()(n),l("copy")),o},E=w;function C(u){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?C=function(e){return typeof e}:C=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(u)}var I=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.action,o=e===void 0?"copy":e,a=n.container,d=n.target,O=n.text;if(o!=="copy"&&o!=="cut")throw new Error('Invalid "action" value, use either "copy" or "cut"');if(d!==void 0)if(d&&C(d)==="object"&&d.nodeType===1){if(o==="copy"&&d.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if(o==="cut"&&(d.hasAttribute("readonly")||d.hasAttribute("disabled")))throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`)}else throw new Error('Invalid "target" value, use a valid Element');if(O)return E(O,{container:a});if(d)return o==="cut"?p(d):E(d,{container:a})},z=I;function L(u){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?L=function(e){return typeof e}:L=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(u)}function V(u,n){if(!(u instanceof n))throw new TypeError("Cannot call a class as a function")}function K(u,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(u,o.key,o)}}function Z(u,n,e){return n&&K(u.prototype,n),e&&K(u,e),u}function $(u,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");u.prototype=Object.create(n&&n.prototype,{constructor:{value:u,writable:!0,configurable:!0}}),n&&G(u,n)}function G(u,n){return G=Object.setPrototypeOf||function(o,a){return o.__proto__=a,o},G(u,n)}function tt(u){var n=rt();return function(){var o=F(u),a;if(n){var d=F(this).constructor;a=Reflect.construct(o,arguments,d)}else a=o.apply(this,arguments);return et(this,a)}}function et(u,n){return n&&(L(n)==="object"||typeof n=="function")?n:nt(u)}function nt(u){if(u===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return u}function rt(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function F(u){return F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},F(u)}function J(u,n){var e="data-clipboard-".concat(u);if(!!n.hasAttribute(e))return n.getAttribute(e)}var ot=function(u){$(e,u);var n=tt(e);function e(o,a){var d;return V(this,e),d=n.call(this),d.resolveOptions(a),d.listenClick(o),d}return Z(e,[{key:"resolveOptions",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.action=typeof a.action=="function"?a.action:this.defaultAction,this.target=typeof a.target=="function"?a.target:this.defaultTarget,this.text=typeof a.text=="function"?a.text:this.defaultText,this.container=L(a.container)==="object"?a.container:document.body}},{key:"listenClick",value:function(a){var d=this;this.listener=v()(a,"click",function(O){return d.onClick(O)})}},{key:"onClick",value:function(a){var d=a.delegateTarget||a.currentTarget,O=this.action(d)||"copy",H=z({action:O,container:this.container,target:this.target(d),text:this.text(d)});this.emit(H?"success":"error",{action:O,text:H,trigger:d,clearSelection:function(){d&&d.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(a){return J("action",a)}},{key:"defaultTarget",value:function(a){var d=J("target",a);if(d)return document.querySelector(d)}},{key:"defaultText",value:function(a){return J("text",a)}},{key:"destroy",value:function(){this.listener.destroy()}}],[{key:"copy",value:function(a){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body};return E(a,d)}},{key:"cut",value:function(a){return p(a)}},{key:"isSupported",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:["copy","cut"],d=typeof a=="string"?[a]:a,O=!!document.queryCommandSupported;return d.forEach(function(H){O=O&&!!document.queryCommandSupported(H)}),O}}]),e}(r()),it=ot},828:function(s){var f=9;if(typeof Element<"u"&&!Element.prototype.matches){var t=Element.prototype;t.matches=t.matchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector}function i(r,c){for(;r&&r.nodeType!==f;){if(typeof r.matches=="function"&&r.matches(c))return r;r=r.parentNode}}s.exports=i},438:function(s,f,t){var i=t(828);function r(h,_,l,y,p){var T=v.apply(this,arguments);return h.addEventListener(l,T,p),{destroy:function(){h.removeEventListener(l,T,p)}}}function c(h,_,l,y,p){return typeof h.addEventListener=="function"?r.apply(null,arguments):typeof l=="function"?r.bind(null,document).apply(null,arguments):(typeof h=="string"&&(h=document.querySelectorAll(h)),Array.prototype.map.call(h,function(T){return r(T,_,l,y,p)}))}function v(h,_,l,y){return function(p){p.delegateTarget=i(p.target,_),p.delegateTarget&&y.call(h,p)}}s.exports=c},879:function(s,f){f.node=function(t){return t!==void 0&&t instanceof HTMLElement&&t.nodeType===1},f.nodeList=function(t){var i=Object.prototype.toString.call(t);return t!==void 0&&(i==="[object NodeList]"||i==="[object HTMLCollection]")&&"length"in t&&(t.length===0||f.node(t[0]))},f.string=function(t){return typeof t=="string"||t instanceof String},f.fn=function(t){var i=Object.prototype.toString.call(t);return i==="[object Function]"}},370:function(s,f,t){var i=t(879),r=t(438);function c(l,y,p){if(!l&&!y&&!p)throw new Error("Missing required arguments");if(!i.string(y))throw new TypeError("Second argument must be a String");if(!i.fn(p))throw new TypeError("Third argument must be a Function");if(i.node(l))return v(l,y,p);if(i.nodeList(l))return h(l,y,p);if(i.string(l))return _(l,y,p);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function v(l,y,p){return l.addEventListener(y,p),{destroy:function(){l.removeEventListener(y,p)}}}function h(l,y,p){return Array.prototype.forEach.call(l,function(T){T.addEventListener(y,p)}),{destroy:function(){Array.prototype.forEach.call(l,function(T){T.removeEventListener(y,p)})}}}function _(l,y,p){return r(document.body,l,y,p)}s.exports=c},817:function(s){function f(t){var i;if(t.nodeName==="SELECT")t.focus(),i=t.value;else if(t.nodeName==="INPUT"||t.nodeName==="TEXTAREA"){var r=t.hasAttribute("readonly");r||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),r||t.removeAttribute("readonly"),i=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var c=window.getSelection(),v=document.createRange();v.selectNodeContents(t),c.removeAllRanges(),c.addRange(v),i=c.toString()}return i}s.exports=f},279:function(s){function f(){}f.prototype={on:function(t,i,r){var c=this.e||(this.e={});return(c[t]||(c[t]=[])).push({fn:i,ctx:r}),this},once:function(t,i,r){var c=this;function v(){c.off(t,v),i.apply(r,arguments)}return v._=i,this.on(t,v,r)},emit:function(t){var i=[].slice.call(arguments,1),r=((this.e||(this.e={}))[t]||[]).slice(),c=0,v=r.length;for(c;c<v;c++)r[c].fn.apply(r[c].ctx,i);return this},off:function(t,i){var r=this.e||(this.e={}),c=r[t],v=[];if(c&&i)for(var h=0,_=c.length;h<_;h++)c[h].fn!==i&&c[h].fn._!==i&&v.push(c[h]);return v.length?r[t]=v:delete r[t],this}},s.exports=f,s.exports.TinyEmitter=f}},b={};function g(s){if(b[s])return b[s].exports;var f=b[s]={exports:{}};return m[s](f,f.exports,g),f.exports}return function(){g.n=function(s){var f=s&&s.__esModule?function(){return s.default}:function(){return s};return g.d(f,{a:f}),f}}(),function(){g.d=function(s,f){for(var t in f)g.o(f,t)&&!g.o(s,t)&&Object.defineProperty(s,t,{enumerable:!0,get:f[t]})}}(),function(){g.o=function(s,f){return Object.prototype.hasOwnProperty.call(s,f)}}(),g(686)}().default})})(W);const pt=k.union([k.object({online:k.literal(!1)}),k.object({online:k.literal(!0),version:k.string(),players:k.object({online:k.number(),max:k.number()})})]);function yt(x){let S,m,b,g=x[0].name+"",s,f,t,i=x[0].mcVersion+"",r,c,v,h,_,l,y=x[0].hostname+"",p,T,D;return{c(){S=R("div"),m=R("div"),b=R("div"),s=U(g),f=X(),t=R("div"),r=U(i),c=X(),v=R("div"),h=U(x[1]),_=X(),l=R("button"),p=U(y),this.h()},l(w){S=N(w,"DIV",{class:!0});var E=M(S);m=N(E,"DIV",{class:!0});var C=M(m);b=N(C,"DIV",{class:!0});var I=M(b);s=Y(I,g),I.forEach(P),f=q(C),t=N(C,"DIV",{class:!0});var z=M(t);r=Y(z,i),z.forEach(P),c=q(C),v=N(C,"DIV",{class:!0});var L=M(v);h=Y(L,x[1]),L.forEach(P),C.forEach(P),_=q(E),l=N(E,"BUTTON",{class:!0,"data-copy":!0});var V=M(l);p=Y(V,y),V.forEach(P),E.forEach(P),this.h()},h(){j(b,"class","mc-server__name svelte-1bky64z"),j(t,"class","mc-server__version svelte-1bky64z"),j(v,"class","mc-server__online svelte-1bky64z"),j(m,"class","mc-server__info svelte-1bky64z"),j(l,"class","mc-server__hostname svelte-1bky64z"),j(l,"data-copy",x[2]),j(S,"class","mc-server svelte-1bky64z")},m(w,E){ct(w,S,E),A(S,m),A(m,b),A(b,s),A(m,f),A(m,t),A(t,r),A(m,c),A(m,v),A(v,h),A(S,_),A(S,l),A(l,p),T||(D=ft(l,"click",x[3]),T=!0)},p(w,[E]){E&1&&g!==(g=w[0].name+"")&&B(s,g),E&1&&i!==(i=w[0].mcVersion+"")&&B(r,i),E&2&&B(h,w[1]),E&1&&y!==(y=w[0].hostname+"")&&B(p,y),E&4&&j(l,"data-copy",w[2])},i:Q,o:Q,d(w){w&&P(S),T=!1,D()}}}function vt(x,S,m){let{server:b}=S,g="",s="none";const f=`https://api.mcsrvstat.us/2/${b.hostname}`;async function t(){const r=await fetch(f),c=pt.parse(await r.json());c.online?(m(0,b.mcVersion=`Java ${c.version}`,b),m(1,g=`${c.players.online}/${c.players.max}`)):m(1,g="Offline")}function i(r){W.exports.copy(r.currentTarget)===""?m(2,s="error"):m(2,s="success"),setTimeout(()=>{m(2,s="ready")},1500)}return lt(()=>{m(2,s="ready"),t()}),x.$$set=r=>{"server"in r&&m(0,b=r.server)},[b,g,s,i]}class _t extends at{constructor(S){super(),ut(this,S,vt,yt,st,{server:0})}}export{_t as default};
