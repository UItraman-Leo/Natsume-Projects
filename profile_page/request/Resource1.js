const Resource = {
	// 第一组
	getsong_1: async (data, platform) => {
		let responseInformation = await uni.request({
			url: 'https://autumnfish.cn/search',
			data: {
				keywords: data,
				imit: 50,
				offset: 0,
				type: platform,
			},
			method: "GET",
			dataType: "json",
		})
		return responseInformation
	},
	getMP3_1: async (id) => {
		let responseSongSource = await uni.request({
			url: 'https://autumnfish.cn/song/url',
			data: {
				id
			},
			method: "GET",
			dataType: "json",
		})
		return responseSongSource
	},
	// 第二组
	getsong_2: async (platform, data) => {
		let responseInformation = await uni.request({
			url: 'https://xiaoapi.cn/API/yy.php',
			data: {
				type: platform,
				msg: data,
			},
			method: "GET",
			dataType: "text",
		})
		return responseInformation
	},
	getMP3_2: async (platform, data, id) => {
		let responseInformation = await uni.request({
			url: 'https://xiaoapi.cn/API/yy.php',
			data: {
				type: platform,
				msg: data,
				n: id
			},
			method: "GET",
			dataType: "json",
		})
		return responseInformation
	},
	// 第三组
	getsong_3: async (data, platform) => {
		let responseInformation = await uni.request({
			url: 'https://music-api.tonzhon.com/search',
			data: {
				keyword: data,
				platform,
				limit: 30
			},
			method: "GET",
			dataType: "json",
		})
		return responseInformation
	},
	getMP3_3: async (id) => {
		let responseInformation = await uni.request({
			url: `https://music-api.tonzhon.com/song_file/${id}`,
			method: "GET",
			dataType: "json",
		})
		return responseInformation
	},

}
export default Resource