<template>
	<view class="content">
		<!-- 侧边栏-----大屏 -->
		<view class="nav">
			<view v-for="(item , index) in list" :key="index" class="option" @click="torouter(item.name)">
				<img style="width: 60%;height: 60%;" :src="item.ico" alt="" srcset="">
			</view>
		</view>


		<!-- 侧边栏点击按钮-----小屏 -->
		<view class="smallNav" @click="onpageshow">
			<img style="width: 3rem;height: 3rem;" :src="show?navoption[1]:navoption[0]" alt="">
		</view>
		<!-- 侧边栏区域-----小屏 -->
		<view class="smallnformation" :class="{smallnformation2 : show}">

			<view style="
			width: 100%;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-start;
			">
				<!-- 头像 -->
				<view class="profilePhoto"></view>
				<!-- 名字 -->
				<view style="width: 20rem;height: 10rem;
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;">
					<text style="font-size: 3rem;color:aliceblue">夏目</text>
					<text style="font-size: 1rem;color: azure;">
						歳月が長く引っ張られすぎて、私は最初の太陽をほとんど忘れてしまったが、私もあなたに感謝したい、かつては優しい行動で、私に一つ、カラフルな夢を与えてくれた…
					</text>
				</view>

				<!-- 导航选项 -->
				<view class="smallOptions">
					<view v-for="(item , index) in list" :key="index" class="option" @click="torouter(item.name)">
						<text style="
						text-shadow: 20rpx 20rpx 2rpx #120b0b78;
						">{{item.name}}</text>
					</view>
				</view>

				<!-- 联系方式 -->
				<view class="contact">
					<view style="width: 30rem;height:100% ;display: flex;">
						<view v-for="(item,index) in contactlist " :key='index'
							style="width: 4rem;height:4rem;margin-right: 1rem;" @click="bc_code(item)">
							<image style="width: 100%;height:100%;" :src="item.ico" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 中间主区域 -->
		<view class="main">
			<!-- 大屏左边显示信息，小屏隐藏到右边 -->
			<view class="information">
				<!-- 头像 -->
				<view class="profilePhoto">

				</view>
				<!-- 名字 -->
				<view style="width: 20rem;height: 10rem;
				margin: 2rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;">
					<text style="font-size: 3rem;color:aliceblue">夏目</text>
					<text style="font-size: 1rem;color: azure;">
						歳月が長く引っ張られすぎて、私は最初の太陽をほとんど忘れてしまったが、私もあなたに感謝したい、かつては優しい行動で、私に一つ、カラフルな夢を与えてくれた…
					</text>
				</view>
				<!--  -->
				<view style="
				    background:url(https://i.postimg.cc/xCpjtGXX/aigei-com.gif);
					width: 63px;
					height: 79px;
					left: 0px;
					top: 531px;
				    position: absolute;" @click="ontranslate">

				</view>
				<!-- 联系方式 -->
				<view class="contact" style="margin-left: 67px;">
					<view class="bigbor" :class="{bigbor2 : late}">
						<view v-for="(item,index) in contactlist " :key='index'
							style="width: 4rem;height:4rem;margin-right: 1rem;" @click="bc_code(item)">
							<image style="width: 100%;height:100%;" :src="item.ico" mode=""></image>
						</view>
					</view>
				</view>

			</view>
			<view class="route">
				<home v-if="ponent=='home'"></home>
				<navigation v-else-if="ponent == 'navigation'"></navigation>
				<notes v-else-if="ponent == 'notes'"></notes>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						ico: 'https://i.postimg.cc/KcswBWC2/home.png',
						name: 'home'
					},
					{
						ico: 'https://i.postimg.cc/g0q1h2bS/bookmark.png',
						name: 'navigation'
					},
					{
						ico: 'https://i.postimg.cc/cHx2BGss/1-book-one.png',
						name: 'notes'
					},
					{
						ico: 'https://i.postimg.cc/nrMWNKjg/weixin-mini-app.png',
						name: '???'
					},
					{
						ico: 'https://i.postimg.cc/ncvjLdrw/android-chrome-512x512.png',
						name: '???'
					}
				],
				// 侧边栏显示隐藏
				show: false,
				// 侧边栏按钮样式
				navoption: ['https://i.postimg.cc/xjLmYnV7/image.png', 'https://i.postimg.cc/RV9HZyM0/image.png'],
				// 存放渲染哪个组件,默认home页面
				ponent: 'navigation',
				// h5页面,联系方式的位置
				late: false,
				// 联系方式数组
				contactlist: [{
					ico: 'https://i.postimg.cc/MGMwPDtf/wechat.png',
					url: '/static/erweima/wxer.jpg',
					pcUrl: '/static/erweima/wxer.jpg',
					name: '微信'
				}, {
					ico: 'https://i.postimg.cc/QMyLcT3N/QQ.png',
					url: '/static/erweima/qqer.jpg',
					pcUrl: 'tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=3180809725',
					name: 'QQ'
				}, {
					ico: 'https://i.postimg.cc/6p1wfSVN/mail-package.png',
					url: '',
					pcUrl: 'mailto:3180809725@qq.com?subject=邮件标题&body=你是大帅比',
					name: 'QQ邮箱 3180809725@qq.com'
				}, {
					ico: 'https://i.postimg.cc/y8Ns9BZP/enveloe.png',
					url: '',
					pcUrl: 'mailto:xiamu_0@163.com?subject=邮件标题&body=666',
					name: '网易邮箱 xiamu_0@163.com'
				}, {
					ico: 'https://files.codelife.cc/icons/github.svg',
					url: '',
					pcUrl: '',
					name: 'GitHub'
				}, {
					ico: 'https://i.postimg.cc/QMdG9rF3/down-picture.png',
					url: '/static/erweima/1.jpg',
					pcUrl: '/static/erweima/1.jpg',
					name: '图片2'
				}, ],
				codeImg: ''
			}
		},
		methods: {
			// 微信端侧边栏的显示隐藏
			onpageshow() {
				console.log(this);
				this.show = !this.show
			},
			// 切换不同组件跳转
			torouter(name) {
				console.log(this);
				this.ponent = name;
				this.show = !this.show

			},
			// 点击移动联系方式位置
			ontranslate() {
				this.late = !this.late
			},
			// 点击保存二维码
			bc_code(item) {
				console.log("保存图片");
				//#ifdef MP-WEIXIN
				uni.saveImageToPhotosAlbum({
					filePath: item.url,
					success() {
						console.log("成功");
					},
					fail() {
						console.log("失败");
						// 保存图片失败后判断url是否为空
						if (item.url == '') {
							// 如果为空弹出提示框，询问是否复制链接地址
							uni.showModal({
								title: '提示',
								content: '是否复制地址到剪切板',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										// 复制地址到剪切板
										uni.setClipboardData({
											data: item.name,
											showToast: true,
											success() {},
											fail() {}
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});

						}
					}
				});

				//#endif
				//#ifdef H5
				window.open(item.pcUrl, "_blank")
				//#endif
			}
		}
	}
</script>
<style scoped>
	.content {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.main {
		/* 中间主区域 */
		background-image: linear-gradient(9deg, #3d57d3, #6083b4, #64af91, #4ddc68);
		position: absolute;
		width: 85%;
		height: 90%;
		left: 3%;
		top: 5%;
		border-radius: 3rem;
		overflow: hidden;
	}

	/* 大屏-侧边栏 小屏时隐藏 */
	.nav {
		background-color: palegoldenrod;
		width: 6rem;
		right: 1rem;
		top: 5%;
		border-radius: 6rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
		position: absolute;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

	}

	/* 大屏-侧边栏选项 */
	.option {
		width: 6rem;
		height: 6rem;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	/* 小屏侧边栏按钮 -大屏时隐藏*/
	.smallNav {
		display: none;
	}

	/* 小屏侧边栏 -大屏时隐藏*/
	.smallnformation {
		display: none;
	}

	/* 信息显示区域 */
	.information {
		position: absolute;
		width: 30%;
		height: 100%;
		display: flex;
		overflow-y: scroll;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		align-content: flex-start;
		align-items: center;
	}

	/* 头像区域 */
	.profilePhoto {
		margin-top: 3rem;
		width: 15rem;
		height: 15rem;
		border-radius: 15rem;
		border: #4ddc68 0.125rem solid;
		background-image: url('https://i.postimg.cc/DZMvwYz6/0217014157153058.jpg');
		background-repeat: no-repeat;
		background-size: cover;
	}

	/* 联系方式 */
	.contact {
		width: 20rem;
		height: 4rem;
		margin: 2rem;
		border-left: 2rpx black dashed;
		overflow-x: scroll;
	}

	/* 网页端点击诸葛亮滑动 */
	/* #ifdef H5 */
	.bigbor {
		width: 30rem;
		height: 100%;
		display: flex;
		transform: translateX(0rpx);
		transition: all 500ms;
	}

	.bigbor2 {
		width: 30rem;
		height: 100%;
		display: flex;
		transform: translateX(-330rpx);
	}

	/* #endif */

	/* 路由显示区域 */
	.route {
		position: absolute;
		width: 70%;
		height: 100%;
		background-color: aliceblue;
		border-radius: 3rem;
		overflow-y: scroll;
	}



	/* 宽度小于1024时的样式 */
	@media screen and (max-width: 1024px) {

		/* 中间主区域 */
		.main {
			position: relative;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			border-radius: 0rem;
			overflow: hidden;
		}

		/* 侧边栏-小屏不显示 */
		.nav {
			display: none;
		}

		/* 小屏侧边栏按钮 */
		.smallNav {
			display: block;
			position: fixed;
			width: 3rem;
			height: 3rem;
			right: 3%;
			top: 2%;
			border-radius: 3rem;
			z-index: 99;
		}

		/* 小屏侧边信息栏-不显示 */
		.smallnformation {
			background-color: #898989d6;
			width: 100vw;
			height: 100vh;
			display: flex;
			position: fixed;
			right: -100%;
			z-index: 90;
			transition: all 600ms;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-start;
			overflow-y: scroll;

		}

		/* 小屏侧边信息栏-显示 */
		.smallnformation2 {
			background-color: #898989d6;
			width: 100vw;
			height: 100vh;
			display: flex;
			position: fixed;
			right: 0%;
			z-index: 90;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: flex-start;
			overflow-y: scroll;
		}

		/* 导航选项 */
		.smallOptions {
			width: 80%;
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-wrap: nowrap;
			font-size: 2.5rem;
			font-weight: 900;
			color: #77e1de;
		}

		/* 导航选项点击样式 */

		/* 信息显示区域-小屏不显示*/
		.information {
			display: none;
		}

		/* 路由显示区域 */
		.route {
			position: absolute;
			width: 100%;
			height: 100%;
			right: 0%;
			background-color: aliceblue;
			border-radius: 0rem;
			overflow-y: scroll;
		}
	}
</style>
