<template>
	<view class="ali">
		<!-- <view class="ali_top borders" v-if="state != 3">
			<text class="ali_top_icon">收</text>
			<text class="a14">浙江省杭州市西湖区 蒋村街道 紫霞街 110号</text>
		</view> -->
		<!-- ======="state": 0 ,1 ,2====== -->
		<view class="ali_state">
			<block v-for="(item,i) in datas" :key="i">
				<view class="State_Four">
					<view class="FourBox">
						<text class="line" :class="[i == 0?'noline':'']"></text>
						<text class="ali_top_icon" style="margin: 0 0;" v-if="item.status.includes(ways.expName) || i == datas.length -1">发</text>
						<!-- =====如果不够，可以再方法和过滤器中同时添加判断-----或者如下的--[v-else-if]操作 -->
						<!-- <text class="ali_top_icon" style="margin: 0 0;" v-else-if="item.status.includes('丰巢智能快递柜') && i!= datas.length-1">待</text> -->
						<text class="ali_top_icon" :class="[item.status.includes('签收')?'isOk':'']" style="margin: 0 0;" v-else-if="Type(item.status) == true && i!= datas.length-1">{{item.status | Type}}</text>
						<view class="ali_top_icons" style="margin: 0 0;" v-else>
							<text class="line" :class="[i == 0?'noline':'']"></text>
							<text class="ali_top_iconss"></text>
							<text class="line" :class="[i == 0?'noline':'']"></text>
						</view>
						<text class="line" :class="[i == datas.length -1?'noline':'']"></text>
					</view>
					<view class="remark">
						<text class="a14" v-if="i == datas.length-1">已发货</text>
						<text class="a14" v-else>{{item.status}}</text>
						<text class="a12" style="padding-top: 10upx;">{{item.time}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["datas", "state", "ways"],
		data() {
			return {

			}
		},
		//过滤返回关键字
		filters: {
			Type(item) {
				let Info;
				let Phone = /\d{11}/;
				if (Phone.test(item) && item.includes('正在派')) {
					Info = "派";
				} else if (item.includes('已收取快件')) {
					Info = "揽";
				} else if (item.includes('营业')) {
					Info = "运";
				} else if (item.includes('丰巢智能快递柜')) {
					Info = "待";
				} else if (item.includes('签收')) {
					Info = "收";
				} else {
					Info = "";
				}
				return Info
			}
		},
		methods: {
			//判断哪个该展示关键字--还是默认
			Type(item) {
				let Info;
				let Phone = /\d{11}/;
				if (Phone.test(item) && item.includes('正在派')) {
					Info = true;
				} else if (item.includes('已收取快件')) {
					Info = true;
				} else if (item.includes('营业')) {
					Info = true;
				} else if (item.includes('丰巢智能快递柜')) {
					Info = true;
				} else if (item.includes('签收')) {
					Info = true;
				} else {
					Info = false;
				}
				return Info
			}
		},
	}
</script>

<style>
	.isOk {
		background-color: #f66d3c !important;
	}

	.ali_top_iconss {
		width: 12upx;
		height: 12upx;
		display: block;
		background-color: #999;
		padding-right: 2upx;
		border-radius: 50%;
	}

	.noline {
		background-color: #fff !important;
	}

	.State_Four {
		display: flex;
		/* border: 1upx solid red; */
	}

	.FourBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 24upx;
	}

	.line {
		width: 2upx;
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: #999;
	}

	/* ============= */
	.remark {
		display: flex;
		flex-direction: column;
		width: 90%;
		padding: 24upx 0;
		text-align: left;
	}

	.borders {
		border-bottom: 1upx solid #F2F2F2;
		padding: 24upx 0;
	}

	.ali_top_icons {
		width: 46upx;
		height: 46upx;
		display: block;
		background-color: #FFF;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		align-content: center;
	}

	.ali_top_icon {
		width: 46upx;
		height: 46upx;
		display: block;
		background-color: #51C77D;
		color: #fff;
		font-size: 28upx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20upx;
	}

	.ali_top {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	/* ========公共========= */
	.a14 {
		font-size: 28upx;
		color: #000000;
	}

	.a12 {
		font-size: 24upx;
		color: #999;
	}

	.ali {
		background-color: #FFFFFF;
		margin: 25upx;
		border-radius: 18upx;
		display: flex;
		flex: 1;
		flex-direction: column;
	}
</style>
