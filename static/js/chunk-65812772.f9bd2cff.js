(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65812772"],{"7af7":function(t,e,n){},"973e":function(t,e,n){(function(e,n){t.exports=n()})("undefined"!==typeof self&&self,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"0cfb":function(t,e,n){var r=n("83ab"),i=n("d039"),o=n("cc12");t.exports=!r&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},"2e08":function(t,e,n){"use strict";n("7c49")},"688c":function(t,e,n){},"7c49":function(t,e,n){},"825a":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},"83ab":function(t,e,n){var r=n("d039");t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},"861d":function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},8875:function(t,e,n){var r,i,o;(function(n,s){i=[],r=s,o="function"===typeof r?r.apply(e,i):r,void 0===o||(t.exports=o)})("undefined"!==typeof self&&self,(function(){function t(){var e=Object.getOwnPropertyDescriptor(document,"currentScript");if(!e&&"currentScript"in document&&document.currentScript)return document.currentScript;if(e&&e.get!==t&&document.currentScript)return document.currentScript;try{throw new Error}catch(m){var n,r,i,o=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,s=/@([^@]*):(\d+):(\d+)\s*$/gi,a=o.exec(m.stack)||s.exec(m.stack),c=a&&a[1]||!1,u=a&&a[2]||!1,f=document.location.href.replace(document.location.hash,""),l=document.getElementsByTagName("script");c===f&&(n=document.documentElement.outerHTML,r=new RegExp("(?:[^\\n]+?\\n){0,"+(u-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),i=n.replace(r,"$1").trim());for(var d=0;d<l.length;d++){if("interactive"===l[d].readyState)return l[d];if(l[d].src===c)return l[d];if(c===f&&l[d].innerHTML&&l[d].innerHTML.trim()===i)return l[d]}return null}}return t}))},"9bf2":function(t,e,n){var r=n("83ab"),i=n("0cfb"),o=n("825a"),s=n("c04e"),a=Object.defineProperty;e.f=r?a:function(t,e,n){if(o(t),e=s(e,!0),o(n),i)try{return a(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},a398:function(t,e,n){"use strict";n("688c")},b0c0:function(t,e,n){var r=n("83ab"),i=n("9bf2").f,o=Function.prototype,s=o.toString,a=/^\s*function ([^ (]*)/,c="name";r&&!(c in o)&&i(o,c,{configurable:!0,get:function(){try{return s.call(this).match(a)[1]}catch(t){return""}}})},be35:function(t,e,n){},c04e:function(t,e,n){var r=n("861d");t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},c8ba:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}t.exports=n},cc12:function(t,e,n){var r=n("da84"),i=n("861d"),o=r.document,s=i(o)&&i(o.createElement);t.exports=function(t){return s?o.createElement(t):{}}},d039:function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},da84:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||function(){return this}()||Function("return this")()}).call(this,n("c8ba"))},fb15:function(t,e,n){"use strict";if(n.r(e),"undefined"!==typeof window){var r=window.document.currentScript,i=n("8875");r=i(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:i});var o=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);o&&(n.p=o[1])}n("b0c0");var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",staticClass:"vaw-verify-container"},[n("div",{staticClass:"drag-bg",class:{"reset-width-anim":t.resetStatus},style:{width:t.lockStyle.left+"px"}}),n("span",{ref:"lockBtn",staticClass:"lock-btn iconfont",class:{"reset-left-anim":t.resetStatus},style:{left:t.lockStyle.left+"px",color:t.verifySuccess?"#7ac23c":"737383","font-size":t.verifySuccess?"20px":"26px"},on:{touchstart:t.onMouseDown,mousedown:t.onMouseDown}},[t._v(t._s(t.verifySuccess?"":""))]),n("div",{staticClass:"text-tip",class:{"mask-slide":!t.verifySuccess},style:{color:t.verifySuccess?"#ffffff":"#333333"}},[t._v(t._s(t.textTip))])])},a=[],c=(n("be35"),{name:"VawVerifySimple",data:function(){return{lockStyle:{left:0},maxWidth:0,startX:0,endX:0,resetStatus:!1,verifySuccess:!1,textTip:"请按住滑块，拖动到最右边"}},mounted:function(){this.maxWidth=this.$refs.container.clientWidth-this.$refs.lockBtn.clientWidth,this.addEventListener()},destroyed:function(){this.removeEventListener()},methods:{onMouseDown:function(t){this.verifySuccess||(t.preventDefault(),this.resetStatus=!1,this.startX=t.clientX||t.changedTouches[0].clientX,this.canMove=!0)},onMouseMove:function(t){if(this.canMove&&!this.verifySuccess){this.endX=t.clientX||t.changedTouches[0].clientX;var e=(this.endX||t.changedTouches[0].clientX)-this.startX;this.lockStyle.left=Math.max(0,Math.min(e,this.maxWidth)),this.lockStyle.left>=this.maxWidth&&this.handleSuccess()}},onMouseUp:function(){this.verifySuccess||(this.$emit("verify-fail"),this.canMove=!1,this.resetStatus=!0,this.lockStyle.left=0)},handleSuccess:function(){this.verifySuccess=!0,this.textTip="验证通过",this.removeEventListener(),this.$emit("verify-success")},reset:function(){this.addEventListener(),this.resetStatus=!0,this.verifySuccess=!1,this.canMove=!1,this.textTip="请按住滑块，拖动到最右边",this.lockStyle.left=0},addEventListener:function(){document.getElementsByTagName("html")[0].addEventListener("mousemove",this.onMouseMove),document.getElementsByTagName("html")[0].addEventListener("mouseup",this.onMouseUp),document.getElementsByTagName("html")[0].addEventListener("touchmove",this.onMouseMove),document.getElementsByTagName("html")[0].addEventListener("touchend",this.onMouseUp)},removeEventListener:function(){document.getElementsByTagName("html")[0].removeEventListener("mousemove",this.onMouseMove),document.getElementsByTagName("html")[0].removeEventListener("mouseup",this.onMouseUp),document.getElementsByTagName("html")[0].removeEventListener("touchmove",this.onMouseMove),document.getElementsByTagName("html")[0].removeEventListener("touchend",this.onMouseUp)}}}),u=c;function f(t,e,n,r,i,o,s,a){var c,u="function"===typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),o&&(u._scopeId="data-v-"+o),s?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=c):i&&(c=a?function(){i.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(u.functional){u._injectStyles=c;var f=u.render;u.render=function(t,e){return c.call(e),f(t,e)}}else{var l=u.beforeCreate;u.beforeCreate=l?[].concat(l,c):[c]}return{exports:t,options:u}}n("2e08"),n("a398");var l=f(u,s,a,!1,null,"2b6cee1d",null),d=l.exports,m=function(t){return t.component(d.name,d)};"undefined"!==typeof window&&window.Vue&&m(window.Vue),d.install=m;var p=d;e["default"]=p}})}))},"9ed6":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-container"},[n("div",{ref:"loginWrapper",staticClass:"login-bg-wrapper"},[n("img",{attrs:{src:t.$isMobile?t.ImageMobileBg1:t.ImageBg1}})]),n("div",{staticClass:"flex form-wrapper"},[n("div",{staticClass:"left"}),n("div",{staticClass:"right"},[t._m(0),n("el-form",{staticClass:"form-container",attrs:{model:t.form}},[n("div",{staticClass:"item-wrapper"},[n("el-input",{attrs:{placeholder:"请输入用户名/邮箱","prefix-icon":"el-icon-user",clearable:""},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),n("div",{staticClass:"item-wrapper margin-top-lg"},[n("el-input",{attrs:{placeholder:"请输入密码",type:"password",clearable:"","prefix-icon":"el-icon-lock"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),n("div",{staticClass:"flex-sub"}),n("div",{staticClass:"margin-top-lg"},[n("el-button",{staticClass:"login",staticStyle:{color:"#0f0f10"},on:{click:t.login}},[t._v(" 登录 ")])],1),n("div",{staticClass:"margin-top-rg"},[n("el-button",{staticClass:"login",staticStyle:{color:"#0f0f10"},attrs:{type:"info"},on:{click:t.register}},[t._v(" 注册 ")])],1)]),n("div",{staticClass:"my-width flex-sub margin-top"},[n("div",{staticClass:"flex justify-between"},[n("el-checkbox",{staticStyle:{color:"#ffffff"},model:{value:t.autoLogin,callback:function(e){t.autoLogin=e},expression:"autoLogin"}},[t._v("自动登录")]),n("el-link",{staticStyle:{color:"#ffffff"},attrs:{underline:!1},on:{click:t.forget}},[t._v("忘记密码？")])],1)])],1)]),n("div",{staticClass:"login-footer-wrapper"},[n("PageFooter")],1)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-width flex-sub flex justify-center align-center"},[n("div",{staticClass:"title margin-left",staticStyle:{"font-size":"40px"}},[t._v("欢迎来到 墨书")])])}],o=n("d6d9"),s=n.n(o),a=n("e8fb"),c=n.n(a),u=n("bd4b"),f=n("973e"),l=n.n(f),d=(n("e848"),n("4328")),m=n.n(d),p={},h={name:"Login",components:{PageFooter:u["default"],VawVerify:l.a},data:function(){return{form:{username:"",password:"",keep_login:!0},ImageBg1:s.a,ImageMobileBg1:c.a,redirect:"",autoLogin:!1,verifyState:!0,defaultTheme:this.$layoutStore.state.theme}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect)},immediate:!0}},mounted:function(){this.$layoutStore.changeTheme("light")},destroyed:function(){this.$layoutStore.changeTheme(this.defaultTheme)},methods:{login:function(){var t=this;this.form.username?this.form.password?this.verifyState?this.$axios.post("/user/login",m.a.stringify(this.form)).then((function(e){!0===e.data.success?(p.token=e.data.data[0].token,p.userId=e.data.data[0].user_id,t.$axios.get("/user/showInfo",{params:{token:e.data.data[0].token,user_id:e.data.data[0].user_id}}).then((function(e){!0===e.data.success?(p.userName=e.data.data[0].username,p.email=e.data.data[0].email,p.real_name=e.data.data[0].real_name,p.avatar=e.data.data[0].avatar,t.$store.dispatch("user/saveUserInfo",p).then((function(e){t.$router.push({path:t.redirect||"/index/main"})}))):t.$message.error(e.data.message)}))):t.$message.error(e.data.message)})).catch((function(e){t.$errorMsg(e.message||"登录失败，未知异常")})):this.$errorMsg("滑动验证失败"):this.$errorMsg("请输入密码"):this.$errorMsg("请输入用户名")},onVerifySuccess:function(){this.verifyState=!0},register:function(){this.$router.push("/register")},forget:function(){this.$router.push("/forget")}}},v=h,g=(n("e1c9"),n("2877")),y=Object(g["a"])(v,r,i,!1,null,"69d7faef",null);e["default"]=y.exports},d6d9:function(t,e,n){t.exports=n.p+"static/img/img_login_bg_01.072ea29a.jpg"},e1c9:function(t,e,n){"use strict";n("7af7")},e848:function(t,e,n){},e8fb:function(t,e,n){t.exports=n.p+"static/img/img_login_mobile_bg_01.4e27447b.jpg"}}]);