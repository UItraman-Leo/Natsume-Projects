<template>
	<view class="container">
		<span></span>
		<span></span>
		<span></span>
	</view>
</template>

<script>
	export default {
		name: "animation-Small-Ball",
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 300rpx;
		height: 300rpx;
		perspective: 600rpx;
		$sysColor1: skyblue;
		$sysColor2: yellow;
		$sysFontSize: 20rpx;

		span {
			border: $sysFontSize solid #262626;
			position: absolute;
		}

		span::before {
			content: '';
			height: 50%;
			width: $sysFontSize;
			background-color: $sysColor1;
			position: absolute;
			border-radius: $sysFontSize;
			top: -$sysFontSize;
			left: -$sysFontSize;
			box-shadow:
				0 0 5px $sysColor1,
				0 0 25px $sysColor1,
				0 0 50px $sysColor1,
				0 0 100px $sysColor1,
				0 0 200px $sysColor1,
				0 0 300px $sysColor1;

		}

		span::after {
			content: '';
			height: 50%;
			width: $sysFontSize;
			background-color: $sysColor2;
			position: absolute;
			border-radius: $sysFontSize;
			right: -$sysFontSize;
			bottom: -$sysFontSize;
			box-shadow:
				0 0 5px $sysColor2,
				0 0 25px $sysColor2,
				0 0 50px $sysColor2,
				0 0 100px $sysColor2,
				0 0 200px $sysColor2,
				0 0 300px $sysColor2;

		}

		span:nth-child(1) {
			inset: 0;
			border-radius: $sysFontSize;
			animation: rotate 8s linear infinite;
		}

		span:nth-child(2) {
			inset: 2*$sysFontSize;
			border-radius: $sysFontSize;
			animation: rotate 4s linear infinite reverse;
		}

		span:nth-child(3) {
			inset: 4*$sysFontSize;
			border-radius: 20%;
			animation: rotate 2s linear infinite;
		}

		@keyframes rotate {
			0% {
				transform: rotateY(0deg)
			}

			100% {
				transform: rotateY(360deg)
			}
		}



	}
</style>