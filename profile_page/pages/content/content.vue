<template>
	<view class="content">
		<view class="swiper_title">
			<text style="margin: 0 auto;">
				{{Object.keys(nav_Data)[swiperDotIndex]}}
			</text>
		</view>
		<uni-swiper-dot :info="nav_Data" :current="swiperDotIndex" :mode="mode" :dots-styles="dotsStyles">
			<swiper class="swiper-box" :current="swiperDotIndex" circular="true" display-multiple-items="1"
				@change=chanCurrent>
				<swiper-item class="swiper_item" v-for="(val, _, index) in nav_Data" :key="index">
					<view class="grid-container">
						<view class="item" v-for="(navItem, navIndex) in val">
							<view class="item_img" @click="toLink({navItem,navIndex})">
								<image style="width: 100%;height: 100%;" mode="aspectFill" :src="navItem.img">
								</image>
							</view>
							<view class="item_text">
								<text>
									{{navItem.name}}
								</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import $axios from '../../util/axios.js'
	import groupBy from '../../util/groupBy.js'
	export default {
		data() {
			return {
				swiperDotIndex: 0, //默认下标
				mode: 'round', //导标样式类型
				dotsStyles: { //导标颜色
					with: 50,
					backgroundColor: 'rgba(85, 0, 255, 0.3)',
					border: '1px rgba(85, 0, 255, 0.3) solid',
					selectedBackgroundColor: 'rgba(0, 0, 0, 0.9)',
					selectedBorder: '1px rgba(0, 0, 0, 0.9) solid'
				},
				nav_Data: {
					// "XXX": [{}]
				}
			}
		},
		methods: {
			// 滑动触发title改变
			chanCurrent(event) {
				// console.log(event.detail.current);
				this.swiperDotIndex = event.detail.current
			},
			// 提示无法跳转，确认后复制地址
			toLink(e) {
				// console.log(e.navItem.Link);
				uni.showModal({
					title: '提示',
					content: '小程序权限限制无法打开链接，点击确定复制链接到剪切板',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.setClipboardData({
								data: e.navItem.Link,
								showToast: true,
								success() {},
								fail() {}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}

		},
		onLoad() {
			$axios.getNew('https://api.xia-mu.top:3000/web/content/list').then((res) => {
				console.log('#######res', res);
				let arry = res.data.data
				this.nav_Data = groupBy(arry)
				// console.log(">>>", groupBy(arry));
			}).catch((erro) => {
				console.log('###########erro', erro);
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		border: 0px;
		background-color: #000000;

		// 头部标题
		.swiper_title {
			margin: auto;
			width: 300rpx;
			border-radius: 100vw;
			background-color: #14d8b9f5;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		$Colors: #000000 #14d8b9f5 #dfff33;

		.swiper-box {
			height: calc(100vh - 100rpx);

			.swiper_item {
				overflow-y: scroll;

				.grid-container {
					display: grid;
					grid-template-columns: 6% auto auto 6%;
					padding: 20rpx;
					grid-row-gap: 40rpx;

					.item {
						border: 1px solid rgba(0, 255, 255, 0.8);
						border-radius: 30rpx;
						box-shadow: 10px 12px 5px rgba(0, 255, 255, 0.8);
						grid-column: 2 / 4;
						height: 140rpx;
						overflow: hidden;
						display: flex;

						.item_img {
							width: 140rpx;
							height: 140rpx;
						}

						.item_text {
							color: #ffffff;
							width: 80%;
							height: 140rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							flex-wrap: nowrap;

						}
					}
				}

			}

		}
	}
</style>