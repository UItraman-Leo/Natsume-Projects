<template>
	<view style="width: 100%;background: pink;">
		<view v-for="(item,index) in 100" :key="index" style="width: 2rem;height: 4rem;">
			index
		</view>
	</view>
</template>

<script>
	export default {
		name: "home",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
