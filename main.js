import Vue from 'vue'
import App from './App'
// 星星评价
import sunUiStar from './components/sunui-star/sunui-star.vue'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
// 引入插件
import util from '@/common/util.js'

import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false
// 星星评价
Vue.component('sunui-star',sunUiStar);
Vue.component('uni-load-more',uniLoadMore);
App.mpType = 'app'

// Vue.prototype.navHeight = 0;
Vue.prototype.routineStyle = '#ffffff';
Vue.prototype.openPages = '';
Vue.prototype.urlImages = '';
Vue.prototype.url = 'http://www.fyang.com';
// Vue.prototype.url = 'http://xiamen.vswxx.top';
// Vue.prototype.token = '';
// Vue.prototype.isLog = true;
// Vue.prototype.MyMenus = [];
Vue.prototype.header = {
	'content-type': 'application/json',
	'token': ''
};


Vue.filter('numIsInteger',function(value){
	return parseInt(value+''.toString());
})

Vue.filter('subString',function(value){
	return value.substring(0,1);
})

App.mpType = 'app'

Vue.prototype.getMyMenus = function() {
	var that = this;
	if (that.MyMenus) return;
	that.baseGet(that.U({
		c: 'public_api',
		a: 'get_my_naviga'
	}, that.url), function(res) {
		that.MyMenus = res.data.routine_my_menus;
	});
}

Vue.prototype.isLogin = function() {
	var that = this;
	if (store.state.token) {
		return true;
	}else{
		uni.navigateTo({
			url: "/pages/login/pwd_login/pwd_login",
		})
	}
}

/*
 * POST 访问快捷方法
 * @param string | object url 访问地址
 * @param callable successCallback 成功执行函数
 * @param callable errorCallback 失败执行函数
 * @param object header 访问header头
 */
Vue.prototype.basePost = function(url, data, successCallback, errorCallback, header) {
		if (header == undefined) header = this.header;
		header['token'] = store.state.token;
		util.basePost(url, data, successCallback, errorCallback, header);
	},

/*
 * GET 访问快捷方法
 * @param string | object url 访问地址
 * @param callable successCallback 成功执行函数
 * @param callable errorCallback 失败执行函数
 * @param isMsg 错误信息提醒 默认提醒
 * @param object header 访问header头
 */
Vue.prototype.baseGet = function(url, successCallback, errorCallback, isMsg, header) {
	if (header == undefined) header = {
		'content-type': 'application/json',
		'token': ''
	};
	header['token'] = store.state.token;
	util.baseGet(url, successCallback, errorCallback, isMsg, header);
}

/*
 * 信息提示 + 跳转
 * @param object opt {title:'提示语',icon:''} | url
 * @param object to_url 跳转url 有5种跳转方式 {tab:1-5,url:跳转地址}
 */
Vue.prototype.Tips = function(opt, to_url) {
	return util.Tips(opt, to_url);
}

/*
 * 访问Url拼接
 * @param object opt {c:'控制器',a:'方法',q:{get参数},p:{parma参数}}
 * @param url 接口访问地址
 * @return string
 */
Vue.prototype.U = function(opt, url) {
	if (url == undefined) url = this.url;
	return util.U(opt, url);
}

/**
 * 快捷调取助手函数
 */
Vue.prototype.help = function() {
	return util.$h;
}

/*
 * 合并数组
 * @param array list 请求返回数据
 * @param array sp 原始数组
 * @return array
 */
Vue.prototype.SplitArray = function(list, sp) {
	return util.SplitArray(list, sp)
}

Vue.prototype.setData = function(obj) {
	let that = this;
	let keys = [];
	let val, data;
	Object.keys(obj).forEach(function(key) {
		keys = key.split('.');
		val = obj[key];
		data = that.$data;
		keys.forEach(function(key2, index) {
			if (index + 1 == keys.length) {
				that.$set(data, key2, val);
			} else {
				if (!data[key2]) {
					that.$set(data, key2, {});
				}
			}
			data = data[key2];
		});
	});
}

Vue.prototype.checkMobile = function (mobile){
    return RegExp(/^1[34578]\d{9}$/).test(mobile);
}

const app = new Vue({
	store,
	...App
})
app.$mount()






