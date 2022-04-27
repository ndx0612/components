<template>
  <view>
    <!-- 标签 -->
    <!-- :scroll-left='activeIndex*80'设置横向跟着移动 -->
    <scroll-view class="tab" scroll-x="true">
      <view class="tab-box">
        <view class="tab-box-item" v-for="(item,index) in list" :key="index" @click="navClickFn(index)" :class="{ active: activeIndex === index }">
          {{item}}
        </view>
      </view>
    </scroll-view>
    <!-- 轮播页面 -->
    <view class="swiper">
      <swiper class="swiper-container" :current="activeIndex" @change="changeCurrentIndex">
        <swiper-item v-for="(item,index) in list" :key="index">
          <!-- 滚动区域 -->
          <scroll-view class="swiper-container-list" scroll-y="true">
            {{item}}
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
      list: [
        "前端开发01",
        "前端开发02",
        "前端开发03",
        "前端开发04",
        "前端开发05",
        "前端开发06",
      ],
      activeIndex: 0,
    };
  },
  methods: {
    navClickFn(index) {
      this.activeIndex = index;
    },
    changeCurrentIndex(e) {
      const { current } = e.detail;
      this.activeIndex = current;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  height: 40px;
  width: 100%;

  &-box {
    display: flex;

    &-item {
      line-height: 40px;
      padding: 0 10px;
      flex-shrink: 0;

      &.active {
        color: blue;
      }
    }
  }
}
</style>
