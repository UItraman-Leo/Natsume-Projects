<template>
	<!--音频组件-->
	<view>
		<view class="xm-music-player">

			<view class="search-list">
				<!-- 列表容器 -->
				<view>
					<!-- 列表项 -->
					<view class="song" v-for="(item,index) in list" :key="index" @click="clickCut({item,index})">

						<view class="song_title">
							{{item.name}}
						</view>
						<view class="singer_name">
							{{item.singer}}
						</view>
						<view class="profile_photo">
							时间
						</view>
					</view>
					<!-- 列表项 -->
				</view>
				<!-- 列表容器 -->
			</view>

			<view class="audo-video">

				<!--音频播放按钮处-->
				<view class="audo-top">
					<!--上一首切换按钮-->
					<!-- 	<image v-if="jian" style="width:50rpx;height:50rpx;" @click="nosig" src="/static/sys.png"
							mode="aspectFill"></image>
						<image v-else @click="sig" src="/static/xys.png"
							style="width:50rpx;height:50rpx;transform:rotate(180deg)" mode="aspectFill"></image> -->
					<!--上一首切换按钮-->

					<!--快退按钮-->
					<image src="/static/kt.png" style="width:45rpx;height:45rpx;" mode="aspectFill" @click="kt()">
					</image>
					<!--快退按钮-->

					<!--播放按钮-->
					<image :src="succes?'/static/bofang2.png':'/static/zt.png'" mode="aspectFill"
						style="width:180rpx;height:180rpx;" @click="plays()"></image>
					<!--播放按钮-->

					<!--快进按钮-->
					<image src="/static/kj.png" style="width:45rpx;height:45rpx;" mode="aspectFill" @click="kj()">
					</image>
					<!--快进按钮-->

					<!--下一首切换按钮-->
					<!-- 	<image v-if="jia" @click="noxig" style="width:50rpx;height:50rpx;transform:rotate(180deg)"
							src="/static/sys.png" mode="aspectFill"> </image>
						<image v-else style="width:50rpx;height:50rpx;" src="/static/xys.png" @click="xig"
							mode="aspectFill"></image> -->
					<!--下一首切换按钮-->
				</view>
				<!--音频播放按钮处-->



				<!--音频api处[视频代替音频-实现倍数功能]-->
				<video id="myVideo" ref="myVideo" :src="recorPath" class="hidden" :autoplay="autoplays"
					@timeupdate="timeupdate" @loadedmetadata="loadedmetadata" @ended="next" controls
					auto-pause-if-navigate="false" auto-pause-if-open-native="false">
				</video>
				<!--音频api处[视频代替音频-实现倍数功能]-->



				<view class="audo-a" style="margin:0 auto;">
					<!--进度条-->
					<view class="slider-box">
						<text class="mm">{{timer}}</text>
						<slider style="width: 370rpx;" @change="sliderChange" @changing="sliderChanging"
							class="audio-slider" block-size="16" :min="0" :max="duration" :value="currentTime"
							activeColor="#FFA929" @touchstart="lock= true" @touchend="lock = false" />
						<text class="ss" v-if="overTimer!='NaN:NaN'">{{overTimer}}</text>
						<text class="ss" v-else>00.00</text>
					</view>
					<!--进度条-->


					<!--倍数-->
					<view class="beishu" style="border:3rpx solid #C8C9CC;" @click="beishu">{{BsNav[bsindex].bs}} X
					</view>
					<view class="absolute" style="right:0;top:80rpx;" v-if="shows">
						<view class="beishu-a" style="border:2rpx solid #C8C9CC;" v-if="show">
							<view v-for="(item,index) in BsNav" :key="index" @click="setRate(index,item)" class="title"
								:style="{color:bsid==item.id?'#8D48FE':''}">
								{{item.bs}} X
							</view>
						</view>
					</view>
					<!--倍数-->

				</view>
			</view>


		</view>
	</view>
</template>

<script>
	/*
	 list      --   音频文件传入 不传无法播放/数组形式
	 Faskms    --   快进秒数 number 默认15秒
	 Slowms	   --   快退秒数 number 默认15秒
	 autoNext  --   是否自动播放下一首
	 autoplays --   进入页面是否自动播放 - 默认false
	 slideYes  --   滑动进度条时是否开启播放 - 默认false
	 switAud   --   切换上下音频是否开启播放 - 默认false
	 BsNav     --   倍数数据传入/数组形式
	*/
	import calcTimer from '../../../../util/calcTimer'
	export default {
		name: "xm-music-player",
		props: {
			list: { //音频数据
				Type: Array,
				default: () => []
			},
			Faskms: { //快进秒数
				Type: Number,
				default: 15,
			},
			Slowms: { //快退秒数
				Type: Number,
				default: 15,
			},
			autoNext: {
				Type: Boolean,
				default: true,
			},
			autoplays: { //是否开启自动播放
				Type: Boolean,
				default: true,
			},
			slideYes: { //滑动进度条 - 是否开启播放
				Type: Boolean,
				default: true,
			},
			switAud: {
				Type: Boolean, //切换上下音频 - 是否开启播放
				default: true,
			},
			BsNav: { //倍数-传入
				Type: Array,
				default: () => [{
					id: 1.0,
					bs: '1.0',
				}, {
					id: 1.5,
					bs: '1.5'
				}, {
					id: 2.0,
					bs: '2.0'
				}],
			},
		},
		data() {
			return {
				shows: false, //倍数弹框
				show: true, //倍数弹框动画默认开启
				jian: true, //减-切换图标
				jia: true, //加-切换图标
				succes: false, //播放按钮
				bsid: '', //倍数默认显示第一个
				bsindex: 0, //倍数默认显示第一个
				num: 0,
				current: 0, //当前选中的索引
				recorPath: '', //音频播放地址
				lock: false, // 锁
				currentTime: 0, //当前进度
				duration: 100, // 总进度
				videoContext: null,
				loading: true, //锁 加载
			}
		},
		onReady() {},
		onShow() {},
		mounted() {
			// 创建并返回 video 上下文 videoContext 对象
			this.videoContext = uni.createVideoContext('myVideo', this)
			//默认播放第一个 -- 按钮展示
			if (this.list.length != 0) {
				this.recorPath = this.list[0].recorPath
				if (this.list.length > 1) { //音频文件大于1 -- 下一个切换默认显示
					this.jia = false
					if (this.autoplays) {
						this.succes = true
					}
				}
			}
			//倍数默认处理
			if (this.BsNav.length != 0) {
				this.bsid = this.BsNav[0].id
				this.$nextTick(() => {
					//#ifdef H5 
					this.$refs.myVideo.playbackRate(this.bsid)
					//#endif
					//#ifndef H5 
					this.videoContext.playbackRate(this.bsid)
					//#endif 
				})
			}
		},
		updated() {

		},
		onLoad() {

		},
		onHide() { //监听页面离开 - 销毁音频 
			// //#ifdef H5 
			// this.$refs.myVideo.stop();
			// //#endif
			// //#ifndef H5
			// this.videoContext.stop();
			// //#endif
		},
		onUnload() { //监听页面卸载 - 销毁音频 
			// //#ifdef H5
			// this.$refs.myVideo.stop();
			// //#endif
			// //#ifndef H5
			// this.videoContext.stop();
			// //#endif
		},
		destroyed() {
			// this.innerAudioContext.stop();
		},
		computed: {
			timer() {
				return calcTimer(this.currentTime)
			},
			overTimer() {
				return calcTimer(this.duration)
			}
		},
		watch: {

		},
		methods: {

			clickCut(e) { //选择列表歌曲
				console.log("eee", e);
				this.recorPath = e.item.recorPath
				this.succes = true
				//#ifdef H5
				this.$refs.myVideo.play()
				//#endif
				//#ifndef H5
				this.videoContext.play()
				//#endif
			},
			plays() { //播放暂停
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				this.playloading()
				this.succes = !this.succes
				if (this.succes) {
					//#ifdef H5 
					this.$refs.myVideo.play()
					//#endif
					//#ifndef H5
					this.videoContext.play()
					//#endif
				} else {
					uni.hideLoading()
					//#ifdef H5
					this.$refs.myVideo.pause()
					//#endif
					//#ifndef H5
					this.videoContext.pause()
					//#endif
				}
			},
			beishu() { //倍速弹框
				this.shows = !this.shows
			},
			// 倍速
			setRate(index, item) {
				this.bsid = item.id
				this.bsindex = index
				this.shows = false
				//#ifdef H5
				this.$refs.myVideo.playbackRate(item.id)
				//#endif
				//#ifndef H5
				this.videoContext.playbackRate(item.id)
				//#endif
			},

			// 更新进度条 
			timeupdate(event) {
				if (this.lock) return; // 锁
				var currentTime, duration;
				if (event.detail.detail) {
					currentTime = event.detail.detail.currentTime
					duration = event.detail.detail.duration
				} else {
					currentTime = event.detail.currentTime
					duration = event.detail.duration
				}
				this.currentTime = currentTime
				this.duration = duration
			},

			// 拖动进度条
			sliderChange(data) {

				//此处滑动进度条--开始播放
				if (this.slideYes && !this.succes) {
					//#ifdef H5
					this.$refs.myVideo.play()
					//#endif
					//#ifndef H5
					this.videoContext.play()
					//#endif
					this.succes = true
				}
				//#ifdef H5
				this.$refs.myVideo.seek(data.detail.value) //获取秒数
				//#endif
				//#ifndef H5
				this.videoContext.seek(data.detail.value) //获取秒数
				//#endif
			},

			//拖动中
			sliderChanging(data) {
				if (data.detail.value == 0) {
					this.succes = false
					//#ifdef H5
					this.$refs.myVideo.pause()
					//#endif
					//#ifndef H5
					this.videoContext.pause()
					//#endif
				}
				this.currentTime = data.detail.value
			},

			// 视频加载完成
			loadedmetadata(data) {
				this.duration = data.detail.duration
			},
			sig() { //上一首
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				this.num -= 1
				if (this.num < this.list.length) {
					this.loading = true
					this.playloading() //加载框
				}
				if (this.num + 1 < this.list.length && this.num + 1 != 1) { //点击上一首小于音频数据总长度
					this.jia = false // 下按钮-亮且可点击
					this.jian = false // 上按钮-亮且可点击
				} else {
					this.jian = true // 上按钮-灰且阻止
					this.jia = false // 下按钮-亮且可点击
				}
				this.recorPath = this.list[this.num].recorPath
				if (this.switAud) { //切换时是否默认开启播放
					this.succes = true
					setTimeout(() => {
						//#ifdef H5
						this.$refs.myVideo.play()
						//#endif
						//#ifndef H5
						this.videoContext.play()
						//#endif
					}, 100)
				} else {
					this.succes = false
				}
			},
			xig() { //下一首
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				this.num += 1
				if (this.num < this.list.length) {
					this.loading = true
					this.playloading() //加载框
				}
				if (this.num + 1 < this.list.length) { //点击下一首小于音频数据总长度
					this.jia = false // 下按钮-亮且可点击
					this.jian = false // 上按钮-亮且可点击
				} else { //大于总长度
					this.jia = true //下按钮 - 灰且阻止
					this.jian = false //上按钮 - 亮可点击
				}
				this.recorPath = this.list[this.num].recorPath
				if (this.switAud) { //切换时是否默认开启播放
					this.succes = true
					setTimeout(() => {
						//#ifdef H5
						this.$refs.myVideo.play()
						//#endif
						//#ifndef H5
						this.videoContext.play()
						//#endif
					}, 100)
				} else {
					this.succes = false
				}
			},
			nosig() {
				uni.showToast({
					title: '到头了~',
					icon: "none"
				})
			},
			noxig() {
				uni.showToast({
					title: '没有更多了~',
					icon: "none"
				})
			},
			kt() { //快退
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				let a = (this.currentTime - Math.floor(15 % 60)).toFixed(0) //当前时间-15秒
				if (a < 1) {
					this.succes = false
					//#ifdef H5
					this.$refs.myVideo.pause()
					//#endif
					//#ifndef H5
					this.videoContext.pause()
					//#endif
				}
				//#ifdef H5
				this.$refs.myVideo.seek(a)
				//#endif
				//#ifndef H5
				this.videoContext.seek(a)
				//#endif
			},
			kj() { //快进
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				let a = (this.currentTime + Math.floor(15 % 60)).toFixed(0) //当前时间+15秒
				//#ifdef H5
				this.$refs.myVideo.seek(a)
				//#endif
				//#ifndef H5
				this.videoContext.seek(a)
				//#endif
			},
			next(data) { //监听音频结束
				this.succes = false
				/*音频结束--是否自动播放下一首*/
				if (!this.autoNext) {
					return
				}
				if (this.num + 1 < this.list.length) {
					this.succes = true
					this.num += 1
					// 获取需要发送的url

					// 发送请求获取歌曲资源

					this.recorPath = this.list[this.num].recorPath
					setTimeout(() => {
						//#ifdef H5
						this.$refs.myVideo.play()
						//#endif
						//#ifndef H5
						this.videoContext.play()
						//#endif
					}, 100)
				} else {
					this.jia = true //下按钮 - 灰且阻止
					this.jian = false //上按钮 - 亮可点击
				}
				// console.log('音频结束-------')
			},
			playloading() { //加载框
				if (this.loading) {
					uni.showLoading({
						title: "音频缓存中..."
					})
					this.loading = false
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 1600)
			},
		},
		watch: {}
	}
</script>
<style lang="scss" scoped>
	// 主区
	.xm-music-player {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;

		// 列表区域
		.search-list {
			// #ifdef H5
			width: 70%;
			margin: auto;
			// #endif
			height: 65vh;
			overflow-y: scroll;

			// 歌曲信息区域
			.song {
				border-bottom: 1px solid #000;
				height: 120rpx;
				display: grid;
				grid-template-columns: 33.33% 33.33% 33.33%;

				// 头像
				.profile_photo {
					margin: auto;
					font-size: 26rpx;
					color: #546e7a;
				}

				// 歌名
				.song_title {
					margin: auto;
					font-size: 26rpx;
					color: #546e7a;
				}

				// 歌手名
				.singer_name {
					margin: auto;
					font-size: 26rpx;
					color: #546e7a;
				}
			}
		}

		// 控件区域
		.audo-video {
			background-color: red;
			padding-bottom: 20rpx;
			color: #999;
		}
	}

	.slider-box {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27rpx;
		color: #999;
	}

	button {
		display: inline-block;
		width: 100rpx;
		background-color: #fff;
		font-size: 24rpx;
		color: #000;
		padding: 0;
	}

	.hidden {
		position: fixed;
		top: 0;
		left: -10rpx;
		z-index: -1;
		width: 1rpx;
		height: 1rpx;
	}

	.audo-top {
		padding: 20rpx 40rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		image {
			width: 45rpx;
			height: 45rpx;
		}
	}

	.audo-a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 700rpx;
		position: relative;
		z-index: 9;
	}

	.beishu {
		position: relative;
		width: 100rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		text-align: center;
		border-radius: 25rpx;
		font-size: 28rpx;
	}

	.absolute {
		position: absolute;

		.beishu-a {
			width: 200rpx;
			border-radius: 20rpx;
			text-align: center;
			line-height: 90rpx;
			background: #fff;

			.title {
				pdding-left: 30rpx;
			}
		}
	}
</style>