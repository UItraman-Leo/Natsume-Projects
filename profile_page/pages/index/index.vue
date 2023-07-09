<template>
	<view class="index">
		<!-- 消息列表 -->
		<scroll-view id="msg-list" class="msg-list" scroll-y="true" :scroll-top="scrollTopHeight"
			scroll-with-animation="true">
			<view id="item" :style="{top:a}">
				<view class="item" v-for="(item,index) in dialogue" :key="index"
					:class="[index%2 ? 'item_left' : 'item_right']">
					<view class="avatar">
						<image v-if="index%2 === 0" style="width: 100%;height:100%;"
							src="https://i.postimg.cc/zBVmZNVV/20220803201455-828eb-thumb-1000-0.jpg" />
						<image v-else style="width: 100%;height:100%;"
							src="https://i.postimg.cc/dQZM5Jbf/20220615211741-4924d.jpg" />
					</view>
					<view class="content" :class="[index%2 ? 'content_left' : 'content_right']">
						{{item}}
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部输入栏 -->
		<view class="easy-input">
			<uni-easyinput class="uni-mt-5" suffixIcon="paperplane-filled" v-model="value" placeholder="骂他" trim='all'
				:disabled="disabled" @iconClick="iconClick(value)"
				@keyboardheightchange='keyboardheightchange'></uni-easyinput>
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				a: '',
				// 禁用输入框
				disabled: false,
				// 输入框的值
				value: '',
				// 聊天数据
				dialogue: [
					'桃叶那尖上尖,柳叶儿就遮瞒了天',
					'在其位的这个明啊公,细听我来言呐',
					'此事哎',
					'出在了京西蓝靛厂啊',
					'蓝靛厂那个火器营儿,有一个松老三呐',
					'提起了松老三，两口子卖大烟',
					"一辈子无有儿,生了个女儿婵娟呐",
					"小妞哎年长一十六啊,起了个乳名儿,荷花万字叫大莲呐"
				],
				// 距离顶部
				scrollTopHeight: 0,
				scroll_Height: 0
			}
		},
		methods: {
			iconClick(value) {

				if (value) {
					this.disabled = true
					this.dialogue.push(value)
					this.value = ''
					uni.request({
						url: 'https://api.oioweb.cn/api/ai/chat',
						data: {
							text: value,
						},
						method: "POST",
						dataType: "json",
						header: {
							'content-type': 'application/x-www-form-urlencoded' //请求头信息
						},
						success: (res) => {
							this.dialogue.push(res.data.result.displayText)
							// console.log(res.data.result.displayText);

							this.$nextTick(() => {
								this.disabled = false
								const query = uni.createSelectorQuery().in(this);
								query.select('#item').boundingClientRect((data) => {
									this.scrollTopHeight = data.height
								}).exec();
							})
						},
						fail: (erro) => {
							console.log(erro);
							setTimeout(() => {
								this.disabled = false
							}, 500)
						}
					})
				} else {
					console.log("@@", value);
				}
			},
			keyboardheightchange(e) {
				// console.log(e.target.height);
				// if (e.target.height) {
				// 	this.a = this.scroll_Height - e.target.height + 'rpx'
				// } else {
				// 	this.a = this.scroll_Height + 'rpx'
				// }
			},
			onload() {
				// const query = uni.createSelectorQuery().in(this);
				// query.select('#msg-list').boundingClientRect((data) => {
				// 	this.scroll_Height = data.height
				// }).exec();
			}
		}
	}
</script>
<style scoped>
	.index {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.msg-list {
		background-image: linear-gradient(332deg, #08adb0, #75c0c1, #b0d3d2, #e6e6e3);
		width: 100%;
		height: 93%;
	}

	.easy-input {
		width: 100%;
		height: 7%;
		position: relative;

	}

	.item {
		width: 100%;
		min-height: 3rem;
		margin-bottom: 1rem;
		display: flex;
		flex-wrap: nowrap;
		position: relative;
		bottom: 0px
	}

	.item_left {
		flex-direction: row;
	}

	.item_right {
		flex-direction: row-reverse;

	}

	.avatar {
		background-color: #e0e0e0;
		width: 3em;
		height: 3em;
		border: #e0e0e0 2rpx solid;
		border-radius: 2em;
		overflow: hidden;
	}

	.content {
		max-width: 16rem;
		margin: 1em 0.5em 0.5em 0.5em;
		padding: 0.5em;
		border-radius: 15rpx;
		font-size: 0.8em;
		overflow: hidden;
	}

	.content_left {
		background-color: antiquewhite;
	}

	.content_right {
		background-color: aquamarine;
	}
</style>