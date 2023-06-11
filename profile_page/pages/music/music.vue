<template>
	<view class="music">
		<view class="seek">
			<uni-search-bar class="example-body" radius="100" v-model="searchValue" placeholder='搜索' :focus="true"
				cancelButton='none' clearButton="none" @confirm="search(searchValue)"></uni-search-bar>

			<uni-data-select v-model="sourceValue" :localdata="range" clear="false"></uni-data-select>
		</view>
		<view style="width:100%;;position:absolute;bottom: 0px;">
			<xm-music-player :list="list"></xm-music-player>
		</view>
	</view>
</template>

<script>
	import Resource1 from '../../request/Resource1.js'
	export default {
		data() {
			return {
				searchValue: '', //初始搜索值
				sourceValue: 0, //下拉初始值
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
				],
				list: [
					//{
					// 	name: "清明雨上",
					// 	singer: "许嵩",
					// 	img1v1Url: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
					// 	recorPath: "http://m701.music.126.net/20230523215313/324c827864453333bbfe0dedfde3f662/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14080948558/766a/a28b/ff92/6558894fc94f8f7b641d774149a088db.mp3"
					//}
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
							Resource1.getsong(searchValue).then(async (res) => {
								if (res.data.code === 200) {
									/*
									id  id
									歌名  name
									歌手  artists[0].name
									*/
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
							console.log('11');
							break;
						case 2:
							console.log('00');
							break;
					}
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.seek {
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.example-body {
		width: 100%;

		::v-deep .uni-searchbar {
			padding: 0;
		}
	}
</style>