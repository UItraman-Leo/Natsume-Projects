const Resource = {
	getsong: async (data) => {
		let responseInformation = await uni.request({
			url: 'https://autumnfish.cn/search',
			data: {
				keywords: data,
				offset: 0,
				type: 1,
			},
			method: "GET",
			dataType: "json",
		})
		return responseInformation
	},
	getMP3: async (id) => {
		let responseSongSource = await uni.request({
			url: 'https://autumnfish.cn/song/url',
			data: {
				id
			},
			method: "GET",
			dataType: "json",
		})
		return responseSongSource
	}
}
export default Resource