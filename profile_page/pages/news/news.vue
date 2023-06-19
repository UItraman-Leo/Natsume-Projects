<template>
	<view class="news">
		<!-- 类型选择 -->
		<view class="checkbox">
			<uni-data-checkbox mode="button" v-model="radio" :localdata="sex" selectedColor="#00bfa5"
				selectedTextColor="#00bfa5" @change="onSwitch(radio)"></uni-data-checkbox>
		</view>
		<!-- 列表显示 -->
		<view class="newslist">
			<view v-for="(item,index) in article_Data" :key="index" class="new_Area">
				<uni-card padding="0px 0">
					<template slot="title">
						<view class="card_title">
							<view class="headline">
								<text space="ensp">
									{{item.title}}
								</text>
							</view>
							<view class="author">
								<text>夏目</text>
								<text>{{item.date.split("T")[0]}}</text>
							</view>
						</view>
					</template>
					<image style="width: 100%;" lazy-load="true" mode="widthFix"
						:src="'https://api.xia-mu.top:3000'+item.cover" @click="open(item)">
					</image>
				</uni-card>

			</view>
		</view>
	</view>
</template>

<script>
	import $axios from '../../util/axios.js'
	export default {
		data() {
			return {
				// 类型选择
				radio: 1,
				sex: [{
					text: '游戏热点',
					value: 1
				}, {
					text: '体育娱乐',
					value: 2
				}, {
					text: '文章',
					value: 3
				}],
				// 列表文章显示数据
				article_Data: [{
					// 是否发布显示
					isPublish: 1,
					// 标题
					title: "滕王阁序",
					// 时间
					date: "2023-06-03T13:34:32.912Z",
					// 封面
					cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
					// 详情
					content: "豫章故郡，洪都新府。 星分翼轸。 地接衡庐。 襟三江而带五湖，控蛮荆而引瓯越。 物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。 雄州雾列，俊彩星驰。 台隍枕夷夏之交，宾主尽东南之美。 都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。 十旬休暇，胜友如云。 千里逢迎，高朋满座。 腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。 家君作宰，路出名区。 童子何知？ 躬逢胜饯。"
				}],

				getterParticulars: {}, //弹出层数据
				showH: 'auto' //取消滚动
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		methods: {
			onSwitch(item) { // 点击切换获取文章数据
				$axios.getNew('https://api.xia-mu.top:3000/web/new/list', item).then((res) => {
					// console.log('11111', res.data.data);
					if (res.data.data !== []) {
						// console.log('222', res.data.data);
						this.article_Data = res.data.data
					}
				})
			},

			open(e) { // 展开详情
				// this.getterParticulars = e
				uni.navigateTo({
					url: '/components/particulars/particulars',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: e
						})
					}
				});
			},
		},
		onLoad() {
			$axios.getNew('https://api.xia-mu.top:3000/web/new/list', this.radio).then((res) => {
				// console.log('11111', res.data.data);
				if (res.data.data !== []) {
					this.article_Data = res.data.data
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	.news {
		width: 100%;
		height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: nowrap;
	}

	/* ============================== */
	// 选择项
	.checkbox {
		position: relative;
	}

	/* ============================== */
	// 列表
	.newslist {
		width: 100%;

		// 头部插槽
		.card_title {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			border-bottom: 1rpx #dfdfdf dashed;
			margin-bottom: 16rpx;

			.headline {
				//标题
				height: 8vh;
				font-size: 2em;
				font-weight: bold;
				white-space: nowrap;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				overflow: auto;
			}

			.author {
				//署名日期
				height: 5vh;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				justify-content: space-between;
				font-size: 1em;
				color: #dfdfdf;
			}
		}
	}
</style>