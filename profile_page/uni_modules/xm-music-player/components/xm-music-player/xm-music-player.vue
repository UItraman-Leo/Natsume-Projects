<template>
	<!--音频组件-->

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
						{{item.artists}}
					</view>
					<view class="profile_photo">
						点击播放
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
				<image v-if="jian" style="width:50rpx;height:50rpx;" @click="nosig" src="/static/sys.png"
					mode="aspectFill"></image>
				<image v-else @click="sig" src="/static/xys.png"
					style="width:50rpx;height:50rpx;transform:rotate(180deg)" mode="aspectFill"></image>
				<!--上一首切换按钮-->
				<!--播放按钮-->
				<image :src="succes?'/static/bofang2.png':'/static/zt.png'" mode="aspectFill"
					style="width:180rpx;height:180rpx;" @click="plays()"></image>
				<!--播放按钮-->
				<!--下一首切换按钮-->
				<image v-if="jia" @click="noxig" style="width:50rpx;height:50rpx;transform:rotate(180deg)"
					src="/static/sys.png" mode="aspectFill"> </image>
				<image v-else style="width:50rpx;height:50rpx;" src="/static/xys.png" @click="xig" mode="aspectFill">
				</image>
				<!--下一首切换按钮-->
			</view>
			<!--音频播放按钮处-->
			<!--音频api处[视频代替音频-实现倍数功能]-->
			<video id="myVideo" ref="myVideo" :src="recorPath" class="hidden" :autoplay="autoplays"
				@timeupdate="timeupdate" @loadedmetadata="loadedmetadata" @ended="next" controls
				auto-pause-if-navigate="false" auto-pause-if-open-native="false" http-cache="true" is-live="true">
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
			</view>
		</view>
	</view>

</template>

<script>
	/*
	 list      --   音频文件传入 不传无法播放/数组形式
	 autoNext  --   是否自动播放下一首
	 autoplays --   进入页面是否自动播放 - 默认true
	 slideYes  --   滑动进度条时是否开启播放 - 默认true
	 switAud   --   切换上下音频是否开启播放 - 默认true
	*/
	import calcTimer from '../../../../util/calcTimer'
	import Resource1 from '../../../../request/Resource1.js'
	export default {
		name: "xm-music-player",
		props: {
			list: { //音频数据
				Type: Array,
				default: () => []
			},
			sourceValue: { //当前选择的歌源
				Type: Number,
				default: 1
			},
			searchValue: { //搜索框的内容，为个别歌源使用
				Type: String,
				default: ''
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
		},
		data() {
			return {
				jian: true, //减-切换图标
				jia: true, //加-切换图标
				succes: false, //播放按钮
				num: 0, //当前选中的索引
				recorPath: '', //音频播放地址
				lock: false, // 锁
				currentTime: 0, //当前进度
				duration: 100, // 总进度
				videoContext: null,
				loading: true, //锁 加载
			}
		},
		methods: {
			clickCut(e) { //选择列表歌曲
				this.num = e.index
				// 通过e.item.id获取MP3格式的url
				switch (this.sourceValue) {
					case 0:
						Resource1.getMP3_1(e.item.id).then((data) => {
							//通过获取的url给recorPath，随后执行播放
							this.recorPath = data.data.data[0].url
						});
						break;
					case 1:
						Resource1.getMP3_1(e.item.id).then((data) => {
							this.recorPath = data.data.data[0].url
						});
						break;
					case 2:
						Resource1.getMP3_2('qq', this.searchValue, Number(e.item.id)).then((data) => {
							// console.log(data.data.match(/播放链接：(\S*)/)[1]);
							this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
						});
						break;
					case 3:
						Resource1.getMP3_2('kgmv', this.searchValue, Number(e.item.id)).then((data) => {

							this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
						});
						break;
					case 4:
						Resource1.getMP3_3(e.item.id).then((data) => {
							this.recorPath = data.data.data.songSource
						});
						break;
					case 5:
						Resource1.getMP3_3(e.item.id).then((data) => {
							this.recorPath = data.data.data.songSource
						});
						break;

				}
				// 获取完资源后再继续执行
				this.succes = true
				setTimeout(() => {
					this.videoContext.play()
				}, 100)
				if (this.num == 0) {
					this.jia = false
					this.jian = true
				} else if (this.num + 1 >= this.list.length) {
					this.jia = true
					this.jian = false
				} else {
					this.jia = false
					this.jian = false
				}

			},
			plays() { //播放暂停
				if (!this.list || this.list.length == 0) {
					uni.showToast({
						title: '别点了~先搜索',
						icon: "none"
					})
					return;
				}
				this.playloading()
				this.succes = !this.succes
				if (this.succes) {
					this.videoContext.play()

				} else {
					uni.hideLoading()
					this.videoContext.pause()
				}
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
					this.videoContext.play()
					this.succes = true
				}
				this.videoContext.seek(data.detail.value) //获取秒数
			},

			//拖动中
			sliderChanging(data) {
				if (data.detail.value == 0) {
					this.succes = false
					this.videoContext.pause()
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
				switch (this.sourceValue) {
					case 0:
						Resource1.getMP3_1(this.list[this.num].id).then((data) => {
							//通过获取的url给recorPath，随后执行播放
							this.recorPath = data.data.data[0].url
						});
						break;
					case 1:
						Resource1.getMP3_1(this.list[this.num].id).then((data) => {
							this.recorPath = data.data.data[0].url
						});
						break;
					case 2:
						Resource1.getMP3_2('qq', this.searchValue, Number(this.list[this.num].id)).then((data) => {
							// console.log(data.data.match(/播放链接：(\S*)/)[1]);
							this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
						});
						break;
					case 3:
						Resource1.getMP3_2('kgmv', this.searchValue, Number(this.list[this.num].id)).then((data) => {
							this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
						});
						break;
					case 4:
						Resource1.getMP3_3(this.list[this.num].id).then((data) => {
							this.recorPath = data.data.data.songSource
						});
						break;
					case 5:
						Resource1.getMP3_3(this.list[this.num].id).then((data) => {
							this.recorPath = data.data.data.songSource
						});
						break;

				}
				// 获取完资源后继续执行
				if (this.switAud) { //切换时是否默认开启播放
					this.succes = true
					setTimeout(() => {
						this.videoContext.play()
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
				// 获取需要发送的url,发送请求获取歌曲资源
				switch (this.sourceValue) {
					case 0:
						Resource1.getMP3_1(this.list[this.num].id).then((data) => {
							//通过获取的url给recorPath，随后执行播放
							this.recorPath = data.data.data[0].url
						});
						break;
					case 1:
						Resource1.getMP3_1(this.list[this.num].id).then((data) => {
							this.recorPath = data.data.data[0].url
						});
						break;
					case 2:
						Resource1.getMP3_2('qq', this.searchValue, Number(this.list[this.num].id)).then((data) => {
							// console.log(data.data.match(/播放链接：(\S*)/)[1]);
							this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
						});
						break;
					case 3:
						Resource1.getMP3_2('kgmv', this.searchValue, Number(this.list[this.num].id)).then((data) => {
							this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
						});
						break;
					case 4:
						Resource1.getMP3_3(this.list[this.num].id).then((data) => {
							this.recorPath = data.data.data.songSource
						});
						break;
					case 5:
						Resource1.getMP3_3(this.list[this.num].id).then((data) => {
							this.recorPath = data.data.data.songSource
						});
						break;

				}

				// 获取完资源后再继续执行
				if (this.switAud) { //切换时是否默认开启播放
					this.succes = true
					setTimeout(() => {
						this.videoContext.play()
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
			next(data) { //监听音频结束
				this.succes = false
				/*音频结束--是否自动播放下一首*/
				if (!this.autoNext) {
					return
				}
				if (this.num + 1 < this.list.length) {
					this.succes = true
					this.num += 1
					// 获取需要发送的url,发送请求获取歌曲资源
					switch (this.sourceValue) {
						case 0:
							Resource1.getMP3_1(this.list[this.num].id).then((data) => {
								//通过获取的url给recorPath，随后执行播放
								this.recorPath = data.data.data[0].url
							});
							break;
						case 1:
							Resource1.getMP3_1(this.list[this.num].id).then((data) => {
								this.recorPath = data.data.data[0].url
							});
							break;
						case 2:
							Resource1.getMP3_2('qq', this.searchValue, Number(this.list[this.num].id)).then((data) => {
								// console.log(data.data.match(/播放链接：(\S*)/)[1]);
								this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
							});
							break;
						case 3:
							Resource1.getMP3_2('kgmv', this.searchValue, Number(this.list[this.num].id)).then((data) => {
								this.recorPath = data.data.match(/播放链接：(\S*)/)[1]
							});
							break;
						case 4:
							Resource1.getMP3_3(this.list[this.num].id).then((data) => {
								this.recorPath = data.data.data.songSource
							});
							break;
						case 5:
							Resource1.getMP3_3(this.list[this.num].id).then((data) => {
								this.recorPath = data.data.data.songSource
							});
							break;

					}


					// 获取完资源后再继续执行
					setTimeout(() => {
						this.videoContext.play()
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
		mounted() {
			// 创建并返回 video 上下文 videoContext 对象
			this.videoContext = uni.createVideoContext('myVideo', this)
		},
		computed: {
			timer() {
				return calcTimer(this.currentTime)
			},
			overTimer() {
				return calcTimer(this.duration)
			}
		}
	}
</script>
<style lang="scss" scoped>
	// 主区
	.xm-music-player {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;


		// 列表区域
		.search-list {
			height: 80rem;
			overflow-y: scroll;
			background-image: url("/static/aa.png");
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;

			// 歌曲信息区域
			.song {
				border-bottom: 1px solid #000;
				height: 120rpx;
				display: grid;
				grid-template-columns: 33.33% 33.33% 33.33%;

				// 时长
				.profile_photo {
					margin: auto;
					font-size: 26rpx;
					color: #546e7a;
				}

				// 歌名
				.song_title {
					margin: auto auto auto 10px;
					width: 8rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #546e7a;
				}

				// 歌手名
				.singer_name {
					margin: auto auto auto 100rpx;
					width: 4rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #546e7a;
				}
			}
		}

		// 控件区域
		.audo-video {
			height: 20rem;
			// background-image: linear-gradient(358deg, #06fff4, #a7f3bb, #dce681, #ffd83c);
			background-image: linear-gradient(359deg, #7c9ce6, #6fbdeb, #57deef, #08fff3);
			color: #fff;
		}
	}

	.slider-box {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27rpx;
		color: #fff;
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
		width: 600rpx;
		position: relative;
		z-index: 9;
	}
</style>