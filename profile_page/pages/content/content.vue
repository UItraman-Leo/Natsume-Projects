<template>
	<view class="content">
		<view v-for="(item,index) in 100" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: red;
	}
</style>