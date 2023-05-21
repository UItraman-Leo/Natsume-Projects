<template>
	<view class="content">
		<view v-for="(item,index) in 100" :key="index">
			{{item}}
		</view>
		<!-- 小屏特有侧边栏 -->
		<match-media :min-width="375" :max-width="800">
			<view>当页面最小宽度 375px， 页面宽度最大 800px 时显示</view>
		</match-media>
		<!-- 大屏特有侧边栏 -->
		<match-media :min-width="800">
			<view>当页面Pc</view>
		</match-media>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<style scoped>
	.content {
		position: absolute;
		background-color: paleturquoise;
	}
</style>