	//时间换算
	function calcTimer(timer) {
		if (timer === 0 || typeof timer !== 'number') {
			return '00:00'
		}
		let mm = Math.floor(timer / 60)
		let ss = Math.floor(timer % 60)
		if (mm < 10) {
			mm = '0' + mm
		}
		if (ss < 10) {
			ss = '0' + ss
		}
		return mm + ':' + ss
	}
	export default calcTimer