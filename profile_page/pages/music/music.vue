<template>
	<view class="music">
		<view class="seek">
			<uni-search-bar class="example-body" radius="100" v-model="searchValue" placeholder='搜索' :focus="true"
				cancelButton='none' clearButton="none" @confirm="search(searchValue)"></uni-search-bar>

			<uni-data-select v-model="sourceValue" :localdata="range" clear="false"></uni-data-select>
		</view>
		<view class="_dd22">
			<xm-music-player :list="list" :sourceValue="sourceValue" :searchValue="searchValue"></xm-music-player>
		</view>
	</view>
</template>

<script>
	import Resource1 from '../../request/Resource1.js'
	export default {
		data() {
			return {
				searchValue: '许嵩', //初始搜索值
				sourceValue: 5, //下拉初始值
				range: [{ //下拉配置
						value: 0,
						text: "歌源1"
					},
					{
						value: 1,
						text: "歌源2"
					},
					{
						value: 2,
						text: "歌源3"
					},
					{
						value: 3,
						text: "歌源4"
					},
					{
						value: 4,
						text: "歌源5"
					},
					{
						value: 5,
						text: "歌源6"
					},
				],
				list: [
					// id,用来搜索MP3资源字段
					// name,歌名
					// artists 歌手名
				] //音频文件
			}
		},
		methods: {
			// 输入框确定
			search(searchValue) {
				// 判断输入是否为空，为空返回
				if (searchValue) {
					// console.log(searchValue);
					// 根据歌源触发需要发送的请求
					switch (this.sourceValue) {
						case 0:
							// 通过 输入框的数据调用获取 歌曲信息的接口
							Resource1.getsong_1(searchValue, 1).then(async (res) => {
								if (res.data.code === 200) {
									const a = await Promise.all(
										res.data.result.songs.map(async (item) => {
											const {
												id,
												name,
												artists,
												duration
											} = item;
											// console.log(id,
											// 	name,
											// 	artists[0].name,
											// 	duration);
											return {
												id,
												name,
												artists: artists[0].name,
												duration
											}
										}))
									// console.log(res);
									// const a = await Promise.all(
									// 	res.data.result.songs.map(async (item) => {
									// 		const {
									// 			id,
									// 			name,
									// 			artists,
									// 			duration
									// 		} = item;
									// 		const singer = artists[0].name
									// 		// 通过 id 调用获取 mp3 的接口
									// 		const recorPath = await Resource1.getMP3(id).then((
									// 			data) => {
									// 			// console.log("@@", data);
									// 			return data.data.data[0].url
									// 		})
									// 		return {
									// 			name,
									// 			singer,
									// 			recorPath,
									// 			duration
									// 		}
									// 	})
									// )
									// console.log(a);
									this.list = a
								}
							})
							break;
						case 1:
							Resource1.getsong_1(searchValue, 1004).then(async (res) => {
								if (res.data.code === 200) {
									const a = await Promise.all(
										res.data.result.mvs.map(async (item) => {
											const {
												id,
												name,
												artists,
												duration
											} = item;
											return {
												id,
												name,
												artists: artists[0].name,
												duration
											}
										}))
									this.list = a
								}
							})
							break;
						case 2:
							Resource1.getsong_2('qq', searchValue).then((res) => {
								// 由于获取的是text文本，通过回车符截取成数组，再去除最后一组
								let texta = res.data.toString().split("\n")
								texta.pop()
								let songText = texta.map((value) => {
									return {
										name: value.match(/、(\S*)--/)[1],
										artists: value.match(/--(\S*)/)[1],
										id: value.match(/(\S*)、/)[1],
									}
								})
								this.list = songText
							})
							break;
						case 3:
							Resource1.getsong_2('kgmv', searchValue).then((res) => {
								let texta = res.data.toString().split("\n")
								// 微信小程序暂不支持 toSpliced()
								// let bb = texta.toSpliced(-1, 1)
								texta.pop()
								let songText = texta.map((value) => {
									return {
										name: value.match(/、(\S*)--/)[1],
										artists: value.match(/--(\S*)/)[1],
										id: value.match(/(\S*)、/)[1],
									}
								})
								this.list = songText
							})
							break;
						case 4:
							Resource1.getsong_3(searchValue, 'kuwo').then((res) => {
								let songs = res.data.data.songs
								this.list = songs.map((items) => {
									const {
										newId,
										name,
										artists
									} = items
									return {
										id: newId,
										name,
										artists: artists[0].name
									}
								})
							})
							break;
						case 5:
							Resource1.getsong_3(searchValue, 'm').then((res) => {
								let songs = res.data.data.songs
								this.list = songs.map((items) => {
									const {
										newId,
										name,
										artists
									} = items
									return {
										id: newId,
										name,
										artists: artists[0].name
									}
								})
							})
							break;

					}
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.music {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.seek {
			width: 100vw;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.example-body {
				width: 100%;

				::v-deep .uni-searchbar {
					padding: 0;
				}
			}
		}

		._dd22 {
			width: 100vw;
			height: calc(100vh - 100rpx);
		}
	}
</style>