(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/my_news/my_news"],{"063b":function(t,e,i){"use strict";(function(t){i("4303"),i("921b");n(i("66fd"));var e=n(i("b917"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},"1d25":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{couponValidList:[{id:1,title:"服务通知",info:"恭喜你参加的拼团已组成成功了，请您等待卖家发货",time:"2019-08-08",img:"/static/icon-item-001.png"},{id:2,title:"账户通知",info:"恭喜你参加的拼团已组成成功了，请您等待卖家发货",time:"2019-08-08",img:"/static/icon-item-003.png"},{id:3,title:"物流通知",info:"恭喜你参加的拼团已组成成功了，请您等待卖家发货",time:"2019-08-08",img:"/static/icon-item-005.png"}],headerTop:0,typeClass:"valid",subState:"",theIndex:null,oldIndex:null,isStop:!1}},methods:{purchase:function(e){t.navigateTo({url:"/pages/list/goode_details/goode_details"})},detail:function(e){t.navigateTo({url:"/pages/list/news_detail/news_detail"})},switchType:function(e){var i=this;this.typeClass!=e&&(t.pageScrollTo({scrollTop:0,duration:0}),this.typeClass=e,this.subState=""==this.typeClass?"":"show"+e,setTimeout(function(){i.oldIndex=null,i.theIndex=null,i.subState="valid"==i.typeClass?"":i.subState},200))},touchStart:function(t,e){e.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex=null,this.initXY=[e.touches[0].pageX,e.touches[0].pageY])},touchMove:function(t,e){var i=this;if(e.touches.length>1)this.isStop=!0;else{var n=e.touches[0].pageX-this.initXY[0],s=e.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(n)<5||(Math.abs(s)>Math.abs(n)?this.isStop=!0:n<0?(this.theIndex=t,this.isStop=!0):n>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=t,this.theIndex=null,this.isStop=!0,setTimeout(function(){i.oldIndex=null},150)))}},touchEnd:function(t,e){this.isStop=!1},deleteCoupon:function(t,e){for(var i=e.length,n=0;n<i;n++)if(t==e[n].id){e.splice(n,1);break}this.oldIndex=null,this.theIndex=null},discard:function(){}}};e.default=i}).call(this,i("6e42")["default"])},"4de7":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},a6f3:function(t,e,i){},b917:function(t,e,i){"use strict";i.r(e);var n=i("4de7"),s=i("df93");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("e384");var u=i("2877"),a=Object(u["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},df93:function(t,e,i){"use strict";i.r(e);var n=i("1d25"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},e384:function(t,e,i){"use strict";var n=i("a6f3"),s=i.n(n);s.a}},[["063b","common/runtime","common/vendor"]]]);