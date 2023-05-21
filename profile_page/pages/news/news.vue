<template>
	<view class="news">
		<view v-for="(item,index) in 10" :key="index">
			{{item}}
		</view>
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
	.news {
		background-color: hotpink;
	}
</style>