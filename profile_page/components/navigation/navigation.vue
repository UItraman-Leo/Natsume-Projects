<template>
	<view style="width: 100%;height:100%;">
		<view class="module">
			<!-- 标题 -->
			<view class="title">
				<text>{{Data[i].name}}</text>
			</view>
			<!-- 轮播区域 -->
			<view class="swiper">
				<swiper class="swiper-list" :indicator-dots="true" :circular="true" :interval="3000" :duration="1000"
					@change="onchange">
					<!-- 单页轮播图区域 -->
					<swiper-item v-for="(swiperitem,swiperindex) in Data" :key="swiperindex">
						<view class="swiper-item">
							<!-- 存放内容限制区域 -->
							<scroll-view class="context-list" scroll-y="true">
								<!-- 存放内容区域 -->
								<view style="display: flex;
								flex-direction: row;
								flex-wrap: wrap;
								justify-content: flex-start;
								">
									<!-- 单个内容区 -->
									<view class="small-area" v-for="(scrollitem,scrollindex) in swiperitem.content"
										:key="scrollindex" @click="onclick(scrollitem.link)">
										<!-- 图标区域 -->
										<view class="ico">
											<img style="width: 100%;height: 100%;" :src="scrollitem.logo" alt="">
										</view>
										<!-- 文字区域 -->
										<view class="text">
											<text style="display: block;">{{scrollitem.head}}</text>
										</view>

									</view>
								</view>
							</scroll-view>

						</view>
					</swiper-item>

				</swiper>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "navigation",
		data() {
			return {
				// 数据
				Data: [{
						name: '常用导航',
						content: [{
								logo: '/static/logo.png',
								head: 'uniapp',
								link: 'https://es6.ruanyifeng.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/vuejs.svg',
								head: 'Vue',
								link: 'https://cn.vuejs.org/'
							},
							{
								logo: 'https://files.codelife.cc/icons/github.svg',
								head: 'GitHub',
								link: 'https://github.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/gitee.svg',
								head: 'Gitee',
								link: 'https://gitee.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/5fec3cd28af9860fb41a9cb1.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: 'Premium',
								link: 'https://postimg.cc/files'
							},
							{
								logo: 'https://files.codelife.cc/website/mdn-web-docs.svg',
								head: 'MDN',
								link: 'https://developer.mozilla.org/zh-CN/docs/Learn'
							},
						]
					},
					{
						name: '前端开发',
						content: [{
								logo: 'https://files.codelife.cc/website/react.svg',
								head: 'React',
								link: 'https://zh-hans.reactjs.org/'
							},
							{
								logo: 'https://files.codelife.cc/website/5fea9c398af9860fb41a9c2b.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: 'ES6教程',
								link: 'https://es6.ruanyifeng.com/'
							}, {
								logo: 'https://files.codelife.cc/website/bootstrap.svg',
								head: 'Bootstrap',
								link: 'https://www.bootcss.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/typescript.svg',
								head: 'TypeScript',
								link: 'https://typescript.bootcss.com/'
							},
							{
								logo: 'https://files.codelife.cc/icons/ant-design-vue.svg',
								head: 'Ant',
								link: 'https://www.antdv.com/docs/vue/introduce-cn/'
							},
							{
								logo: 'https://files.codelife.cc/icons/element-plus.org.svg',
								head: 'ElementPlus',
								link: 'https://element-plus.org/zh-CN/#/zh-CN'
							},
							{
								logo: 'https://files.codelife.cc/icons/vitejs.svg',
								head: 'vite2中文',
								link: 'https://vitejs.dev/'
							},
						]
					},
					{
						name: '设计素材',
						content: [{
								logo: 'https://files.codelife.cc/website/5f1f823065bf280ee60a1646.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '爱给',
								link: 'https://www.aigei.com/tool/sprite'
							},
							{
								logo: 'https://files.codelife.cc/website/5ab4944d16c11b2acf8c10a2.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: 'Gradient',
								link: 'https://gradient.shapefactory.co/'
							},
							{
								logo: 'https://files.codelife.cc/website/unsplash.svg',
								head: 'konachan',
								link: 'https://konachan.net/'
							},
							{
								logo: 'https://files.codelife.cc/icons/uidesigndaily.svg',
								head: '每日ui设计',
								link: 'https://uidesigndaily.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/iconfont.svg',
								head: 'Iconfont',
								link: 'https://www.iconfont.cn/'
							},
							{
								logo: 'https://files.codelife.cc/website/uicn.svg',
								head: 'UI中国',
								link: 'https://www.ui.cn/'
							},
							{
								logo: 'https://files.codelife.cc/icons/colorhub.svg',
								head: 'colorhub',
								link: 'https://colorhub.me'
							},
							{
								logo: 'https://files.codelife.cc/icons/zhongguose.com.svg',
								head: '中国色',
								link: 'http://zhongguose.com/'
							},
							{
								logo: 'https://files.codelife.cc/icons/60b9fa76ae5a9ba4024b6bf4.png',
								head: '90设计网',
								link: 'http://90sheji.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/freepik.svg',
								head: '千叶桌面壁纸',
								link: 'http://qianye88.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/5dfc8bdb3c4366058063c9ee.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '搜图导航',
								link: 'https://www.91sotu.com/'
							},
						]
					},
					{
						name: '娱乐摸鱼',
						content: [{
								logo: 'https://files.codelife.cc/website/5f4ca285aa121b0c2ac69ee8.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '小霸王',
								link: 'https://www.yikm.net/'
							},
							{
								logo: 'https://files.codelife.cc/icons/douyin.svg',
								head: '抖音',
								link: 'https://www.douyin.com'
							},
							{
								logo: 'https://files.codelife.cc/website/5ab44e5c57dd002aca3d15a5.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '4399小游戏',
								link: 'http://www.4399.com/'
							},
							{
								logo: 'https://files.codelife.cc/icons/59f86644d8bf9277d70b3f60.png',
								head: '番组放送',
								link: 'https://bgmlist.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/5e2114eb7e261c1f0b4e6971.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '摸鱼',
								link: 'http://mo.fish'
							},
							{
								logo: 'https://files.codelife.cc/icons/acfun.svg',
								head: 'AC Fun',
								link: 'http://www.acfun.cn/'
							},
							{
								logo: 'https://files.codelife.cc/icons/ghxi.svg',
								head: '果核剥壳',
								link: 'https://www.ghxi.com/'
							},
							{
								logo: 'https://files.codelife.cc/website/5a3bb19f8b76ae6c31e1e81a.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '半次元',
								link: 'https://bcy.net'
							},
							{
								logo: 'https://files.codelife.cc/website/5bdea94b2c829e619e386233.png?x-oss-process=image/resize,limit_0,m_fill,w_100,h_100/quality,q_100',
								head: '起点中文网',
								link: 'https://www.qidian.com/rank'
							},
						]
					},
				],
				// 存放标题数组下标
				i: 0,
			};
		},
		methods: {
			onchange(e) {
				// 用current修改标题下标i
				this.i = e.target.current
			},
			// 微信小程序特有代码，因微信小程序个人无法跳转第三方链接，所以只提示
			//#ifdef MP-WEIXIN
			onclick(url) {
				uni.showModal({
					title: '提示',
					content: '由于权限问题微信小程序无法打开链接，点击确定复制链接到剪切板',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.setClipboardData({
								data: url,
								showToast: true,
								success() {},
								fail() {}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//#endif
			// h5跳转链接
			//#ifdef H5
			onclick(url) {
				window.open(url, "_blank")
			}
			//#endif
		}
	}
</script>

<style>
	/* 大模块 */
	.module {
		width: 100%;
		height: 100%;
		/* 		background-color: #CCFFCC; */
		display: flex;
		flex-direction: column;

	}

	/* 标题 */
	.title {
		position: relative;
		height: 150rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-content: center;
		justify-content: space-around;
		align-items: center;
		font-size: 50rpx;
		background: url('https://i.postimg.cc/XYbtCyKc/2.gif');
		background-repeat: no-repeat;
		background-size: 400rpx 400rpx;
		background-origin: content-box;
		background-position: center;
	}

	/* 轮播区域 */
	.swiper {
		position: relative;
		background-color: #feffd2f7;
		height: 95%;
		width: 100%;

	}

	/* 轮播列表 */
	.swiper-list {
		width: 100%;
		height: 100%;
	}

	/* 单个轮播区域 */
	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: flex-end;
	}

	/* 存放图标的滑动区 */
	.context-list {
		width: 90%;
		height: 95%;
	}

	/* 单个图标区域 */
	.small-area {
		margin-bottom: 1rem;
		width: 200rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		/* #ifdef MP-WEIXIN */
		margin-left: 20rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-left: 30rpx;
		/* #endif */

	}

	/* 图标 */
	.ico {
		border-radius: 100%;
		width: 75%;
		height: 75%;
		overflow: hidden;
	}

	/* 文字 */
	.text {
		background-color: #585d6124;
		width: 100%;
		height: 25%;
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: nowrap;
		overflow: hidden;
	}
</style>
