<template>
	<view class="tar-bar">
		<view class="tar-bar-left">
			qqqq
		</view>
		<view class="tar-bar-conter">
			<web_navbar_conter :tarbar_data=tarbar_data></web_navbar_conter>
		</view>
		<view class="tar-bar-right">
			eeee
		</view>
	</view>
</template>

<script>
	import web_navbar_conter from "@/platforms/web/web-navbar-conter/web-navbar-conter.vue"
	export default {
		components: {
			web_navbar_conter
		},
		data() {
			return {
				tarbar_data: {
					//导航栏宽,高,左,上
					Range: {
						width: '100%',
						height: '50rpx',
						left: '0rpx',
						top: '0rpx',
						bgColor: "#ff00ff"
					},
					pading: '0rpx',
					size: {
						width: '200rpx',
						height: '45rpx'
					},
					navSubBg: {
						bgColor: "#76ff03",
						textColor: "",
						url: "",
					},
					navSubBgAct: {
						bgColor: "#ffb300",
						textColor: "",
						url: "",
					},
					pages: [{
						pagePath: "pages/index/index",
						text: "音乐",
					}, {
						pagePath: "pages/content/content",
						text: "接口",
					}, {
						pagePath: "pages/news/news",
						text: "公告",
					}, {
						pagePath: "pages/music/music",
						text: "音乐",
					}]

				}
			}
		},
		methods: {
			onTabItemTap(e) {
				console.log(e);
			}
		},

	}
</script>

<style lang="scss" scoped>
	.tar-bar {
		width: 100%;
		height: 100%;
		background-color: antiquewhite;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;

		.tar-bar-left {
			flex-grow: 1;
			background-color: yellow;
		}

		.tar-bar-conter {
			flex-grow: 3;
			background-color: pink
		}

		.tar-bar-right {
			flex-grow: 1;
			background-color: blueviolet;
		}
	}
</style>