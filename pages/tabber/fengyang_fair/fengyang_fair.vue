<template>
	<view>
		<view class="header">
			<view class="input_view round" @tap="search"><text class="text-lg text-grey">搜索商品</text></view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{height:StatusAddNav+'px'}"></view>
		</view>
		
		<!-- 操作升降序排列 Start -->
		<view :style="{'margin-top':StatusAddNav+'px'}" class="bg-green">
			<view class="flex justify-end padding-lr-sm padding-tb-sm">
				<view class="flex align-center round margin-left-xl padding-lr-xs" @tap="changeOperation(index)" :class="[{'bg-white text-orange':currentOperation==index}]" v-for="(item,index) in operationList" :key="index">
					<text class="text-df padding-left-xs">{{item.name}}</text>
					<view class="flex flex-direction">
						<text class="cuIcon-triangleupfill" :class="[{'text-grey':item.check==2,'text-white':item.check==0}]" style="height: 10rpx;"></text>
						<text class="cuIcon-triangledownfill" :class="[{'text-grey':item.check==1,'text-white':item.check==0}]" style="height: 24rpx;"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 操作升降序排列 End -->
		
		<view class="flex">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left text-df">
				<view
					class="row"
					v-for="(category, index) in categoryList"
					:key="category.id"
					:class="[index == showCategoryIndex ? 'on' : '']"
					@tap="showCategory(index, category.id)"
				>
					<view class="text">
						<view class="block"></view>
						{{ category.cate_name }}
					</view> 
				</view>
			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="flex align-center padding-sm solid-bottom" v-for="(item, index) in goodsList" :key="index">
					<view class="flex">
						<image :src="item.image" class="radius img-has-size" mode="" @tap="goodeDetails" :data-id="item.id"></image>
					</view>
					<view class="flex flex-direction justify-between margin-left-sm" style="width: 330rpx;">
						<text class="text-df text-cut" @tap="goodeDetails" :data-id="item.id">{{ item.store_name }}</text>
						<text class="text-df text-grey text-cut-two" @tap="goodeDetails" :data-id="item.id">{{ item.store_info }}</text>
						<view class="flex justify-between margin-top-xs align-center">
							<view class="flex align-center">
								<text class="text-df text-orange text-price">{{ item.price }}</text>
								<text class="text-sm text-grey text-line-through text-price margin-left-xs">{{ item.ot_price }}</text>
							</view>
							<text class="cuIcon-roundadd text-green text-xl" @tap="touchOnGoods($event, item.id)"></text>
						</view>
					</view>
				</view>
			</scroll-view>
			
			<view class="cart cu-avatar round lg" @tap="cart_detail">
				<view class="cu-tag badge bg-blue padding-xs">{{carNum}}</view> 
			</view> 
			<!-- 抛物线小球 -->
			<!-- <view class="good_box" v-show="hide_good_box" :style="'left:' + bus_x + 'px;top:' + bus_y + 'px'"></view> -->
		</view>
	</view>
</template>

<script>
// 抛物线计算
function bezier(pots, amount) {
	var pot;
	var lines;
	var ret = [];
	var points;
	for (var i = 0; i <= amount; i++) {
		points = pots.slice(0);
		lines = [];
		while ((pot = points.shift())) {
			//将points数组中第一个元素从其中删除，并返回第一个元素的值。
			if (points.length) {
				//如果是有值的话
				lines.push(pointLine([pot, points[0]], i / amount));
			} else if (lines.length > 1) {
				points = lines;
				lines = [];
			} else {
				break;
			}
		}
		ret.push(lines[0]);
	}

	function pointLine(points, rate) {
		var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
		var ret = [];
		pointA = points[0]; //点击
		pointB = points[1]; //中间
		xDistance = pointB.x - pointA.x;
		yDistance = pointB.y - pointA.y;
		pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
		tan = yDistance / xDistance;
		radian = Math.atan(tan);
		tmpPointDistance = pointDistance * rate;
		ret = {
			x: pointA.x + tmpPointDistance * Math.cos(radian),
			y: pointA.y + tmpPointDistance * Math.sin(radian)
		};
		return ret;
	}
	return {
		bezier_points: ret
	};
}
export default {
	data() {
		return {
			operationList:[
				{
					name:'综合',
					check:1,
				},
				{
					name:'销量',
					check:0,
				},
				{
					name:'价格',
					check:0,
				},
			],
			//当前选中的操作
			currentOperation:0,
			StatusAddNav:this.StatusAddNav,
			// 购物车小球动画start
			hide_good_box: false,
			bus_x: 0,
			bus_y: 0,
			finger: {},
			busPos: {},
			linePos: [],
			timer: null,
			carNum: 0, //加入到购物车的总个数
			// 购物车小球动画end
			
			isKeep: false, //收藏
			showCategoryIndex: 0,
			//分类列表
			categoryList: [],
			//商品列表
			goodsList: [],
			//控制价钱升降排序标记
			priceOrder: 0,
			//控制销量升降排序标记
			salesOrder: 0,
			//控制综合升降排序标记
			allOrder: 0,
			//当前分类的id
			sortCurrentId: 0
		};
	},
	onLoad() {
		let hh = 0;
		const that = this;
		that.busPos['x'] = 330; //购物车的位置
		//  #ifdef H5
		hh = document.body.clientHeight;
		that.busPos['y'] = hh - 83;
		//  #endif

		//  #ifdef MP-WEIXIN
		wx.getSystemInfo({
			success: function(res) {
				hh = res.windowHeight;
				that.busPos['y'] = hh - 83;
			}
		});
		//  #endif
		this.getCategoryList();
	},

	methods: {
		changeOperation(index){
			//当操作的对象改变的时候需要将上次操作的对象check恢复成0
			if(index!=this.currentOperation){
				this.operationList[this.currentOperation].check=0;
			}
			this.currentOperation=index;
			this.operationList[index].check=this.operationList[index].check==2?1:this.operationList[index].check+1;
			this.getSortGoods();
		},
		// 加入购物车start
		touchOnGoods(e, id) {
			console.log('点击的坐标:', id);
			if (this.timer) {
				// 清除一下动画
				clearInterval(this.timer);
			}
			this.finger = {};
			var topPoint = {};
			this.finger['x'] = e.target.x; //点击的位置
			this.finger['y'] = e.target.y;
			if (this.finger['y'] < this.busPos['y']) {
				topPoint['y'] = this.finger['y'] - 150;
			} else {
				topPoint['y'] = this.busPos['y'] - 150;
			}
			topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

			if (this.finger['x'] > this.busPos['x']) {
				topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
			} else {
				//
				topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
			}
			//调用全局的方法进行计算x和y变化的数据,执行次数是30次
			this.linePos = bezier([this.busPos, topPoint, this.finger], 30);
			this.startAnimation(id);
		},
		startAnimation(id) {
			var index = 0,
				that = this,
				bezier_points = that.linePos['bezier_points'];
			that.hide_good_box = true;
			that.bus_x = that.finger['x']; //当点击完之后小球复位到点击的位置,随意定时更新由bezier生产的数据
			that.bus_y = that.finger['y'];
			var len = bezier_points.length;
			index = len; //有多少组数据，一直执行到数据index为
			that.timer = setInterval(function() {
				//将先钱计算得到的数据展示出来,以0.025s的速度展示,实现飞进去的动画
				index--;
				that.bus_x = bezier_points[index]['x'];
				that.bus_y = bezier_points[index]['y'];
				if (index < 1) {
					clearInterval(that.timer);
					that.hide_good_box = true;
					that.addGoodToCar(id);
				}
			}, 25);
		},
		//添加商品到购物车中
		addGoodToCar(gId) {
			let that = this;
			//是否登入
			if (that.isLogin()) {
				//获取该商品的信息
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'details',
						q: {
							id: gId
						}
					}),
					function(res) {
						//添加到购物车中
						that.basePost(
							that.U({ c: 'auth_api', a: 'set_cart' }),
							{
								productId: gId,
								merId: res.data.merInfo.id,
								cartNum: 1
							},
							function(res) {
								that.carNum++;
								that.Tips({ title: '添加成功,在购物车等亲' });
							},
							function(res) {
								that.Tips({ title: '服务器开小差了，请稍后在试~' });
							}
						);
					},
					function(res) {
						console.log(res);
					},
					true
				);
			}
		},
		//改变综合排序
		changeAllRank() {
			this.allOrder = this.allOrder == 2 ? 0 : this.allOrder + 1;
			this.getSortGoods();
		},
		//改变销量排序
		changeSalesRank() {
			this.salesOrder = this.salesOrder == 2 ? 0 : this.salesOrder + 1;
			this.getSortGoods();
		},
		//改变价格排序
		changePriceRank() {
			this.priceOrder = this.priceOrder == 2 ? 0 : this.priceOrder + 1;
			this.getSortGoods();
		},
		//获取分类列表
		getCategoryList() {
			var that = this;
			that.baseGet(
				that.U({ c: 'store_api', a: 'get_id_cate' }),
				function(res) {
					//获取分类列表中的第一个id来获取goods数据
					that.showCategory(0, res.data[0].id);
					that.categoryList = res.data;
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//收藏
		keep() {
			this.isKeep = this.isKeep ? false : true;
		},

		//获取指定类别的商品
		getSortGoods() {
			let that = this;
			that.goodsList = [];
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'get_product_list',
					q: {
						cid: that.sortCurrentId,
						keyword: '',
						priceOrder: that.operationList[2].check==0?'':that.operationList[2].check == 1 ? 'asc' : 'desc',
						salesOrder: that.operationList[1].check==0?'':that.operationList[1].check == 1 ? 'asc' : 'desc',
						news: '',
						page: '',
						limit: ''
					}
				}),
				function(res) {
					that.goodsList = res.data;
					console.log(that.goodsList);
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//分类切换显示
		showCategory(index, id) {
			this.showCategoryIndex = index;
			this.sortCurrentId = id;
			this.getSortGoods();
		},
		// 搜索商品
		search(e) {
			uni.navigateTo({
				url: '/pages/list/search/search'
			});
		},
		// 商品详情
		cart_detail(){
			uni.switchTab({
				url:'/pages/tabber/shopping_cart/shopping_cart'
			})
		},
		goodeDetails(e) {
			uni.navigateTo({
				url: '/pages/list/goode_details/goode_details?id=' + e.currentTarget.dataset.id
			});
		}
	}
};
</script>

<style scoped>
	.has-border-orange{
		border: 2rpx solid #f37b1d;
	}
	.img-has-size {
		width: 180upx;
		height: 170upx;
	}
	.after {
		width: 100%;
		position: fixed;
		top: 0upx;
		background: #39b54a;
		transition: opacity 0.05s linear;
		color: #fff;
	}
	
/* 头部 */
.header {
	width: 100%;
	height: 150upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
}

.input_view {
	width: 450upx;
	height: 60upx;
	background-color: rgba(255, 255, 255, 0.7);
	position: absolute;
	left: 20%;
	z-index: 1024;
	border: 1px solid rgba(135, 153, 163, 0.3);
	bottom: 39rpx;
}

.input_view text {
	display: block;
	width: 450upx;
	height: 60upx;
	line-height: 60upx;
	text-align: center;
}
.cart {
	position: fixed;
	bottom: 100upx;
	right: 25upx;
	text-align: center;
	z-index: 9999;
	background-size: 20rpx 20rpx;
	background: url(../../../static/address.png);
}


	
.fair_list {
	width: 100%;
	height: 80upx;
	background-color: #39b54a;
	display: flex;
	align-items: center;
}
/*抛物线小球*/
.good_box {
	width: 35upx;
	height: 35upx;
	position: fixed;
	border-radius: 50%;
	overflow: hidden;
	left: 50%;
	top: 50%;
	z-index: +99;
	background: #0081ff;
}
.fair_list .title_list {
	width: 545upx;
	height: 80upx;
	margin-left: 180upx;
	margin-right: 25upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.fair_list .title_list .text {
	height: 80upx;
	display: flex;
	align-items: center;
}
.fair_list .title_list .text image {
	width: 30upx;
	height: 30upx;
}


.left {
	width: 180upx;
	left: 0upx;
	background: rgba(255,255,255,0.1);
	position: absolute;
	bottom: 0upx;
	top: 210upx;
}

.row {
	height: 90upx;
	display: flex;
	align-items: center;
}

.row .text {
	width: 180upx;
	text-align: center;
}

.on {
	height: 100upx;
	background: #fff;
	border-left: 10upx solid #39b54a;
}

.on .text {
	width: 160upx;
	text-align: center;
}

.right {
	position: absolute;
	top: 210upx;
	bottom: 0upx;
	width: 570upx;
	left: 180upx;
	background: #FFFFFF;
}







</style>
