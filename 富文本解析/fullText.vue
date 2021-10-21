<template>
  <view class="full-text">
    <!-- v-if判断是否为外链网站 -->
    <view class="custorm" v-if="isCustorm">
      <view class="article-head">
        <view class="title">{{ info.title }}</view>
        <view class="head-info">
          <text>{{ info.sourceTime || info.time }}</text>
        </view>
      </view>
      <view class="full-style">
        <!-- 解析外链网站 -->
        <u-parse :html="info.content"></u-parse>
      </view>
    </view>
    <web-view v-else :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      // 判断是否外链网站
      isCustorm: Boolean,
      // 存储外链网站地址
      url: "",
    };
  },
  // params接收传入参数
  onLoad(params) {
    // 发送请求
    this.$u.api
      .getDetailById({
        // 请求参数
        id: params.id,
      })
      .then((res) => {
        this.info = res;
        // 判断是否外链
        if (res.isOriginal == 1) {
          this.isCustorm = true;
        } else {
          this.isCustorm = false;
          this.url = res.boardUrl;
        }
        console.log(this.info);
      });
  },
};
</script>

<style lang="scss" scoped>
.full-text {
  width: 100%;
  height: 100%;

  .full-style {
    margin-top: 100rpx;
    color: $u-content-color;
    font-size: 32rpx;
    line-height: 2;
    padding: 30rpx;
  }

  .custorm {
    width: 100%;
    height: 100%;
    padding: 14rpx;

    .article-head {
      width: 100%;
      min-height: 200rpx;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-direction: column;
      border-bottom: 1px solid #f5f5f5;

      .title {
        width: 100%;
        font-size: 36rpx;
        font-weight: bold;
      }

      .head-info {
        width: 100%;
        color: $u-light-color;

        .shy-flex-b {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
