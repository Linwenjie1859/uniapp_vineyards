(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/search/search"],{2618:function(t,e,r){"use strict";(function(t){r("4303"),r("921b");a(r("66fd"));var e=a(r("49eb"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,r("6e42")["createPage"])},"49eb":function(t,e,r){"use strict";r.r(e);var a=r("91ca"),s=r("7fa2");for(var i in s)"default"!==i&&function(t){r.d(e,t,function(){return s[t]})}(i);r("9a67");var o=r("2877"),n=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=n.exports},"762a":function(t,e,r){},"7fa2":function(t,e,r){"use strict";r.r(e);var a=r("cf36"),s=r.n(a);for(var i in a)"default"!==i&&function(t){r.d(e,t,function(){return a[t]})}(i);e["default"]=s.a},"91ca":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},s=[];r.d(e,"a",function(){return a}),r.d(e,"b",function(){return s})},"9a67":function(t,e,r){"use strict";var a=r("762a"),s=r.n(a);s.a},cf36:function(t,e,r){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{showBack:!0,hotSearchList:[],historyList:[],keyWord:""}},onLoad:function(){this.getHotSearchList(),this.getHistorySearch()},methods:{historyClear:function(){var e=this;0!=e.historyList.length?t.showModal({title:"提示",content:"确定删除全部历史记录",success:function(r){if(r.confirm)e.historyList=[],t.clearStorage();else if(r.cancel)return}}):e.Tips({title:"已经没有历史记录啦！"})},getHotSearchList:function(){var t=this;t.baseGet(t.U({c:"store_api",a:"get_routine_hot_search"}),function(e){t.hotSearchList=e.data},function(t){console.log(r(t," at pages\\list\\search\\search.vue:70"))},!0)},getHistorySearch:function(){var e=this;t.getStorage({key:"keyWord",success:function(t){e.historyList=t.data.reverse()}})},searchGoods:function(){var e=this;""!=e.keyWord?(-1==e.historyList.indexOf(e.keyWord)&&(e.historyList.reverse(),e.historyList.push(e.keyWord),t.setStorage({key:"keyWord",data:e.historyList}),e.historyList.reverse()),plus.key.hideSoftKeybord(),t.navigateTo({url:"/pages/list/search_list/search_list?keyWord="+this.keyWord})):e.Tips({title:"请输入关键字"})},toList:function(e){t.navigateTo({url:"/pages/list/search_list/search_list?keyWord="+e.currentTarget.dataset.key})},back:function(){t.navigateBack()}}};e.default=a}).call(this,r("6e42")["default"],r("0de9")["default"])}},[["2618","common/runtime","common/vendor"]]]);