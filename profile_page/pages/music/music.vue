<template>
	<view>

		<view style="width:100%;;position:absolute;bottom: 0px;">
			<xm-music-player :list="list" :BsNav="BsNav"></xm-music-player>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [ //音频文件
					{
						recorPath: 'http://m801.music.126.net/20230521210814/bf6dcdea8eb04c363d63c415ae890263/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14080948558/766a/a28b/ff92/6558894fc94f8f7b641d774149a088db.mp3'
					},
					{
						recorPath: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
					}
				],
				BsNav: [ //倍数-自定义
					{
						id: 1.0,
						bs: '1.0'
					}, {
						id: 1.5,
						bs: '1.5'
					}, {
						id: 2.0,
						bs: '2.0'
					}
				],
			}
		},
		methods: {

		},
	}
</script>

<style scoped>
</style>