(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22453d"],{e051:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-container"},[e("el-card",{staticStyle:{height:"100%"},attrs:{"body-style":{padding:"10px"}},scopedSlots:t._u([{key:"header",fn:function(){return[e("el-page-header",{attrs:{content:"上一个页面传递过来的参数"},on:{back:t.goBack}})]},proxy:!0}])},[e("div",{staticClass:"padding text-lg"},[t._v(" 通过 query 传递过来的参数: ")]),e("div",{staticClass:"padding text-lg"},[t._v(" "+t._s(t.queryInfo)+" ")]),e("div",{staticClass:"padding text-lg"},[t._v(" 通过params传递过来的参数: ")]),e("div",{staticClass:"padding text-lg"},[t._v(" "+t._s(t.paramInfo)+" ")])])],1)},s=[],r=(a("e9c4"),{name:"NextPageInfo",computed:{queryInfo:function(){return this.$route.query?JSON.stringify(this.$route.query):""},paramInfo:function(){return this.$route.params?JSON.stringify(this.$route.params):""}},methods:{goBack:function(){var t=this;this.$store.dispatch("router/removeRoute",this.$route).then((function(e){t.$router.go(-1)}))}}}),i=r,o=a("2877"),u=Object(o["a"])(i,n,s,!1,null,"49157e9c",null);e["default"]=u.exports}}]);