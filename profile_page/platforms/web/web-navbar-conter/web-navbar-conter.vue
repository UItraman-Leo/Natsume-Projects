<template>
	<view :style="{
		position:'relative',
		backgroundColor:Range.bgColor,
		width:Range.width,
		height:Range.height,
		left:Range.left,
		top:Range.top,
		overflowX: 'scroll'
	}">
		<view style="position: absolute;display: flex;background-color:aqua">
			<view v-for="(item,index) in pages" :key="index" @click="onClickItemTap({item,index})" :style="{
				width:size.width,
				height:size.height
			}">
				<view v-if="index===Index">
					{{item.text}}
				</view>
				<view v-else>
					{{index}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tarbar_data: {
				type: Object,
				default () {
					return {

					}
				}
			}
		},
		data() {
			return {
				// 读取父组件传递的数据
				Range: this.tarbar_data.Range,
				pading: this.tarbar_data.pading,
				pages: this.tarbar_data.pages,
				size: this.tarbar_data.size,
				navSubBg: this.tarbar_data.navSubBg,
				navSubBgAct: this.tarbar_data.navSubBgAct,
				// 当前点击导航栏的下标
				Index: 0,
			}
		},
		methods: {
			onClickItemTap(e) {
				// 存储导航栏下标
				this.index = e.index
				uni.switchTab({
					url: '/' + e.item.pagePath
				});
				// 将循环的 item 赋给事件，点击时就能获取页面路由
				console.log("222", e.item.pagePath);
			}
		},
		mounted: function() {
			console.log("111", this);
		}
	}
</script>

<style lang="scss" scoped>
	.a {
		position: absolute;
		width: 300px;
	}
</style>