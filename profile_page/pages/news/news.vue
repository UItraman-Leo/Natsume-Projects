<template>
	<view class="news">
		<!-- 类型选择 -->
		<view class="checkbox">
			<uni-data-checkbox mode="button" v-model="radio" :localdata="sex" selectedColor="#00bfa5"
				selectedTextColor="#00bfa5"></uni-data-checkbox>
		</view>
		<!-- 列表显示 -->
		<view class="newslist">
			<view v-for="(item,index) in article_Data" :key="index" class="new_Area">
				<uni-card :title="item.article_Title" sub-title="Natsume" :extra="item.article_Date" padding="0px 0"
					:thumbnail="item.avatar">
					<image style="width: 100%;" :src="item.cover" @click="open"></image>
					<view style="width: 100%;height: 94rpx;overflow: hidden;">
						<text class="uni-body">
							{{item.article_Text}}
						</text>
					</view>
					<view slot="actions" class="card-actions">

						<view class="card-actions-item" @click="onShare('分享')">
							<!-- <button  plain="true" size="mini" open-type="shareMessageToFriend"> -->
							<uni-icons type="undo" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">分享</text>
							<!-- </button> -->
						</view>
						<view class="card-actions-item" @click="onUpvote(item)">
							<uni-icons :style="{color:item.iconColor}" :type="item.iconValue" size="18"
								color="#999"></uni-icons>
							<text class="card-actions-item-text">点赞</text>
						</view>
						<view class="card-actions-item" @click="onDiscuss('评论')">
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评论</text>
						</view>
					</view>
				</uni-card>

			</view>
		</view>
		<!-- 侧边显示详情 -->
		<uni-popup ref="popup" background-color="#fff">左边弹出</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 类型选择
				radio: 0,
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '未知',
					value: 2
				}],
				// 列表文章显示数据
				article_Data: [{
					// 标题
					article_Title: "滕王阁序",
					// 时间
					article_Date: "2023/1/10",
					// 封面
					cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
					// 头像
					avatar: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
					// 点赞
					iconColor: '#111',
					iconValue: 'heart',
					// 详情
					article_Text: "豫章故郡，洪都新府。 星分翼轸。 地接衡庐。 襟三江而带五湖，控蛮荆而引瓯越。 物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。 雄州雾列，俊彩星驰。 台隍枕夷夏之交，宾主尽东南之美。 都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。 十旬休暇，胜友如云。 千里逢迎，高朋满座。 腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。 家君作宰，路出名区。 童子何知？ 躬逢胜饯。"
				}]



			}
		},
		methods: {
			open() { // 展开详情
				this.$refs.popup.open('left')
			},
			onShare(item) { //分享
				console.log(item);

			},
			onUpvote(item) { //点赞
				console.log(item);
				item.iconColor = '#ff0000'
				item.iconValue = 'heart-filled'


			},
			onDiscuss(item) { //评论
				console.log(item);
			}
		},
		onReady() {},

	}
</script>

<style lang="scss" scoped>
	.news {
		width: 100%;
		height: 100%;
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

	// 列表
	.newslist {
		.new_Area {

			// 摘要
			.uni-body {
				font-size: 30rpx;
			}

			// 操作选项
			.card-actions {
				margin: 20rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-evenly;

				.card-actions-item {
					margin: 0 10rpx;
					display: flex;


					.card-actions-item-text {
						margin: 0 10rpx;
					}

				}
			}
		}
	}

	/* =========================== */

	.button {
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}
</style>