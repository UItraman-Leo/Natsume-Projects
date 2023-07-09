<template>
	<view class="app">
		<!-- 背景 -->
		<image style="position: relative;  width: 100%;height: 100%;"
			src="https://c-ssl.duitang.com/uploads/item/202002/26/20200226154525_xsWf8.jpeg" alt="">
		</image>
		<!-- 中间动画 -->
		<animation-Small-Ball style="position: absolute;width: 100%;height: 100%; left: 0px;top: 0px;
			display: flex;justify-content: center;align-items: center;z-index: 1;"></animation-Small-Ball>
		<!-- 奥特曼 -->
		<view class="atm">
			<view class="img">
				<img src="https://i.postimg.cc/PJc6Y4p6/atm1.png" alt="">
			</view>
			<view class="img">
				<img src="https://i.postimg.cc/pXhcxg43/atm2.png" alt="">
			</view>
			<view class="img">
				<img src="https://i.postimg.cc/cJmXXZtt/atm3.png" alt="">
			</view>
			<view class="img">
				<img src="https://i.postimg.cc/1zcY2w2t/atm4.png" alt="">
			</view>

		</view>
		<!-- 倒计时、跳过 -->
		<view class="countdown">
			<view title class="Countdownitem">
				{{Time}}s
			</view>
			<view Skip class="Skipitem" @click="onSkip">
				跳过
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Time: 10,
			}
		},
		methods: {
			onSkip() {
				uni.showModal({
					title: '提示',
					content: "点确定跳过",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.showModal({
								title: '提示',
								content: "想跳过?疯了吧",
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		onLoad() {
			const countdown = setInterval(() => {
				if (this.Time) {
					this.Time -= 1
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					});
					console.log("跳转");
					clearInterval(countdown)
				}

			}, 1000)
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;

		// 倒计时
		.countdown {
			background-color: #ffffff87;
			position: absolute;
			top: 1em;
			right: 1em;
			width: 5.5em;
			height: 2em;
			z-index: 10;
			display: flex;
			border-radius: 2em;


			.Skipitem,
			.Countdownitem {
				display: flex;
				width: 49%;
				height: 100%;
				align-items: center;
				font-size: 0.85rem;
				color: #444;
				justify-content: center;
			}

			.Skipitem {
				border-left: 1rpx solid #726c6c69;
			}


		}

		// 奥特曼区域
		$atmWidth: 23em;
		$atmHeight: 8em;

		.atm {
			position: fixed;
			width: 750rpx;
			height: 750rpx;
			transform-origin: center;
			transform-style: preserve-3d;
			// perspective: 800px;
			animation: Flight 10s linear infinite;

			@keyframes Flight {
				0% {
					transform: rotateY(0deg);
				}

				100% {
					transform: rotateY(-360deg)
				}
			}

			.img {
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				position: absolute;

				img {
					transform: scale(.8);
					width: $atmWidth;
					height: $atmHeight;
				}
			}

			.img:nth-child(1) {
				transform: rotateY(0deg)translateZ(35rem)translateY(-6rem);
			}

			.img:nth-child(2) {
				transform: rotateY(90deg)translateZ(35rem)translateY(-2rem);
			}

			.img:nth-child(3) {
				transform: rotateY(180deg) translateZ(35rem)translateY(6rem);
			}

			.img:nth-child(4) {
				transform: rotateY(270deg) translateZ(35rem)translateY(21rem);
				z-index: 10;
			}
		}
	}
</style>