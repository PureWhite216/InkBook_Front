(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b29d5c5"],{3602:function(e,t,s){},"3cac":function(e,t,s){"use strict";s("3602")},d5c2:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-container"},[t("div",{ref:"loginWrapper",staticClass:"login-bg-wrapper"},[t("img",{attrs:{src:e.$isMobile?e.ImageMobileBg1:e.ImageBg1}})]),t("div",{staticClass:"flex form-wrapper"},[t("div",{staticClass:"left"}),t("div",{staticClass:"right"},[e._m(0),t("el-form",{staticClass:"form-container",attrs:{model:e.form}},[t("div",{staticClass:"item-wrapper"},[t("el-input",{attrs:{placeholder:"请输入邮箱","prefix-icon":"el-icon-user",clearable:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),t("div",{staticClass:"margin-top-lg"},[t("el-button",{staticClass:"login",staticStyle:{color:"#0f0f10"},on:{click:e.identifier_send}},[e._v(" 发送验证码 ")])],1),t("div",{staticClass:"item-wrapper margin-top-lg"},[t("el-input",{attrs:{placeholder:"请输入验证码",type:"password",clearable:"","prefix-icon":"el-icon-lock"},model:{value:e.form.verification_code,callback:function(t){e.$set(e.form,"verification_code",t)},expression:"form.verification_code"}})],1),t("br"),t("div",{staticClass:"item-wrapper"},[t("el-input",{attrs:{placeholder:"请输入真名（可不填）","prefix-icon":"el-icon-user",clearable:""},model:{value:e.form.real_name,callback:function(t){e.$set(e.form,"real_name",t)},expression:"form.real_name"}})],1),t("br"),t("div",{staticClass:"item-wrapper"},[t("el-input",{attrs:{placeholder:"请输入用户名","prefix-icon":"el-icon-user",clearable:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),t("div",{staticClass:"item-wrapper margin-top-lg"},[t("el-input",{attrs:{placeholder:"请输入密码",type:"password",clearable:"","prefix-icon":"el-icon-lock"},model:{value:e.form.password1,callback:function(t){e.$set(e.form,"password1",t)},expression:"form.password1"}})],1),t("div",{staticClass:"item-wrapper margin-top-lg"},[t("el-input",{attrs:{placeholder:"请确认密码",type:"password",clearable:"","prefix-icon":"el-icon-lock"},model:{value:e.form.password2,callback:function(t){e.$set(e.form,"password2",t)},expression:"form.password2"}})],1),t("div",{staticClass:"flex-sub"}),t("div",{staticClass:"margin-top-lg"},[t("el-button",{staticClass:"login",staticStyle:{color:"#0f0f10"},on:{click:e.register}},[e._v(" 确定 ")])],1),t("div",{staticClass:"margin-top-rg"},[t("el-button",{staticClass:"login",staticStyle:{color:"#0f0f10"},attrs:{type:"info"},on:{click:e.back}},[e._v(" 返回 ")])],1)])],1)]),t("div",{staticClass:"login-footer-wrapper"},[t("PageFooter")],1)])},r=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"my-width flex justify-center align-center"},[t("div",{staticClass:"title margin-left",staticStyle:{"font-size":"40px","margin-bottom":"50px"}},[e._v("注册")])])}],a=s("d6d9"),o=s.n(a),l=s("e8fb"),n=s.n(l),c=s("bd4b"),m=(s("e848"),s("4328")),f=s.n(m),p={name:"Register",components:{PageFooter:c["default"]},data:function(){return{form:{email:"",verification_code:"",real_name:"",username:"",password1:"",password2:""},ImageBg1:o.a,ImageMobileBg1:n.a,redirect:"",defaultTheme:this.$layoutStore.state.theme}},watch:{$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect)},immediate:!0}},mounted:function(){this.$layoutStore.changeTheme("light")},destroyed:function(){this.$layoutStore.changeTheme(this.defaultTheme)},methods:{register:function(){var e=this;this.form.email?this.form.email.length>30?this.$errorMsg("邮箱长度不应超过30位"):this.form.verification_code?this.form.username?this.form.username.length>20?this.$errorMsg("用户名长度不应超过20位"):this.form.password1?this.form.password1.length>20?this.$errorMsg("密码长度不应超过20位"):this.form.password2?this.$axios.post("/user/register",f.a.stringify(this.form)).then((function(t){!0===t.data.success?(e.$message.success(t.data.message),e.$router.push({path:"/login"})):e.$message.error(t.data.message)})):this.$errorMsg("请确认密码"):this.$errorMsg("请输入密码"):this.$errorMsg("请输入用户名"):this.$errorMsg("请输入验证码"):this.$errorMsg("请输入邮箱")},identifier_send:function(){var e=this;this.form.email?this.$axios.post("/user/sendRegistrationVerificationCode",f.a.stringify({email:this.form.email})).then((function(t){!0===t.data.success?e.$message.success(t.data.message):e.$message.error(t.data.message)})):this.$errorMsg("请输入邮箱")},back:function(){this.$router.push("/login")}}},d=p,u=(s("3cac"),s("2877")),g=Object(u["a"])(d,i,r,!1,null,"5c09046a",null);t["default"]=g.exports},d6d9:function(e,t,s){e.exports=s.p+"static/img/img_login_bg_01.072ea29a.jpg"},e848:function(e,t,s){},e8fb:function(e,t,s){e.exports=s.p+"static/img/img_login_mobile_bg_01.4e27447b.jpg"}}]);