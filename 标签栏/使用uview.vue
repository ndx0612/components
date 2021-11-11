<template>
	<view class="content">
		<u-tabs name="cate_name" count="cate_count" :list="list" :is-scroll="true" :current="activeIndex"
			@change="change">
		</u-tabs>
		<view class="swiper">
			<swiper class="swiper-container" :current="activeIndex" @change="changeCurrentIndex">
				<swiper-item v-for="(item,index) in list" :key="index">
					<!-- 滚动区域 -->
					<scroll-view class="swiper-container-list" scroll-y="true">
						{{item.name}}
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '待收货01',
				}, {
					name: '待付款02',
				}, {
					name: '待评价03',
				}, {
					name: '待评价04',
				}, {
					name: '待评价05',
				}, {
					name: '待评价06',
				}],
				activeIndex: 0
			}
		},
		methods: {
			change(index) {
				this.activeIndex = index;
			},
			changeCurrentIndex(e) {
				const {
					current
				} = e.detail;
				this.activeIndex = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
