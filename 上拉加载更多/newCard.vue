<template>
	<view class="wrap">
		<!-- 循环遍历 -->
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			{{'第' + item + '条数据'}}
		</view>
		<!-- 上拉加载更多 -->
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				list: 15,
				page: 0
			}
		},
		// 
		onReachBottom() {
			// 页面大于3，显示没有更多了
			if (this.page >= 3) return;
			// 状态变为加载中
			this.status = 'loading';
			this.page = ++this.page;
			setTimeout(() => {
				// 列表数量加10
				this.list += 10;
				// 没有数据的时候，提示"nomore"
				if (this.page >= 3) this.status = 'nomore';
				// 加载中
				else this.status = 'loading';
			}, 500)
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}

	.item {
		padding: 24rpx 0;
		color: $u-content-color;
		font-size: 28rpx;
	}
</style>
