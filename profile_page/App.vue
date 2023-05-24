<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef H5
			uni.hideTabBar()
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/default.css"
</style>