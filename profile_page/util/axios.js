/*
需要接收的参数：
	1、请求类型
	2、url地址
	3、参数
*/
const $axios = {
	getNew: async (url, id = "") => {
		const article = uni.request({
			url,
			method: 'GET',
			data: {
				id
			},
			dataType: "json"
		})
		return article
	}
}
export default $axios