(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Chapter"],{"0653":function(t,e,n){"use strict";n("68ef")},"22ec":function(t,e,n){"use strict";var i=n("bba5"),r=n.n(i);r.a},"34e9":function(t,e,n){"use strict";var i=n("2638"),r=n.n(i),s=n("d282"),o=n("ba31"),a=n("b1d2"),c=Object(s["a"])("cell-group"),l=c[0],h=c[1];function u(t,e,n,i){var s,c=t("div",r()([{class:[h(),(s={},s[a["e"]]=e.border,s)]},Object(o["b"])(i,!0)]),[n.default&&n.default()]);return e.title||n.title?t("div",[t("div",{class:h("title")},[n.title?n.title():e.title]),c]):c}u.props={title:String,border:{type:Boolean,default:!0}},e["a"]=l(u)},5319:function(t,e,n){"use strict";var i=n("d784"),r=n("825a"),s=n("7b0b"),o=n("50c4"),a=n("a691"),c=n("1d80"),l=n("8aa5"),h=n("14c3"),u=Math.max,p=Math.min,f=Math.floor,d=/\$([$&'`]|\d\d?|<[^>]*>)/g,v=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};i("replace",2,(function(t,e,n){return[function(n,i){var r=c(this),s=void 0==n?void 0:n[t];return void 0!==s?s.call(n,r,i):e.call(String(r),n,i)},function(t,s){var c=n(e,t,this,s);if(c.done)return c.value;var f=r(t),d=String(this),v="function"===typeof s;v||(s=String(s));var m=f.global;if(m){var y=f.unicode;f.lastIndex=0}var b=[];while(1){var T=h(f,d);if(null===T)break;if(b.push(T),!m)break;var w=String(T[0]);""===w&&(f.lastIndex=l(d,o(f.lastIndex),y))}for(var E="",C=0,I=0;I<b.length;I++){T=b[I];for(var x=String(T[0]),O=u(p(a(T.index),d.length),0),S=[],A=1;A<T.length;A++)S.push(g(T[A]));var z=T.groups;if(v){var k=[x].concat(S,O,d);void 0!==z&&k.push(z);var P=String(s.apply(void 0,k))}else P=i(x,d,O,S,z,s);O>=C&&(E+=d.slice(C,O)+P,C=O+x.length)}return E+d.slice(C)}];function i(t,n,i,r,o,a){var c=i+t.length,l=r.length,h=v;return void 0!==o&&(o=s(o),h=d),e.call(a,h,(function(e,s){var a;switch(s.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,i);case"'":return n.slice(c);case"<":a=o[s.slice(1,-1)];break;default:var h=+s;if(0===h)return e;if(h>l){var u=f(h/10);return 0===u?e:u<=l?void 0===r[u-1]?s.charAt(1):r[u-1]+s.charAt(1):e}a=r[h-1]}return void 0===a?"":a}))}}))},"537b":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"chapter"},[n("v-touch",{on:{swipeleft:t.nextChapter,swiperight:t.prevChapter}},[n("div",{domProps:{innerHTML:t._s(t.data.cpContent)}})]),n("Popup",{model:{value:t.showPicker,callback:function(e){t.showPicker=e},expression:"showPicker"}},[n("CellGroup",t._l(t.categories,(function(e,i){return n("Cell",{key:i,attrs:{title:e.title},on:{click:function(n){return t.fetchData(e.link)}}})})),1)],1)],1)},r=[],s=(n("d3b7"),n("ac1f"),n("5319"),n("9911"),n("96cf"),n("c194"),n("7744")),o=(n("0653"),n("34e9")),a=(n("68ef"),n("09fe"),n("4d75"),n("e41f")),c=n("8bbf"),l=n.n(c),h=n("ca95"),u=n.n(h);l.a.use(u.a),u.a.config.swipe={direction:"horizontal"};var p={name:"Chapter",props:{showCategory:{type:Boolean,default:!1}},components:{Popup:a["a"],CellGroup:o["a"],Cell:s["a"]},data:function(){return{url:this.$route.query.link,data:{},categories:JSON.parse(localStorage.getItem("category")),chapterIndex:this.$route.query.key,showPicker:!1}},watch:{url:{handler:function(t){this.fetchData(t)},immediate:!0},showCategory:function(t){this.showPicker=t}},methods:{fetchData:function(t){var e=this;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(this.$axios.get("/chapter?url=".concat(t)).then((function(t){e.$emit("changeTitle",t.data.data.title),t.data.data.cpContent=t.data.data.cpContent.replace(/\s+/g,'<div class="divider" style="padding: 15px 0;"></div>'),e.data=t.data.data})));case 2:this.showPicker=!1;case 3:case"end":return n.stop()}}),null,this)},prevChapter:function(){this.chapterIndex=this.chapterIndex>0?this.chapterIndex-1:this.chapterIndex,this.url=this.categories[this.chapterIndex].link,this.$db.setData("current",{chapterIndex:this.chapterIndex})},nextChapter:function(){this.chapterIndex=this.chapterIndex<this.categories.length?this.chapterIndex+1:this.chapterIndex,this.url=this.categories[this.chapterIndex].link,this.$db.setData("current",{chapterIndex:this.chapterIndex})}},beforeRouteLeave:function(){this.bscroll&&this.bscroll.destroy(),this.$toast.clear()}},f=p,d=(n("22ec"),n("2877")),v=Object(d["a"])(f,i,r,!1,null,"051b2e3d",null);e["default"]=v.exports},7744:function(t,e,n){"use strict";var i=n("c31d"),r=n("2638"),s=n.n(r),o=n("d282"),a=n("a142"),c={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,clickable:Boolean,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0}},l=n("ba31"),h=n("48f4"),u=n("ad06"),p=Object(o["a"])("cell"),f=p[0],d=p[1];function v(t,e,n,i){var r=e.icon,o=e.size,c=e.title,p=e.label,f=e.value,v=e.isLink,g=e.arrowDirection,m=n.title||Object(a["b"])(c),y=n.default||Object(a["b"])(f),b=n.label||Object(a["b"])(p),T=b&&t("div",{class:[d("label"),e.labelClass]},[n.label?n.label():p]),w=m&&t("div",{class:[d("title"),e.titleClass],style:e.titleStyle},[n.title?n.title():t("span",[c]),T]),E=y&&t("div",{class:[d("value",{alone:!n.title&&!c}),e.valueClass]},[n.default?n.default():t("span",[f])]),C=n.icon?n.icon():r&&t(u["a"],{class:d("left-icon"),attrs:{name:r}}),I=n["right-icon"],x=I?I():v&&t(u["a"],{class:d("right-icon"),attrs:{name:g?"arrow-"+g:"arrow"}});function O(t){Object(l["a"])(i,"click",t),Object(h["a"])(i)}var S=v||e.clickable,A={clickable:S,center:e.center,required:e.required,borderless:!e.border};return o&&(A[o]=o),t("div",s()([{class:d(A),attrs:{role:S?"button":null,tabindex:S?0:null},on:{click:O}},Object(l["b"])(i)]),[C,w,E,x,n.extra&&n.extra()])}v.props=Object(i["a"])({},c,{},h["b"]);e["a"]=f(v)},bba5:function(t,e,n){},c194:function(t,e,n){"use strict";n("68ef"),n("09fe")},c8b5:function(t,e,n){var i;
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */(function(r,s,o,a){"use strict";var c,l=["","webkit","Moz","MS","ms","o"],h=s.createElement("div"),u="function",p=Math.round,f=Math.abs,d=Date.now;function v(t,e,n){return setTimeout(E(t,n),e)}function g(t,e,n){return!!Array.isArray(t)&&(m(t,n[e],n),!0)}function m(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==a){i=0;while(i<t.length)e.call(n,t[i],i,t),i++}else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function y(t,e,n){var i="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=r.console&&(r.console.warn||r.console.log);return s&&s.call(r.console,i,n),t.apply(this,arguments)}}c="function"!==typeof Object.assign?function(t){if(t===a||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==a&&null!==i)for(var r in i)i.hasOwnProperty(r)&&(e[r]=i[r])}return e}:Object.assign;var b=y((function(t,e,n){var i=Object.keys(e),r=0;while(r<i.length)(!n||n&&t[i[r]]===a)&&(t[i[r]]=e[i[r]]),r++;return t}),"extend","Use `assign`."),T=y((function(t,e){return b(t,e,!0)}),"merge","Use `assign`.");function w(t,e,n){var i,r=e.prototype;i=t.prototype=Object.create(r),i.constructor=t,i._super=r,n&&c(i,n)}function E(t,e){return function(){return t.apply(e,arguments)}}function C(t,e){return typeof t==u?t.apply(e&&e[0]||a,e):t}function I(t,e){return t===a?e:t}function x(t,e,n){m(z(e),(function(e){t.addEventListener(e,n,!1)}))}function O(t,e,n){m(z(e),(function(e){t.removeEventListener(e,n,!1)}))}function S(t,e){while(t){if(t==e)return!0;t=t.parentNode}return!1}function A(t,e){return t.indexOf(e)>-1}function z(t){return t.trim().split(/\s+/g)}function k(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);var i=0;while(i<t.length){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function P(t){return Array.prototype.slice.call(t,0)}function _(t,e,n){var i=[],r=[],s=0;while(s<t.length){var o=e?t[s][e]:t[s];k(r,o)<0&&i.push(t[s]),r[s]=o,s++}return n&&(i=e?i.sort((function(t,n){return t[e]>n[e]})):i.sort()),i}function D(t,e){var n,i,r=e[0].toUpperCase()+e.slice(1),s=0;while(s<l.length){if(n=l[s],i=n?n+r:e,i in t)return i;s++}return a}var R=1;function M(){return R++}function N(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||r}var j=/mobile|tablet|ip(ad|hone|od)|android/i,X="ontouchstart"in r,Y=D(r,"PointerEvent")!==a,q=X&&j.test(navigator.userAgent),$="touch",F="pen",B="mouse",L="kinect",W=25,H=1,U=2,V=4,G=8,J=1,Z=2,K=4,Q=8,tt=16,et=Z|K,nt=Q|tt,it=et|nt,rt=["x","y"],st=["clientX","clientY"];function ot(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){C(t.options.enable,[t])&&n.handler(e)},this.init()}function at(t){var e,n=t.options.inputClass;return e=n||(Y?At:q?Nt:X?qt:Ct),new e(t,ct)}function ct(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,s=e&H&&i-r===0,o=e&(V|G)&&i-r===0;n.isFirst=!!s,n.isFinal=!!o,s&&(t.session={}),n.eventType=e,lt(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function lt(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=pt(e)),r>1&&!n.firstMultiple?n.firstMultiple=pt(e):1===r&&(n.firstMultiple=!1);var s=n.firstInput,o=n.firstMultiple,a=o?o.center:s.center,c=e.center=ft(i);e.timeStamp=d(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=mt(a,c),e.distance=gt(a,c),ht(n,e),e.offsetDirection=vt(e.deltaX,e.deltaY);var l=dt(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=l.x,e.overallVelocityY=l.y,e.overallVelocity=f(l.x)>f(l.y)?l.x:l.y,e.scale=o?bt(o.pointers,i):1,e.rotation=o?yt(o.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,ut(n,e);var h=t.element;S(e.srcEvent.target,h)&&(h=e.srcEvent.target),e.target=h}function ht(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==H&&s.eventType!==V||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}function ut(t,e){var n,i,r,s,o=t.lastInterval||e,c=e.timeStamp-o.timeStamp;if(e.eventType!=G&&(c>W||o.velocity===a)){var l=e.deltaX-o.deltaX,h=e.deltaY-o.deltaY,u=dt(c,l,h);i=u.x,r=u.y,n=f(u.x)>f(u.y)?u.x:u.y,s=vt(l,h),t.lastInterval=e}else n=o.velocity,i=o.velocityX,r=o.velocityY,s=o.direction;e.velocity=n,e.velocityX=i,e.velocityY=r,e.direction=s}function pt(t){var e=[],n=0;while(n<t.pointers.length)e[n]={clientX:p(t.pointers[n].clientX),clientY:p(t.pointers[n].clientY)},n++;return{timeStamp:d(),pointers:e,center:ft(e),deltaX:t.deltaX,deltaY:t.deltaY}}function ft(t){var e=t.length;if(1===e)return{x:p(t[0].clientX),y:p(t[0].clientY)};var n=0,i=0,r=0;while(r<e)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:p(n/e),y:p(i/e)}}function dt(t,e,n){return{x:e/t||0,y:n/t||0}}function vt(t,e){return t===e?J:f(t)>=f(e)?t<0?Z:K:e<0?Q:tt}function gt(t,e,n){n||(n=rt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function mt(t,e,n){n||(n=rt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}function yt(t,e){return mt(e[1],e[0],st)+mt(t[1],t[0],st)}function bt(t,e){return gt(e[0],e[1],st)/gt(t[0],t[1],st)}ot.prototype={handler:function(){},init:function(){this.evEl&&x(this.element,this.evEl,this.domHandler),this.evTarget&&x(this.target,this.evTarget,this.domHandler),this.evWin&&x(N(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&O(this.element,this.evEl,this.domHandler),this.evTarget&&O(this.target,this.evTarget,this.domHandler),this.evWin&&O(N(this.element),this.evWin,this.domHandler)}};var Tt={mousedown:H,mousemove:U,mouseup:V},wt="mousedown",Et="mousemove mouseup";function Ct(){this.evEl=wt,this.evWin=Et,this.pressed=!1,ot.apply(this,arguments)}w(Ct,ot,{handler:function(t){var e=Tt[t.type];e&H&&0===t.button&&(this.pressed=!0),e&U&&1!==t.which&&(e=V),this.pressed&&(e&V&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:B,srcEvent:t}))}});var It={pointerdown:H,pointermove:U,pointerup:V,pointercancel:G,pointerout:G},xt={2:$,3:F,4:B,5:L},Ot="pointerdown",St="pointermove pointerup pointercancel";function At(){this.evEl=Ot,this.evWin=St,ot.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}r.MSPointerEvent&&!r.PointerEvent&&(Ot="MSPointerDown",St="MSPointerMove MSPointerUp MSPointerCancel"),w(At,ot,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=It[i],s=xt[t.pointerType]||t.pointerType,o=s==$,a=k(e,t.pointerId,"pointerId");r&H&&(0===t.button||o)?a<0&&(e.push(t),a=e.length-1):r&(V|G)&&(n=!0),a<0||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var zt={touchstart:H,touchmove:U,touchend:V,touchcancel:G},kt="touchstart",Pt="touchstart touchmove touchend touchcancel";function _t(){this.evTarget=kt,this.evWin=Pt,this.started=!1,ot.apply(this,arguments)}function Dt(t,e){var n=P(t.touches),i=P(t.changedTouches);return e&(V|G)&&(n=_(n.concat(i),"identifier",!0)),[n,i]}w(_t,ot,{handler:function(t){var e=zt[t.type];if(e===H&&(this.started=!0),this.started){var n=Dt.call(this,t,e);e&(V|G)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:$,srcEvent:t})}}});var Rt={touchstart:H,touchmove:U,touchend:V,touchcancel:G},Mt="touchstart touchmove touchend touchcancel";function Nt(){this.evTarget=Mt,this.targetIds={},ot.apply(this,arguments)}function jt(t,e){var n=P(t.touches),i=this.targetIds;if(e&(H|U)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,s,o=P(t.changedTouches),a=[],c=this.target;if(s=n.filter((function(t){return S(t.target,c)})),e===H){r=0;while(r<s.length)i[s[r].identifier]=!0,r++}r=0;while(r<o.length)i[o[r].identifier]&&a.push(o[r]),e&(V|G)&&delete i[o[r].identifier],r++;return a.length?[_(s.concat(a),"identifier",!0),a]:void 0}w(Nt,ot,{handler:function(t){var e=Rt[t.type],n=jt.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:$,srcEvent:t})}});var Xt=2500,Yt=25;function qt(){ot.apply(this,arguments);var t=E(this.handler,this);this.touch=new Nt(this.manager,t),this.mouse=new Ct(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function $t(t,e){t&H?(this.primaryTouch=e.changedPointers[0].identifier,Ft.call(this,e)):t&(V|G)&&Ft.call(this,e)}function Ft(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches,r=function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)};setTimeout(r,Xt)}}function Bt(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],s=Math.abs(e-r.x),o=Math.abs(n-r.y);if(s<=Yt&&o<=Yt)return!0}return!1}w(qt,ot,{handler:function(t,e,n){var i=n.pointerType==$,r=n.pointerType==B;if(!(r&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)$t.call(this,e,n);else if(r&&Bt.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Lt=D(h.style,"touchAction"),Wt=Lt!==a,Ht="compute",Ut="auto",Vt="manipulation",Gt="none",Jt="pan-x",Zt="pan-y",Kt=ee();function Qt(t,e){this.manager=t,this.set(e)}function te(t){if(A(t,Gt))return Gt;var e=A(t,Jt),n=A(t,Zt);return e&&n?Gt:e||n?e?Jt:Zt:A(t,Vt)?Vt:Ut}function ee(){if(!Wt)return!1;var t={},e=r.CSS&&r.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach((function(n){t[n]=!e||r.CSS.supports("touch-action",n)})),t}Qt.prototype={set:function(t){t==Ht&&(t=this.compute()),Wt&&this.manager.element.style&&Kt[t]&&(this.manager.element.style[Lt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return m(this.manager.recognizers,(function(e){C(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))})),te(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var i=this.actions,r=A(i,Gt)&&!Kt[Gt],s=A(i,Zt)&&!Kt[Zt],o=A(i,Jt)&&!Kt[Jt];if(r){var a=1===t.pointers.length,c=t.distance<2,l=t.deltaTime<250;if(a&&c&&l)return}if(!o||!s)return r||s&&n&et||o&&n&nt?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ne=1,ie=2,re=4,se=8,oe=se,ae=16,ce=32;function le(t){this.options=c({},this.defaults,t||{}),this.id=M(),this.manager=null,this.options.enable=I(this.options.enable,!0),this.state=ne,this.simultaneous={},this.requireFail=[]}function he(t){return t&ae?"cancel":t&se?"end":t&re?"move":t&ie?"start":""}function ue(t){return t==tt?"down":t==Q?"up":t==Z?"left":t==K?"right":""}function pe(t,e){var n=e.manager;return n?n.get(t):t}function fe(){le.apply(this,arguments)}function de(){fe.apply(this,arguments),this.pX=null,this.pY=null}function ve(){fe.apply(this,arguments)}function ge(){le.apply(this,arguments),this._timer=null,this._input=null}function me(){fe.apply(this,arguments)}function ye(){fe.apply(this,arguments)}function be(){le.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function Te(t,e){return e=e||{},e.recognizers=I(e.recognizers,Te.defaults.preset),new Ce(t,e)}le.prototype={defaults:{},set:function(t){return c(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(g(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=pe(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return g(t,"dropRecognizeWith",this)?this:(t=pe(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(g(t,"requireFailure",this))return this;var e=this.requireFail;return t=pe(t,this),-1===k(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(g(t,"dropRequireFailure",this))return this;t=pe(t,this);var e=k(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){var e=this,n=this.state;function i(n){e.manager.emit(n,t)}n<se&&i(e.options.event+he(n)),i(e.options.event),t.additionalEvent&&i(t.additionalEvent),n>=se&&i(e.options.event+he(n))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=ce},canEmit:function(){var t=0;while(t<this.requireFail.length){if(!(this.requireFail[t].state&(ce|ne)))return!1;t++}return!0},recognize:function(t){var e=c({},t);if(!C(this.options.enable,[this,e]))return this.reset(),void(this.state=ce);this.state&(oe|ae|ce)&&(this.state=ne),this.state=this.process(e),this.state&(ie|re|se|ae)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},w(fe,le,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(ie|re),r=this.attrTest(t);return i&&(n&G||!r)?e|ae:i||r?n&V?e|se:e&ie?e|re:ie:ce}}),w(de,fe,{defaults:{event:"pan",threshold:10,pointers:1,direction:it},getTouchAction:function(){var t=this.options.direction,e=[];return t&et&&e.push(Zt),t&nt&&e.push(Jt),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&et?(r=0===s?J:s<0?Z:K,n=s!=this.pX,i=Math.abs(t.deltaX)):(r=0===o?J:o<0?Q:tt,n=o!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return fe.prototype.attrTest.call(this,t)&&(this.state&ie||!(this.state&ie)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=ue(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),w(ve,fe,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Gt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ie)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),w(ge,le,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[Ut]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(V|G)&&!r)this.reset();else if(t.eventType&H)this.reset(),this._timer=v((function(){this.state=oe,this.tryEmit()}),e.time,this);else if(t.eventType&V)return oe;return ce},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===oe&&(t&&t.eventType&V?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=d(),this.manager.emit(this.options.event,this._input)))}}),w(me,fe,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Gt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ie)}}),w(ye,fe,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:et|nt,pointers:1},getTouchAction:function(){return de.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(et|nt)?e=t.overallVelocity:n&et?e=t.overallVelocityX:n&nt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&f(e)>this.options.velocity&&t.eventType&V},emit:function(t){var e=ue(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),w(be,le,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[Vt]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&H&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=V)return this.failTimeout();var s=!this.pTime||t.timeStamp-this.pTime<e.interval,o=!this.pCenter||gt(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,o&&s?this.count+=1:this.count=1,this._input=t;var a=this.count%e.taps;if(0===a)return this.hasRequireFailures()?(this._timer=v((function(){this.state=oe,this.tryEmit()}),e.interval,this),ie):oe}return ce},failTimeout:function(){return this._timer=v((function(){this.state=ce}),this.options.interval,this),ce},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==oe&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),Te.VERSION="2.0.7",Te.defaults={domEvents:!1,touchAction:Ht,enable:!0,inputTarget:null,inputClass:null,preset:[[me,{enable:!1}],[ve,{enable:!1},["rotate"]],[ye,{direction:et}],[de,{direction:et},["swipe"]],[be],[be,{event:"doubletap",taps:2},["tap"]],[ge]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var we=1,Ee=2;function Ce(t,e){this.options=c({},Te.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=at(this),this.touchAction=new Qt(this,this.options.touchAction),Ie(this,!0),m(this.options.recognizers,(function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])}),this)}function Ie(t,e){var n,i=t.element;i.style&&(m(t.options.cssProps,(function(r,s){n=D(i.style,s),e?(t.oldCssProps[n]=i.style[n],i.style[n]=r):i.style[n]=t.oldCssProps[n]||""})),e||(t.oldCssProps={}))}function xe(t,e){var n=s.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}Ce.prototype={set:function(t){return c(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?Ee:we},recognize:function(t){var e=this.session;if(!e.stopped){var n;this.touchAction.preventDefaults(t);var i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&oe)&&(r=e.curRecognizer=null);var s=0;while(s<i.length)n=i[s],e.stopped===Ee||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(ie|re|se)&&(r=e.curRecognizer=n),s++}},get:function(t){if(t instanceof le)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(g(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(g(t,"remove",this))return this;if(t=this.get(t),t){var e=this.recognizers,n=k(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==a&&e!==a){var n=this.handlers;return m(z(t),(function(t){n[t]=n[t]||[],n[t].push(e)})),this}},off:function(t,e){if(t!==a){var n=this.handlers;return m(z(t),(function(t){e?n[t]&&n[t].splice(k(n[t],e),1):delete n[t]})),this}},emit:function(t,e){this.options.domEvents&&xe(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};var i=0;while(i<n.length)n[i](e),i++}},destroy:function(){this.element&&Ie(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},c(Te,{INPUT_START:H,INPUT_MOVE:U,INPUT_END:V,INPUT_CANCEL:G,STATE_POSSIBLE:ne,STATE_BEGAN:ie,STATE_CHANGED:re,STATE_ENDED:se,STATE_RECOGNIZED:oe,STATE_CANCELLED:ae,STATE_FAILED:ce,DIRECTION_NONE:J,DIRECTION_LEFT:Z,DIRECTION_RIGHT:K,DIRECTION_UP:Q,DIRECTION_DOWN:tt,DIRECTION_HORIZONTAL:et,DIRECTION_VERTICAL:nt,DIRECTION_ALL:it,Manager:Ce,Input:ot,TouchAction:Qt,TouchInput:Nt,MouseInput:Ct,PointerEventInput:At,TouchMouseInput:qt,SingleTouchInput:_t,Recognizer:le,AttrRecognizer:fe,Tap:be,Pan:de,Swipe:ye,Pinch:ve,Rotate:me,Press:ge,on:x,off:O,each:m,merge:T,extend:b,assign:c,inherit:w,bindFn:E,prefixed:D});var Oe="undefined"!==typeof r?r:"undefined"!==typeof self?self:{};Oe.Hammer=Te,i=function(){return Te}.call(e,n,e,t),i===a||(t.exports=i)})(window,document)},ca95:function(t,e,n){(function(t,e){e(n("c8b5"))})(0,(function(e){"use strict";function n(t){var e=[],n=arguments.length-1;while(n-- >0)e[n]=arguments[n+1];for(var i=0;i<e.length;i++)for(var r=e[i],s=Object.keys(r),o=0;o<s.length;o++){var a=s[o];t[a]=r[a]}return t}function i(){return{type:Object,default:function(){return{}}}}function r(t){return t.charAt(0).toUpperCase()+t.slice(1)}e="default"in e?e["default"]:e;var s=["up","down","left","right","horizontal","vertical","all"];function o(t){var n=t.direction;if("string"===typeof n){var i="DIRECTION_"+n.toUpperCase();s.indexOf(n)>-1&&e.hasOwnProperty(i)?t.direction=e[i]:console.warn("[vue-touch] invalid direction: "+n)}return t}var a={},c={},l=["pan","panstart","panmove","panend","pancancel","panleft","panright","panup","pandown","pinch","pinchstart","pinchmove","pinchend","pinchcancel","pinchin","pinchout","press","pressup","rotate","rotatestart","rotatemove","rotateend","rotatecancel","swipe","swipeleft","swiperight","swipeup","swipedown","tap"],h={pan:"pan",panstart:"pan",panmove:"pan",panend:"pan",pancancel:"pan",panleft:"pan",panright:"pan",panup:"pan",pandown:"pan",pinch:"pinch",pinchstart:"pinch",pinchmove:"pinch",pinchend:"pinch",pinchcancel:"pinch",pinchin:"pinch",pinchout:"pinch",press:"press",pressup:"press",rotate:"rotate",rotatestart:"rotate",rotatemove:"rotate",rotateend:"rotate",rotatecancel:"rotate",swipe:"swipe",swipeleft:"swipe",swiperight:"swipe",swipeup:"swipe",swipedown:"swipe",tap:"tap"},u={props:{options:i(),tapOptions:i(),panOptions:i(),pinchOptions:i(),pressOptions:i(),rotateOptions:i(),swipeOptions:i(),tag:{type:String,default:"div"},enabled:{default:!0,type:[Boolean,Object]}},mounted:function(){this.$isServer||(this.hammer=new e.Manager(this.$el,this.options),this.recognizers={},this.setupBuiltinRecognizers(),this.setupCustomRecognizers(),this.updateEnabled(this.enabled))},destroyed:function(){this.$isServer||this.hammer.destroy()},watch:{enabled:{deep:!0,handler:function(){var t,e=[],n=arguments.length;while(n--)e[n]=arguments[n];(t=this).updateEnabled.apply(t,e)}}},methods:{setupBuiltinRecognizers:function(){for(var t=this,e=0;e<l.length;e++){var i=l[e];if(t._events[i]){var r=h[i],s=n({},a[r]||{},t[r+"Options"]);t.addRecognizer(r,s),t.addEvent(i)}}},setupCustomRecognizers:function(){for(var t=this,e=Object.keys(c),i=0;i<e.length;i++){var r=e[i];if(t._events[r]){var s=c[r],o=t[r+"Options"]||{},a=n({},s,o);t.addRecognizer(r,a,{mainGesture:a.type}),t.addEvent(r)}}},addRecognizer:function(t,n,i){void 0===i&&(i={});var s=i.mainGesture;if(!this.recognizers[t]){var a=new(e[r(s||t)])(o(n));this.recognizers[t]=a,this.hammer.add(a),a.recognizeWith(this.hammer.recognizers)}},addEvent:function(t){var e=this;this.hammer.on(t,(function(n){return e.$emit(t,n)}))},updateEnabled:function(t,e){var n=this;if(!0===t)this.enableAll();else if(!1===t)this.disableAll();else if("object"===typeof t)for(var i=Object.keys(t),r=0;r<i.length;r++){var s=i[r];n.recognizers[s]&&(t[s]?n.enable(s):n.disable(s))}},enable:function(t){var e=this.recognizers[t];e.options.enable||e.set({enable:!0})},disable:function(t){var e=this.recognizers[t];e.options.enable&&e.set({enable:!1})},toggle:function(t){var e=this.recognizers[t];e&&(e.options.enable?this.disable(t):this.enable(t))},enableAll:function(t){this.toggleAll({enable:!0})},disableAll:function(t){this.toggleAll({enable:!1})},toggleAll:function(t){for(var e=this,n=t.enable,i=Object.keys(this.recognizers),r=0;r<i.length;r++){var s=e.recognizers[i[r]];s.options.enable!==n&&s.set({enable:n})}},isEnabled:function(t){return this.recognizers[t]&&this.recognizers[t].options.enable}},render:function(t){return t(this.tag,{},this.$slots.default)}},p=!1,f={config:a,customEvents:c};f.install=function(t,e){void 0===e&&(e={});var i=e.name||"v-touch";t.component(i,n(u,{name:i})),p=!0}.bind(f),f.registerCustomEvent=function(t,e){void 0===e&&(e={}),p?console.warn("\n      [vue-touch]: Custom Event '"+t+"' couldn't be added to vue-touch.\n      Custom Events have to be registered before installing the plugin.\n      "):(e.event=t,c[t]=e,u.props[t+"Options"]={type:Object,default:function(){return{}}})}.bind(f),f.component=u,t.exports=f}))},e41f:function(t,e,n){"use strict";var i=n("d282"),r=n("a142"),s=n("6605"),o=n("ad06"),a=Object(i["a"])("popup"),c=a[0],l=a[1];e["a"]=c({mixins:[s["a"]],props:{round:Boolean,duration:Number,closeable:Boolean,transition:String,safeAreaInsetBottom:Boolean,closeIcon:{type:String,default:"cross"},closeIconPosition:{type:String,default:"top-right"},position:{type:String,default:"center"},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},beforeCreate:function(){var t=this,e=function(e){return function(n){return t.$emit(e,n)}};this.onClick=e("click"),this.onOpened=e("opened"),this.onClosed=e("closed")},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.round,i=this.position,s=this.duration,a=this.transition||("center"===i?"van-fade":"van-popup-slide-"+i),c={};return Object(r["b"])(s)&&(c.transitionDuration=s+"s"),e("transition",{attrs:{name:a},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],style:c,class:l((t={round:n},t[i]=i,t["safe-area-inset-bottom"]=this.safeAreaInsetBottom,t)),on:{click:this.onClick}},[this.slots(),this.closeable&&e(o["a"],{attrs:{role:"button",tabindex:"0",name:this.closeIcon},class:l("close-icon",this.closeIconPosition),on:{click:this.close}})])])}}})}}]);