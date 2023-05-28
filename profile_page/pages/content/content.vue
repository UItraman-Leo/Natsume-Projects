<template>
	<view class="content">
		<view class="swiper_title">
			<text style="margin: 0 auto;">
				{{nav_Data[swiperDotIndex].title}}
			</text>
		</view>
		<uni-swiper-dot :info="nav_Data" :current="swiperDotIndex" :mode="mode" :dots-styles="dotsStyles">
			<swiper class="swiper-box" :current="swiperDotIndex" circular="true" display-multiple-items="1"
				@change=chanCurrent>
				<swiper-item class="swiper_item" v-for="(item, index) in nav_Data" :key="index">
					<view :style="{height: '100%', width:'100%', overflowY: 'auto',backgroundColor:item.bgColor}">
						<view class="wrapper">
							<view class="item" v-for="(navItem, navIndex) in item.nav">
								<uni-card padding="0" spacing="0" margin="0" is-full="true" is-shadow="true"
									style="border: 0px;width: 100%;height: 100%; box-shadow:rgb(39 2 2 / 99%) 0px 0px 3px 1px;border-radius: 10rpx;">
									<template v-slot:cover>
										<view class="custom-cover">
											<image class="cover-image" mode="aspectFill" :src="navItem.img">
											</image>
											<view class="cover-content">
												<text class="uni-subtitle uni-white">
													{{navItem.text}}
												</text>
											</view>
										</view>
									</template>
								</uni-card>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
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
				nav_Data: [{ //导航数据
						title: "常用导航",
						bgColor: "#00ff7f",
						nav: [{ //内容区数据
							img: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
							text: "vue"
						}, { //内容区数据
							img: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
							text: "vue"
						}, { //内容区数据
							img: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
							text: "vue"
						}]
					},
					{
						title: "作图",
						bgColor: "#55aaff",
						nav: [{
							img: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
							text: "vue"
						}]
					},
					{
						title: "娱乐",
						bgColor: "#ffff00",
						nav: [{
							img: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
							text: "vue"
						}]
					}
				]
			}
		},
		methods: {
			// 滑动触发title改变
			chanCurrent(event) {
				// console.log(event.detail.current);
				this.swiperDotIndex = event.detail.current
			}

		},
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		border: 0px;

		.swiper-box {
			height: calc(100vh - 100rpx);

			.swiper_item {
				.wrapper {
					margin: auto;
					height: 100%;
					display: grid;
					grid-auto-flow: row dense;
					grid-template-columns: repeat(auto-fit, minmax(140rpx, 140rpx));
					/*  声明行的高度  */
					grid-template-rows: 140rpx;
					grid-gap: 20px;

					.item {
						width: 140rpx;
						height: 140rpx;
						position: relative;

						.custom-cover {
							border: 0px;
							width: 140rpx;
							height: 140rpx;
							display: flex;
							flex-direction: column;
							align-items: center;

							.cover-image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}

		.swiper_title {
			margin: auto;
			width: 300rpx;
			background-color: coral;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}
</style>