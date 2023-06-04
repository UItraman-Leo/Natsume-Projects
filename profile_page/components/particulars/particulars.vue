<template>
	<view>
		<!-- 标题 -->
		<view class="title">
			{{data.title}}
		</view>
		<!-- 内容 -->
		<view class="formatter">
			<rich-text :nodes="data.content"></rich-text>
		</view>

	</view>
</template>

<script>
	export default {
		name: "particulars",
		data() {
			return {
				data: {}
			}
		},
		methods: {

		},
		onLoad() {
			// 接收点击项传递的数据
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage', (data) => {
				this.data = data.data
				// console.log(this.data)
			})
		}
	}
</script>

<style scoped>
	.title {
		font-size: 1.5em;

	}

	.formatter {
		font-size: 0.7em;
	}

	img {
		/* object-fit: cover; */
		max-width: 100%;
	}
</style>