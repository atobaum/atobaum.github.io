(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{RPjP:function(t,e,r){"use strict";t.exports=r("SLms")},SLms:function(t,e,r){"use strict";r("E9XD"),Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=u(r("q1tI")),a=u(r("17x9"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var l=["shortname","identifier","title","url","category_id","onNewComment","language"],f=!1;function p(t,e){var r=e.onNewComment,n=e.language,o=function(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}(e,["onNewComment","language"]);for(var i in o)t.page[i]=o[i];t.language=n,r&&(t.callbacks={onNewComment:[r]})}var h=function(t){function e(){return c(this,e),s(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(t,e){return t.identifier!==this.props.identifier}},{key:"render",value:function(){var t=this,e=Object.keys(this.props).reduce((function(e,r){return l.some((function(t){return t===r}))?e:n({},e,function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}({},r,t.props[r]))}),{});return i.default.createElement("div",e,i.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!f){var t=this.disqus=document.createElement("script"),e=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];t.async=!0,t.type="text/javascript",t.src="//"+this.props.shortname+".disqus.com/embed.js",e.appendChild(t),f=!0}}},{key:"loadDisqus",value:function(){var t=this,e={};l.forEach((function(r){"shortname"!==r&&t.props[r]&&(e[r]=t.props[r])})),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){p(this,e),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){p(this,e)},this.addDisqusScript())}}]),e}(i.default.Component);h.displayName="DisqusThread",h.propTypes={id:a.default.string,shortname:a.default.string.isRequired,identifier:a.default.string,title:a.default.string,url:a.default.string,category_id:a.default.string,onNewComment:a.default.func,language:a.default.string},h.defaultProps={url:"undefined"==typeof window?null:window.location.href},e.default=h},"TG/k":function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return N}));var n=r("q1tI"),o=r.n(n),i=r("qhky"),a=r("hpys"),u=r("o0o1"),c=r.n(u),s=r("g6dt"),l=r.n(s);function f(){return(f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}var p=!("undefined"==typeof window||!window.document||!window.document.createElement);function h(t,e){return t===e?0!==t||0!==e||1/t==1/e:t!=t&&e!=e}function d(t){var e=Object(n.useRef)();return function(t,e){if(h(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;var r=Object.keys(t),n=Object.keys(e);if(r.length!==n.length)return!1;for(var o=0;o<r.length;o++)if(!Object.prototype.hasOwnProperty.call(e,r[o])||!h(t[r[o]],e[r[o]]))return!1;return!0}(t,e.current)||(e.current=t),e.current}function v(t){return"object"==typeof t?f({},t):t}function y(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}p&&l()("https://platform.twitter.com/widgets.js","twttr");function m(t,e,r,o){var i=Object(n.useState)(null),a=i[0],u=i[1],s=Object(n.useRef)(null);if(!p)return{ref:s,error:a};var f=[t,d(e),d(r)];return Object(n.useEffect)((function(){u(null);var n,i,a=!1;if(s.current){var f=function(){var n,i=(n=c.a.mark((function n(){var i,f;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s&&s.current){n.next=2;break}return n.abrupt("return");case 2:return(i=document.createElement("div")).setAttribute("twdiv","yes"),s.current.appendChild(i),n.prev=5,n.next=8,new Promise((function(t,e){var r=function(){return e(new Error("Could not load remote twitter widgets js"))};l.a.ready("twttr",{success:function(){var e=window.twttr;e&&e.widgets||r(),t(e.widgets)},error:r})}));case 8:return f=n.sent,n.next=11,f[t](v(e),i,v(r));case 11:if(n.sent||a){n.next=14;break}throw new Error("Twitter could not create widget. If it is a Timeline or Tweet, ensure the screenName/tweetId exists.");case 14:n.next=21;break;case 16:return n.prev=16,n.t0=n.catch(5),console.error(n.t0),u(n.t0),n.abrupt("return");case 21:if(s&&s.current){n.next=23;break}return n.abrupt("return");case 23:if(!a){n.next=26;break}return i&&i.remove(),n.abrupt("return");case 26:o&&o();case 27:case"end":return n.stop()}}),n,null,[[5,16]])})),function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(t){y(i,r,o,a,u,"next",t)}function u(t){y(i,r,o,a,u,"throw",t)}a(void 0)}))});return function(){return i.apply(this,arguments)}}();n=s.current,i="twdiv",n&&n.querySelectorAll("*").forEach((function(t){t.hasAttribute(i)&&t.remove()})),f()}return function(){a=!0}}),f),{ref:s,error:a}}var g=function(t){var e=t.username,r=t.options,n=t.onLoad,i=t.renderError,a=m("createFollowButton",e,r,n),u=a.ref,c=a.error;return o.a.createElement("div",{ref:u},c&&i&&i(c))};var w=function(t){var e=t.config,r=t.expanded,n=e.userTwitter;return o.a.createElement(g,{username:n,options:{count:!!r||"none"}})},b=r("RPjP"),E=r.n(b),x=r("T/ZZ"),j=r.n(x),O=r("IpnI"),L=r.n(O);var _=function(t){var e=t.postNode,r=Object(n.useState)([]),i=r[0],a=r[1];if(!L.a.disqusShortname)return null;var u=e.frontmatter,c=j()(L.a.siteUrl,L.a.pathPrefix,e.fields.slug);return o.a.createElement(E.a,{shortname:L.a.disqusShortname,identifier:u.title,title:u.title,url:c,category_id:u.category_id||null,onNewComment:function(){var t=i.slice();t.push({text:"New comment available!"}),a(t)}})},k=r("KDyN"),P=r("okzv");r("n7qR"),r("hBEi");function N(t){var e=t.data,r=t.pageContext.slug,u=e.markdownRemark,c=u.frontmatter;return c.id||(c.id=r),Object(n.useEffect)((function(){if(c.latex){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.innerHTML="\n\t\tMathJax = {\n\t\t  tex: {\n\t\t\tinlineMath: [['$', '$'], ['\\(', '\\)']]\n\t\t  }\n\t\t};\n    ",document.body.appendChild(t)}}),[]),o.a.createElement(a.a,null,o.a.createElement(i.a,null,o.a.createElement("title",null,c.title+" | "+L.a.siteTitle),c.latex&&o.a.createElement("script",{id:"MathJax-script",async:!0,src:"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"})),o.a.createElement(P.a,{postPath:r,postNode:u,postSEO:!0}),o.a.createElement("div",{className:"post-container"},o.a.createElement("h1",null,c.title),o.a.createElement("div",{className:"post-meta"},o.a.createElement(k.a,{tags:c.tags})),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:u.html}}),o.a.createElement(w,{config:L.a}),o.a.createElement(_,{postNode:u})))}},g6dt:function(t,e,r){var n,o,i;o=[],void 0===(i="function"==typeof(n=function(){var t=function(){},e={},r={},n={};function o(t,e){if(t){var o=n[t];if(r[t]=e,o)for(;o.length;)o[0](t,e),o.splice(0,1)}}function i(e,r){e.call&&(e={success:e}),r.length?(e.error||t)(r):(e.success||t)(e)}function a(e,r,n,o){var i,u,c=document,s=n.async,l=(n.numRetries||0)+1,f=n.before||t,p=e.replace(/[\?|#].*$/,""),h=e.replace(/^(css|img)!/,"");o=o||0,/(^css!|\.css$)/.test(p)?((u=c.createElement("link")).rel="stylesheet",u.href=h,(i="hideFocus"in u)&&u.relList&&(i=0,u.rel="preload",u.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(p)?(u=c.createElement("img")).src=h:((u=c.createElement("script")).src=e,u.async=void 0===s||s),u.onload=u.onerror=u.onbeforeload=function(t){var c=t.type[0];if(i)try{u.sheet.cssText.length||(c="e")}catch(s){18!=s.code&&(c="e")}if("e"==c){if((o+=1)<l)return a(e,r,n,o)}else if("preload"==u.rel&&"style"==u.as)return u.rel="stylesheet";r(e,c,t.defaultPrevented)},!1!==f(e,u)&&c.head.appendChild(u)}function u(t,r,n){var u,c;if(r&&r.trim&&(u=r),c=(u?n:r)||{},u){if(u in e)throw"LoadJS";e[u]=!0}function s(e,r){!function(t,e,r){var n,o,i=(t=t.push?t:[t]).length,u=i,c=[];for(n=function(t,r,n){if("e"==r&&c.push(t),"b"==r){if(!n)return;c.push(t)}--i||e(c)},o=0;o<u;o++)a(t[o],n,r)}(t,(function(t){i(c,t),e&&i({success:e,error:r},t),o(u,t)}),c)}if(c.returnPromise)return new Promise(s);s()}return u.ready=function(t,e){return function(t,e){t=t.push?t:[t];var o,i,a,u=[],c=t.length,s=c;for(o=function(t,r){r.length&&u.push(t),--s||e(u)};c--;)i=t[c],(a=r[i])?o(i,a):(n[i]=n[i]||[]).push(o)}(t,(function(t){i(e,t)})),u},u.done=function(t){o(t,[])},u.reset=function(){e={},r={},n={}},u.isDefined=function(t){return t in e},u})?n.apply(e,o):n)||(t.exports=i)},hBEi:function(t,e,r){},ls82:function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(_){u=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new j(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=b(a,r);if(u){if(u===l)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=s(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(_){return{type:"throw",arg:_}}}t.wrap=c;var l={};function f(){}function p(){}function h(){}var d={};d[o]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(O([])));y&&y!==e&&r.call(y,o)&&(d=y);var m=h.prototype=f.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){var n;this._invoke=function(o,i){function a(){return new e((function(n,a){!function n(o,i,a,u){var c=s(t[o],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,u)}))}u(c.arg)}(o,i,n,a)}))}return n=n?n.then(a,a):a()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function O(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return p.prototype=m.constructor=h,h.constructor=p,p.displayName=u(h,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,u(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),w.prototype[i]=function(){return this},t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),u(m,a,"Generator"),m[o]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},n7qR:function(t,e,r){},o0o1:function(t,e,r){t.exports=r("ls82")}}]);
//# sourceMappingURL=component---src-templates-post-jsx-c3588bdd8c648385ea5e.js.map